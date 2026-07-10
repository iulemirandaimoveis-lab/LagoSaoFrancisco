import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { weddingPackages } from "@/content/weddings";
import { formatBRL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pacotes de casamento",
  description: "Conheça os pacotes de casamento da Fazenda Lago São Francisco: Intimista, Clássico do Agreste e Casamento-Destino.",
  alternates: { canonical: "/casamentos/pacotes" },
};

export default function PacotesPage() {
  return (
    <>
      <PageHero eyebrow="Casamentos" title="Pacotes" description="Três formas de celebrar na fazenda, todas com curadoria completa." palette={["#a4813f", "#c9a86a"]} />
      <section className="bg-paper py-16 md:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {weddingPackages.map((pkg, i) => (
              <Reveal key={pkg.slug} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">{pkg.guests}</p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold text-ink">{pkg.name}</h2>
                  <p className="mt-2 text-sm text-ink-soft">{pkg.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">{pkg.description}</p>
                  <p className="mt-6 font-serif text-3xl font-semibold text-ink">
                    {formatBRL(pkg.startingPrice)}
                    <span className="text-sm font-normal text-ink-soft"> a partir de</span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-2.5">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                        <Check size={16} className="mt-0.5 shrink-0 text-forest-600" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Button href={`/casamentos/orcamento?pacote=${pkg.slug}`} className="mt-8">
                    Simular este pacote
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
