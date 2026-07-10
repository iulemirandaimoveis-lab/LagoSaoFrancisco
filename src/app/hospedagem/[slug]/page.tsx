import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PlaceholderArt } from "@/components/ui/placeholder-art";
import { StickyBookingBar } from "@/components/layout/sticky-booking-bar";
import { Reveal } from "@/components/motion/reveal";
import { rooms, getRoomBySlug } from "@/content/rooms";
import { formatBRL } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return {};
  return {
    title: room.name,
    description: room.description,
    alternates: { canonical: `/hospedagem/${room.slug}` },
    openGraph: { title: room.name, description: room.description },
  };
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: room.name,
    description: room.description,
    occupancy: { "@type": "QuantitativeValue", maxValue: room.maxAdults + room.maxChildren },
    floorSize: { "@type": "QuantitativeValue", value: room.sizeM2, unitCode: "MTK" },
    amenityFeature: room.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a })),
    offers: {
      "@type": "Offer",
      price: room.basePrice,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <PageHero eyebrow="Hospedagem" title={room.name} description={room.tagline} palette={room.heroPalette} />

      <section className="bg-paper py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Reveal>
                <div className="grid grid-cols-2 gap-3">
                  <PlaceholderArt
                    palette={room.heroPalette}
                    className="col-span-2 aspect-[16/9] rounded-2xl"
                    label={`${room.name} — vista principal`}
                  />
                  <PlaceholderArt palette={room.heroPalette} motif="topo" className="aspect-square rounded-2xl" label={`${room.name} — detalhe`} />
                  <PlaceholderArt palette={room.heroPalette} motif="mist" className="aspect-square rounded-2xl" label={`${room.name} — varanda`} />
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-10">
                  <h2 className="font-serif text-2xl font-semibold text-ink">Sobre a suíte</h2>
                  <p className="mt-4 text-base leading-relaxed text-ink-soft">{room.longDescription}</p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-10">
                  <h2 className="font-serif text-2xl font-semibold text-ink">Comodidades</h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {room.amenities.map((a) => (
                      <li key={a} className="flex items-center gap-2 text-sm text-ink-soft">
                        <Check size={16} className="text-forest-600" /> {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <aside className="sticky top-28 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <p className="text-sm text-ink-soft">A partir de</p>
                <p className="mt-1 font-serif text-3xl font-semibold text-ink">{formatBRL(room.basePrice)}</p>
                <p className="text-xs text-ink-soft">por noite, para 2 adultos</p>
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between border-b border-black/5 pb-3">
                    <dt className="text-ink-soft">Metragem</dt>
                    <dd className="font-medium text-ink">{room.sizeM2} m²</dd>
                  </div>
                  <div className="flex justify-between border-b border-black/5 pb-3">
                    <dt className="text-ink-soft">Configuração</dt>
                    <dd className="font-medium text-ink">{room.bedConfig}</dd>
                  </div>
                  <div className="flex justify-between border-b border-black/5 pb-3">
                    <dt className="text-ink-soft">Ocupação máxima</dt>
                    <dd className="font-medium text-ink">
                      {room.maxAdults} adultos + {room.maxChildren} crianças
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">Vista</dt>
                    <dd className="font-medium text-ink">{room.view}</dd>
                  </div>
                </dl>
                <Button href={`/reservar?room=${room.slug}`} className="mt-6 w-full">
                  Ver disponibilidade
                </Button>
                <p className="mt-3 text-center text-xs text-ink-soft">
                  Dúvidas?{" "}
                  <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} className="underline">
                    Fale pelo WhatsApp
                  </a>
                </p>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>

      <StickyBookingBar
        label={room.name}
        priceFrom={room.basePrice}
        priceUnit="noite"
        ctaHref={`/reservar?room=${room.slug}`}
      />

      <FinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
