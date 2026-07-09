# Capítulo 06 — Experiência das Acomodações

> Uma lista de quartos com preço é um catálogo. Nós vendemos **o lugar onde a pessoa vai acordar**. Cada acomodação é apresentada como um personagem, com sua própria luz, vista e humor. O objetivo desta seção é a emoção de **projeção**: "eu me vejo ali" (cap. 01).

## 6.1 O problema do "grid de cards"

O padrão de mercado — grade de cards idênticos com foto + preço + botão — comunica **commodity**. Quando tudo parece igual, o cérebro compara por preço, e perdemos a batalha da diferenciação. A solução não é adornar o card; é **mudar a metáfora de navegação**.

## 6.2 O hub `/hospedagem`: o mapa aéreo vivo

Em vez de (ou além de) uma lista, o hub abre com uma **vista aérea da propriedade** (foto/render drone de alta qualidade) onde cada acomodação é um **ponto interativo** posicionado geograficamente. Ao passar/tocar, o ponto expande num *preview* — nome, vista, "a partir de R$", uma frase de caráter ("O chalé mais próximo da água, para quem quer o silêncio"). Clicar leva à página da unidade.

**Justificativa (E/C):** o mapa comunica **implantação e privacidade** (o hóspede entende que não é um bloco de apartamentos), reforça a escala da propriedade e cria interatividade memorável — diferenciador imediato vs. concorrentes. **(T):** implementável em duas camadas de fidelidade:
- **MVP:** imagem aérea + hotspots em HTML/SVG absolutamente posicionados (leve, acessível, rápido).
- **V2/V3:** evoluir para o **mapa 3D navegável** (React Three Fiber) integrado ao mapa geral da propriedade (cap. 13) — só quando o custo de performance for domado e houver conteúdo 3D real.

Abaixo do mapa, para acessibilidade e SEO, uma **lista semântica** com as mesmas unidades (o mapa é *enhancement*, não a única porta — cap. 19).

## 6.3 Página individual da acomodação (estrutura canônica)

Cada unidade (`/hospedagem/[slug]`) segue uma **estrutura editorial**, não um formulário:

1. **Hero imersivo:** a melhor imagem/vídeo curto da unidade em foco — a vista, a luz da manhã. Nome grande, uma linha de caráter.
2. **Storytelling individual:** 2–3 blocos curtos com direção editorial — "Como é acordar aqui", "O detalhe que só quem fica percebe", "Para quem é" (casal? família?). Texto sensorial e honesto, escrito, não gerado genericamente.
3. **Galeria profissional:** organizada por **momento/uso** (manhã, banho, varanda, detalhes) e não jogada aleatoriamente. Suporta zoom, navegação por teclado, legendas.
4. **Vídeo cinematográfico** curto (15–40s) da unidade.
5. **Tour 360°** navegável (ver 6.5) — o substituto digital de "pisar no quarto".
6. **Ficha objetiva** (o lado racional que fecha a venda): capacidade, cama(s), metragem, vista, comodidades (lareira, ar, varanda, hidro), políticas (pet, crianças, fumantes), acessibilidade da unidade.
7. **Disponibilidade & preço:** calendário embutido (do BE/RM) — reservar sem sair da página.
8. **Cross-sell contextual:** "Combina com" — jantar no Dom Dina, o passeio de caiaque que sai bem ali perto, o pacote romance. Aumenta anexo (cap. 04).
9. **Prova social:** avaliações reais desta unidade específica.

## 6.4 Galerias — direção de arte

- **Curadoria, não despejo.** Melhor 12 fotos impecáveis que 40 medianas. Cada foto tem propósito narrativo.
- **Formatos responsivos** (`next/image`, AVIF/WebP, `srcset`), lazy-load fora da tela, LQIP/blur placeholder para não haver salto de layout (CLS).
- **Legendas** contam micro-histórias e servem SEO/acessibilidade (alt text descritivo real).
- **Consistência de tratamento** de cor entre todas as unidades (mesma "assinatura" de luz — cap. 01).

## 6.5 Tours 360° — como fazer sem matar a performance

**Tecnologia:** fotos panorâmicas equiretangulares em visualizador leve (ex.: Pannellum/Marzipano-like, ou custom em Three.js só se necessário). **Regras:**
- **Carregamento sob demanda** (o 360° só baixa quando o usuário clica em "Explorar em 360°", nunca no load da página).
- **Hotspots** dentro do tour: pontos que levam do quarto à varanda à vista, ou que abrem uma foto detalhe.
- **Fallback**: dispositivos fracos/reduced-motion veem a galeria normal.
- **(C):** tour 360° reduz a ansiedade de compra ("é isso mesmo que estou reservando?") e aumenta conversão em ticket alto — é o item de maior impacto percebido depois do vídeo.

## 6.6 Comparação entre unidades

Um **comparador** (invocável do hub) que coloca 2–3 unidades lado a lado: vista, capacidade, preço, comodidades-chave, "melhor para". **Cuidado de CRO:** o comparador deve **guiar para uma escolha**, não gerar paralisia — destacar o "recomendado para você" com base na composição de hóspedes já informada. Design honesto: não empurra sempre o mais caro; recomenda o **certo** (constrói confiança e reduz cancelamento).

## 6.7 Mapa e localização na propriedade

Cada página mostra **onde** a unidade fica (distância até o lago, restaurante, capela) — micro-mapa. Isso vende privacidade/conveniência e reduz reclamação ("não sabia que era longe").

## 6.8 Nomenclatura e taxonomia

Nomes com **caráter**, não códigos. Em vez de "Standard/Master/Família" secos, dar nome ao lugar (ex.: "Chalé da Névoa", "Suíte do Pôr do Sol") **mantendo** a categoria funcional visível para clareza de reserva. Nome vende desejo; categoria vende clareza — ter os dois.

## 6.9 Acessibilidade específica

- Cada unidade declara seus recursos de acessibilidade física (rampa, barra, altura da cama) — informação que o hóspede PCD precisa e quase nenhum concorrente oferece: **diferencial + inclusão + SEO**.
- Tours e galerias com alternativas textuais; nada de informação exclusiva em mídia sem texto equivalente.

## 6.10 Dados (liga ao BE/RM)

A página consome `unidade_tipo` (conteúdo editorial, galeria, 360°, ficha) e o calendário do BE. Conteúdo editorial vive no CMS (cap. 12/13), preço/disponibilidade vêm do RM/BE em tempo real — **separação clara entre conteúdo (lento, editorial) e transacional (dinâmico)**.

Seguir para o **[Capítulo 07 — Restaurante Dom Dina](07-restaurante-dom-dina.md)**.
