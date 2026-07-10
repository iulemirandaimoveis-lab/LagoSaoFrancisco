import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureSplit } from "@/components/sections/feature-split";
import { ManifestoQuote } from "@/components/sections/manifesto-quote";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PlaceholderArt } from "@/components/ui/placeholder-art";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Casamentos & Eventos Sociais",
  description:
    "Casamentos de destino à beira do lago em Garanhuns: capela centenária, embarcadouro e jardim principal. Pacotes e simulador de orçamento.",
  alternates: { canonical: "/casamentos" },
};

const gallery: [string, string][] = [
  ["#c9a86a", "#a4813f"],
  ["#4c636b", "#7d97a1"],
  ["#2a4334", "#4d7359"],
  ["#b56a4a", "#d9a48c"],
];

export default function CasamentosPage() {
  return (
    <>
      <PageHero
        eyebrow="Casamentos & eventos sociais"
        title="O cenário dos sonhos, à beira do lago"
        description="Capela centenária, embarcadouro privativo e jardim principal — com curadoria completa de fornecedores."
        palette={["#c9a86a", "#a4813f"]}
        motif="mist"
      />

      <section className="bg-paper py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.map((palette, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <PlaceholderArt palette={palette} motif={i % 2 === 0 ? "ripple" : "mist"} className="aspect-square rounded-2xl" />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10 flex flex-col justify-center gap-4 text-center sm:flex-row">
              <Button href="/casamentos/pacotes" size="lg">
                Ver pacotes
              </Button>
              <Button href="/casamentos/orcamento" variant="secondary" size="lg">
                Simular orçamento
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <ManifestoQuote quote="O casamento dos seus sonhos, sem virar uma operação de estresse." />

      <FeatureSplit
        eyebrow="Curadoria de fornecedores"
        title="Uma equipe que já fez esse caminho centenas de vezes"
        description="Decoração, banda, cerimonial, iluminação e fotografia — curados e testados na própria propriedade, para que a única preocupação dos noivos seja aproveitar o dia."
        ctaHref="/casamentos/orcamento"
        ctaLabel="Simular meu orçamento"
        palette={["#2a4334", "#4d7359"]}
        tone="dark"
      />
    </>
  );
}
