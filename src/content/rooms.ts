export type Room = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  basePrice: number;
  maxAdults: number;
  maxChildren: number;
  sizeM2: number;
  bedConfig: string;
  view: string;
  amenities: string[];
  heroPalette: [string, string];
  /** Foto real da acomodação, quando disponível. */
  image?: { src: string; alt: string };
};

export const rooms: Room[] = [
  {
    slug: "suite-master",
    name: "Suíte Master Lago",
    tagline: "Varanda suspensa sobre a água, lareira e banheira de imersão.",
    description:
      "A suíte de assinatura da fazenda: cama de casal king, varanda privativa voltada para o lago e lareira para as noites frias do Agreste.",
    longDescription:
      "Pensada para casais em fuga romântica, a Suíte Master Lago abre para uma varanda suspensa sobre a água — o lugar certo para o café da manhã na neblina das 6h. Lareira a lenha, banheira de imersão com vista, enxoval em algodão egípcio e adega climatizada de cortesia.",
    basePrice: 1890,
    maxAdults: 2,
    maxChildren: 1,
    sizeM2: 52,
    bedConfig: "1 cama king",
    view: "Vista frontal para o lago",
    amenities: [
      "Lareira a lenha",
      "Banheira de imersão",
      "Varanda privativa",
      "Ar-condicionado",
      "Wi-Fi de alta velocidade",
      "Adega de cortesia",
      "Roupão e amenities autorais",
      "Serviço de quarto",
    ],
    heroPalette: ["#1d2f25", "#3a5b46"],
    image: {
      src: "/images/hospedagem/suite-master-banheira.jpg",
      alt: "Banheira de imersão em suíte com parede de pedra e teto de madeira",
    },
  },
  {
    slug: "suite-familia",
    name: "Suíte Família Agreste",
    tagline: "Dois ambientes, varanda ampla e sossego para todas as idades.",
    description:
      "Dois ambientes conectados, varanda ampla e distância curta do lago — desenhada para famílias que buscam conforto sem abrir mão da proximidade com a natureza.",
    longDescription:
      "Um living separado do quarto principal, cama adicional para as crianças, banheira externa e vista para o jardim de mata nativa. A poucos passos da trilha e do embarcadouro de pedalinhos — o ponto de partida perfeito para os dias em família.",
    basePrice: 2260,
    maxAdults: 4,
    maxChildren: 2,
    sizeM2: 78,
    bedConfig: "1 cama king + 2 camas de solteiro",
    view: "Vista para o jardim e trilha",
    amenities: [
      "Living separado",
      "Banheira externa",
      "Varanda ampla",
      "Berço sob consulta",
      "Ar-condicionado",
      "Wi-Fi de alta velocidade",
      "Frigobar abastecido",
      "Kit de boas-vindas infantil",
    ],
    heroPalette: ["#2a4334", "#4d7359"],
  },
  {
    slug: "chale",
    name: "Chalé da Neblina",
    tagline: "Madeira de lei, lareira e a névoa do Agreste na varanda.",
    description:
      "Isolado entre os pés de araucária, o chalé é a versão mais rústica-sofisticada da fazenda — madeira maciça, teto alto e uma varanda voltada para o nascer do sol.",
    longDescription:
      "Construído em madeira de lei com pé-direito alto, o Chalé da Neblina fica no ponto mais alto da propriedade — o primeiro lugar a receber a luz da manhã e o último a perder o sol. Ideal para quem busca privacidade total.",
    basePrice: 1590,
    maxAdults: 2,
    maxChildren: 2,
    sizeM2: 45,
    bedConfig: "1 cama queen + sofá-cama",
    view: "Vista para a mata e nascer do sol",
    amenities: [
      "Lareira a lenha",
      "Deque privativo",
      "Rede na varanda",
      "Ar-condicionado",
      "Wi-Fi de alta velocidade",
      "Cafeteira e chaleira",
    ],
    heroPalette: ["#4c636b", "#7d97a1"],
    image: {
      src: "/images/hospedagem/chale-cama-dossel.jpg",
      alt: "Cama com dossel e cortinas brancas em quarto de madeira maciça",
    },
  },
  {
    slug: "standard",
    name: "Suíte Standard Jardim",
    tagline: "Elegância enxuta, a poucos passos de tudo.",
    description:
      "Compacta e bem resolvida, com acesso rápido ao restaurante e às áreas comuns — a entrada ideal para conhecer a fazenda.",
    longDescription:
      "A Suíte Standard Jardim entrega o mesmo padrão de enxoval e acabamento das demais categorias, em uma metragem mais compacta e localização central — a poucos passos do Restaurante Dom Dina e da piscina.",
    basePrice: 1120,
    maxAdults: 2,
    maxChildren: 1,
    sizeM2: 30,
    bedConfig: "1 cama queen",
    view: "Vista para o jardim",
    amenities: [
      "Ar-condicionado",
      "Wi-Fi de alta velocidade",
      "Frigobar",
      "Varanda compartilhada",
    ],
    heroPalette: ["#a35a3d", "#d9a48c"],
    image: {
      src: "/images/hospedagem/standard-quarto.jpg",
      alt: "Quarto compacto com TV de parede e decoração industrial",
    },
  },
];

export function getRoomBySlug(slug: string) {
  return rooms.find((r) => r.slug === slug);
}
