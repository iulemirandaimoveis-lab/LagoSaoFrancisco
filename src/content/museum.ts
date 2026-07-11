export type MuseumPiece = {
  slug: string;
  title: string;
  image: string;
  alt: string;
};

export type MuseumCollection = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  palette: [string, string];
  pieces: MuseumPiece[];
};

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};

/**
 * Acervo real do Museu Expolago, fotografado no local. Fonte da descrição
 * geral (coleção multicultural, artistas de Garanhuns/Região + 11 países):
 * site institucional da Fazenda Lago São Francisco.
 */
export const museumIntro = {
  lead: "O Expolago reúne, sob o mesmo teto, um acervo multicultural raro para um destino rural do Agreste: obras de artistas e artesãos de Garanhuns e Região ao lado de peças vindas de mais de onze países.",
  visita: "O acesso ao museu está incluso no Day Use da fazenda, aberto todos os dias — inclusive feriados.",
};

export const collections: MuseumCollection[] = [
  {
    slug: "arte-sacra",
    eyebrow: "Núcleo I",
    title: "Arte Sacra",
    description:
      "Painéis emoldurados em madeira entalhada, ícones e esculturas em tamanho natural dedicados à iconografia católica — do Sagrado Coração à Última Ceia recriada em estátuas — reunidos como referência de fé, ofício e imaginária popular.",
    palette: ["#b56a4a", "#d9a48c"],
    pieces: [
      {
        slug: "coracoes-cristo-rei",
        title: "Galeria dos Sagrados Corações",
        image: "/images/museu/sacra-coracoes-cristo-rei.jpg",
        alt: "Estátua de Cristo Rei ladeada por painéis emoldurados do Sagrado Coração de Maria e do Sagrado Coração de Jesus",
      },
      {
        slug: "ultima-ceia",
        title: "Última Ceia",
        image: "/images/museu/sacra-ultima-ceia.jpg",
        alt: "Cenário com estátuas em tamanho natural recriando a Última Ceia, sobre tarima com cenário pintado ao fundo",
      },
      {
        slug: "cristo-flagelado",
        title: "Cristo Flagelado",
        image: "/images/museu/sacra-cristo-flagelado.jpg",
        alt: "Painel em relevo policromado representando Cristo coroado de espinhos, sentado e flagelado",
      },
      {
        slug: "sao-miguel-sao-jorge",
        title: "São Miguel Arcanjo e São Jorge",
        image: "/images/museu/sacra-sao-miguel-sao-jorge.jpg",
        alt: "Dois quadros emoldurados em madeira entalhada, retratando São Miguel Arcanjo com a balança e São Jorge lanceando o dragão a cavalo",
      },
      {
        slug: "galeria-sagrado-coracao",
        title: "Sala do Sagrado Coração",
        image: "/images/museu/sacra-galeria-sagrado-coracao.jpg",
        alt: "Sala do museu com estátua de Jesus segurando um cálice, cercada por quadros de santos emoldurados",
      },
      {
        slug: "anjo-dragao-madeira",
        title: "Arcanjo e dragão esculpidos",
        image: "/images/museu/sacra-anjo-dragao-madeira.jpg",
        alt: "Esculturas em madeira de um dragão alado e de um cavaleiro sobre cavalo branco, diante de quadro de São Miguel Arcanjo",
      },
      {
        slug: "dragao-esculpido-detalhe",
        title: "Dragão esculpido, detalhe",
        image: "/images/museu/sacra-dragao-esculpido-detalhe.jpg",
        alt: "Detalhe de escultura em madeira de um dragão alado com as fauces abertas",
      },
    ],
  },
  {
    slug: "arte-regional",
    eyebrow: "Núcleo II",
    title: "Arte Regional & Vida no Agreste",
    description:
      "Pinturas, esculturas e miniaturas que retratam o cotidiano do Agreste pernambucano — vaqueiros, cavalos, natureza-morta e paisagens dos arredores de Garanhuns — ao lado de peças contemporâneas em metal reciclado.",
    palette: ["#2a4334", "#4d7359"],
    pieces: [
      {
        slug: "vaqueiros-e-bichos",
        title: "Vaqueiros e bichos da fazenda",
        image: "/images/museu/regional-vaqueiros-e-bichos.jpg",
        alt: "Esculturas de vaqueiros do sertão e animais de fazenda, ao lado de pinturas regionais emolduradas",
      },
      {
        slug: "cavaleiros-lua-cheia",
        title: "Cavaleiros sob lua cheia",
        image: "/images/museu/regional-cavaleiros-lua-cheia.jpg",
        alt: "Três pinturas emolduradas em madeira entalhada retratando cavalos e um cavaleiro sob lua cheia",
      },
      {
        slug: "animais-miniatura",
        title: "Animais em miniatura",
        image: "/images/museu/regional-animais-miniatura.jpg",
        alt: "Miniaturas esculpidas de cavalo, vacas e uma águia sobre mesas de exposição",
      },
      {
        slug: "arte-metal-reciclado",
        title: "Esculturas em metal reciclado",
        image: "/images/museu/regional-arte-metal-reciclado.jpg",
        alt: "Esculturas de pássaros e de um rinoceronte feitas com peças de metal reciclado, diante de pinturas e retratos",
      },
    ],
  },
  {
    slug: "colecao-mundial",
    eyebrow: "Núcleo III",
    title: "Coleção Mundial",
    description:
      "Núcleo multicultural reunido ao longo de décadas: trajes, adereços, máscaras, espadas e pinturas vindos da China, do Japão, do Tibete, da Indonésia e de outros países do acervo internacional do Expolago.",
    palette: ["#3a3f66", "#8a7fb0"],
    pieces: [
      {
        slug: "guerreiro-mongol",
        title: "Guerreiro mongol",
        image: "/images/museu/mundial-guerreiro-mongol.jpg",
        alt: "Estátua de guerreiro mongol em armadura, com arco e espada, ao lado de gravuras orientais emolduradas",
      },
      {
        slug: "dragao-chines",
        title: "Dragão chinês",
        image: "/images/museu/mundial-dragao-chines.jpg",
        alt: "Recorte de dragão chinês vermelho emoldurado, ao lado de amuleto tradicional e pintura de paisagem",
      },
      {
        slug: "traje-mandarim-tibet",
        title: "Traje mandarim e pôster do Tibete",
        image: "/images/museu/mundial-traje-mandarim-tibet.jpg",
        alt: "Manequim vestido com traje mandarim chinês bordado, ao lado de painel fotográfico do Palácio de Potala, no Tibete",
      },
      {
        slug: "indumentaria-chinesa",
        title: "Indumentária chinesa",
        image: "/images/museu/mundial-indumentaria-chinesa.jpg",
        alt: "Vitrine de adereços chineses emoldurados, manequim com traje vermelho tradicional e casacos de seda em cabideiro",
      },
      {
        slug: "mascaras-e-bonecas",
        title: "Máscaras e bonecas asiáticas",
        image: "/images/museu/mundial-mascaras-e-bonecas.jpg",
        alt: "Máscaras balinesas, bonecas japonesas em quimono e esculturas indonésias expostas em pedestais",
      },
      {
        slug: "katanas-e-tapecarias",
        title: "Katanas e tapeçarias",
        image: "/images/museu/mundial-katanas-e-tapecarias.jpg",
        alt: "Katanas em suporte de madeira diante de pintura de paisagem e tapeçarias mola em vermelho e preto",
      },
    ],
  },
];

export const timeline: TimelineEntry[] = [
  { year: "1948", title: "Fundação da fazenda", description: "A propriedade nasce como fazenda de gado e café na altitude do Agreste." },
  { year: "1965", title: "Represamento do lago", description: "A construção da barragem forma o lago que hoje é o centro da experiência." },
  { year: "1979", title: "Primeira coleção de arte", description: "Início do acervo com doações de artistas locais, semente do futuro museu." },
  { year: "2003", title: "Abertura do Restaurante Dom Dina", description: "A cozinha da matriarca da família vira restaurante aberto a hóspedes e visitantes." },
  { year: "2016", title: "Inauguração do Museu Expolago", description: "O acervo reunido por décadas ganha espaço expositivo permanente." },
  { year: "2026", title: "Nova plataforma digital", description: "A experiência da fazenda passa a começar antes da chegada — na tela." },
];
