export type WeddingPackage = {
  slug: string;
  name: string;
  guests: string;
  includedGuests: number;
  maxGuests: number;
  extraGuestCost: number;
  tagline: string;
  description: string;
  startingPrice: number;
  includes: string[];
};

export const weddingPackages: WeddingPackage[] = [
  {
    slug: "intimista",
    name: "Intimista à Beira do Lago",
    guests: "até 40 convidados",
    includedGuests: 40,
    maxGuests: 60,
    extraGuestCost: 380,
    tagline: "Cerimônia na capela, recepção no embarcadouro.",
    description:
      "Para celebrações menores e mais próximas: cerimônia na capela centenária e recepção no embarcadouro, com o lago como cenário principal.",
    startingPrice: 38000,
    includes: [
      "Capela e embarcadouro reservados",
      "Decoração base em tons naturais",
      "Menu degustação Dom Dina para os convidados",
      "Coordenação no dia",
      "10 diárias de cortesia para os noivos",
    ],
  },
  {
    slug: "classico",
    name: "Clássico do Agreste",
    guests: "até 120 convidados",
    includedGuests: 120,
    maxGuests: 160,
    extraGuestCost: 420,
    tagline: "O jardim principal e o salão de eventos por inteiro.",
    description:
      "O pacote mais procurado: jardim principal para a cerimônia, salão de eventos climatizado para a festa, e curadoria completa de fornecedores parceiros.",
    startingPrice: 76000,
    includes: [
      "Jardim principal + salão de eventos",
      "Curadoria de decoração, banda e cerimonial",
      "Menu personalizado com o chef",
      "Open bar de 6 horas",
      "Suíte Master para a noite de núpcias",
      "15 diárias de cortesia para os noivos",
    ],
  },
  {
    slug: "destino",
    name: "Casamento-Destino",
    guests: "até 200 convidados",
    includedGuests: 200,
    maxGuests: 240,
    extraGuestCost: 480,
    tagline: "A fazenda inteira, por um fim de semana inteiro.",
    description:
      "Exclusividade total da propriedade por três dias — welcome dinner na sexta, cerimônia e festa no sábado, brunch de despedida no domingo.",
    startingPrice: 165000,
    includes: [
      "Exclusividade da fazenda por 3 dias",
      "Welcome dinner + cerimônia + festa + brunch",
      "Hospedagem para até 40 convidados inclusa",
      "Produção completa (decoração, banda, cerimonial, iluminação)",
      "Concierge dedicado aos noivos",
    ],
  },
];

export function getWeddingPackage(slug: string) {
  return weddingPackages.find((p) => p.slug === slug);
}
