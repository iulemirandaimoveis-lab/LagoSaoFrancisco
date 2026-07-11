export type Experience = {
  slug: string;
  name: string;
  category: "lago" | "trilha" | "bem-estar" | "gastronomia" | "cultura";
  tagline: string;
  description: string;
  longDescription: string;
  durationMinutes: number;
  difficulty: "leve" | "moderado" | "intenso";
  minAge: number;
  price: number;
  priceUnit: "por pessoa" | "por grupo" | "por casal";
  schedule: string[];
  heroPalette: [string, string];
  /** Foto real da experiência, quando disponível. */
  image?: { src: string; alt: string };
};

export const experiences: Experience[] = [
  {
    slug: "pedalinho",
    name: "Pedalinho no Lago",
    category: "lago",
    tagline: "A forma mais simples de entrar na água — em família.",
    description: "Passeio de pedalinho pelas margens do lago, com coletes e monitoria.",
    longDescription:
      "Ideal para famílias, o passeio de pedalinho leva até 45 minutos pelas margens mais calmas do lago, com colete salva-vidas e monitor sempre por perto. Melhor luz: final de tarde, quando o sol baixo pinta a água.",
    durationMinutes: 45,
    difficulty: "leve",
    minAge: 5,
    price: 90,
    priceUnit: "por grupo",
    schedule: ["09:00", "10:30", "15:30", "17:00"],
    heroPalette: ["#4c636b", "#7d97a1"],
    image: {
      src: "/images/experiencias/pedalinho-cisnes.jpg",
      alt: "Pedalinhos em formato de cisne atracados no embarcadouro do lago",
    },
  },
  {
    slug: "caiaque",
    name: "Caiaque ao Amanhecer",
    category: "lago",
    tagline: "Remar sobre a névoa, antes de a fazenda acordar.",
    description: "Saída guiada de caiaque no horário em que a neblina ainda cobre o lago.",
    longDescription:
      "Saída às 6h, quando a névoa ainda paira sobre a água e os pássaros começam o dia. Guiada por um monitor, dura cerca de uma hora e termina com café servido no embarcadouro.",
    durationMinutes: 60,
    difficulty: "moderado",
    minAge: 12,
    price: 140,
    priceUnit: "por pessoa",
    schedule: ["06:00"],
    heroPalette: ["#1d2f25", "#3a5b46"],
  },
  {
    slug: "pesca",
    name: "Pescaria Artesanal",
    category: "lago",
    tagline: "Vara, silêncio e o tempo do lago.",
    description: "Pesca esportiva com equipamento incluso, com opção de preparo da pesca do dia no Dom Dina.",
    longDescription:
      "Equipamento incluso, isca natural e um guia que conhece os melhores pontos do lago. Quem quiser, pode levar a pesca do dia direto para a cozinha do Dom Dina, que prepara sob encomenda.",
    durationMinutes: 120,
    difficulty: "leve",
    minAge: 8,
    price: 160,
    priceUnit: "por pessoa",
    schedule: ["06:30", "16:00"],
    heroPalette: ["#2a4334", "#4d7359"],
  },
  {
    slug: "cavalgada",
    name: "Cavalgada no Agreste",
    category: "trilha",
    tagline: "A propriedade vista do passo dos cavalos.",
    description: "Cavalgada guiada pelas trilhas da fazenda, com cavalos mansos e adequados a iniciantes.",
    longDescription:
      "Uma hora e meia de cavalgada guiada, com cavalos treinados para iniciantes e trilhas que cruzam a mata nativa até um mirante com vista para o lago inteiro.",
    durationMinutes: 90,
    difficulty: "moderado",
    minAge: 10,
    price: 180,
    priceUnit: "por pessoa",
    schedule: ["08:00", "16:00"],
    heroPalette: ["#a35a3d", "#d9a48c"],
  },
  {
    slug: "trilha-mirante",
    name: "Trilha do Mirante",
    category: "trilha",
    tagline: "45 minutos de subida para a melhor vista da fazenda.",
    description: "Caminhada guiada até o mirante mais alto da propriedade, com vista de 360° do lago e do Agreste.",
    longDescription:
      "Trilha de dificuldade moderada, com subida gradual entre araucárias e vegetação nativa. No topo, um mirante com vista de 360° — o ponto preferido para o pôr do sol.",
    durationMinutes: 100,
    difficulty: "moderado",
    minAge: 8,
    price: 70,
    priceUnit: "por pessoa",
    schedule: ["07:00", "16:30"],
    heroPalette: ["#3a443c", "#4d7359"],
  },
  {
    slug: "por-do-sol",
    name: "Pôr do Sol no Embarcadouro",
    category: "lago",
    tagline: "Um espumante, uma manta e o lago em chamas.",
    description: "Experiência contemplativa no embarcadouro privativo, com espumante e petiscos do Dom Dina.",
    longDescription:
      "Reservado com antecedência, o embarcadouro privativo recebe casais e pequenos grupos para assistir ao pôr do sol com uma taça de espumante e uma tábua de petiscos assinada pelo chef.",
    durationMinutes: 75,
    difficulty: "leve",
    minAge: 0,
    price: 260,
    priceUnit: "por casal",
    schedule: ["17:15"],
    heroPalette: ["#c9a86a", "#a4813f"],
  },
  {
    slug: "piscinas",
    name: "Dia de Piscinas & Redário",
    category: "bem-estar",
    tagline: "Água aquecida, espreguiçadeiras e o silêncio do Agreste.",
    description: "Acesso ao complexo de piscinas aquecidas e ao redário entre as árvores.",
    longDescription:
      "O complexo de piscinas aquecidas fica de frente para o jardim, com bar de suco e frutas. A poucos passos, o redário entre as árvores é o lugar certo para uma tarde sem compromisso.",
    durationMinutes: 240,
    difficulty: "leve",
    minAge: 0,
    price: 0,
    priceUnit: "por pessoa",
    schedule: ["08:00 às 18:00"],
    heroPalette: ["#7d97a1", "#b7c8ce"],
  },
  {
    slug: "ensaio-fotografico",
    name: "Ensaio Fotográfico na Fazenda",
    category: "cultura",
    tagline: "Luz natural, lago e arquitetura como cenário.",
    description: "Sessão fotográfica com fotógrafo parceiro, em pontos selecionados da propriedade.",
    longDescription:
      "Perfeita para casais, gestantes e famílias. Um roteiro de 90 minutos pelos pontos mais fotogênicos da fazenda — embarcadouro, capela, jardim de araucárias — com fotógrafo parceiro incluso.",
    durationMinutes: 90,
    difficulty: "leve",
    minAge: 0,
    price: 890,
    priceUnit: "por grupo",
    schedule: ["07:00", "16:00"],
    heroPalette: ["#b56a4a", "#d9a48c"],
  },
];

export function getExperienceBySlug(slug: string) {
  return experiences.find((e) => e.slug === slug);
}

export const experienceCategories: { value: Experience["category"]; label: string }[] = [
  { value: "lago", label: "Lago" },
  { value: "trilha", label: "Trilhas" },
  { value: "bem-estar", label: "Bem-estar" },
  { value: "gastronomia", label: "Gastronomia" },
  { value: "cultura", label: "Cultura" },
];
