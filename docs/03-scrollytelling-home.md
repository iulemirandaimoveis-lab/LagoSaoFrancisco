# Capítulo 03 — Scrollytelling da Home

> A Home não é uma página. É o **trailer do lugar**. Ela precisa fazer, em 90 segundos de scroll, o que uma diária inteira faria pessoalmente: transportar. Este capítulo é o roteiro cinematográfico, seção a seção, com a emoção-alvo, o material audiovisual, o movimento e a mecânica técnica de cada momento.

## 3.1 Princípios do movimento (a "física" da marca)

Antes das cenas, as leis que regem todo o movimento — porque **movimento errado destrói luxo instantaneamente**:

- **Peso e inércia.** Nada começa ou para bruscamente. Easing tipo `cubic-bezier(0.16, 1, 0.3, 1)` (saída suave, "expo"). Objetos pesados se movem devagar. Luxo = calma = movimento lento e confiante.
- **Scroll suave (Lenis).** Interpolação do scroll para eliminar o "degrau" do scroll nativo, dando sensação de deslize sobre trilho. Configurado para não brigar com acessibilidade nem com o INP.
- **Paralaxe com propósito, não decorativa.** Camadas se movem em velocidades diferentes para criar profundidade (a névoa mais lenta que a água, a montanha mais lenta que a névoa) — imita como o olho percebe distância.
- **Um evento por vez.** Nunca duas animações competindo pela atenção. O olho é conduzido, não bombardeado.
- **`prefers-reduced-motion` como cidadão de primeira classe.** Quem pede menos movimento recebe uma versão com *cross-fades* suaves e conteúdo estático — **sem perder informação nenhuma**. A narrativa sobrevive sem o espetáculo.
- **Performance é parte da estética.** Um scrollytelling que trava não é sofisticado, é amador. Orçamento de performance rígido (cap. 15): vídeos otimizados, `will-change` cirúrgico, animações em `transform`/`opacity` (compostas na GPU), lazy-load do que está fora da tela.

## 3.2 A metáfora condutora: "A câmera entra na Fazenda"

A Home é uma **única viagem de câmera contínua**: começa no céu (drone sobre o lago), desce, entra pelos portões, percorre os universos (hospedagem, gastronomia, natureza, arte, celebração) e pousa num convite. O scroll é o "play" dessa viagem. A sensação-guia: **"eu estou chegando lá agora"**.

## 3.3 Roteiro seção a seção

### Cena 1 — HERO: "O primeiro respiro" (0–100vh)
- **Visual:** vídeo drone 4K fullscreen — amanhecer, névoa subindo do lago, água espelhada, um ou dois barcos deslizando, pássaros. Sem texto por 1,5s (deixa a imagem respirar).
- **Áudio:** som ambiente sutil (água, pássaros, vento) com **botão de mute visível e default mudo** (autoplay com som é proibido — irrita e viola boas práticas). Quem ativa, entra no clima.
- **Texto (fade-in atrasado):** título editorial grande — *"Onde a natureza, a gastronomia, a arte e a hospitalidade se encontram."* — e um `scroll cue` discreto (linha que pulsa suave).
- **Movimento:** o vídeo tem leve *slow zoom-out* contínuo (a Fazenda "se abrindo"); ao iniciar o scroll, o vídeo escala/desfoca levemente e o texto sobe.
- **Emoção-alvo:** encantamento e curiosidade. "Que lugar é esse? Eu preciso ver mais."
- **Técnica:** vídeo com poster (LCP = poster de altíssima qualidade para não penalizar CWV; vídeo entra após), múltiplas fontes (AV1/WebM/MP4), resolução adaptada ao viewport, pausado fora de tela.

### Cena 2 — A DESCIDA: "Entrando" (100–200vh)
- **Visual:** transição da vista aérea para o nível do lago — a câmera "desce". Pin da seção enquanto uma sequência de frames/vídeo avança conforme o scroll (efeito Apple: o scroll controla o tempo do vídeo).
- **Texto:** uma frase de posicionamento aparece e sai — *"No Agreste que fica frio, à beira do lago, um refúgio."* Reforça o diferencial de altitude.
- **Emoção:** imersão; a fronteira entre tela e lugar se dissolve.
- **Técnica:** `scroll-scrubbing` de vídeo/frame sequence via ScrollTrigger + pin; fallback estático para reduced-motion.

### Cena 3 — HOSPEDAGEM: "Seu quarto está pronto" (200–320vh)
- **Visual:** revelação horizontal (scroll vertical → movimento horizontal das cenas) das acomodações — suíte com vista, varanda sobre o lago, lareira/aconchego (reforço do frio como charme). Cada acomodação surge com nome e "a partir de R$".
- **Interação:** cada card é clicável (leva à página da acomodação); a booking bar aparece pela primeira vez, discreta.
- **Emoção:** projeção — "eu me vejo acordando ali".
- **Técnica:** *horizontal pinning* (translação em `transform`), imagens `next/image` responsivas, prefetch das rotas de destino.

### Cena 4 — GASTRONOMIA (Dom Dina): "A mesa" (320–440vh)
- **Visual:** corte para o quente e o dourado — cozinha, fogo, mãos do chef empratando, taça de vinho, lago desfocado ao fundo (bokeh). Contraste térmico deliberado com a cena fria anterior.
- **Movimento:** close-ups em sequência com leve *ken burns*; texto — *"Dom Dina. A cozinha que faz da paisagem sabor."*
- **CTA suave:** "Conheça o restaurante".
- **Emoção:** desejo sensorial, fome do bom sentido.

### Cena 5 — NATUREZA & EXPERIÊNCIAS: "O dia é seu" (440–560vh)
- **Visual:** montagem enérgica (ainda elegante) — caiaque cortando a água, tirolesa, trilha na mata, redário balançando, pesca ao entardecer. Ritmo levemente mais rápido aqui (a única aceleração da página).
- **Interação:** mosaico de experiências; hover/tap revela duração e nível.
- **Emoção:** possibilidade e liberdade — "há muito o que viver, no meu ritmo".

### Cena 6 — ARTE & ESPÍRITO: "O silêncio também é um passeio" (560–660vh)
- **Visual:** desaceleração proposital — Museu Expolago (obras, luz), a capela, o pôr do sol. Volta do tom contemplativo.
- **Texto:** *"Entre uma aventura e outra, a arte e o silêncio."*
- **Emoção:** profundidade, alma — diferencia de qualquer hotel fazenda "de piscina".

### Cena 7 — CELEBRAÇÃO: "Momentos que viram para sempre" (660–760vh)
- **Visual:** casamento ao pôr do sol, capela iluminada, brinde, fogos refletidos no lago.
- **CTA:** "Realize seu casamento aqui".
- **Emoção:** aspiração e emoção alta (pico romântico).

### Cena 8 — PROVA & CONFIANÇA (760–840vh)
- **Visual:** depoimentos reais (vídeo curto ou citação com foto), selo de avaliações, menções (FIG, imprensa gastronômica), números discretos ("X anos", "N experiências").
- **Emoção:** de sonho para confiança — "é real, e outros amaram".

### Cena 9 — CONVITE / CTA FINAL (840–940vh)
- **Visual:** volta ao lago ao anoitecer, calmo. Um único bloco: **"Sua estadia começa aqui"** + motor de reserva compacto (datas + hóspedes) + botão forte.
- **Emoção:** facilitação e decisão — fechar a curva que começou no encantamento.
- **Técnica:** este é o principal ponto de conversão above-the-fold-do-fim; medido como evento de funil.

### Rodapé editorial
Newsletter, mapa do site, contato, redes. Fecho de marca.

## 3.4 Transições entre cenas

- **Não usar cortes secos entre universos.** Usar *morphs* de cor e luz: o frio azulado da hospedagem aquece no dourado da gastronomia; a energia das experiências acalma no contemplativo da arte. A **temperatura de cor** é o fio condutor emocional.
- **Elementos-ponte:** a água aparece em quase todas as cenas (reflexo, gota, movimento) como *leitmotiv* visual que costura a narrativa.
- **Marcadores de progresso** discretos (opcional): pontos laterais indicando "onde estou na jornada", clicáveis para navegação — respeita quem não quer rolar tudo.

## 3.5 Stack de animação e por que (com alternativas comparadas)

| Necessidade | Escolha | Alternativa descartada | Por quê |
|-------------|---------|------------------------|---------|
| Scroll suave | **Lenis** | scroll nativo / Locomotive | Leve, integra com ScrollTrigger, bom controle de INP; Locomotive é mais pesado e menos mantido |
| Timeline / scrub / pin | **GSAP + ScrollTrigger** | scroll-driven animations (CSS puro) | CSS scroll-timeline ainda tem suporte irregular; GSAP dá controle cinematográfico e fallback confiável hoje |
| Micro-interações / gestos UI | **Framer Motion** | animação manual | Declarativo, ótimo com React/Next, `AnimatePresence` para transições de rota |
| 3D (mapa da propriedade, cenas volumétricas) | **React Three Fiber + Three.js + Drei** | vídeo pré-renderizado | Interatividade (mapa 3D navegável); usar 3D só onde interação justifica o custo |
| Vídeo scrub | frame-sequence ou `<video>` + ScrollTrigger | GIF (jamais) | GIF é enorme e feio; vídeo/frames otimizados são leves e nítidos |

**Regra de ouro de 3D:** WebGL só onde a **interação** paga o custo (mapa 3D, tour). Para cenas puramente narrativas, **vídeo/frames vencem** — mais leves, mais bonitos, universais. Não usar Three.js por vaidade técnica (ver cap. 19).

## 3.6 Governança de performance da Home

- **Orçamento:** LCP < 2,5s, INP < 200ms, CLS < 0,1 mesmo com todo o espetáculo (cap. 15).
- **Estratégia de mídia:** poster de imagem para o LCP; vídeos code-split e sob demanda; `IntersectionObserver` para montar/desmontar cenas 3D e pausar vídeos fora de tela; pré-carregar só o hero.
- **Degradação graciosa:** conexões lentas (Network Information API / save-data) e reduced-motion recebem a **versão editorial estática** — mesmas mensagens, mesmas fotos, sem vídeo pesado. A história nunca depende do espetáculo.
- **A Home tem duas versões conceituais:** a "experiência" (imersiva) e a "essência" (estática, rápida, acessível, indexável). O HTML servido é semanticamente completo (bom para SEO e no-JS); o espetáculo é progressive enhancement por cima.

Seguir para o **[Capítulo 04 — Motor de Reservas](04-motor-de-reservas.md)**.
