# Capítulo 08 — Passeios & Atividades (Experiências)

> Aqui a tese "vendemos experiências" fica literal. Cada passeio é um **produto**: com página, preço, disponibilidade, reserva e estoque. Coletivamente, eles são o principal motor de **anexo de receita** (TRevPAR) e a razão pela qual a estadia dura mais de uma noite.

## 8.1 Modelo mental: "experiência" como entidade de primeira classe

Uma **Experiência** é uma entidade unificada que também abrange as experiências do chef (cap. 07) e vivências do museu (cap. 10) — um único motor, muitas fachadas. Atributos:

```
experiencia (
  id, slug, nome, categoria[aquatica|aventura|contemplativa|gastronomica|cultural|familia],
  descricao_editorial, galeria, video, mapa_ponto,
  duracao_min, dificuldade[1..5], idade_minima, capacidade_por_horario,
  requer_reserva[bool], incluso_na_diaria[bool], preco, sazonalidade,
  o_que_levar, ponto_de_encontro, politica_clima, acessibilidade
)
horario_experiencia (experiencia_id, data, hora, vagas_total, vagas_ocupadas)
```

**Por que unificar (T/C):** um só motor de estoque/reserva/pagamento serve passeios, jantares do chef e vivências do museu — menos código, uma só régua de qualidade, e o **carrinho combina tudo** (hospedagem + caiaque + jantar + visita guiada) numa reserva só. Isso é impossível se cada área tiver seu "fale conosco".

## 8.2 Hub `/experiencias` — descoberta visual e filtrável

- **Layout visual** (mosaico editorial, não tabela) com filtros que respeitam as objeções reais das personas:
  - **Idade mínima** (a Família Andrade filtra por "serve para meu filho de 8?").
  - **Nível de dificuldade** (1–5, ícones) — contemplativo a aventura.
  - **Duração** (rápido / meia-dia / dia).
  - **Categoria** (água, aventura, contemplativo, gastronômico, cultural, família, romântico).
  - **Incluso na diária vs. pago à parte** (transparência).
- **Ordenação inteligente:** destaques, sazonais, "populares agora".
- Cada card mostra: foto/vídeo curto, nome, duração, nível, idade, preço (ou "incluso"), e CTA.

## 8.3 Página individual do passeio

Estrutura canônica (cada atividade — pedalinho, tirolesa, caiaque, pesca, trilhas, bicicletas, redário, capela, pôr do sol):
1. **Hero** com vídeo/foto imersiva do passeio em ação.
2. **Storytelling:** o que se sente, o que se vê, o momento do dia ideal ("A trilha ao amanhecer, quando a névoa ainda cobre o lago").
3. **Galeria + vídeo**.
4. **Ficha objetiva:** duração, dificuldade, idade mínima, capacidade, o que levar, ponto de encontro, política de clima (chuva → remarca/reembolsa).
5. **Mapa:** onde acontece na propriedade / trajeto (trilhas com traçado).
6. **Reserva:** seleção de data/horário com vagas em tempo real, nº de participantes, pagamento (ou "incluso — apenas agende").
7. **Recomendações:** "combina com" (após o caiaque, o almoço no Dom Dina; a trilha + o redário para descansar) e "para quem gostou disso".
8. **Segurança/instruções** e prova social.

## 8.4 Reserva e disponibilidade de experiências

- **Slots por horário** com capacidade (guia, equipamento, segurança limitam vagas) — mesma disciplina de inventário/holds do cap. 04.
- **Reserva combinada:** experiências entram no carrinho junto com o quarto (no upsell do checkout, cap. 04) **ou** avulsas (day-use).
- **Dependência de clima/sazonal:** política clara e automatizável (passeio de lago cancela com tempestade → política de reembolso/remarcação sem atrito).
- **Grátis mas com agenda:** atividades inclusas na diária ainda podem exigir **agendamento** (tirolesa tem fila/segurança) — reservar vaga sem cobrar. Isso organiza a operação e melhora a experiência física.

## 8.5 O Planejador Inteligente de Roteiro (diferencial — liga ao cap. 14)

Ideia do briefing elevada: dado o período da estadia, a composição (casal/família/idades) e preferências, o sistema **monta um roteiro sugerido** ("Sexta: chegada + pôr do sol no lago + jantar Dom Dina; Sábado: caiaque de manhã, redário à tarde, museu ao entardecer") equilibrando ritmo, horários, capacidade e clima. O hóspede aceita/edita e **reserva o roteiro inteiro de uma vez**.
- **MVP:** planejador baseado em **regras** (heurísticas por duração/idade/energia) — determinístico, confiável, sem IA.
- **V3:** camada de IA que personaliza e conversa (cap. 14) sobre a base de regras.
- **(C):** aumenta drasticamente o anexo de experiências e o tempo de permanência; transforma "o que fazer lá?" (fricção) em "olha que dias incríveis planejei" (desejo).

## 8.6 Operação e integração

- Backoffice (cap. 12) gerencia experiências, horários, capacidade, preço, bloqueios (guia de folga, manutenção de equipamento), política de clima.
- Reservas de experiência alimentam a **lista de operação diária** (quem, quando, quantos) para a equipe de campo — talvez uma visão mobile para guias.
- Voucher/QR do passeio no app/e-mail do hóspede para validação no ponto de encontro.

## 8.7 Métricas

Anexo por reserva de hospedagem, receita por experiência, ocupação de slots, no-show, cancelamento por clima, experiências mais reservadas vs. mais visualizadas, impacto do planejador de roteiro na receita.

## 8.8 Acessibilidade e honestidade

- Dificuldade e idade mínima **honestas** (não vender aventura para quem não pode fazer → frustração e risco).
- Indicar quais experiências são acessíveis a PCD/mobilidade reduzida (o redário, o pôr do sol, o museu podem ser; a tirolesa não) — transparência que inclui e protege.
- Alternativas textuais para todo conteúdo em mídia.

Seguir para o **[Capítulo 09 — Casamentos & Eventos Sociais](09-casamentos.md)**.
