export type EventTicket = {
  id: string;
  name: string;
  description: string;
  price: number;
  maxPerOrder: number;
};

export type EventItem = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string[];
  date: string;
  startTime: string;
  endTime: string;
  saleEndsAt: string;
  location: {
    name: string;
    address: string;
    mapsQuery: string;
  };
  heroPalette: [string, string];
  highlights: string[];
  policies: string[];
  tickets: EventTicket[];
};

/**
 * Evento migrado da Sympla (day-use-lago-sao-francisco-12-07-2026) para venda
 * direta, com checkout próprio e Mercado Pago no lugar da taxa de serviço da Sympla.
 */
export const events: EventItem[] = [
  {
    slug: "day-use-lago-sao-francisco",
    name: "Day Use Lago São Francisco",
    tagline: "Um dia inteiro à beira do lago, com passeios à la carte.",
    description:
      "Acesso de um dia à Fazenda Lago São Francisco: piscinas aquecidas, redário e margem do lago, com passeios avulsos (pedalinho, cavalo/pônei, tirolesa, cinema 6D) e ensaio fotográfico disponíveis como complemento.",
    longDescription: [
      "O Day Use dá acesso de um dia inteiro à área de lazer da fazenda — piscinas aquecidas, redário entre as árvores e a margem do lago — sem hospedagem. É a porta de entrada para quem quer conhecer a Fazenda Lago São Francisco em Garanhuns antes de planejar uma estadia completa.",
      "Além do acesso simples, é possível combinar o ingresso com um passeio: pedalinho, passeio a cavalo ou pônei (opção família), tirolesa ou a sala de Cinema 6D. Também há ingresso avulso para café da manhã e para ensaio fotográfico (individual ou casal) nos pontos mais fotogênicos da propriedade.",
      "Crianças até 4 anos não pagam ingresso. De 5 a 12 anos, o valor é reduzido. Todos os ingressos dão direito a um único dia de acesso, na data do evento.",
    ],
    date: "2026-07-12",
    startTime: "09:00",
    endTime: "17:00",
    saleEndsAt: "2026-07-12T17:00:00-03:00",
    location: {
      name: "Fazenda Lago São Francisco | Turística & Lazer",
      address: "Garanhuns - PE",
      mapsQuery: "Fazenda Lago São Francisco, Garanhuns, PE",
    },
    heroPalette: ["#1d2f25", "#7d97a1"],
    highlights: [
      "Acesso de um dia às piscinas aquecidas, redário e margem do lago",
      "Passeios à la carte: pedalinho, cavalo/pônei, tirolesa e Cinema 6D",
      "Ensaio fotográfico individual ou de casal nos pontos mais bonitos da fazenda",
      "Café da manhã disponível como complemento do ingresso",
      "Pagamento em Pix, cartão (até 12x) ou boleto — sem taxa de serviço extra",
    ],
    policies: [
      "Ingressos válidos apenas para a data do evento, 12/07/2026, das 09h às 17h.",
      "Crianças até 4 anos não pagam ingresso, mas precisam ser cadastradas no pedido.",
      "Cada passeio (pedalinho, cavalo/pônei, tirolesa, Cinema 6D) é vendido como complemento do Day Use, com vagas sujeitas a disponibilidade no local.",
      "Ingresso é pessoal e intransferível; leve um documento com foto e o comprovante de compra (e-mail de confirmação).",
      "Em caso de chuva forte que impeça o uso do lago, a organização informa a política de remarcação pelo e-mail cadastrado na compra.",
    ],
    tickets: [
      {
        id: "day-use-simples",
        name: "Day Use Simples",
        description: "Acesso de um dia às piscinas aquecidas, redário e margem do lago.",
        price: 35,
        maxPerOrder: 15,
      },
      {
        id: "day-use-crianca-4",
        name: "Day Use Criança (até 4 anos)",
        description: "Gratuito. Necessário cadastrar a criança no pedido.",
        price: 0,
        maxPerOrder: 10,
      },
      {
        id: "day-use-crianca-5-12",
        name: "Day Use Criança (5 a 12 anos)",
        description: "Acesso de um dia para crianças de 5 a 12 anos.",
        price: 17.5,
        maxPerOrder: 10,
      },
      {
        id: "day-use-cafe",
        name: "Day Use + Café da Manhã",
        description: "Acesso de um dia com café da manhã incluso.",
        price: 50,
        maxPerOrder: 15,
      },
      {
        id: "day-use-circuito",
        name: "Day Use + Circuito de Passeios",
        description: "Acesso de um dia com o circuito completo de passeios incluso.",
        price: 70,
        maxPerOrder: 15,
      },
      {
        id: "circuito-passeios",
        name: "Circuito de Passeios",
        description: "Circuito de passeios avulso, sem o acesso de Day Use.",
        price: 50,
        maxPerOrder: 15,
      },
      {
        id: "day-use-pedalinho",
        name: "Day Use + Passeio de Pedalinho",
        description: "Acesso de um dia com passeio de pedalinho incluso.",
        price: 60,
        maxPerOrder: 15,
      },
      {
        id: "day-use-cavalo",
        name: "Day Use + Passeio (Cavalo/Pônei)",
        description: "Acesso de um dia com passeio a cavalo ou pônei incluso.",
        price: 50,
        maxPerOrder: 15,
      },
      {
        id: "day-use-tirolesa",
        name: "Day Use + Tirolesa",
        description: "Acesso de um dia com passeio de tirolesa incluso.",
        price: 60,
        maxPerOrder: 15,
      },
      {
        id: "day-use-cinema-6d",
        name: "Day Use + Passeio (Cinema 6D)",
        description: "Acesso de um dia com sessão na sala de Cinema 6D incluída.",
        price: 50,
        maxPerOrder: 15,
      },
      {
        id: "ensaio-individual",
        name: "Ensaio Fotográfico Individual",
        description: "Sessão de fotos individual com fotógrafo parceiro, em pontos selecionados da fazenda.",
        price: 50,
        maxPerOrder: 5,
      },
      {
        id: "ensaio-casal",
        name: "Ensaio Fotográfico (Casal)",
        description: "Sessão de fotos para casais com fotógrafo parceiro, em pontos selecionados da fazenda.",
        price: 150,
        maxPerOrder: 5,
      },
    ],
  },
];

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function getTicketById(event: EventItem, ticketId: string) {
  return event.tickets.find((t) => t.id === ticketId);
}

/** Preço do ingresso padrão do evento (Day Use adulto), usado como "a partir de" nas listagens. */
export function startingPrice(event: EventItem) {
  return event.tickets[0]?.price ?? 0;
}
