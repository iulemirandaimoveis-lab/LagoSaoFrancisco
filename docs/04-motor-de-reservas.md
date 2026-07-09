# Capítulo 04 — Motor de Reservas (Booking Engine Proprietário)

> Esta é a peça mais crítica do sistema: onde o desejo vira receita. Um Booking Engine (BE) próprio, no nível de Booking/Airbnb/Expedia em usabilidade, mas com **estética de marca** e **zero comissão de OTA**. Cada ponto percentual de conversão aqui é dinheiro direto no caixa.

## 4.1 Por que motor próprio (decisão fundamental)

**Alternativas consideradas:**

| Opção | Custo | Controle de UX | Comissão | Dados do hóspede | Veredito |
|-------|-------|----------------|----------|------------------|----------|
| Widget de terceiro (ex.: motor "de prateleira") | Baixo | Baixo (iframe feio, fora da marca) | Média | Fica com o fornecedor | ❌ mata a experiência |
| Só OTAs (Booking/Airbnb) | Zero dev | Nenhum | **15–25%** | Não temos | ❌ commodity + margem sangrando |
| **BE proprietário** | Alto dev | **Total** | **0%** direto | **Nosso (CDP)** | ✅ escolhido |

**Justificativa (T):** integração nativa com o design system, com o RM (cap. 05) e com a área do hóspede; controle total de performance e do funil. **(E):** os dados de reserva são o ativo estratégico — alimentam CRM, RM e IA; num widget de terceiro esse ativo escapa. **(C):** eliminar 15–25% de comissão de OTA em reserva direta transforma a margem; o BE se paga rápido. OTAs continuam existindo como **canal de aquisição** (topo de funil), mas a estratégia é **migrar receita para o direto** via experiência superior e paridade/vantagem tarifária no canal próprio.

## 4.2 Anatomia do fluxo de reserva

```
[1 Busca]  datas + hóspedes + (destino da experiência)
   ↓  consulta disponibilidade + RM em tempo real
[2 Resultados]  acomodações disponíveis, preço dinâmico já calculado, ordenadas por relevância
   ↓
[3 Detalhe/seleção]  escolhe unidade, vê política, opcionais
   ↓
[4 Upsell]  experiências, F&B (jantar do chef), transfer, early check-in — anexo de receita
   ↓
[5 Dados do hóspede]  identificação (login/guest checkout), dados, pedidos especiais
   ↓
[6 Pagamento]  Stripe/Mercado Pago — cartão, Pix, parcelamento
   ↓
[7 Confirmação]  voucher, e-mail (Resend), add ao Google Calendar, cria conta, inicia pré-estadia
```

**Princípio CRO:** o menor número de passos possível **sem** esconder informação que gera confiança. Barra de progresso visível. Preço total sempre transparente (nada de surpresa no fim — a "taxa surpresa" é a principal causa de abandono). *Guest checkout* permitido (obrigar cadastro antes de pagar derruba conversão); a conta é oferecida **após** o pagamento, quando o cadastro é benefício, não barreira.

## 4.3 Calendário e disponibilidade

**Requisitos do calendário (padrão Airbnb/Booking, estética própria):**
- Dois meses visíveis no desktop, um no mobile com scroll.
- **Preço por diária renderizado em cada célula** (transparência que vende) — vindo do RM.
- Dias indisponíveis desabilitados visualmente (não somem — o usuário entende a escassez).
- **Mínimo de noites** por período (ex.: 2 no fim de semana, 3+ em feriados/São João) validado ao selecionar.
- Seleção de intervalo com feedback: ao escolher check-in, o calendário destaca o range e recalcula preço total instantaneamente.
- **Fechamento à chegada/partida** (CTA/CTD) — regras de RM podem bloquear chegada em certos dias.
- Timezone e "hoje" corretos (America/Recife).

**Motor de disponibilidade (lógica):**
- Fonte da verdade: tabela de inventário por **tipo de unidade** e por **noite** (ver modelo de dados abaixo). Disponibilidade = unidades do tipo − reservas confirmadas − bloqueios (manutenção/RM) − holds temporários.
- **Holds/locks:** ao entrar no checkout, cria-se um *hold* com expiração (ex.: 10 min) para evitar overbooking em concorrência. Implementado com transação atômica no Postgres (`SELECT ... FOR UPDATE` ou constraint de exclusão) — **overbooking é inaceitável** e é falha de integridade, não de UX.
- **Consistência com OTAs:** quando entrarem (V2+), um **Channel Manager** sincroniza inventário; o BE nunca vende a última unidade em dois canais.

## 4.4 Tarifas, promoções e regras

O BE **não decide preço** — ele consome o resultado do RM (cap. 05). Mas o BE modela:

- **Planos tarifários (rate plans):** ex.: *Flexível* (cancelamento até 7 dias, preço cheio), *Não-reembolsável* (−10–15%, sem cancelamento), *Café incluso*, *Meia pensão Dom Dina*, *Pacote romance*. Cada plano tem regras de cancelamento, pagamento e inclusões.
- **Promoções:** *early booking* (−10% para reserva antecipada), *last minute*, *estadia longa* (−X% a partir de N noites), *pacotes* (hospedagem + experiências + jantar com preço fechado).
- **Cupons:** código com regras — % ou valor fixo, validade, teto de uso, restrição por plano/período, primeira-compra, fidelidade. Validação server-side (nunca confiar no cliente).
- **Regras de estadia:** mínimo/máximo de noites, CTA/CTD, antecedência mínima/máxima, ocupação máxima por unidade, política de crianças (idade define se conta como hóspede/cobra).

## 4.5 Hóspedes, upgrades e opcionais

- **Composição de hóspedes:** adultos, crianças (com faixas etárias configuráveis — impacta preço e capacidade), pets (se permitido, com taxa). A capacidade por unidade valida a seleção.
- **Upgrades:** oferta contextual de categoria superior com o *delta* de preço claro ("por +R$120/noite, a Suíte Master com vista total").
- **Upsell / add-ons (motor de anexo — chave de TRevPAR):** jantar-degustação do chef, café da manhã na varanda, passeios (caiaque, tirolesa), transfer do aeroporto/rodoviária, early check-in / late check-out, decoração romântica, kit comemorativo. Cada add-on tem estoque/capacidade e horário. Este passo é onde a tese "vender experiências" se materializa em receita incremental — meta de anexo ≥ 30% das reservas.

## 4.6 Pagamentos

**Gateways:** **Stripe** e/ou **Mercado Pago** — decisão pelo mix de métodos e taxas no Brasil.

| Critério | Stripe | Mercado Pago |
|----------|--------|--------------|
| Pix | Sim | Sim (forte, nativo, alta adesão local) |
| Cartão + parcelamento | Sim | Sim (parcelamento é cultural no Brasil — essencial) |
| UX de API/dev | Excelente | Boa |
| Antifraude | Radar (forte) | Bom |
| Recorrência/marketplace | Excelente | Bom |

**Decisão:** iniciar com **Mercado Pago** pela força de **Pix e parcelamento** no público brasileiro (parcelar em 6–12x é decisivo em ticket alto), com arquitetura de **gateway-agnóstica** (camada de abstração de pagamento) para plugar Stripe quando houver público internacional (casamentos-destino). **(C):** parcelamento aumenta conversão em ticket alto; Pix reduz custo de transação e chargeback.

**Modelos de cobrança:**
- **Pré-pagamento total** (não-reembolsável, com desconto) ou **sinal/depósito** (ex.: 30% na reserva, saldo no check-in) para flexível.
- **Reservas de casamento/evento:** fluxo de proposta → contrato → cronograma de pagamentos (entrada + parcelas), fora do checkout instantâneo.
- **Segurança:** **PCI-DSS via tokenização do gateway** — o cartão **nunca** toca nossos servidores (usar elementos hospedados/checkout do gateway). 3DS2/SCA quando aplicável. Webhooks assinados para confirmar pagamento (nunca confiar no retorno do cliente).

## 4.7 Check-in / check-out digital

- **Pré-check-in online:** dados dos hóspedes, documento, horário estimado de chegada, pedidos especiais — enviado dias antes (reduz fila na recepção e enriquece o CDP).
- **Check-out digital:** revisão de consumo (folio: F&B, passeios), pagamento de extras, avaliação/NPS na saída, oferta de próxima estadia.
- Integração com PMS (cap. 12/13) para refletir na operação física.

## 4.8 Ciclo de vida da reserva (máquina de estados)

```
PENDENTE_PAGAMENTO → CONFIRMADA → (PRE_CHECKIN) → EM_ESTADIA → CONCLUIDA
        │                │
        └─ EXPIRADA      ├─ CANCELADA_HOSPEDE (aplica política de reembolso)
                         ├─ CANCELADA_CASA (força maior → reembolso/realocação)
                         └─ MODIFICADA (recalcula RM/disponibilidade)
        NO_SHOW (não compareceu → política)
```
Cada transição gera **evento** (analytics + e-mail transacional + atualização de inventário) e é **auditável** (quem/quando/porquê). Reembolsos e modificações recalculam disponibilidade e liberam inventário.

## 4.9 Modelo de dados (essencial)

```
unidade_tipo (id, nome, capacidade, descrição, slug)
unidade (id, unidade_tipo_id, código, andar/localização, status)
inventario_noite (unidade_tipo_id, data, total, bloqueado)  ← disponibilidade
rate_plan (id, nome, regras_json, política_cancelamento_id)
tarifa (unidade_tipo_id, rate_plan_id, data, preço)         ← preenchida pelo RM
reserva (id, código, status, hóspede_id, checkin, checkout, adultos, crianças[], rate_plan_id, total, moeda)
reserva_item (reserva_id, tipo[quarto|addon|experiencia|fnb], ref_id, qtd, preço_unit, data)
hold (id, unidade_tipo_id, range, expira_em, sessão_id)     ← lock de concorrência
pagamento (id, reserva_id, gateway, status, valor, método, tx_id, webhook_verificado)
cupom (código, tipo, valor, regras_json, usos, validade)
hospede (id, nome, email, doc, telefone, ...)               ← liga ao CDP/conta
```

## 4.10 Regras de negócio críticas (checklist de aceite)

- [ ] Impossível overbooking sob concorrência (teste de carga com reservas simultâneas na última unidade).
- [ ] Preço mostrado = preço cobrado (RM travado no *hold*; mudança de tarifa não afeta reserva em andamento).
- [ ] Total transparente antes do pagamento (impostos/taxas incluídos).
- [ ] Reserva sem login funciona (guest checkout).
- [ ] Falha de pagamento não consome inventário (hold expira e libera).
- [ ] Webhook de pagamento é a fonte de verdade da confirmação (idempotente).
- [ ] Cancelamento aplica política correta e reembolsa via gateway.
- [ ] Tudo auditável e observável (logs/eventos).

## 4.11 Acessibilidade e mobile do BE

- Calendário 100% operável por teclado e leitor de tela (datas anunciadas, estados claros).
- Mobile: teclado numérico para dados, seletor de datas otimizado, botão de ação fixo e polegar-amigável.
- Formulários com validação inline clara, mensagens de erro específicas, `autocomplete` correto — cada campo a mais custa conversão.

Seguir para o **[Capítulo 05 — Revenue Management](05-revenue-management.md)**.
