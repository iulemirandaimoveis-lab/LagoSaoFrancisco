import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Clock, MapPin } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { TicketSelector } from "@/components/eventos/ticket-selector";
import { events, getEventBySlug } from "@/content/events";
import { formatDatePt } from "@/lib/utils";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  return {
    title: event.name,
    description: event.description,
    alternates: { canonical: `/eventos/${event.slug}` },
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const eventDate = formatDatePt(new Date(`${event.date}T12:00:00`));

  return (
    <>
      <PageHero
        eyebrow="Eventos"
        title={event.name}
        description={event.tagline}
        palette={event.heroPalette}
        motif="ripple"
      />

      <section className="bg-paper py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <Reveal>
                <div className="flex flex-wrap gap-6 text-sm text-ink-soft">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={16} className="text-forest-600" /> {eventDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={16} className="text-forest-600" />
                    {event.startTime} às {event.endTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={16} className="text-forest-600" />
                    {event.location.name} — {event.location.address}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="mt-8 space-y-4 text-base leading-relaxed text-ink-soft">
                  {event.longDescription.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="mt-10">
                  <h2 className="font-serif text-xl font-semibold text-ink">O que está incluso</h2>
                  <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                    {event.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-forest-600" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-10">
                  <h2 className="font-serif text-xl font-semibold text-ink">Informações importantes</h2>
                  <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                    {event.policies.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clay-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <aside className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm lg:sticky lg:top-28">
                <p className="mb-5 font-serif text-xl font-semibold text-ink">Ingressos</p>
                <TicketSelector event={event} />
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
