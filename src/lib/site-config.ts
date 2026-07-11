export const siteConfig = {
  name: "Fazenda Lago São Francisco",
  shortName: "Lago São Francisco",
  tagline: "O refúgio de altitude à beira do lago, no Agreste pernambucano.",
  description:
    "Refúgio de altitude à beira do lago em Garanhuns, Agreste de Pernambuco. Hospedagem, gastronomia autoral no Restaurante Dom Dina, experiências, casamentos e o Museu Expolago.",
  url: "https://lagosaofrancisco.com.br",
  locale: "pt-BR",
  location: {
    city: "Garanhuns",
    state: "Pernambuco",
    region: "Agreste pernambucano",
    address: "Zona Rural, Garanhuns — PE",
    mapsQuery: "Fazenda Lago São Francisco, Garanhuns, PE",
    lat: -8.8909,
    lng: -36.4959,
  },
  contact: {
    phone: "+55 87 99999-0000",
    whatsapp: "5587999990000",
    email: "reservas@lagosaofrancisco.com.br",
  },
  social: {
    instagram: "https://instagram.com/lagosaofrancisco",
    facebook: "https://facebook.com/lagosaofrancisco",
  },
  nav: [
    { label: "A Fazenda", href: "/a-fazenda" },
    { label: "Hospedagem", href: "/hospedagem" },
    { label: "Restaurante", href: "/restaurante" },
    { label: "Experiências", href: "/experiencias" },
    { label: "Casamentos", href: "/casamentos" },
    { label: "Museu", href: "/museu" },
    { label: "Eventos", href: "/eventos" },
  ],
  footerLinks: {
    descobrir: [
      { label: "A Fazenda", href: "/a-fazenda" },
      { label: "Diário do Lago", href: "/diario" },
      { label: "Museu Expolago", href: "/museu" },
      { label: "Eventos", href: "/eventos" },
    ],
    reservar: [
      { label: "Hospedagem", href: "/hospedagem" },
      { label: "Restaurante Dom Dina", href: "/restaurante" },
      { label: "Experiências", href: "/experiencias" },
      { label: "Casamentos", href: "/casamentos" },
      { label: "Vale-presente", href: "/vouchers" },
    ],
    ajuda: [
      { label: "Contato", href: "/contato" },
      { label: "Como chegar", href: "/contato#como-chegar" },
      { label: "Perguntas frequentes", href: "/contato#faq" },
      { label: "Acessibilidade", href: "/acessibilidade" },
    ],
    institucional: [
      { label: "Política de privacidade", href: "/politica-de-privacidade" },
      { label: "Termos de uso", href: "/termos" },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
