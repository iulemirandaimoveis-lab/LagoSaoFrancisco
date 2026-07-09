# Capítulo 20 — Plano Diretor Consolidado

> Documento oficial de referência. Se alguém só puder ler uma página deste blueprint, é esta. Ela consolida a tese, as decisões e as regras de governança que mantêm a consistência estratégica, estética e arquitetural ao longo dos anos. É o contrato entre produto, design, engenharia, marketing, revenue e gestão.

## 20.1 A tese em uma frase

**Não vendemos hospedagem — vendemos a experiência Lago São Francisco.** A plataforma existe para fazer o visitante **sentir que já entrou na Fazenda** antes de reservar, e para transformar esse desejo em receita direta, de alta margem, medida e recorrente. O ativo digital é o **principal canal comercial e de marca** do empreendimento, e ele une a **alma da Aman** (contenção, emoção, natureza, cultura) com a **máquina da Airbnb** (reserva sem fricção, dado próprio, escala).

## 20.2 Os dez mandamentos do produto (princípios inegociáveis)

1. **Experiência acima de comodidade.** Cada tela vende um sentimento, não uma lista.
2. **Concreto, nunca genérico.** O Agreste frio, a névoa, o lago, Dom Dina, o museu — sempre específico.
3. **Beleza que não trava.** CWV verdes são pré-requisito, não trade-off. O espetáculo é *enhancement*.
4. **Reserva direta é sagrada.** BE próprio, guest checkout, transparência, zero overbooking, Pix+parcelamento.
5. **O preço é vivo.** RM em camadas, com floor/ceiling e trilho humano.
6. **O dado é nosso.** CDP desde o dia 1; nada de entregar o hóspede à OTA.
7. **Acessível por princípio.** WCAG 2.2 AA como piso; reduced-motion e alternativas sempre.
8. **O cliente opera tudo.** Backoffice de nível de produto; dev nunca é gargalo da operação.
9. **IA com valor real ou não entra.** Assiste, não enfeita; degrada com segurança.
10. **Consistência é lei.** Fora deste documento, a decisão não existe; contra ele, precisa de PR aprovado.

## 20.3 Decisões arquiteturais consolidadas (o "ADR-0")

| Domínio | Decisão | Racional-síntese |
|---------|---------|------------------|
| Frontend | **Next.js (App Router) + TS + Tailwind + Radix** | Render híbrido (SSG/ISR + SSR) une SEO e transação; acessível e rápido |
| Movimento | **GSAP+ScrollTrigger, Framer Motion, Lenis, R3F sob demanda** | Cinema com performance; 3D só onde interação paga |
| Backend/BD | **Supabase (Postgres, Auth, Storage, Realtime, RLS, pgvector)** | ACID para reservas, sem lock-in, acelera MVP; base para IA |
| Arquitetura | **Monolito modular por domínio; extrair serviço só sob escala** | Evita complexidade prematura |
| Mídia | **Cloudflare R2 + CDN + next/image + HLS** | Egress zero para site pesado em vídeo |
| Pagamento | **Mercado Pago (Pix+parcelamento), gateway-agnóstico p/ Stripe** | Público brasileiro; internacional depois |
| E-mail | **Resend** | Transacional confiável |
| Hosting | **Vercel** (reavaliar Cloudflare em escala) | Edge, ISR, DX, preview por PR |
| Analytics | **GA4 + Meta CAPI + Clarity via GTM server-side + BD próprio** | Comportamento + receita real + privacidade |
| IA | **RAG sobre pgvector + LLM via adaptador + function calling** | Ancorado no conteúdo real, sem alucinar, executa ações reais |
| Reserva (integridade) | **Holds atômicos no Postgres; webhook como fonte de verdade** | Zero overbooking; pagamento confiável |

## 20.4 North Star e KPIs de governança

- **North Star:** **Receita por visitante da plataforma** (hospedagem + F&B + experiências + eventos).
- **Painel de gestão mensal:** ADR, RevPAR, **TRevPAR**, % receita direta (crescente), anexo de experiências (≥30%), LTV, CAC, LTV:CAC (≥3:1), NPS, repeat guest rate, CWV de campo, conversão do funil.
- **Regra de decisão:** avançar de fase do roadmap só com os critérios de "pronto" e as métricas da fase anterior atingidos (cap. 17).

## 20.5 A jornada emocional como bússola de UX (resumo)

Encantamento → Projeção → Confiança → Desejo → Facilitação → Pertencimento → Saudade/Retorno (cap. 01.8). Toda página deve saber **em que etapa** o usuário está e conduzir à próxima. Home encanta; acomodações/experiências projetam; prova social dá confiança; RM+disponibilidade criam desejo saudável; o BE facilita; a área do hóspede/concierge geram pertencimento; pós-estadia e fidelidade trazem de volta.

## 20.6 Mapa de leitura por equipe

- **Gestão/CEO:** 01, 05, 16, 17, 20.
- **Produto/CPO:** todos; foco 02, 04, 11, 17.
- **Design (UX+Criação):** 01, 02, 03, 06–10, 18, 19.
- **Engenharia/CTO:** 04, 05, 11, 12, 13, 14; regras de aceite em 04.10 e 17.8.
- **Marketing/Growth:** 01, 09, 15, 16, 18.
- **Revenue:** 05, 12, 16.

## 20.7 Definição de "pronto" da plataforma (visão MVP → norte)

Uma release está pronta quando, para o escopo da fase (cap. 17): (a) reforça o posicionamento; (b) não parece template/IA; (c) converte **e** encanta; (d) é acessível (AA), rápida (CWV verdes) e indexável; (e) o cliente a opera sem dev; (f) é observável e medida; (g) passa nos testes de integridade (sem overbooking, pagamento via webhook, RLS correta). — O "teste final" do cap. 19.8.

## 20.8 Governança do documento

- **Fonte única de verdade.** Alterações por **Pull Request** com aprovação do **CPO** (e do **CTO** para os caps. 13/14). Cada decisão grande vira/atualiza um ADR.
- **Documento vivo, versionado.** Revisão a cada fim de fase do roadmap; changelog no topo do README.
- **Tokens de marca e regras técnicas** referenciados por nome, nunca duplicados/hardcodados.
- **Este é o ADR-0.** Todo o resto herda dele.

## 20.9 Sequência de arranque recomendada (primeiros passos concretos)

1. Aprovar posicionamento e tokens de marca (cap. 01) — trava a identidade.
2. **Iniciar produção audiovisual** (maior lead time; é o produto) segundo os roteiros dos caps. 03/06/07/09/10.
3. Montar a fundação técnica (cap. 13): repositório, Next+Supabase, CI/CD, orçamento de CWV, modelagem de dados de reserva/RM/CDP.
4. Construir o **motor de reservas + RM v1 + backoffice v1** em paralelo à Home — porque é onde a receita direta nasce (cap. 04/05/12).
5. Ligar analytics e SEO técnico **antes** do go-live (cap. 15/16).
6. Lançar MVP atrás de feature flags, medir, iterar; então V2 (relacionamento, IA, OTAs) e V3 (imersão, ML).

## 20.10 Palavra final

A Fazenda Lago São Francisco tem, num só lugar, o que os grandes destinos do mundo têm separadamente: **natureza de altitude, água, gastronomia autoral, arte, espiritualidade, celebração e cultura**. Nenhum concorrente do Agreste — e pouquíssimos do Brasil — reúne isso. A plataforma digital é a moldura à altura desse conteúdo: um produto que **transporta antes de vender**, **vende sem fricção**, **cuida depois de vender** e **aprende com cada hóspede** para cuidar melhor da próxima vez.

O inimigo é a mediocridade genérica. O compromisso é a excelência específica. Este documento é o mapa. **Agora, construamos.**

---

Voltar ao **[Índice](00-como-usar-este-blueprint.md)** · **[README](../README.md)**.
