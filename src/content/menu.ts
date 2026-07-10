export type Dish = {
  name: string;
  description: string;
  price: number;
  tags?: string[];
  pairing?: string;
};

export type MenuCategory = {
  slug: string;
  name: string;
  description: string;
  dishes: Dish[];
};

export const menu: MenuCategory[] = [
  {
    slug: "entradas",
    name: "Entradas",
    description: "Ingredientes locais, técnica autoral.",
    dishes: [
      {
        name: "Queijo coalho da serra na brasa",
        description: "Mel de engenho, castanha de caju torrada e ervas do jardim.",
        price: 68,
        tags: ["vegetariano"],
        pairing: "Espumante brut nacional",
      },
      {
        name: "Tartare de tilápia do lago",
        description: "Tilápia criada na propriedade, limão-caviar, azeite de coentro.",
        price: 76,
        pairing: "Sauvignon Blanc",
      },
      {
        name: "Pão de fermentação natural",
        description: "Manteiga de garrafa da região e geleia de goiaba da fazenda.",
        price: 42,
        tags: ["vegetariano"],
      },
    ],
  },
  {
    slug: "principais",
    name: "Pratos Principais",
    description: "Da horta e do lago à mesa, no mesmo dia.",
    dishes: [
      {
        name: "Peixe do lago ao molho de ervas",
        description: "Pescado do dia, purê de mandioquinha, molho de ervas do jardim.",
        price: 128,
        pairing: "Chardonnay",
      },
      {
        name: "Cordeiro do Agreste, 12 horas",
        description: "Cordeiro de criadores locais, cozido lentamente, farofa de castanhas.",
        price: 156,
        pairing: "Tinto Syrah",
      },
      {
        name: "Risoto de queijo coalho e goiaba",
        description: "Arbóreo, queijo coalho da serra, redução de goiaba, castanha-de-caju.",
        price: 112,
        tags: ["vegetariano"],
        pairing: "Chardonnay amanteigado",
      },
      {
        name: "Galinha caipira no capote",
        description: "Receita da Dona Dina, arroz de leite e vinagrete de quiabo.",
        price: 118,
        pairing: "Tinto leve, servido fresco",
      },
    ],
  },
  {
    slug: "sobremesas",
    name: "Sobremesas",
    description: "Doçaria do Agreste, revisitada.",
    dishes: [
      {
        name: "Cartola revisitada",
        description: "Banana caramelizada, queijo coalho gelado, canela e crumble de castanha.",
        price: 46,
        tags: ["vegetariano"],
      },
      {
        name: "Fondant de cacau da Mata Sul",
        description: "Centro cremoso, sorvete de café da fazenda.",
        price: 52,
        tags: ["vegetariano"],
        pairing: "Vinho do Porto",
      },
    ],
  },
  {
    slug: "harmonizacao",
    name: "Harmonização & Vinhos",
    description: "Curadoria de rótulos nacionais e importados.",
    dishes: [
      {
        name: "Menu degustação harmonizado",
        description: "5 tempos assinados pelo chef, com harmonização de vinhos incluída.",
        price: 420,
        tags: ["experiência"],
      },
      {
        name: "Taça avulsa — curadoria do sommelier",
        description: "Rótulo do dia, indicado conforme o menu.",
        price: 58,
      },
    ],
  },
];

export function getMenuCategory(slug: string) {
  return menu.find((c) => c.slug === slug);
}
