# Capítulo 13 — Arquitetura Técnica

> A arquitetura serve à estratégia, nunca o contrário. Tudo aqui é escolhido para sustentar três exigências não-negociáveis: (1) **experiência cinematográfica com performance de ponta**, (2) **transações confiáveis** (reservas, pagamentos, zero overbooking) e (3) **evolução plurianual** de um site institucional para uma plataforma com CRM, BI, fidelidade e OTAs. Cada decisão traz justificativa (T)écnica, (E)stratégica, (C)omercial e as alternativas descartadas.

## 13.1 Visão geral (diagrama lógico)

```
                       ┌───────────────────────────────────────────┐
                       │            EDGE / CDN (Vercel)             │
                       │  SSG/ISR, cache, imagens, edge functions   │
                       └───────────────────────────────────────────┘
                                          │
        ┌─────────────────────────────────┼──────────────────────────────────┐
        │                                 │                                   │
┌───────▼────────┐              ┌─────────▼─────────┐               ┌─────────▼──────────┐
│  SITE PÚBLICO  │              │  ÁREA DO HÓSPEDE  │               │     BACKOFFICE     │
│  Next.js (App) │              │  Next.js (auth)   │               │  Next.js (/admin)  │
└───────┬────────┘              └─────────┬─────────┘               └─────────┬──────────┘
        │                                 │                                   │
        └─────────────────────────────────┼───────────────────────────────────┘
                                           │  (API Routes / Server Actions / RPC)
                       ┌───────────────────▼────────────────────┐
                       │              SUPABASE                   │
                       │  Postgres · Auth · Storage · Realtime   │
                       │  RLS · Edge Functions · pg_cron         │
                       └───────────────────┬────────────────────┘
                                           │
     ┌──────────────┬──────────────┬───────┴───────┬───────────────┬──────────────┐
     ▼              ▼              ▼               ▼               ▼              ▼
 Mercado Pago   Cloudflare R2   Resend        Google Maps      GA4/Meta/     IA (LLM)
 /Stripe        (mídia)         (e-mail)      (mapas)          Clarity       cap.14
     │                                                                          
     └── (V2+) Channel Manager ↔ OTAs (Booking/Airbnb/Expedia)
```

## 13.2 Frontend

**Escolha: Next.js (App Router) + TypeScript + Tailwind CSS.**

- **Next.js (T/E/C):** renderização híbrida é o ponto decisivo. Precisamos de **SSG/ISR** para páginas de conteúdo (Home, acomodações, restaurante, museu — SEO e velocidade máximos, cap. 15) **e** de **SSR/dinâmico** para o motor de reservas (disponibilidade/preço em tempo real). Next entrega os dois no mesmo framework, com edge, image optimization e ecossistema maduro. **Alternativas descartadas:** *Astro* (excelente para conteúdo, mas o app transacional/logado e a interatividade rica pesam o modelo de ilhas); *Remix* (ótimo, mas ecossistema e deploy Vercel do Next são vantagem operacional aqui); *SPA pura (Vite/React)* (péssimo para SEO — inaceitável dado o cap. 15).
- **TypeScript:** obrigatório — reserva/pagamento não tolera erro de tipo em produção; tipos compartilhados com o schema do Supabase (geração automática) reduzem bugs de contrato.
- **Tailwind + design tokens:** velocidade e consistência; tokens de marca (cap. 01) como fonte única. Componentes acessíveis com base **Radix UI** (menus, diálogos, calendário) — acessibilidade de graça e testada.
- **Movimento:** GSAP+ScrollTrigger, Framer Motion, Lenis, React Three Fiber (cap. 03) — carregados sob demanda (code-splitting) para não penalizar o transacional.

**Estratégia de renderização por tipo de página:**
| Página | Render | Motivo |
|--------|--------|--------|
| Home, A Fazenda, Museu, Diário | SSG + ISR | Conteúdo estável, SEO/velocidade |
| Acomodação/Experiência/Prato (conteúdo) | SSG/ISR + ilha dinâmica de preço | Conteúdo cacheável; preço em tempo real via fetch |
| Motor de reservas, checkout | SSR/dinâmico | Disponibilidade/preço/hold ao vivo |
| Área do hóspede, Backoffice | SSR autenticado (client interativo) | Dados privados, tempo real |

## 13.3 Backend & Banco

**Escolha: Supabase (PostgreSQL gerenciado + Auth + Storage + Realtime + Edge Functions).**

- **Por que Postgres (T):** reservas e pagamentos exigem **ACID, transações e constraints fortes** (evitar overbooking com locks/constraints de exclusão — cap. 04). NoSQL seria imprudente para inventário/tarifas relacionais. Postgres também dá `pg_cron` (jobs de RM), extensões (PostGIS para mapa/geo se preciso, `pgvector` para IA — cap. 14) e maturidade absoluta.
- **Por que Supabase (E/C):** entrega Auth (e-mail/OAuth/OTP), Storage, Realtime, RLS e API instantânea **sobre Postgres puro** — acelera o MVP sem lock-in proprietário de dados (é Postgres; dá para migrar). Reduz custo de infra e de time no início. **Alternativas descartadas:** *Firebase* (NoSQL, ruim para o domínio relacional/transacional e sem SQL real); *backend do zero (Nest/Express + Postgres)* (mais controle, muito mais tempo/custo — reservar para quando a escala justificar extrair serviços); *Prisma+Postgres self-hosted* (ok, mas Supabase já entrega auth/storage/realtime prontos). **Regra:** começar monolito modular no Supabase/Next; **extrair serviços só quando um domínio (ex.: RM ou Channel Manager) exigir escala/isolamento próprios** — não microserviços prematuros (cap. 19).
- **Lógica de negócio:** Server Actions / API Routes do Next para orquestração; **Edge Functions/Postgres functions** para regras críticas próximas ao dado (cálculo de disponibilidade, hold transacional, aplicação de RM) — garante integridade mesmo sob concorrência.
- **RLS (Row Level Security):** cada tabela com políticas por papel/usuário — o hóspede só lê o seu; o backoffice conforme RBAC (cap. 12). Segurança no banco, não só na aplicação.

## 13.4 Storage & Mídia

**Escolha: Cloudflare R2 para mídia pesada (vídeo/imagem originais) + Vercel/Next Image + CDN.**

- **R2 (C):** **egress zero** — decisivo para um site pesado em vídeo 4K e galerias; S3 cobraria caro por transferência. Compatível com API S3.
- **Pipeline:** upload no backoffice → R2 → transcodificação/variações responsivas (AVIF/WebP, múltiplos tamanhos; vídeo em HLS/AV1/WebP-poster) → entrega via CDN. `next/image` para otimização automática das imagens de conteúdo.
- **Streaming de vídeo:** para os vídeos cinematográficos, usar HLS adaptativo (ou Cloudflare Stream / Mux se o volume justificar) em vez de MP4 gigante — evita travar em conexões de campo.

## 13.5 Autenticação & Autorização

- **Supabase Auth:** e-mail/senha, Google OAuth, **OTP/magic link** (cap. 11). **2FA obrigatório para o Backoffice.**
- **Autorização:** RLS + RBAC (papéis do cap. 12) + claims no JWT. Backoffice isolado com sessões curtas.

## 13.6 Segurança (defesa em profundidade)

- **Pagamentos:** PCI-DSS via tokenização do gateway; cartão nunca toca nossos servidores; webhooks **assinados e idempotentes** como fonte de verdade (cap. 04).
- **Transporte/headers:** HTTPS/HSTS, CSP restritiva, cabeçalhos de segurança, proteção XSS/CSRF, rate limiting (edge) em endpoints sensíveis (login, cupom, reserva).
- **Dados/LGPD:** minimização, consentimento granular, criptografia em repouso/trânsito, direito de exclusão/portabilidade, retenção definida, logs de auditoria, DPA com fornecedores. Documento de política + termos (jurídico).
- **Segredos:** em variáveis de ambiente/secret manager, nunca no cliente/repo.
- **Antifraude:** regras do gateway + sinais próprios (velocidade de reservas, cupons).

## 13.7 Integrações

| Integração | Uso | Fase |
|------------|-----|------|
| Mercado Pago / Stripe | Pagamentos, Pix, parcelamento | MVP |
| Resend | E-mail transacional (confirmação, pré-estadia, recibos) | MVP |
| Google Maps | Como chegar, mapa de localização | MVP |
| WhatsApp Business API | Notificações, concierge, leads de casamento | V2 |
| GA4 / Meta Pixel / Clarity | Analytics (cap. 16) | MVP |
| Google Calendar API | Adicionar reserva à agenda | MVP/V2 |
| Channel Manager (ex.: via API) ↔ OTAs | Sync inventário/tarifa | V2 |
| PMS / PDV | Operação hoteleira e comanda do restaurante | V2/V3 |
| Assinatura eletrônica | Contratos de casamento/evento | V2 |
| LLM provider | Concierge/IA (cap. 14) | V2 |

**Padrão de integração:** camada de adaptadores (ports & adapters) para trocar fornecedor sem reescrever o núcleo (ex.: gateway-agnóstico, cap. 04). Webhooks entram por endpoints validados e idempotentes.

## 13.8 Infraestrutura, ambientes e CI/CD

- **Hospedagem: Vercel** (edge, ISR, preview deploys por PR, DX). **Alternativa:** Cloudflare Pages/Workers (mais barato em escala, ótimo com R2) — reavaliar em V3 por custo. Supabase gerenciado (com opção de auto-hospedagem futura, pois é Postgres).
- **Ambientes:** `dev` → `staging` (Supabase branch de banco) → `prod`. Migrations versionadas (Supabase migrations), nunca alterar prod à mão.
- **CI/CD:** GitHub → checks (lint, type-check, testes, build, Lighthouse CI com orçamento de CWV, axe para acessibilidade) → preview → deploy. Feature flags para lançar sem medo.
- **Observabilidade:** logs estruturados, Sentry (erros), monitoramento de uptime, alertas de pagamento/reserva falha, dashboards de CWV reais (RUM).

## 13.9 Escalabilidade e resiliência

- **Escala de leitura:** SSG/ISR + CDN absorve picos de tráfego (campanha, São João, viral) sem tocar no banco.
- **Escala transacional:** o gargalo real é o banco em reservas concorrentes — mitigado com índices, connection pooling (Supavisor/PgBouncer), e a lógica de hold atômica. Extrair RM/Channel Manager como serviço só se necessário.
- **Picos previsíveis** (abertura de vendas de São João/casamento) → fila/rate limit + pré-aquecimento de cache.
- **Backups:** PITR (point-in-time recovery) do Postgres, backups de R2, plano de disaster recovery documentado.
- **Degradação graciosa:** se a IA/concierge cai, o site funciona; se o mapa 3D não carrega, há fallback; o transacional nunca depende do espetáculo (cap. 03/19).

## 13.10 Internacionalização (i18n)

- PT-BR nativo; EN como segunda camada (casamentos-destino, viajante internacional). `next-intl`/roteamento `/en/`. Moeda/idioma/data localizados. Conteúdo traduzido gerenciado no CMS. Preparar arquitetura para i18n desde o início (retrofit é caro), mas **entregar só PT-BR no MVP** e ligar EN quando o público justificar.

## 13.11 Padrões de código e qualidade

- Monorepo (ou app único com módulos por domínio: `reservas`, `revenue`, `conteudo`, `hospede`, `admin`). Domínios com fronteiras claras (DDD leve).
- Tipos gerados do schema (Supabase → TS). Testes: unit (regras de RM/reserva), integração (fluxo de reserva/pagamento), E2E (Playwright) dos fluxos-cr(reserva, checkout, casamento-lead), testes de acessibilidade automáticos.
- Documentação viva; ADRs (Architecture Decision Records) para decisões grandes — este blueprint é o ADR-0.

Seguir para o **[Capítulo 14 — Inteligência Artificial](14-inteligencia-artificial.md)**.
