# Capítulo 10 — Museu Expolago

> O museu é o ativo mais subestimado da narrativa. Nenhum hotel fazenda concorrente tem um. Ele é a prova viva do arquétipo **Criador** (cap. 01) — transforma o destino de "lugar bonito para relaxar" em "lugar com alma, cultura e propósito". Hoje é apenas uma descrição institucional. Vamos transformá-lo em **experiência digital** que atrai, educa e emociona — e que, de quebra, é ouro de SEO cultural.

## 10.1 Por que investir no museu digitalmente

- **Diferenciação absoluta:** cultura é o que separa um resort de um **destino**. Aman e Six Senses vendem cultura local; nós temos um museu de verdade.
- **Aquisição de novo público:** turismo cultural, escolas, imprensa, circuito FIG. Buscas culturais trazem gente que não buscava hotel.
- **Conteúdo perene de SEO:** obras, artistas e história geram páginas ricas, únicas e linkáveis (autoridade de domínio).
- **Enriquece a estadia:** o hóspede tem mais um motivo para ficar mais um dia (anexo, cap. 08).

## 10.2 Estrutura de `/museu`

1. **Hero contemplativo:** a arquitetura do museu, uma obra em foco sob luz, silêncio. Tom diferente do resto — mais sóbrio, reverente. Frase de abertura sobre a missão do acervo.
2. **A história do Expolago:** por que existe, quem o criou, a relação com o lago e o território.
3. **O acervo** (10.3) — coração da experiência.
4. **Artistas** (10.4).
5. **Linha do tempo** (10.5).
6. **Visita:** horários, como visitar (hóspede e day-use), visitas guiadas agendáveis (usa engine de experiências, cap. 08), acessibilidade do espaço físico.
7. **Áudio-guia digital** (10.6).
8. **Agenda:** exposições temporárias, vernissages, eventos (liga a `/eventos`).

## 10.3 O acervo — catálogo digital navegável

Cada obra é uma **ficha rica** (entidade de conteúdo no CMS):
```
obra (id, slug, titulo, artista_id, ano, tecnica, dimensoes, descricao,
      imagem_alta_res, audio_guia, localizacao_no_museu, tags, colecao)
```
- **Imagem em alta resolução com zoom** (ver pinceladas, detalhes) — experiência que às vezes supera a visita física.
- **Descrição curatorial** — contexto, significado, história da peça.
- **Áudio-guia** por obra (10.6).
- **Filtros/navegação:** por artista, período, técnica, coleção, tema.
- **Localização no mapa do museu** (liga ao 10.7).
- URL própria por obra → **SEO cultural** + `schema.org/VisualArtwork` (cap. 15).

## 10.4 Artistas

Perfil de cada artista: biografia, obras no acervo, contexto, mídia. Cria uma teia de navegação (obra ↔ artista ↔ período) que aumenta profundidade de sessão e valor editorial.

## 10.5 Linha do tempo interativa

Uma **timeline** navegável (scroll horizontal ou vertical com scrollytelling suave, cap. 03) situando obras, artistas e a própria história do museu/fazenda no tempo. Educa e contextualiza; é a "espinha dorsal" narrativa do acervo. Com alternativa em lista para acessibilidade.

## 10.6 Áudio-guia digital

- **Faixas curtas** por obra/sala, narradas com qualidade (voz humana profissional; TTS só como fallback ou para idiomas extras).
- **Acessível no local via QR** em cada obra (como o cardápio do Dom Dina, cap. 07) — o visitante usa o próprio celular e fone, sem hardware dedicado.
- **Transcrição textual** de cada faixa (acessibilidade auditiva + SEO).
- Multi-idioma (PT/EN) na medida do público.
- **(T):** áudio como arquivos em CDN/R2, streaming leve; player custom acessível.

## 10.7 Mapa do museu e experiências imersivas

- **Mapa do museu** (planta com salas e obras posicionadas) — o visitante se orienta e pode "pré-visitar" digitalmente.
- **Tour virtual 360°** das salas (mesma tech do cap. 06) — permite "visitar" de casa, atraindo para a visita real.
- **Realidade aumentada (V3/futuro):** apontar o celular para uma obra e ver camadas (raio-x da pintura, processo do artista, animação). Declarado como visão futura, **não MVP** — AR tem custo alto e ROI incerto; entra só quando o acervo justificar (cap. 19: não fazer tecnologia por marketing).

## 10.8 Integração com a jornada

- Visita guiada ao museu é uma **experiência reservável** (cap. 08) — entra no planejador de roteiro e no carrinho.
- Cross-link: página do museu sugere o jantar no Dom Dina e a hospedagem; o pôr do sol como continuação natural.
- Conteúdo do museu alimenta o `/diario` (blog) e redes — matéria-prima de marketing cultural.

## 10.9 Métricas

Visitas à seção, obras mais vistas, uso do áudio-guia (site vs. QR no local), conversão museu→visita guiada→hospedagem, tráfego orgânico cultural, engajamento na timeline.

## 10.10 Acessibilidade (aqui é especialmente central)

Museu é sobre acesso à cultura — a versão digital deve ser exemplar: alt text curatorial real nas obras, transcrição de áudio-guias, timeline com alternativa textual, navegação por teclado, contraste. Um museu digital inacessível é uma contradição de missão.

Seguir para o **[Capítulo 11 — Área do Hóspede](11-area-do-hospede.md)**.
