import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Container } from "@/components/ui/container";
import { ExperienceFilterGrid } from "@/components/sections/experience-filter-grid";
import { experiences } from "@/content/experiences";

export const metadata: Metadata = {
  title: "Experiências",
  description:
    "Passeios e atividades na Fazenda Lago São Francisco: pedalinho, caiaque, pesca, cavalgada, trilhas e pôr do sol no lago.",
  alternates: { canonical: "/experiencias" },
};

export default function ExperienciasPage() {
  return (
    <>
      <PageHero
        eyebrow="Experiências"
        title="O lago, as trilhas e o silêncio do Agreste"
        description="Filtre por categoria e intensidade para desenhar seu roteiro."
        palette={["#4c636b", "#7d97a1"]}
        motif="mist"
      />
      <section className="bg-paper py-16 md:py-20">
        <Container>
          <ExperienceFilterGrid experiences={experiences} />
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
