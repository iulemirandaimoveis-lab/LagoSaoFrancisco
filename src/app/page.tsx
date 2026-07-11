import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home-hero";
import { ManifestoQuote } from "@/components/sections/manifesto-quote";
import { Pillars } from "@/components/sections/pillars";
import { FeatureSplit } from "@/components/sections/feature-split";
import { FinalCta } from "@/components/sections/final-cta";
import { EntityCard } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { rooms } from "@/content/rooms";
import { experiences } from "@/content/experiences";
import { formatBRL } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <ManifestoQuote quote="Aqui, o telefone pode esperar." />

      <Pillars />

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Hospedagem"
            title="Quatro formas de ficar à beira do lago"
            description="De chalés isolados entre araucárias à suíte de assinatura com lareira e varanda suspensa sobre a água."
            tone="light"
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {rooms.map((room, i) => (
              <Reveal key={room.slug} delay={i * 0.08}>
                <EntityCard
                  href={`/hospedagem/${room.slug}`}
                  title={room.name}
                  subtitle={room.tagline}
                  priceLabel={formatBRL(room.basePrice)}
                  palette={room.heroPalette}
                  motif="ripple"
                  image={room.image}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FeatureSplit
        eyebrow="Restaurante Dom Dina"
        title="Uma mesa que é destino, não coadjuvante"
        description="Ingredientes locais, cardápio digital com harmonizações e reserva de mesa aberta a hóspedes e visitantes — mesmo quem só vem para almoçar."
        ctaHref="/restaurante"
        ctaLabel="Conhecer o Dom Dina"
        palette={["#2a4334", "#4d7359"]}
        motif="topo"
        tone="dark"
      />

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Experiências"
            title="O lago, as trilhas e o silêncio do Agreste"
            description="Passeios filtráveis por idade, duração e intensidade — cada um reservável em minutos."
            tone="light"
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {experiences.slice(0, 4).map((exp, i) => (
              <Reveal key={exp.slug} delay={i * 0.08}>
                <EntityCard
                  href={`/experiencias/${exp.slug}`}
                  title={exp.name}
                  subtitle={exp.tagline}
                  priceLabel={exp.price > 0 ? formatBRL(exp.price) : undefined}
                  palette={exp.heroPalette}
                  motif="mist"
                  image={exp.image}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FeatureSplit
        eyebrow="Casamentos & eventos"
        title="O cenário dos sonhos, sem virar operação de estresse"
        description="Capela centenária, embarcadouro e jardim principal — com curadoria completa de fornecedores e simulador de orçamento."
        ctaHref="/casamentos"
        ctaLabel="Ver pacotes de casamento"
        palette={["#c9a86a", "#a4813f"]}
        motif="mist"
        tone="light"
        reverse
      />

      <FeatureSplit
        eyebrow="Museu Expolago"
        title="Arte, memória e o Agreste em três décadas de acervo"
        description="Pinturas, xilogravuras e a linha do tempo da fazenda — do represamento do lago à mesa da Dona Dina."
        ctaHref="/museu"
        ctaLabel="Visitar o museu"
        palette={["#b56a4a", "#d9a48c"]}
        motif="topo"
        tone="dark"
      />

      <FinalCta />
    </>
  );
}
