# Capítulo 05 — Revenue Management (Precificação Dinâmica)

> O preço nunca é fixo. É a variável que, bem gerenciada, extrai o máximo de receita de um inventário perecível (uma noite não vendida não volta). Este é o cérebro comercial que alimenta o Booking Engine. A meta não é "cobrar mais", é **cobrar o preço certo, para a demanda certa, no momento certo** — maximizando RevPAR sem destruir percepção de valor.

## 5.1 Conceitos e métricas (linguagem comum)

| Métrica | Fórmula | O que diz |
|---------|---------|-----------|
| **ADR** (Average Daily Rate) | Receita de quartos ÷ quartos vendidos | Preço médio praticado |
| **Ocupação** | Quartos vendidos ÷ quartos disponíveis | Quão cheio |
| **RevPAR** | Receita de quartos ÷ quartos disponíveis (= ADR × Ocupação) | **A métrica-rainha da hotelaria** |
| **TRevPAR** | Receita **total** (quartos + F&B + experiências + eventos) ÷ quartos disp. | Captura a tese "vender experiências" |
| **Booking window / lead time** | Antecedência média da reserva | Alimenta regras de antecipação |
| **Pace** | Ritmo de reservas para uma data futura vs. histórico | Sinal de demanda para ajustar preço |
| **Pickup** | Reservas novas num período | Curto prazo |

**Princípio central:** otimizamos **RevPAR e TRevPAR**, não ocupação isolada. Encher a 100% com preço baixo pode render menos que 75% com preço certo — e ainda degrada a marca. Luxo não faz *fire sale*.

## 5.2 Modelo de precificação em camadas

O preço final de uma noite é composto por camadas aplicadas em ordem, sobre um **preço-base (BAR — Best Available Rate)** por tipo de unidade:

```
Preço = BASE(tipo)
      × fator_temporada        (calendário sazonal)
      × fator_dia_semana       (fim de semana vs. meio de semana)
      × fator_evento           (São João, FIG, Natal, feriados)
      × fator_ocupação         (demanda em tempo real)
      × fator_antecedência     (early / last-minute)
      + ajustes_de_regra       (últimas unidades, estadia mínima)
      − descontos              (promoções, cupons, fidelidade)
   [respeitando FLOOR e CEILING por tipo]
```

**Piso e teto (floor/ceiling)** por tipo de unidade são inegociáveis: o piso protege a marca (nunca abaixo de X — luxo não se vende como pousada); o teto evita preço absurdo que gera reclamação e má reputação. Toda regra automática opera **dentro** dessa faixa.

## 5.3 As alavancas, com o exemplo do cliente evoluído

O ponto de partida do cliente (Baixa R$290, FDS R$390, São João R$790, Natal R$990, feriado +20%, ocupação>80% +15%, últimas unidades +25%, antecipada −10%) é bom — mas aplicado ingenuamente esses fatores **se multiplicam e explodem ou se anulam**. Refinamento:

### 5.3.1 Sazonalidade (calendário base)
Definir **estações** por período do ano, específicas de Garanhuns:
- **Alta:** julho (inverno/FIG — Garanhuns é destino de inverno!), dezembro–janeiro (férias/festas), julho é o pico climático.
- **Média:** feriados prolongados, meses de clima ameno.
- **Baixa:** meses de menor demanda regional.
> **Insight estratégico:** diferentemente de destino de praia, o **inverno é a alta temporada** aqui (clima frio + FIG). Isso é ouro de RM e de marketing — vendemos "o frio" como premium quando o resto do NE está quente demais.

### 5.3.2 Dia da semana
Fim de semana (sex–sáb) e véspera de feriado têm demanda de lazer alta → prêmio. Meio de semana é o desafio → alvo de **pacotes, corporativo/retiros e ofertas de estadia longa** para preencher (não baixar o BAR cegamente, mas criar valor).

### 5.3.3 Eventos (o maior multiplicador)
- **São João / festas juninas:** pico regional — mínimo de noites elevado, tarifa premium, CTA/CTD para maximizar ocupação de bloco.
- **FIG (Festival de Inverno de Garanhuns):** demanda cultural — pacote "hospedagem + agenda cultural".
- **Natal/Réveillon:** ceia Dom Dina como pacote.
- **Eventos próprios** (festival gastronômico, casamentos que bloqueiam a fazenda): calendário de eventos alimenta o RM automaticamente.

### 5.3.4 Ocupação em tempo real (yield)
Faixas em vez de degrau único (evita salto abrupto que assusta):
| Ocupação da data | Ajuste |
|------------------|--------|
| < 40% | −0 a −5% (estímulo suave, dentro do piso) |
| 40–70% | preço-base |
| 70–85% | +10% |
| 85–95% | +18% |
| > 95% (últimas unidades) | +25% |

### 5.3.5 Antecedência (booking window)
- **Early booking** (> 60–90 dias): −10% (garante base de ocupação e fluxo de caixa).
- **Janela normal:** base.
- **Last-minute** (< 7 dias): depende da ocupação — se baixa, desconto para preencher; se alta, prêmio (demanda de impulso). O RM **combina** antecedência com ocupação, não aplica isolado.

### 5.3.6 Comprimento de estadia (LOS)
Descontos progressivos por noites extras (ex.: 5+ noites −8%) — aumentam RevPAR total e reduzem custo operacional de turnover (limpeza/check-in).

## 5.4 Governança: automático com trilho humano

**Nem 100% manual (não escala, erra timing) nem 100% caixa-preta (arrisca a marca).** Modelo híbrido:
- **Regras determinísticas** (as camadas acima) rodam automaticamente e sugerem/aplicam preço.
- **Guardrails:** floor/ceiling, limite de variação diária (ex.: preço não muda mais que ±X%/dia para não confundir quem revisita), e alertas.
- **Override humano:** o revenue manager pode fixar preço/fechar datas/criar exceção pelo backoffice — sempre auditado.
- **Evolução (V3):** camada preditiva de ML sobre pace/pickup e dados externos (eventos da cidade, clima, voos) recomendando ajustes — mas **sempre como recomendação revisável**, nunca autônoma sem trilho. IA em RM é assistente, não piloto automático (cap. 14/19).

## 5.5 Paridade de canal e estratégia de canal

- **Reserva direta é sempre a melhor oferta** (ou tão boa quanto a OTA) — a paridade pública mantida, mas o **valor agregado exclusivo do direto** (upgrade grátis, early check-in, welcome do chef, cancelamento mais flexível) desloca a preferência sem quebrar contrato de paridade da OTA.
- OTAs (V2+) recebem tarifa via Channel Manager; o custo de comissão é **embutido conscientemente** na tarifa da OTA, não subsidiado.
- **Meta comercial:** aumentar a fração de receita direta ano a ano.

## 5.6 Painel administrativo de RM (o que o cliente enxerga — detalhe no cap. 12)

- **Calendário de tarifas:** visão de 12 meses, preço e ocupação por dia, com cores de "saúde" (verde/amarelo/vermelho por pace).
- **Editor de regras:** criar/editar temporadas, eventos, fatores, floor/ceiling — sem depender de dev.
- **Simulador:** "se eu aplicar isso, o preço de tal data fica X" antes de publicar.
- **Bloqueios:** fechar unidades/datas (manutenção, evento privado).
- **Dashboards:** ADR, RevPAR, TRevPAR, ocupação, pace vs. ano anterior, receita por canal, anexo de experiências. KPIs em cap. 16.
- **Alertas:** "data X a 30 dias com pace 40% abaixo do histórico → considere ação"; "final de semana Y lotando rápido → subir tarifa".

## 5.7 Como isso conversa com o Booking Engine

- O RM **grava** a tabela `tarifa(unidade_tipo, rate_plan, data, preço)`; o BE **lê**.
- Ao criar um *hold*, o BE **congela** o preço vigente — mudanças de RM não afetam reservas em andamento (regra de aceite do cap. 04).
- Promoções/cupons do BE são descontos **sobre** o preço do RM, respeitando o floor (um cupom não pode furar o piso sem aprovação).

Seguir para o **[Capítulo 06 — Experiência das Acomodações](06-acomodacoes.md)**.
