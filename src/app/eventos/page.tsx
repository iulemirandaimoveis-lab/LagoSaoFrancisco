import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Container } from "@/components/ui/container";
import { EntityCard } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { events, startingPrice } from "@/content/events";
import { formatBRLCents, formatDatePt } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Eventos",
  description: "Ingressos para eventos e day use na Fazenda Lago São Francisco, com pagamento direto via Pix ou cartão.",
  alternates: { canonical: "/eventos" },
};

export default function EventosPage() {
  return (
    <>
      <PageHero
        eyebrow="Eventos"
        title="Ingressos para viver um dia na fazenda"
        description="Compra direta, sem intermediário: Pix, cartão em até 12x ou boleto, com confirmação na hora."
        palette={["#1d2f25", "#7d97a1"]}
        motif="ripple"
      />

      <section className="bg-paper py-16 md:py-20">
        <Container>
          <SectionHeading eyebrow="Próximos eventos" title="Escolha seu ingresso" tone="light" className="mb-12" />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => (
              <Reveal key={event.slug} delay={i * 0.08}>
                <EntityCard
                  href={`/eventos/${event.slug}`}
                  title={event.name}
                  subtitle={`${formatDatePt(new Date(`${event.date}T12:00:00`))} · ${event.startTime}–${event.endTime}`}
                  priceLabel={startingPrice(event) > 0 ? formatBRLCents(startingPrice(event)) : undefined}
                  palette={event.heroPalette}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
