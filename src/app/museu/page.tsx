import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { collections, museumIntro, timeline } from "@/content/museum";

export const metadata: Metadata = {
  title: "Museu Expolago",
  description:
    "Acervo multicultural do Museu Expolago, na Fazenda Lago São Francisco: arte sacra, arte regional do Agreste e coleção de mais de onze países.",
  alternates: { canonical: "/museu" },
};

export default function MuseuPage() {
  return (
    <>
      <PageHero
        eyebrow="Museu Expolago"
        title="Arte e memória à beira do lago"
        description={museumIntro.lead}
        palette={["#b56a4a", "#d9a48c"]}
        image={{
          src: "/images/museu/sacra-ultima-ceia.jpg",
          alt: "Última Ceia recriada em estátuas de tamanho natural no Museu Expolago",
        }}
      />

      <section className="bg-paper py-10">
        <Container>
          <p className="max-w-3xl text-sm leading-relaxed text-ink-soft">{museumIntro.visita}</p>
        </Container>
      </section>

      {collections.map((collection, ci) => (
        <section
          key={collection.slug}
          id={collection.slug}
          className={`scroll-mt-24 py-16 md:py-20 ${ci % 2 === 0 ? "bg-paper" : "bg-forest-950"}`}
        >
          <Container>
            <p
              className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                ci % 2 === 0 ? "text-gold-700" : "text-gold-500"
              }`}
            >
              {collection.eyebrow}
            </p>
            <h2
              className={`mt-2 font-serif text-3xl font-semibold ${ci % 2 === 0 ? "text-ink" : "text-paper"}`}
            >
              {collection.title}
            </h2>
            <p
              className={`mt-3 max-w-2xl text-sm leading-relaxed ${
                ci % 2 === 0 ? "text-ink-soft" : "text-paper/70"
              }`}
            >
              {collection.description}
            </p>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {collection.pieces.map((piece, i) => (
                <Reveal key={piece.slug} delay={i * 0.06}>
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black/5">
                    <Image
                      src={piece.image}
                      alt={piece.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <h3 className={`mt-3 font-serif text-lg font-semibold ${ci % 2 === 0 ? "text-ink" : "text-paper"}`}>
                    {piece.title}
                  </h3>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ))}

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
