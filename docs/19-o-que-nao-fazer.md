# Capítulo 19 — O que NÃO fazer

> Um blueprint de excelência precisa proibir tanto quanto propõe. Estes são os erros que **matam** projetos digitais de hospitalidade de luxo — organizados por área, cada um com o **porquê** e o **antídoto** deste projeto. Este capítulo é uma lista de verificação de veto: se estamos prestes a fazer algo abaixo, paramos.

## 19.1 Estratégia & posicionamento

- **❌ "Mais um site de hotel."** — Comoditiza, joga na guerra de preço. **Antídoto:** plataforma de experiências, categoria *retreat* (cap. 01/02).
- **❌ Linguagem genérica** ("conforto e requinte", "o melhor da região", "diversão para toda a família"). — Descreve mil lugares, nenhum. **Antídoto:** concreto e sensorial, ancorado no Agreste/lago/Dom Dina (cap. 01.7).
- **❌ Copiar o site do concorrente.** — Herda a mediocridade dele. **Antídoto:** benchmark mundial + singularidade combinatória (cap. 18).
- **❌ Perseguir ocupação a qualquer custo** (fire sale, descontão). — Destrói RevPAR e marca. **Antídoto:** otimizar RevPAR/TRevPAR com floor de preço (cap. 05).

## 19.2 Experiência & design

- **❌ Autoplay de vídeo com som.** — Irrita, viola boas práticas, aumenta rejeição. **Antídoto:** mudo por padrão, controle visível (cap. 03).
- **❌ Scrollytelling que sequestra o scroll** (scroll-jacking abusivo, o usuário não controla). — Frustra e enjoa. **Antídoto:** scroll suave que respeita a intenção, marcadores de progresso, saída fácil (cap. 03).
- **❌ Animação por vaidade / WebGL onde vídeo basta.** — Peso, travamento, bateria, nenjoo. **Antídoto:** 3D só onde a interação paga o custo; um evento por vez (cap. 03.5).
- **❌ Ignorar `prefers-reduced-motion` e acessibilidade.** — Exclui público, gera enjoo/risco jurídico. **Antídoto:** fallback estático completo, WCAG 2.2 AA como piso (cap. 02/03/15).
- **❌ Menu hambúrguer/listinha sem alma no mobile** quando o mobile é o palco principal. **Antídoto:** overlay imersivo (cap. 02).
- **❌ Design "de template".** — Mata o posicionamento premium. **Antídoto:** design system autoral, fotografia própria, tipografia editorial (cap. 01).

## 19.3 Reservas & pagamento

- **❌ Widget de reserva de terceiro em iframe fora da marca.** — Quebra a experiência, perde o dado, paga comissão. **Antídoto:** BE proprietário (cap. 04.1).
- **❌ Obrigar cadastro antes de reservar.** — Derruba conversão. **Antídoto:** guest checkout; conta depois (cap. 04.2/11.2).
- **❌ Taxas surpresa no fim do checkout.** — Causa nº1 de abandono. **Antídoto:** preço total transparente desde o início (cap. 04.2).
- **❌ Permitir overbooking.** — Falha crítica, hóspede sem quarto, reputação destruída. **Antídoto:** holds atômicos + testes de carga (cap. 04.3/17.8).
- **❌ Armazenar dados de cartão.** — Risco PCI/legal enorme. **Antídoto:** tokenização do gateway; cartão nunca toca o servidor (cap. 04.6/13.6).
- **❌ Confiar no retorno do cliente para confirmar pagamento.** — Fraude/erro. **Antídoto:** webhook assinado e idempotente como fonte de verdade (cap. 04.10).
- **❌ Só cartão internacional / ignorar Pix e parcelamento.** — Perde o público brasileiro. **Antídoto:** Mercado Pago com Pix + parcelamento (cap. 04.6).

## 19.4 Revenue Management

- **❌ Preço fixo o ano todo.** — Deixa dinheiro na mesa e enche mal. **Antídoto:** precificação dinâmica em camadas (cap. 05).
- **❌ Empilhar fatores ingenuamente** (multiplicadores que explodem ou se anulam). **Antídoto:** camadas ordenadas com floor/ceiling e limite de variação (cap. 05.2/05.4).
- **❌ RM 100% caixa-preta/autônomo (IA sem trilho).** — Risco de preço absurdo e dano de marca. **Antídoto:** automático com guardrails e override humano; ML só recomenda (cap. 05.4/14.5).

## 19.5 Conteúdo, SEO & performance

- **❌ Site lindo mas invisível no Google** (conteúdo dependente de JS, sem SSR/SSG). **Antídoto:** HTML semântico indexável; espetáculo como enhancement (cap. 13.2/15.2).
- **❌ Sacrificar Core Web Vitals pela beleza.** — Pior ranking, menor conversão, sensação não-premium. **Antídoto:** orçamento de CWV no CI que reprova o build (cap. 15.5).
- **❌ Conteúdo raso gerado por IA publicado sem curadoria.** — E-E-A-T baixo, "cara de IA genérica" (o medo explícito do briefing). **Antídoto:** conteúdo próprio, curado; IA só assiste com revisão humana (cap. 14.5/14.7).
- **❌ Imagens/renders/IA que não correspondem à realidade.** — Decepção na chegada, reviews ruins. **Antídoto:** fotografia honesta; proibido IA generativa retratando o produto (cap. 14.7).
- **❌ GIFs pesados, imagens não otimizadas, vídeo MP4 gigante.** **Antídoto:** AVIF/WebP, HLS adaptativo, lazy-load (cap. 15.5).
- **❌ Tags de terceiro carregadas no head bloqueando a thread.** — Destrói INP. **Antídoto:** GTM server-side, carregamento diferido (cap. 16.2).

## 19.6 Dados, privacidade & operação

- **❌ Backoffice que só o dev entende.** — Cliente não usa → dados velhos → produto morre. **Antídoto:** UX de backoffice + treinamento + preview/undo (cap. 12.6).
- **❌ Planilha paralela como fonte de verdade.** — Dessincronização → overbooking/preço errado. **Antídoto:** BD único com RLS; backoffice e site na mesma verdade (cap. 12.5).
- **❌ Coletar dados sem consentimento/base legal (LGPD).** — Passivo jurídico. **Antídoto:** consent mode, minimização, direito de exclusão (cap. 13.6/16.8).
- **❌ Perder o lead de casamento por resposta lenta.** — O lead mais caro esfria em horas. **Antídoto:** automação de primeiro contato + SLA + alerta (cap. 09.7).

## 19.7 Arquitetura & processo

- **❌ Microserviços prematuros.** — Complexidade sem escala que a justifique. **Antídoto:** monolito modular; extrair serviço só quando um domínio exigir (cap. 13.3).
- **❌ App nativo cedo demais por status.** — Custo 3–5x sem ROI. **Antídoto:** PWA no MVP; nativo só com volume que justifique (cap. 11.5/17.6).
- **❌ IA por marketing.** — Feature que não resolve dor real. **Antídoto:** filtro anti-hype de três perguntas (cap. 14.1).
- **❌ Big bang / escopo inflado.** — Atraso, risco, orçamento estourado. **Antídoto:** roadmap faseado, MoSCoW, feature flags (cap. 17).
- **❌ "Depois a gente mede."** — Sem analytics no dia 1, decidimos no escuro. **Antídoto:** analytics e CWV desde o lançamento (cap. 16/17.3).
- **❌ Deixar conteúdo audiovisual para o fim.** — É o produto e tem maior lead time. **Antídoto:** produção começa na Fase 0 (cap. 17.2/17.8).

## 19.8 O teste final (antes de qualquer release)

Perguntar, sobre qualquer decisão:
1. **Reforça o posicionamento** (experiência, exclusividade, natureza, tecnologia, hospitalidade) ou dilui?
2. **Parece feito sob medida** ou parece template/IA genérica?
3. **Converte e/ou encanta** — e não sacrifica um pelo outro?
4. **É acessível, rápido e indexável**?
5. **O cliente consegue operar** sem depender de dev?

Se alguma resposta for "não", **não vai ao ar**.

Seguir para o **[Capítulo 20 — Plano Diretor Consolidado](20-plano-diretor.md)**.
