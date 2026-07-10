import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { BookingWizard } from "@/components/booking/booking-wizard";

export const metadata: Metadata = {
  title: "Reservar",
  description: "Motor de reservas da Fazenda Lago São Francisco: escolha acomodação, datas e hóspedes.",
  alternates: { canonical: "/reservar" },
  robots: { index: false, follow: true },
};

export default async function ReservarPage({
  searchParams,
}: {
  searchParams: Promise<{ room?: string }>;
}) {
  const { room } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Motor de reservas"
        title="Desenhe sua estadia"
        description="Escolha a acomodação, as datas e o número de hóspedes — o preço se ajusta em tempo real."
        palette={["#1d2f25", "#3a5b46"]}
      />
      <section className="bg-paper py-16 md:py-20">
        <Container>
          <BookingWizard initialRoomSlug={room} />
        </Container>
      </section>
    </>
  );
}
