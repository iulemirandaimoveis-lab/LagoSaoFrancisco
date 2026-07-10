import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { WeddingSimulator } from "@/components/forms/wedding-simulator";

export const metadata: Metadata = {
  title: "Simulador de orçamento de casamento",
  description: "Simule o investimento do seu casamento na Fazenda Lago São Francisco por número de convidados e data.",
  alternates: { canonical: "/casamentos/orcamento" },
};

export default function OrcamentoPage() {
  return (
    <>
      <PageHero
        eyebrow="Casamentos"
        title="Simule seu orçamento"
        description="Ajuste convidados e data para uma estimativa — a proposta final é confirmada com nossa equipe."
        palette={["#4c636b", "#7d97a1"]}
      />
      <section className="bg-paper py-16 md:py-20">
        <Container className="max-w-4xl">
          <WeddingSimulator />
        </Container>
      </section>
    </>
  );
}
