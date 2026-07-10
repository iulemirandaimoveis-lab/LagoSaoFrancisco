export type MuseumWork = {
  slug: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  description: string;
};

export type Artist = {
  slug: string;
  name: string;
  origin: string;
  bio: string;
};

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};

export const museumWorks: MuseumWork[] = [
  {
    slug: "neblina-sobre-o-lago",
    title: "Neblina sobre o Lago",
    artist: "Iolanda Freire",
    year: "1978",
    medium: "Óleo sobre tela",
    description: "Uma das primeiras paisagens pintadas na propriedade, doada pela artista pernambucana à família fundadora.",
  },
  {
    slug: "colheita-do-agreste",
    title: "Colheita do Agreste",
    artist: "Severino Bezerra",
    year: "1985",
    medium: "Xilogravura",
    description: "Série de xilogravuras que retrata o ciclo agrícola da região no fim do século XX.",
  },
  {
    slug: "retrato-de-dona-dina",
    title: "Retrato de Dona Dina",
    artist: "Marcos Antônio",
    year: "1992",
    medium: "Carvão sobre papel",
    description: "Retrato da matriarca que dá nome ao restaurante da fazenda, feito em sua cozinha original.",
  },
];

export const artists: Artist[] = [
  {
    slug: "iolanda-freire",
    name: "Iolanda Freire",
    origin: "Garanhuns, PE",
    bio: "Pintora paisagista do Agreste, com obras em coleções de Recife e São Paulo. Retratou o lago em diferentes estações ao longo de quatro décadas.",
  },
  {
    slug: "severino-bezerra",
    name: "Severino Bezerra",
    origin: "Caruaru, PE",
    bio: "Xilogravurista ligado à tradição da literatura de cordel, expandiu a técnica para retratar paisagens e ofícios do Agreste.",
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
