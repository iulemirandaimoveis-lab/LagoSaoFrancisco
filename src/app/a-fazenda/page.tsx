import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureSplit } from "@/components/sections/feature-split";
import { ManifestoQuote } from "@/components/sections/manifesto-quote";
import { FinalCta } from "@/components/sections/final-cta";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { timeline } from "@/content/museum";

export const metadata: Metadata = {
  title: "A Fazenda",
  description:
    "Conheça a história, o clima de altitude e a filosofia da Fazenda Lago São Francisco, no Agreste pernambucano de Garanhuns.",
  alternates: { canonical: "/a-fazenda" },
};

export default function AFazendaPage() {
  return (
    <>
      <PageHero
        eyebrow="A Fazenda"
        title="Um microclima que não existe em nenhum outro refúgio do litoral"
        description="No Agreste de Garanhuns, a altitude esfria o ar, a névoa sobe do lago e o tempo passa devagar."
        palette={["#0c1310", "#2a4334"]}
        motif="mist"
      />

      <section className="bg-paper py-20 md:py-28">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink-soft">
              A Fazenda Lago São Francisco nasceu em 1948 como propriedade de gado e café na altitude do
              Agreste pernambucano. Em 1965, o represamento de um córrego deu origem ao lago que hoje é o
              centro de toda a experiência — espelho d&apos;água que muda de cor a cada hora do dia e se cobre de
              névoa nas manhãs frias, comuns numa das regiões mais amenas do Nordeste.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Não somos um hotel fazenda genérico. Somos um refúgio-destino onde natureza de altitude,
              gastronomia autoral e um acervo de arte reunido ao longo de décadas se combinam — uma
              combinação que, isolada, qualquer concorrente tem no máximo dois pedaços.
            </p>
          </Reveal>
        </Container>
      </section>

      <FeatureSplit
        eyebrow="Clima & geografia"
        title="O Agreste que esfria"
        description="Garanhuns é conhecida como uma das cidades mais frias do Nordeste — sede do Festival de Inverno (FIG) e do São João. Na fazenda, a altitude e o lago acentuam esse microclima: manhãs de neblina, noites de lareira, tardes amenas mesmo em pleno verão nordestino."
        ctaHref="/experiencias"
        ctaLabel="Ver experiências ao ar livre"
        palette={["#4c636b", "#7d97a1"]}
        motif="mist"
      />

      <ManifestoQuote quote="Você não reserva um quarto. Você desenha dias que vai lembrar." />

      <section className="bg-forest-950 py-20 md:py-28">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-500">Linha do tempo</p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl font-semibold text-paper sm:text-4xl">
            Quase oito décadas à beira do lago
          </h2>
          <ol className="mt-12 space-y-8 border-l border-white/15 pl-8">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.06} as="li">
                <p className="font-serif text-2xl text-gold-300">{item.year}</p>
                <p className="mt-1 font-medium text-paper">{item.title}</p>
                <p className="mt-1 max-w-lg text-sm text-paper/65">{item.description}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
