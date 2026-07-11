import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureSplit } from "@/components/sections/feature-split";
import { ManifestoQuote } from "@/components/sections/manifesto-quote";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Casamentos & Eventos Sociais",
  description:
    "Casamentos de destino à beira do lago em Garanhuns: capela centenária, embarcadouro e jardim principal. Pacotes e simulador de orçamento.",
  alternates: { canonical: "/casamentos" },
};

const gallery: { src: string; alt: string }[] = [
  { src: "/images/casamentos/jardim-ponte.jpg", alt: "Ponte de madeira sobre lago ornamental, com gazebo ao fundo" },
  { src: "/images/casamentos/jardim-cipreste-fonte.jpg", alt: "Caminho entre ciprestes até fonte com vista para o lago" },
  { src: "/images/casamentos/jardim-balanco.jpg", alt: "Jardim com balanço decorativo, canteiros floridos e ponte" },
  { src: "/images/experiencias/pedalinho-cisnes.jpg", alt: "Embarcadouro de madeira sobre o lago, com pedalinhos em formato de cisne" },
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
            {gallery.map((photo, i) => (
              <Reveal key={photo.src} delay={i * 0.06}>
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
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
