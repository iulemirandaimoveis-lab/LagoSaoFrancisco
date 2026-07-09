# Capítulo 15 — SEO & Performance

> O paradoxo a resolver: queremos o site mais **cinematográfico** (pesado em vídeo/animação) e ao mesmo tempo o mais **rápido e indexável**. A maioria dos sites de luxo escolhe beleza e sacrifica descoberta — ficam invisíveis no Google e dependem de OTA/anúncio pago (caro). Nós vamos ter os dois, por arquitetura (cap. 03/13): HTML semântico completo servido rápido, espetáculo como *progressive enhancement*. SEO aqui não é departamento; é **decisão de arquitetura desde a primeira linha**.

## 15.1 Estratégia: ser dono das buscas de intenção local

O tráfego mais valioso é o de **intenção de compra local**. Alvos primários (do briefing + expansão):
- **Hospedagem:** "hotel fazenda em Garanhuns", "hotel fazenda no Agreste", "onde ficar em Garanhuns", "pousada de luxo Pernambuco", "hotel com lago Pernambuco", "refúgio de inverno Nordeste".
- **Gastronomia:** "restaurante em Garanhuns", "restaurante com vista para lago", "onde comer bem em Garanhuns".
- **Casamentos (altíssimo valor):** "casamento no campo em Pernambuco", "casamento à beira do lago", "destination wedding Nordeste", "espaço para casamento Garanhuns".
- **Eventos/cultura:** "o que fazer em Garanhuns", "Festival de Inverno de Garanhuns onde ficar", "museu em Garanhuns", "São João de Garanhuns hospedagem".
- **Experiências:** "passeios em Garanhuns", "tirolesa/caiaque Pernambuco".

**Mapa de intenção → página:** cada cluster de busca tem uma página-alvo canônica (hub ou folha). Nenhuma busca valiosa fica órfã. As páginas-folha (uma suíte, um passeio, um pacote de casamento) são as **landing pages de long-tail e de anúncio**.

## 15.2 SEO técnico (a fundação)

- **Renderização indexável:** conteúdo em **SSG/ISR** (HTML pronto no primeiro byte), nunca depender de JS para o Google ver o conteúdo (cap. 13). O espetáculo é adicionado por cima; o texto/estrutura existe no HTML.
- **URLs limpas e semânticas** em PT-BR (cap. 02), estáveis, com redirects 301 para qualquer mudança (nunca quebrar link/autoridade).
- **Sitemap.xml** dinâmico (gerado do CMS/BD — inclui cada acomodação, experiência, prato, obra, evento, post) + **robots.txt** correto (bloquear `/admin`, `/conta`, checkout de indexação; liberar conteúdo).
- **Canonical tags** (evitar conteúdo duplicado, ex.: filtros/parâmetros), **hreflang** para PT/EN (cap. 13.10).
- **Dados estruturados (Schema.org)** — vantagem competitiva de *rich results*:
  | Página | Schema |
  |--------|--------|
  | Home/Marca | `Organization`, `LodgingBusiness`/`Resort`, `LocalBusiness` |
  | Acomodação | `Hotel`/`LodgingBusiness` + `Offer` (preço) + `AggregateRating` |
  | Restaurante | `Restaurant` + `Menu`/`MenuItem` |
  | Passeio | `TouristAttraction`/`Event`/`Product` + `Offer` |
  | Casamento/Eventos | `Event`, `Service` |
  | Museu/Obra | `Museum`, `VisualArtwork` |
  | Blog | `Article`/`BlogPosting` |
  | Global | `BreadcrumbList`, `FAQPage`, `WebSite` (Sitelinks Searchbox) |
- **Metadados** por página (title, description, OG/Twitter cards para compartilhamento bonito) gerenciados no CMS (cap. 12) — cada página editável pelo marketing.

## 15.3 SEO local (decisivo para hotelaria de destino)

- **Google Business Profile** impecável (hotel, restaurante, museu como entidades), NAP consistente (nome/endereço/telefone) em todo lugar, fotos, avaliações.
- Página **"Como chegar"** rica (de Recife, Caruaru, aeroporto), mapa, tempo de viagem — captura "como chegar em Garanhuns".
- **Reviews** integradas e incentivadas (prova social + sinal de ranking).
- Presença em diretórios de turismo de PE e parcerias (FIG, turismo estadual) para backlinks locais.

## 15.4 SEO de conteúdo — o "Diário do Lago" (`/diario`)

Motor orgânico de topo de funil e autoridade:
- Clusters temáticos: "o que fazer no inverno em Garanhuns", "roteiro romântico no Agreste", "guia do São João", "casamento no campo: como planejar", "os pratos do chef Dom Dina", conteúdo do museu.
- **Estratégia pillar + cluster:** páginas-pilar (ex.: "Guia de Garanhuns") linkando artigos específicos → arquitetura de links internos que distribui autoridade e mantém o usuário no site.
- Conteúdo **genuinamente útil e único** (E-E-A-T: experiência, especialidade, autoridade, confiança) — nada de texto raso de IA (cap. 14.5/19). Fotos e vídeos próprios.
- Cada artigo cross-linka para conversão (reserva, restaurante, casamentos).

## 15.5 Core Web Vitals & Performance (orçamento rígido)

Metas de campo (RUM, p75), não só de laboratório:
| Métrica | Meta | Como garantimos |
|---------|------|-----------------|
| **LCP** | < 2,5s | Poster/imagem otimizada como LCP (não o vídeo), SSG/CDN, `next/image`, preconnect |
| **INP** | < 200ms | JS mínimo na thread principal, code-split de GSAP/Three, handlers leves, sem long tasks no scroll |
| **CLS** | < 0,1 | Dimensões reservadas para mídia, LQIP/blur, fontes com `font-display: optional/swap` + preload |
| **TTFB** | baixo | Edge/CDN, ISR |

- **Orçamento de performance no CI** (Lighthouse CI que **reprova o build** se estourar) — performance vira contrato, não boa vontade.
- **Mídia:** AVIF/WebP, `srcset`/sizes, lazy-load, vídeo HLS adaptativo com poster, fontes subsetadas e locais, priorização do hero.
- **JS:** o transacional (reserva) carrega leve; o espetáculo (Three/GSAP) só onde é usado e sob demanda. Nunca carregar a Home inteira de animação no checkout.
- **Terceiros sob controle:** scripts de analytics/pixel carregados de forma diferida/particionada (cap. 16) — tags de terceiro são a causa nº1 de INP ruim.
- **Performance = SEO = conversão = luxo:** um site lento é, ao mesmo tempo, mal rankeado, de baixa conversão e "não-premium". As três dores têm a mesma cura.

## 15.6 Indexação e monitoramento

- **Google Search Console** + Bing Webmaster: monitorar cobertura, consultas, CTR, CWV reais, erros.
- Submissão de sitemap, inspeção de URL, acompanhamento de posição por cluster.
- **Estratégia de indexação:** indexar conteúdo e landings; **noindex** em checkout, área logada, admin, resultados de filtro sem valor, páginas utilitárias. Evitar *index bloat*.
- Auditorias técnicas periódicas (links quebrados, redirects, schema válido).

## 15.7 Acessibilidade como SEO

WCAG 2.2 AA (cap. 02/19): HTML semântico, alt text real, headings corretos, contraste — o Google recompensa e o público aumenta. Acessibilidade e SEO puxam na mesma direção.

## 15.8 KPIs de SEO

Tráfego orgânico (por cluster), posições-alvo, CTR orgânico, conversão do orgânico, reservas assistidas por SEO, backlinks/autoridade, CWV de campo, participação de canal direto vs. pago/OTA. Meta estratégica: **reduzir dependência de mídia paga e OTA** crescendo o orgânico (menor CAC — cap. 16).

Seguir para o **[Capítulo 16 — Analytics & Inteligência de Dados](16-analytics.md)**.
