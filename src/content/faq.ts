export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: "Qual a distância da Fazenda Lago São Francisco até Recife?",
    answer:
      "Cerca de 2h30 de carro pela BR-232, no eixo Recife–Caruaru–Garanhuns. A fazenda fica na zona rural de Garanhuns, no Agreste pernambucano.",
  },
  {
    question: "Pets são bem-vindos?",
    answer:
      "Sim, em categorias específicas de acomodação e mediante aviso prévio na reserva. Entre em contato antes de confirmar caso viaje com pet.",
  },
  {
    question: "Qual o horário de check-in e check-out?",
    answer: "Check-in a partir das 14h e check-out até as 12h. Early check-in e late check-out sob consulta e disponibilidade.",
  },
  {
    question: "O restaurante Dom Dina é aberto para quem não está hospedado?",
    answer:
      "Sim. O Dom Dina recebe hóspedes e visitantes externos, com reserva de mesa recomendada, especialmente aos finais de semana.",
  },
  {
    question: "Como funciona o cancelamento de reservas?",
    answer:
      "Cancelamentos com mais de 7 dias de antecedência têm reembolso integral; entre 3 e 7 dias, 50%; com menos de 72 horas, a diária da primeira noite é retida. Datas de alta temporada e feriados seguem política estendida, informada no momento da reserva.",
  },
  {
    question: "Crianças pagam à parte?",
    answer:
      "Crianças de até 5 anos não pagam diária. De 6 a 12 anos, taxa reduzida quando ocupam cama adicional. O simulador de reserva calcula automaticamente conforme a categoria escolhida.",
  },
];
