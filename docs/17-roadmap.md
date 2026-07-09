# Capítulo 17 — Roadmap

> Ambição sem sequência vira paralisia. Este roadmap ordena a construção por **valor entregue e risco reduzido**, não por "ordem de capítulo". Cada fase tem uma **tese** (o que ela prova/destrava), um escopo, critérios de "pronto" e as métricas que autorizam avançar. A regra: **cada fase precisa gerar receita ou aprendizado que financie a próxima.**

## 17.1 Filosofia de faseamento

- **Vender o mais cedo possível.** O motor de reservas direto (eliminar comissão OTA) é o item de maior ROI — não fica para "depois do site bonito".
- **Beleza e transação juntas no MVP, mas com profundidade progressiva.** O MVP já é premium (senão fere o posicionamento), mas nem todo espetáculo (3D, AR, 360° de tudo) entra de uma vez.
- **Dado próprio desde o dia 1** (CDP embrionário) — para não recomeçar do zero ao ligar CRM/IA.
- **Nada de big bang.** Releases incrementais atrás de feature flags; medir, aprender, seguir.

## 17.2 Fase 0 — Fundação & Descoberta (pré-MVP)

**Tese:** preparar o terreno para não retrabalhar.
- Design system e tokens de marca (cap. 01); direção de arte; **produção de conteúdo** (fotografia/vídeo profissional — o ativo mais crítico e de maior *lead time*; começar já).
- Arquitetura base (cap. 13): Next+Supabase, ambientes, CI/CD, orçamento de performance, i18n preparado (PT-BR ativo).
- Modelagem de dados (reservas, inventário, tarifas, conteúdo, CDP).
- Definições jurídicas: LGPD, termos, políticas de cancelamento.

**Entregável:** esqueleto técnico + design system + banco de conteúdo audiovisual.

## 17.3 Fase 1 — MVP: "A plataforma que vende" [MUST]

**Tese:** transportar (encantar) **e** vender direto, com margem, medindo tudo.

**Escopo:**
- **Home scrollytelling** (cap. 03) — versão imersiva + fallback estático/acessível. (3D pode ser 2D-cinemático no MVP; evoluir depois.)
- **Institucional:** A Fazenda, contato/como chegar.
- **Hospedagem:** hub (mapa aéreo com hotspots 2D), páginas de acomodação com galeria + vídeo (360° nas unidades principais).
- **Motor de Reservas próprio** (cap. 04): calendário, disponibilidade, holds atômicos, rate plans, cupons, guest checkout, **pagamento (Mercado Pago: Pix + parcelamento)**, confirmação por e-mail (Resend), add ao Google Calendar. Upsell básico de experiências no checkout.
- **Revenue Management v1** (cap. 05): regras determinísticas (temporada, dia, evento, ocupação, antecedência), floor/ceiling, calendário de tarifas e override no backoffice.
- **Restaurante Dom Dina:** página + **cardápio digital** + QR das mesas + reserva de mesa.
- **Experiências:** hub filtrável + páginas + reserva; **planejador de roteiro por regras**.
- **Casamentos:** landing premium + galeria + pacotes + **simulador de orçamento** + verificação de data + captura de lead (para CRM que virá).
- **Museu:** versão digital do acervo (catálogo + artistas + linha do tempo), sem AR.
- **Área do Hóspede v1:** conta pós-reserva, minhas reservas, vouchers, favoritos, pré-check-in.
- **Backoffice v1** (cap. 12): reservas, RM, cardápio, experiências, CMS, leads de casamento, usuários/papéis, auditoria.
- **SEO técnico completo + CWV** (cap. 15) e **Analytics** (cap. 16) desde o lançamento.
- **PWA básico** (instalável, voucher offline).

**Critérios de pronto:** zero overbooking sob concorrência; LCP<2,5s/INP<200ms/CLS<0,1 em campo; reserva direta ponta a ponta com pagamento real; backoffice operável pelo cliente sem dev; analytics medindo o funil e a receita.

**Métrica de sucesso:** primeiras reservas diretas; % direto vs. OTA; anexo de experiências; CWV verdes; NPS inicial.

## 17.4 Fase 2 — V2: "A plataforma que relaciona e escala canais" [SHOULD]

**Tese:** aumentar LTV, reduzir CAC e capturar o lead caro (casamento) com relacionamento.
- **CRM completo** (leads de casamento/eventos, funil, SLA de resposta, automações) + **contrato digital** + cronograma de pagamentos + **portal do casal**.
- **WhatsApp Business API** (notificações, leads, base do concierge).
- **Concierge Digital com IA (RAG + reservas)** (cap. 14).
- **Fidelidade** (tiers + benefícios) e **vouchers-presente** completos.
- **Channel Manager ↔ OTAs** (Booking/Airbnb/Expedia) com paridade e estratégia de canal (cap. 05) — usar OTA como aquisição, migrar para direto.
- **Automação de marketing** (pré-estadia, remarketing de favoritos, coortes) + newsletter.
- **Eventos/agenda** (São João, FIG, festival gastronômico) com landings e ingressos.
- **RM v2:** pace/pickup, alertas, mais granularidade; **EN** ligado (casamentos-destino/internacional).
- **Experiências do chef** e eventos gastronômicos completos; **integração PMS/PDV** iniciada.
- Busca semântica; assistente de conteúdo interno; triagem de leads por IA.

**Métrica de sucesso:** repeat guest rate e LTV subindo; conversão de lead de casamento; % direto crescendo; CAC caindo via orgânico/CRM.

## 17.5 Fase 3 — V3: "A plataforma imersiva e inteligente" [COULD]

**Tese:** aprofundar diferenciação sensorial e inteligência de receita.
- **Mapa 3D interativo** da propriedade (React Three Fiber) como hub espacial; **tours 360°** ampliados.
- **RM assistido por ML** (recomendação revisável) + **previsão de demanda**.
- **Planejador de roteiro com IA** conversacional; **personalização** (com consentimento).
- **Museu:** experiências imersivas / **AR** (se o acervo justificar).
- **BI avançado**, análise de reviews/NPS por IA, coortes profundas.
- Concierge no local (integração operacional), pedido pela mesa no restaurante.

**Métrica de sucesso:** TRevPAR e RevPAR otimizados por RM inteligente; engajamento imersivo; eficiência operacional.

## 17.6 Fase 4 — Enterprise: "O ecossistema" [visão]

**Tese:** o digital como principal ativo comercial, replicável e integrado.
- **App nativo** (só se o volume de recorrentes justificar — cap. 11/19).
- **Multipropriedade / marca** (se o grupo expandir): arquitetura multi-tenant.
- Integrações profundas (ERP, contabilidade, RH operacional), data warehouse, ML proprietário de receita.
- Programa de parceiros/fornecedores como marketplace; APIs para parceiros.
- Sustentabilidade digital e certificações; relatórios ESG.

## 17.7 Priorização — matriz resumida (MoSCoW por capacidade)

| Capacidade | MVP | V2 | V3 | Ent. |
|-----------|:---:|:--:|:--:|:----:|
| Home scrollytelling | ● (2D-cine) | ↑ | ↑ (3D) | |
| Motor de reservas direto | ● | ↑ | | |
| Revenue Management | ● (regras) | ↑ (pace) | ↑ (ML) | |
| Restaurante + cardápio + QR | ● | ↑ | ↑ (pedido) | |
| Experiências + planejador | ● (regras) | | ↑ (IA) | |
| Casamentos: landing+simulador+lead | ● | ↑ (CRM+portal) | | |
| Museu digital | ● | | ↑ (AR) | |
| Área do hóspede | ● (v1) | ↑ (fidelidade/concierge) | ↑ (personalização) | |
| Backoffice | ● | ↑ | ↑ | ↑ |
| SEO + CWV + Analytics | ● | ↑ | ↑ (BI) | ↑ (DW) |
| PWA | ● | ↑ | | ○ (app nativo) |
| IA (concierge/RAG) | | ● | ↑ | ↑ |
| OTAs / Channel Manager | | ● | | |
| WhatsApp / automação mkt | | ● | ↑ | |

● entra · ↑ evolui · ○ condicional

## 17.8 Riscos e mitigação

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Conteúdo audiovisual atrasa | Alto (é o produto) | Começar produção na Fase 0; roteiro de captação por cap. 03/06/07/09 |
| Overbooking | Crítico | Holds atômicos + testes de carga (cap. 04) antes do go-live |
| Cliente não opera o backoffice | Alto | UX de backoffice + treinamento + preview/undo (cap. 12) |
| Performance sacrificada pela beleza | Alto (SEO+conversão) | Orçamento de CWV no CI (cap. 15); espetáculo como enhancement |
| Escopo inflado no MVP | Médio | MoSCoW disciplinado; feature flags; cortar 3D/AR do MVP |
| Dependência de OTA persistir | Médio (margem) | Estratégia de canal direto + valor exclusivo (cap. 05) |

Seguir para o **[Capítulo 18 — Benchmark Mundial](18-benchmark-mundial.md)**.
