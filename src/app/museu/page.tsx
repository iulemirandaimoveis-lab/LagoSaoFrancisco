import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { PlaceholderArt } from "@/components/ui/placeholder-art";
import { Reveal } from "@/components/motion/reveal";
import { museumWorks, artists, timeline } from "@/content/museum";

export const metadata: Metadata = {
  title: "Museu Expolago",
  description: "Acervo de arte, artistas e linha do tempo do Museu Expolago, na Fazenda Lago São Francisco.",
  alternates: { canonical: "/museu" },
};

export default function MuseuPage() {
  return (
    <>
      <PageHero
        eyebrow="Museu Expolago"
        title="Arte e memória à beira do lago"
        description="Um acervo reunido ao longo de quatro décadas, aberto a hóspedes e visitantes."
        palette={["#b56a4a", "#d9a48c"]}
      />

      <section id="acervo" className="scroll-mt-24 bg-paper py-16 md:py-20">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">Acervo</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-ink">Obras em destaque</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {museumWorks.map((work, i) => (
              <Reveal key={work.slug} delay={i * 0.08}>
                <PlaceholderArt
                  palette={i % 2 === 0 ? ["#b56a4a", "#d9a48c"] : ["#2a4334", "#4d7359"]}
                  motif="topo"
                  className="aspect-[4/5] w-full rounded-2xl"
                  label={work.title}
                />
                <h3 className="mt-3 font-serif text-lg font-semibold text-ink">{work.title}</h3>
                <p className="text-sm text-ink-soft">
                  {work.artist}, {work.year} — {work.medium}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{work.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="artistas" className="scroll-mt-24 bg-forest-950 py-16 md:py-20">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">Artistas</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-paper">Quem construiu o acervo</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {artists.map((artist, i) => (
              <Reveal key={artist.slug} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="font-serif text-xl font-semibold text-paper">{artist.name}</h3>
                  <p className="text-xs uppercase tracking-wide text-gold-300">{artist.origin}</p>
                  <p className="mt-3 text-sm leading-relaxed text-paper/70">{artist.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="linha-do-tempo" className="scroll-mt-24 bg-paper py-16 md:py-20">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">Linha do tempo</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-ink">Da fazenda ao museu</h2>
          <ol className="mt-10 space-y-8 border-l border-black/10 pl-8">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.05} as="li">
                <p className="font-serif text-2xl text-forest-700">{item.year}</p>
                <p className="mt-1 font-medium text-ink">{item.title}</p>
                <p className="mt-1 max-w-lg text-sm text-ink-soft">{item.description}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
