import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Container } from "@/components/ui/container";
import { EntityCard } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { rooms } from "@/content/rooms";
import { formatBRL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Hospedagem",
  description:
    "Suítes e chalés à beira do lago em Garanhuns: Suíte Master Lago, Suíte Família Agreste, Chalé da Neblina e Suíte Standard Jardim.",
  alternates: { canonical: "/hospedagem" },
};

export default function HospedagemPage() {
  return (
    <>
      <PageHero
        eyebrow="Hospedagem"
        title="Quatro formas de ficar à beira do lago"
        description="Cada categoria tem personalidade própria — da suíte de assinatura ao chalé isolado entre araucárias."
        palette={["#1d2f25", "#3a5b46"]}
      />

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Categorias" title="Escolha sua acomodação" tone="light" className="mb-12" />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {rooms.map((room, i) => (
              <Reveal key={room.slug} delay={i * 0.08}>
                <EntityCard
                  href={`/hospedagem/${room.slug}`}
                  title={room.name}
                  subtitle={`${room.bedConfig} · até ${room.maxAdults} adultos`}
                  priceLabel={formatBRL(room.basePrice)}
                  palette={room.heroPalette}
                />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 overflow-x-auto rounded-2xl border border-black/5">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <caption className="sr-only">Comparativo de acomodações</caption>
                <thead>
                  <tr className="bg-forest-950 text-left text-paper">
                    <th scope="col" className="px-5 py-4 font-medium">Acomodação</th>
                    <th scope="col" className="px-5 py-4 font-medium">Metragem</th>
                    <th scope="col" className="px-5 py-4 font-medium">Ocupação</th>
                    <th scope="col" className="px-5 py-4 font-medium">Vista</th>
                    <th scope="col" className="px-5 py-4 font-medium">A partir de</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr key={room.slug} className="border-t border-black/5">
                      <td className="px-5 py-4 font-medium text-ink">{room.name}</td>
                      <td className="px-5 py-4 text-ink-soft">{room.sizeM2} m²</td>
                      <td className="px-5 py-4 text-ink-soft">
                        {room.maxAdults} adultos + {room.maxChildren} crianças
                      </td>
                      <td className="px-5 py-4 text-ink-soft">{room.view}</td>
                      <td className="px-5 py-4 font-medium text-forest-700">{formatBRL(room.basePrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
