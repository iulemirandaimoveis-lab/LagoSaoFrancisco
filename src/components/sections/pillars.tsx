import { Mountain, Utensils, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

const pillars = [
  {
    icon: Mountain,
    title: "Natureza de altitude",
    description:
      "O Agreste que esfria, a névoa sobre o lago, o microclima que não se encontra em nenhum outro refúgio do litoral nordestino.",
  },
  {
    icon: Utensils,
    title: "Cultura & gastronomia",
    description:
      "O Restaurante Dom Dina, o Museu Expolago e a agenda cultural de Garanhuns — poucos hotéis fazenda têm um restaurante-destino e um museu.",
  },
  {
    icon: HeartHandshake,
    title: "Hospitalidade curada",
    description: "Não são muitas atividades soltas. É uma estadia desenhada, do primeiro contato ao pós-viagem.",
  },
];

export function Pillars() {
  return (
    <section className="bg-forest-950 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Por que o Lago São Francisco"
          title="Três pilares, uma combinação única"
          description="Isolado, cada ativo qualquer concorrente tem no máximo dois. A vantagem é a combinação."
          align="center"
          tone="dark"
          className="mx-auto"
        />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                <p.icon className="text-gold-500" size={28} strokeWidth={1.5} />
                <h3 className="mt-5 font-serif text-2xl font-semibold text-paper">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
