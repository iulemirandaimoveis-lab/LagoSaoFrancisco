# Capítulo 00 — Como usar este blueprint

## Propósito do documento

Este blueprint existe para resolver o problema mais caro de qualquer projeto digital ambicioso: **a perda de consistência ao longo do tempo**. Um projeto plurianual passa por várias mãos — designers entram e saem, desenvolvedores rotacionam, agências mudam, o dono do negócio troca de prioridade. Sem um documento diretor forte, cada geração de decisões erode a anterior e o produto vira uma colcha de retalhos. Aman, Apple e JHSF não são consistentes por sorte: são consistentes porque a decisão estética e estratégica foi **tomada uma vez, documentada com rigor e defendida com disciplina**.

Portanto, a regra de ouro:

> **Se uma decisão de produto, design ou arquitetura não está neste documento, ela ainda não foi tomada. Se contradiz este documento, precisa de um PR aprovado pelo CPO antes de virar código.**

## A quem serve

- **Gestão / proprietário**: entende para onde o ativo digital caminha e por quê cada investimento se justifica comercialmente.
- **Produto (CPO)**: usa como base de priorização e como critério de aceite.
- **Design (UX + Criação)**: usa os capítulos 01, 03, 06–10 e 18 como bíblia estética e emocional.
- **Engenharia (CTO)**: usa os capítulos 04, 05, 11, 12, 13, 14 como especificação de arquitetura.
- **Marketing / Growth**: usa os capítulos 01, 15, 16 e os módulos de casamentos/eventos.
- **Revenue**: usa o capítulo 05 como especificação do motor de precificação.

## Convenções

- **Prioridade MoSCoW**: cada funcionalidade relevante recebe uma marca — **[MUST]** (MVP), **[SHOULD]** (V2), **[COULD]** (V3), **[WON'T-agora]** (fora de escopo consciente). O consolidado está no capítulo 17.
- **Justificativa tripla**: toda decisão arquitetural importante traz justificativa **(T)écnica**, **(E)stratégica** e **(C)omercial**. Isso força honestidade — se uma decisão só tem justificativa técnica ("é legal de programar"), ela é suspeita.
- **Comparações explícitas**: quando há alternativas, apresentamos a tabela de trade-offs e a decisão. Nunca "escolhemos X porque é bom"; sempre "escolhemos X em vez de Y e Z porque...".
- **Tokens de marca** (cores, tipografia, espaçamento, movimento) são definidos no capítulo 01 e referenciados por nome em todo o resto. Nunca hardcodar valores.

## Glossário mínimo

| Termo | Significado no contexto deste projeto |
|-------|----------------------------------------|
| **Plataforma** | O conjunto site + booking engine + área do hóspede + backoffice + integrações. Não é "o site". |
| **Experiência (produto)** | Unidade vendável que não é diária: um passeio, um jantar do chef, um pacote de casamento, um voucher. |
| **Booking Engine (BE)** | Motor proprietário de reservas de hospedagem, com calendário, tarifas e pagamento. |
| **Revenue Management (RM)** | Sistema de regras de precificação dinâmica que alimenta o BE. |
| **PMS** | *Property Management System* — sistema de gestão da operação hoteleira (check-in/out, housekeeping, folio). |
| **Channel Manager** | Middleware que sincroniza disponibilidade/tarifa entre o BE próprio e as OTAs. |
| **OTA** | *Online Travel Agency* — Booking.com, Expedia, Airbnb. |
| **Scrollytelling** | Narrativa cinematográfica conduzida pelo scroll. |
| **CWV** | *Core Web Vitals* — métricas de performance do Google (LCP, INP, CLS). |
| **CRO** | *Conversion Rate Optimization*. |
| **CDP** | *Customer Data Platform* — camada unificada de dados do hóspede. |
| **ADR / RevPAR / TRevPAR** | Métricas de receita — ver capítulo 05. |

## O nome e o lugar

A Fazenda Lago São Francisco fica no **Agreste pernambucano, região de Garanhuns** — cidade conhecida pelo clima ameno de altitude (uma das mais frias do Nordeste), pelo **Festival de Inverno de Garanhuns (FIG)** e pelo **São João**. Os ativos declarados incluem: **lago navegável, chalés e suítes, o Restaurante Dom Dina, capela, o Museu / Expolago, e um conjunto de passeios** (pedalinho, tirolesa, caiaque, pesca, trilhas, redário, pôr do sol). Esse contexto geográfico e cultural é matéria-prima estratégica — não é cenário de fundo. Ele aparece de forma deliberada em posicionamento, SEO, sazonalidade de revenue e narrativa. **Genérico é o inimigo**: "hotel fazenda com natureza" descreve mil lugares; "o refúgio de altitude à beira do lago, no Agreste que fica frio, onde arte e gastronomia encontram o São João" descreve um.

## O que este documento propositalmente NÃO faz

- Não escolhe cor de botão nem escreve CSS. Define princípios; o design system detalha.
- Não escreve *user stories* de sprint. Define capacidades e prioridades; o backlog operacionaliza.
- Não substitui contratos jurídicos, políticas de privacidade (LGPD) ou termos de uso — sinaliza onde são necessários.

Seguir para o **[Capítulo 01 — Visão Estratégica](01-visao-estrategica.md)**.
