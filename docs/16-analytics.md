# Capítulo 16 — Analytics & Inteligência de Dados

> "Não se gerencia o que não se mede" — mas o erro comum é medir **tudo** e entender **nada**. Esta camada é desenhada de trás para frente: partimos das **decisões de negócio** que precisamos tomar e só então definimos os eventos. O objetivo final é ligar cada real de marketing a cada real de receita — e provar a tese central (vender experiências, não diárias) com números.

## 16.1 Princípios

1. **Do KPI ao evento, nunca o contrário.** Cada evento existe para responder a uma pergunta de negócio.
2. **Uma camada de eventos única (data layer)** alimenta todas as ferramentas — não instrumentar cada ferramenta separadamente (fonte de inconsistência).
3. **Privacidade por padrão (LGPD):** consentimento (banner de cookies com opt-in real), anonimização de IP, respeito ao Consent Mode. Analytics não pode virar passivo jurídico.
4. **Server-side onde importa:** conversões e receita medidas **no servidor** (a partir do webhook de pagamento — fonte de verdade), não só no cliente (que perde eventos por ad-blocker/consentimento). Isso torna o dado de receita confiável.

## 16.2 Stack e papel de cada ferramenta

| Ferramenta | Papel | Por quê |
|------------|-------|---------|
| **GA4** | Comportamento, funil, aquisição, atribuição | Padrão de mercado, integra Google Ads/Search |
| **Meta Pixel + Conversions API** | Atribuição e otimização de campanhas Meta | Público de casamento/lazer vive no Instagram; CAPI recupera conversões perdidas |
| **Microsoft Clarity** | Heatmaps, gravações de sessão, rage clicks | Qualitativo, gratuito, revela fricção de UX/CRO |
| **Data layer próprio → BD/BI** | Receita real, LTV, CAC, coorte | GA4 não conhece margem/LTV; nosso BD sim (cap. 12/13) |
| **Google Tag Manager (server-side)** | Orquestração de tags | Controle, performance (menos JS no cliente), privacidade |

**Arquitetura:** eventos → **GTM server-side** → distribui para GA4/Meta/Clarity + grava no nosso BD. Tags de terceiro **fora da thread principal** (cap. 15.5) — performance protegida.

## 16.3 O funil medido (macro)

```
Visitante → Engajado (passou do hero, viu ≥N seções) → Interessado (viu acomodação/experiência)
   → Intenção (abriu motor de reserva / usou calendário) → Iniciou checkout
   → Adicionou upsell → Pagamento iniciado → RESERVA CONFIRMADA → Pós (retorno/indicação)
```
Cada etapa é um evento; a queda entre etapas revela onde investir (CRO). Funis paralelos para **restaurante** (mesa), **experiências** (day-use), **casamentos** (lead) e **vouchers**.

## 16.4 Eventos-chave (data layer)

Nomenclatura consistente (`snake_case`, sem PII no evento):
- **Descoberta/engajamento:** `home_scroll_depth`, `video_hero_play`, `section_view`, `accommodation_view`, `experience_view`, `menu_item_view`, `artwork_view`, `tour_360_open`.
- **Reserva (hospedagem):** `search_availability`, `date_selected`, `rate_plan_view`, `add_upsell` (com item/valor), `begin_checkout`, `add_payment_info`, `purchase` (com valor, itens, canal) — e-commerce completo GA4.
- **Restaurante:** `table_reservation_start`, `table_reservation_confirm`, `chef_experience_view`, `qr_menu_open` (com `?src=mesa`).
- **Experiências:** `experience_booking_start/confirm`, `itinerary_planner_used`, `itinerary_booked`.
- **Casamentos (lead):** `wedding_view`, `budget_simulator_start`, `budget_simulator_complete` (faixa, convidados, data), `wedding_lead_submit`, `wedding_visit_scheduled`.
- **Relacionamento:** `account_created`, `login`, `wishlist_add`, `loyalty_join`, `concierge_message`, `voucher_purchase`, `pre_checkin_complete`, `nps_submit`.
- **Marca/conteúdo:** `blog_read`, `newsletter_signup`.

Cada evento de conversão carrega **valor monetário** e **canal/origem** para atribuição e cálculo de ROI.

## 16.5 KPIs de negócio (o painel do CEO)

**Receita (a tese):**
- **North Star: Receita por visitante da plataforma** (hospedagem + F&B + experiências + eventos ÷ visitantes) — cap. 01.
- ADR, RevPAR, **TRevPAR** (prova que vendemos experiências), receita por linha de negócio, receita por canal (direto vs. OTA vs. pago).
- **Taxa de anexo de experiências** por reserva (meta ≥ 30%, cap. 04).

**Aquisição & eficiência:**
- **CAC** por canal, **LTV** (por coorte), **razão LTV:CAC** (meta saudável ≥ 3:1), payback de CAC.
- % de reserva **direta** (meta crescente — reduz comissão OTA).
- ROAS de campanhas (com CAPI para atribuição real).

**Conversão (CRO):**
- Conversão por funil e por dispositivo, taxa de abandono de checkout, taxa de uso do simulador de casamento e conversão de lead, no-show.

**Relacionamento:**
- **NPS**, repeat guest rate, adesão à fidelidade, taxa de indicação, uso do concierge, deliverability e engajamento de e-mail (pré-estadia).

## 16.6 CRO — o loop de otimização

Analytics sem ação é vaidade. Ritual:
1. **Clarity/heatmaps** revelam fricção qualitativa (onde travam, rage clicks).
2. **Funil GA4** quantifica onde caem.
3. **Hipótese** → **teste A/B** (ex.: ordem dos passos do checkout, copy do CTA, exibir preço no calendário, posição do upsell). Ferramenta de experimentação (server-side/edge, sem flicker) ligada às feature flags (cap. 13).
4. **Medir impacto na receita** (não só no clique) → adotar ou reverter.
Priorizar testes por impacto no funil de maior valor (reserva e lead de casamento).

## 16.7 Atribuição

- Modelo **data-driven** (GA4) + visão de **primeiro/último toque** para entender papel de cada canal (SEO descobre, remarketing fecha).
- UTMs padronizados e governados (tabela de convenção) — sem isso, a atribuição vira lixo.
- **Reconciliação com receita real** do BD: a verdade financeira vem do pagamento confirmado, não do pixel.

## 16.8 Governança de dados & LGPD

- **Consent Mode v2**: sem consentimento, medição *cookieless* modelada; com consentimento, completa.
- Documentar cada dado coletado, base legal, retenção. Direito de acesso/exclusão. DPA com GA4/Meta/Clarity.
- PII **nunca** em eventos de analytics (usar IDs pseudonimizados); PII fica no BD seguro (CDP, cap. 11).

## 16.9 Relatórios e cadência

- **Diário (operação):** chegadas, ocupação, reservas do dia.
- **Semanal (comercial/marketing):** funil, CAC, campanhas, leads de casamento, pace.
- **Mensal (gestão):** North Star, RevPAR/TRevPAR, LTV:CAC, canal, NPS, coortes.
- **Trimestral (estratégia):** revisão de metas do roadmap (cap. 17), decisões de investimento.
Dashboards no backoffice (cap. 12) + BI (ex.: Metabase/Looker Studio sobre o Postgres) para exploração.

Seguir para o **[Capítulo 17 — Roadmap](17-roadmap.md)**.
