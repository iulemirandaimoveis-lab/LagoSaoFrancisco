import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureSplit } from "@/components/sections/feature-split";
import { ManifestoQuote } from "@/components/sections/manifesto-quote";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Restaurante Dom Dina",
  description:
    "Gastronomia autoral com ingredientes locais no Restaurante Dom Dina, à beira do lago em Garanhuns. Cardápio digital, harmonização e reserva de mesa.",
  alternates: { canonical: "/restaurante" },
};

export default function RestaurantePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Restaurante Dom Dina",
    description:
      "Gastronomia autoral com ingredientes locais, na Fazenda Lago São Francisco em Garanhuns, PE.",
    servesCuisine: "Brasileira contemporânea",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.location.address,
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.state,
      addressCountry: "BR",
    },
    telephone: siteConfig.contact.phone,
    menu: `${siteConfig.url}/restaurante/cardapio`,
    acceptsReservations: "True",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Restaurante"
        title="Dom Dina — uma mesa que é destino"
        description="Da horta e do lago à mesa, no mesmo dia. Aberto a hóspedes e visitantes."
        palette={["#2a4334", "#4d7359"]}
        motif="topo"
      />

      <section className="bg-paper py-16 md:py-20">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink-soft">
              Batizado em homenagem à matriarca da família, o Dom Dina nasceu na cozinha de casa e hoje
              ocupa um salão envidraçado de frente para o lago. A cozinha trabalha com produtores da
              região do Agreste — queijo coalho da serra, cordeiro local, peixe do próprio lago — revisitando
              receitas afetivas com técnica contemporânea.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button href="/restaurante/cardapio" size="lg">
                Ver cardápio digital
              </Button>
              <Button href="/restaurante/reservar-mesa" variant="secondary" size="lg">
                Reservar mesa
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <FeatureSplit
        eyebrow="O chef"
        title="Cozinha de origem, olhar contemporâneo"
        description="A cozinha do Dom Dina é liderada por uma equipe que cresceu entre os fogões da própria fazenda — o desafio é honrar a receita da Dona Dina sem parar no tempo."
        ctaHref="/restaurante/cardapio"
        ctaLabel="Explorar o cardápio"
        palette={["#b56a4a", "#d9a48c"]}
        tone="dark"
      />

      <ManifestoQuote quote="A comida daqui não imita o campo. Ela é o campo, servido com técnica." />

      <FeatureSplit
        eyebrow="Eventos gastronômicos"
        title="Jantares harmonizados e experiências sazonais"
        description="Ao longo do ano, o Dom Dina realiza jantares temáticos harmonizados — do São João à colheita de inverno do Agreste. Consulte a agenda ou peça para ser avisado sobre o próximo evento."
        ctaHref="/contato"
        ctaLabel="Perguntar sobre a agenda"
        palette={["#4c636b", "#7d97a1"]}
        tone="light"
        reverse
      />
    </>
  );
}
