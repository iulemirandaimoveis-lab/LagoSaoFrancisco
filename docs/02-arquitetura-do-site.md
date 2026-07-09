# Capítulo 02 — Arquitetura do Site

## 2.1 Princípios de arquitetura da informação

Antes do sitemap, os princípios que o justificam:

1. **Duas velocidades, um mundo.** A plataforma tem uma alma **editorial/cinematográfica** (descobrir, sonhar, desejar) e uma alma **transacional** (reservar, pagar, gerenciar). São ritmos opostos: a primeira é lenta e imersiva; a segunda é rápida e sem fricção. A arquitetura precisa deixar o usuário **fluir do modo sonho para o modo compra** sem quebra brusca — a reserva não pode parecer "outro site".
2. **Cada experiência é um produto com página própria.** Suítes, passeios, o restaurante, cada pacote de casamento, cada evento e cada exposição têm URL canônica, metadados e capacidade de ser reservados/indexados isoladamente. Isso é decisão de SEO **e** de revenue: cada página é uma porta de entrada e um ponto de conversão.
3. **A reserva é onipresente, nunca intrusiva.** Uma *booking bar* persistente e contextual acompanha o usuário; ele nunca precisa "achar onde reserva", mas nunca é empurrado antes de desejar.
4. **Profundidade progressiva.** Home → universo → experiência → detalhe → ação. Cada nível revela mais, sem exigir que o usuário engula tudo de uma vez (evita sobrecarga cognitiva).
5. **Mobile é o palco principal.** A maioria decide e reserva no celular. Toda decisão de arquitetura é validada primeiro no mobile.

## 2.2 Mapa de páginas (Sitemap)

```
/ (Home — scrollytelling)
│
├── /a-fazenda ................. A história, o lugar, o clima, os fundadores, a filosofia
│   └── /a-fazenda/mapa ........ Mapa 3D interativo da propriedade (hub de navegação espacial)
│
├── /hospedagem ................ Hub das acomodações (mapa aéreo + comparador)
│   ├── /hospedagem/suite-master
│   ├── /hospedagem/suite-familia
│   ├── /hospedagem/chale
│   └── /hospedagem/standard
│         (cada uma: galeria, vídeo, tour 360°, storytelling, disponibilidade, preço)
│
├── /reservar .................. Motor de reservas (fluxo completo — cap. 04)
│   ├── /reservar/checkout
│   └── /reservar/confirmacao
│
├── /restaurante ............... Dom Dina (site-dentro-do-site — cap. 07)
│   ├── /restaurante/cardapio .. Cardápio digital interativo (destino do QR Code)
│   ├── /restaurante/experiencias-do-chef
│   └── /restaurante/reservar-mesa
│
├── /experiencias .............. Hub de passeios & atividades (cap. 08)
│   ├── /experiencias/pedalinho
│   ├── /experiencias/tirolesa
│   ├── /experiencias/caiaque
│   ├── /experiencias/pesca
│   ├── /experiencias/trilhas
│   ├── /experiencias/por-do-sol
│   └── ... (uma página por atividade)
│
├── /casamentos ................ Landing premium + subfluxo (cap. 09)
│   ├── /casamentos/pacotes
│   ├── /casamentos/galeria
│   ├── /casamentos/orcamento .. Simulador + solicitação (lead)
│   └── /casamentos/disponibilidade
│
├── /eventos ................... Agenda + eventos corporativos e culturais
│   ├── /eventos/[slug] ........ Landing por evento (São João, FIG, festival gastronômico)
│   └── /eventos/corporativo ... Retiros e offsites
│
├── /museu ..................... Museu Expolago — experiência digital (cap. 10)
│   ├── /museu/acervo
│   ├── /museu/artistas
│   └── /museu/linha-do-tempo
│
├── /vouchers .................. Compra de vale-presente
│
├── /diario .................... Blog editorial / conteúdo SEO (o "Diário do Lago")
│   └── /diario/[slug]
│
├── /contato ................... Contato, como chegar, mapa, FAQ
│
├── /conta ..................... Área do Hóspede (autenticada — cap. 11)
│   ├── /conta/reservas
│   ├── /conta/pagamentos
│   ├── /conta/documentos
│   ├── /conta/favoritos
│   ├── /conta/fidelidade
│   └── /conta/concierge
│
├── /admin ..................... Backoffice (autenticado, isolado — cap. 12)
│
└── Utilitárias: /politica-de-privacidade, /termos, /acessibilidade, /sitemap.xml, /404, /500
```

## 2.3 Racional das escolhas de URL

- **Português nas URLs** (`/hospedagem`, `/experiencias`): SEO local em PT-BR é o alvo primário; URLs em português rankeiam e comunicam melhor ao público doméstico. Versão EN sob prefixo `/en/` (ver i18n).
- **`/reservar` separado de `/hospedagem`:** separa o modo-sonho (navegar acomodações) do modo-compra (transacionar), permitindo tratamento visual e de performance distinto, além de funil de analytics limpo.
- **`/experiencias` em vez de `/passeios`:** alinha à tese estratégica ("vendemos experiências"). "Passeios" fica como rótulo de navegação amigável, mas o conceito-guarda-chuva é experiência.
- **`/diario` (blog):** conteúdo é o motor de SEO orgânico e de nutrição de marca; nome editorial ("Diário do Lago") reforça o tom, evita o clichê "/blog".

## 2.4 Mapa de navegação

**Header (desktop):** logo centralizado ou à esquerda; navegação enxuta — **A Fazenda · Hospedagem · Restaurante · Experiências · Casamentos · Museu** — e um **botão "Reservar" destacado** (única cor de ação forte no header). O header é **transparente sobre o hero** e ganha fundo sólido ao rolar (transição suave, ver cap. 03).

**Header (mobile):** logo + botão Reservar sempre visível + menu hambúrguer que abre um **overlay fullscreen imersivo** (não uma listinha), com imagem de fundo e tipografia grande — o menu já é experiência.

**Booking bar contextual:** em páginas de hospedagem e experiências, uma barra fina fixa (bottom no mobile, sticky no desktop) resume "datas · hóspedes · a partir de R$ X" e leva ao motor. Aparece após o usuário passar o primeiro dobra (não polui o hero).

**Footer:** rico, funciona como mapa do site — colunas (Descobrir, Reservar, Sobre, Ajuda), newsletter ("Receba o Diário do Lago"), redes, selos (segurança de pagamento, sustentabilidade), como chegar, telefone/WhatsApp. Footer é âncora de SEO interno e de confiança.

## 2.5 Fluxos principais (jornadas mapeadas)

### Fluxo A — Descoberta → Reserva de hospedagem (o fluxo-mãe)
```
Home (encanta) → Hospedagem (projeta) → [página da suíte] (deseja: 360°, vídeo)
   → seleciona datas na booking bar → /reservar (disponibilidade + preço RM)
   → escolhe hóspedes/quarto → upsell de experiências e F&B → checkout → pagamento
   → confirmação → e-mail (Resend) + add ao Google Calendar → cria/loga conta → pré-estadia
```

### Fluxo B — Casamento (lead de alto ticket, ciclo longo)
```
Anúncio/Pinterest → /casamentos (emociona) → galeria/vídeo → /pacotes → simulador de orçamento
   → verifica disponibilidade de data → formulário de lead (rico) → CRM
   → e-mail/WhatsApp automático + agendamento de visita → nutrição → proposta → contrato/assinatura
```

### Fluxo C — Restaurante como destino independente
```
Busca "restaurante Garanhuns vista lago" → /restaurante → cardápio digital (deseja)
   → /reservar-mesa (data, horário, nº pessoas, ocasião) → confirmação → lembrete
   (variante: QR Code na mesa → /restaurante/cardapio → pedir/harmonizar no local)
```

### Fluxo D — Day-use / passeio avulso
```
/experiencias → filtra (idade, dificuldade, duração) → [passeio] → reserva com data/horário → pagamento
```

### Fluxo E — Hóspede recorrente
```
Login → /conta → vê próxima reserva → concierge planeja o roteiro → adiciona experiências → check-in digital
```

## 2.6 Hierarquia e relacionamento entre páginas

- **Home** é o único nó que se conecta a *todos* os universos; é o átrio.
- **Hubs** (`/hospedagem`, `/experiencias`, `/restaurante`, `/casamentos`, `/museu`) são os "cômodos"; cada um agrega suas folhas.
- **Folhas** (uma suíte, um passeio) são os pontos de conversão e as landing pages de SEO/anúncio.
- **Cross-linking deliberado:** a página de uma suíte sugere passeios e um jantar no Dom Dina (aumenta anexo de experiências e tempo de sessão); a página do restaurante sugere hospedagem; a de casamentos sugere hospedagem para convidados. **Cada página vende as vizinhas.**
- **`/a-fazenda/mapa` (mapa 3D)** é um hub alternativo, espacial em vez de textual — o usuário navega clicando em pontos da propriedade. É um diferencial (cap. 06/13), não a navegação primária (por acessibilidade e performance).

## 2.7 Estados globais e páginas de sistema

Todo componente e página deve especificar **quatro estados**: *ideal*, *vazio* (ex.: sem disponibilidade nas datas), *carregando* (skeletons elegantes, nunca spinners genéricos) e *erro* (mensagem de marca, com saída). Páginas 404/500 são oportunidades de marca, não becos sem saída — 404 com foto do lago e busca/atalhos.

## 2.8 Acessibilidade estrutural (WCAG 2.2 AA como piso)

- Navegação por teclado completa; *skip links*; foco visível estilizado (não removido).
- Landmarks semânticos (`header/nav/main/footer`), hierarquia de headings correta.
- Todo o imersivo (scrollytelling, 360°, mapa 3D) tem **alternativa acessível** e respeita `prefers-reduced-motion` (ver cap. 03 e 19). Acessibilidade não é caridade: é público, é SEO, é risco jurídico (LGPD/inclusão) evitado.

Seguir para o **[Capítulo 03 — Scrollytelling da Home](03-scrollytelling-home.md)**.
