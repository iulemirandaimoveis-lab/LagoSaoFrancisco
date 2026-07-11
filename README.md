# Plataforma Digital — Fazenda Lago São Francisco

> **Blueprint Oficial de Produto** · Documento diretor para o desenvolvimento da plataforma digital de experiências da Fazenda Lago São Francisco (Garanhuns / Agreste — Pernambuco).

Este repositório contém o **planejamento estratégico, de produto, de experiência e de arquitetura** (pasta `docs/`) que orienta a construção da plataforma, e a **implementação da Fase 1 (MVP)** dessa plataforma (pasta `src/`, Next.js). O planejamento é a fonte única de verdade (*single source of truth*) para as equipes de **produto, design, engenharia, marketing, revenue e gestão**; o código evolui em cima dele.

## A aplicação (Next.js)

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start   # build de produção
npm run lint
npm run typecheck
```

Stack: Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion, conforme o
[Capítulo 13 — Arquitetura Técnica](docs/13-arquitetura-tecnica.md). Implementado nesta fase: home
cinematográfica, institucional, hospedagem (hub + páginas por suíte), restaurante Dom Dina (cardápio
digital + reserva de mesa), experiências (hub filtrável + páginas), casamentos (pacotes + simulador de
orçamento), museu, eventos com venda de ingresso e checkout próprio (ver abaixo), motor de reservas
com calendário e precificação dinâmica, contato/FAQ, páginas legais, SEO técnico (metadata, JSON-LD,
sitemap, robots, OG images) e acessibilidade WCAG 2.2 AA.

Como o backend de produção (Supabase, PMS) ainda não foi provisionado neste ambiente, os endpoints de
reserva (`/api/reservas`, `/api/mesa`, `/api/experiencias`, `/api/casamentos`, `/api/contato`) validam
e registram as solicitações, prontos para a integração real descrita no Capítulo 13 — não há
persistência real ainda. Toda fotografia/vídeo é um placeholder gráfico (gradientes + linhas) até a
produção audiovisual real entrar, conforme o Capítulo 01.9.

### Eventos — venda de ingresso própria (substitui a Sympla)

`/eventos` é a solução própria de bilheteria, no lugar da Sympla: página de evento com todos os tipos
de ingresso, carrinho com seletor de quantidade e checkout via **Mercado Pago** (Pix, cartão em até
12x ou boleto) — sem a taxa de serviço que a Sympla cobra do comprador.

- `src/content/events.ts` — dados do evento e catálogo de ingressos (preço, descrição, limite por pedido).
- `src/components/eventos/ticket-selector.tsx` — carrinho + formulário do comprador.
- `src/app/api/eventos/checkout/route.ts` — valida o pedido, recalcula o total no servidor (nunca confia
  no preço enviado pelo cliente) e cria a preferência de pagamento no Mercado Pago.
- `src/app/api/eventos/webhook/route.ts` — recebe a notificação de pagamento da MP e confirma o status
  direto na API deles (a fonte de verdade nunca é o payload do webhook em si).
- `src/app/eventos/[slug]/confirmacao/page.tsx` — página de retorno (aprovado / pendente / recusado).

Para ativar cobranças reais, defina `MERCADOPAGO_ACCESS_TOKEN` (veja `.env.example`) com uma credencial
gerada em [mercadopago.com.br/developers/panel/app](https://www.mercadopago.com.br/developers/panel/app) —
use a credencial de teste (`TEST-...`) para validar o fluxo ponta a ponta com os
[cartões de teste da MP](https://www.mercadopago.com.br/developers/pt/docs/checkout-api/additional-content/your-integrations/test/cards)
e troque para a de produção (`APP_USR-...`) quando for cobrar de verdade. Sem essa variável configurada,
o checkout responde 503 com uma mensagem clara, sem cobrar nada. Como o pedido ainda não é persistido em
banco (Supabase não provisionado neste ambiente), a confirmação depende do e-mail que o próprio Mercado
Pago envia ao comprador e do log do webhook — a persistência do pedido fica pronta para ligar assim que
o Supabase entrar, no mesmo padrão dos outros endpoints acima.

O leitor navegável do blueprint (gerado a partir de `docs/`) continua disponível em
[`/blueprint.html`](public/blueprint.html) — ver `tools/site/`.

## Premissa central

Não estamos construindo "mais um site de hotel fazenda". Estamos construindo uma **plataforma digital de hospitalidade** que vende **experiências**, não diárias. O objetivo é que o visitante **sinta que entrou fisicamente na Fazenda antes de concluir uma reserva** — e que a plataforma seja o principal ativo comercial e de marca do empreendimento.

Referências de patamar: **Aman Resorts, Six Senses, Explora Patagonia, Habitas, Airbnb Luxe, Apple, Porsche Experience, Tesla, JHSF.**

## Como navegar este blueprint

Leia na ordem. Cada capítulo assume o anterior. O [Índice comentado](docs/00-como-usar-este-blueprint.md) explica a lógica, o glossário e as convenções.

| # | Capítulo | Responsável primário |
|---|----------|----------------------|
| 00 | [Como usar este blueprint](docs/00-como-usar-este-blueprint.md) | Todos |
| 01 | [Visão Estratégica](docs/01-visao-estrategica.md) | CEO / CPO / Branding |
| 02 | [Arquitetura do Site](docs/02-arquitetura-do-site.md) | CPO / UX |
| 03 | [Scrollytelling da Home](docs/03-scrollytelling-home.md) | Creative Director / UX |
| 04 | [Motor de Reservas](docs/04-motor-de-reservas.md) | Booking / CTO |
| 05 | [Revenue Management](docs/05-revenue-management.md) | Revenue Manager |
| 06 | [Experiência das Acomodações](docs/06-acomodacoes.md) | UX / Creative |
| 07 | [Restaurante Dom Dina](docs/07-restaurante-dom-dina.md) | Gastronomia digital |
| 08 | [Passeios & Atividades](docs/08-passeios.md) | Produto |
| 09 | [Casamentos & Eventos Sociais](docs/09-casamentos.md) | Marketing de eventos |
| 10 | [Museu Expolago](docs/10-museu-expolago.md) | Creative / Cultura |
| 11 | [Área do Hóspede](docs/11-area-do-hospede.md) | Produto / CRM |
| 12 | [Backoffice](docs/12-backoffice.md) | CTO / Operação |
| 13 | [Arquitetura Técnica](docs/13-arquitetura-tecnica.md) | CTO |
| 14 | [Inteligência Artificial](docs/14-inteligencia-artificial.md) | Eng. de IA |
| 15 | [SEO](docs/15-seo.md) | SEO |
| 16 | [Analytics & Inteligência de Dados](docs/16-analytics.md) | Growth / BI |
| 17 | [Roadmap](docs/17-roadmap.md) | CPO |
| 18 | [Benchmark Mundial](docs/18-benchmark-mundial.md) | Creative / Produto |
| 19 | [O que NÃO fazer](docs/19-o-que-nao-fazer.md) | Todos |
| 20 | [Plano Diretor Consolidado](docs/20-plano-diretor.md) | CEO / CPO / CTO |

## Conselho autor

Este documento foi elaborado sob a ótica integrada de um conselho: CEO, CPO, CTO, Diretor de UX, Diretor Criativo, especialistas em hotelaria de luxo, revenue management, booking engine, SEO, CRO, acessibilidade, arquitetura de software, engenharia de IA, branding de destinos, gastronomia digital, marketing de casamentos, sistemas de reserva e performance web.

## Status

**Blueprint v1.0** (fundacional, documento vivo) + **implementação Fase 1/MVP em andamento** no
código de `src/`. Alterações ao blueprint via Pull Request com revisão do CPO.
