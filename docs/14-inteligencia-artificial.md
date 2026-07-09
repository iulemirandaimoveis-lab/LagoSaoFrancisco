# Capítulo 14 — Inteligência Artificial

> Regra número um, imposta pelo próprio briefing: **nada de "IA por marketing"**. Toda função de IA aqui precisa passar em um teste duplo — gera **valor real para o hóspede** ou **eficiência real para a operação** — e degradar graciosamente se falhar (o site funciona sem ela). IA é ingrediente, não prato. Onde uma regra determinística resolve, usamos a regra (mais barata, previsível e auditável); IA entra onde linguagem natural, personalização ou volume de dados a justificam.

## 14.1 Critério de decisão (o filtro anti-hype)

Antes de qualquer feature de IA, três perguntas:
1. **Qual dor real resolve?** (não "porque é IA")
2. **Uma regra/busca simples resolveria melhor?** (se sim, não use IA)
3. **O que acontece quando erra?** (precisa de fallback seguro e escalada humana)

Aplicando esse filtro, seguem as funções aprovadas, priorizadas por ROI.

## 14.2 Concierge Digital (RAG sobre a Fazenda) — [SHOULD, V2]

**O quê:** assistente conversacional treinado **exclusivamente** sobre a Fazenda Lago São Francisco — responde dúvidas (o que fazer, horários, o clima, políticas, como chegar, o cardápio), sugere e **reserva** experiências/mesas, registra preferências, escala para humano.

**Como (T):** **RAG (Retrieval-Augmented Generation)**, não fine-tuning. Todo o conteúdo da plataforma (acomodações, experiências, cardápio, museu, FAQ, políticas) é indexado como *embeddings* em **pgvector** (Supabase, cap. 13). O LLM responde **apenas com base no conteúdo recuperado** — isso ancora nas informações reais e **minimiza alucinação** (crítico: um concierge que inventa preço/política gera prejuízo e reclamação).
- **Function calling:** o assistente aciona ferramentas reais — consultar disponibilidade, criar reserva de experiência, verificar preço (via RM), abrir chamado ao humano. Não "finge" reservar; executa pela mesma API do BE.
- **Guardrails:** escopo travado na Fazenda (recusa off-topic educadamente), sem inventar preço/disponibilidade (sempre consulta a fonte), tom de marca (cap. 01), e **handoff humano** sempre disponível.
- **Canais:** widget na Área do Hóspede e site; **WhatsApp** (onde o público brasileiro conversa) em V2/V3.
- **(C):** reduz carga da recepção em dúvidas repetitivas, aumenta anexo (sugere e reserva experiências), disponível 24/7, e **coleta preferências** que personalizam a estadia (o "ele lembrou de mim" do luxo).

## 14.3 Planejador Inteligente de Roteiro — [SHOULD → COULD]

Ver cap. 08.5. **MVP por regras** (heurísticas determinísticas: encaixa experiências por duração/idade/energia/clima/horário). **V3:** camada de IA que conversa e personaliza sobre a base de regras ("temos 2 crianças e queremos um sábado tranquilo"). A IA **propõe**, o motor de reservas **valida** disponibilidade real. Valor: transforma "o que fazer?" em roteiro desejável e reservável — grande alavanca de TRevPAR.

## 14.4 Busca semântica e descoberta — [COULD, V2/V3]

Busca no site que entende intenção ("lugar romântico e quieto para casal", "atividade para criança pequena em dia de chuva") em vez de só palavra-chave — sobre os mesmos embeddings do RAG. Melhora descoberta e conversão. Barato de adicionar quando o pgvector já existe.

## 14.5 IA na operação (backoffice) — valor interno

- **Recomendações de RM assistidas por ML — [COULD, V3]:** modelo sobre pace/pickup/histórico + sinais externos (eventos da cidade, clima, feriados) que **sugere** ajustes de tarifa ao revenue manager. **Sempre recomendação revisável, nunca precificação autônoma** (cap. 05/19) — RM caixa-preta é risco de marca e de receita.
- **Previsão de demanda/ocupação — [COULD, V3]:** ajuda a planejar equipe, compras (F&B) e ações de marketing para datas fracas.
- **Assistente de conteúdo — [COULD, V2]:** ajuda a equipe de marketing a redigir descrições, meta tags e posts **no tom de marca** — com **revisão humana obrigatória** (nunca publicar conteúdo de IA sem curadoria; cap. 19, o site não pode "parecer feito por IA genérica").
- **Análise de reviews/NPS — [COULD, V3]:** classifica e resume feedback (temas recorrentes, sentimento) para ação operacional.
- **Triagem de leads de casamento — [COULD, V2]:** enriquece/qualifica leads e sugere prioridade ao comercial.

## 14.6 Personalização — [COULD, V3]

Com consentimento (LGPD), personalizar recomendações de experiências/conteúdo por histórico e favoritos (cap. 11). **Cuidado:** personalização sutil e opcional; nada de "creepy". Sempre explicável e desativável.

## 14.7 Fotografia/vídeo gerados por IA — regra dura

**Proibido usar imagens/vídeos gerados por IA para representar a Fazenda.** O ativo é a **autenticidade** do lugar (cap. 01). Imagem generativa mente e destrói confiança quando o hóspede chega. IA generativa pode ajudar em *bastidores* (moodboards, storyboard, testes de layout, upscaling/limpeza de fotos reais), **nunca** como conteúdo final que retrata o produto.

## 14.8 Arquitetura de IA (resumo técnico)

- **Embeddings + pgvector** no Supabase (sem infra extra).
- **LLM via API** (provider trocável por adaptador, cap. 13.7); escolher por qualidade em PT-BR, custo e latência. Prompt de sistema com persona/tom + guardrails + ferramentas (function calling) ligadas à API do BE/RM.
- **Pipeline de indexação:** ao publicar conteúdo no CMS, reindexar embeddings (job) — o concierge sempre reflete o conteúdo atual.
- **Observabilidade de IA:** logar perguntas sem resposta boa (lacunas de conteúdo → melhorar FAQ), custo por conversa, taxa de handoff, satisfação.
- **Custo & fallback:** cache de respostas frequentes; se o provider cair, degradar para FAQ/busca e humano. IA nunca é caminho único para uma ação crítica.

## 14.9 Ética, LGPD e transparência

- Deixar claro quando o usuário fala com IA (não enganar) e oferecer humano.
- Consentimento para uso de dados em personalização; não treinar modelos de terceiros com dados de hóspedes sem base legal.
- Auditar vieses e respostas; revisão humana no conteúdo público.

## 14.10 Roadmap de IA (síntese)

| Função | Fase | Tipo |
|--------|------|------|
| Planejador de roteiro (regras) | MVP | Determinístico |
| Concierge RAG + reservas | V2 | IA + tools |
| Busca semântica | V2/V3 | IA |
| Assistente de conteúdo (interno) | V2 | IA + revisão |
| Triagem de leads | V2 | IA |
| RM assistido por ML | V3 | ML (recomendação) |
| Previsão de demanda / análise de reviews / personalização | V3 | ML/IA |

Seguir para o **[Capítulo 15 — SEO](15-seo.md)**.
