import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, Gauge, Users } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { PlaceholderArt } from "@/components/ui/placeholder-art";
import { ExperienceBookingForm } from "@/components/forms/experience-booking-form";
import { Reveal } from "@/components/motion/reveal";
import { experiences, getExperienceBySlug } from "@/content/experiences";
import { formatBRL } from "@/lib/utils";

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperienceBySlug(slug);
  if (!exp) return {};
  return {
    title: exp.name,
    description: exp.description,
    alternates: { canonical: `/experiencias/${exp.slug}` },
  };
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exp = getExperienceBySlug(slug);
  if (!exp) notFound();

  return (
    <>
      <PageHero eyebrow="Experiências" title={exp.name} description={exp.tagline} palette={exp.heroPalette} motif="mist" />

      <section className="bg-paper py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <Reveal>
                {exp.image ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                    <Image src={exp.image.src} alt={exp.image.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
                  </div>
                ) : (
                  <PlaceholderArt palette={exp.heroPalette} motif="ripple" className="aspect-[16/9] w-full rounded-2xl" label={exp.name} />
                )}
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-8 flex flex-wrap gap-6 text-sm text-ink-soft">
                  <span className="flex items-center gap-1.5">
                    <Clock size={16} className="text-forest-600" /> {exp.durationMinutes} min
                  </span>
                  <span className="flex items-center gap-1.5 capitalize">
                    <Gauge size={16} className="text-forest-600" /> {exp.difficulty}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={16} className="text-forest-600" />
                    {exp.minAge > 0 ? `A partir de ${exp.minAge} anos` : "Todas as idades"}
                  </span>
                </div>
                <p className="mt-6 text-base leading-relaxed text-ink-soft">{exp.longDescription}</p>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <aside className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <p className="text-sm text-ink-soft">Investimento</p>
                <p className="mt-1 font-serif text-2xl font-semibold text-ink">
                  {exp.price > 0 ? formatBRL(exp.price) : "Cortesia para hóspedes"}
                </p>
                {exp.price > 0 && <p className="text-xs text-ink-soft">{exp.priceUnit}</p>}
                <div className="mt-6 border-t border-black/5 pt-6">
                  <ExperienceBookingForm experienceSlug={exp.slug} schedule={exp.schedule} />
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
