import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { TableBookingForm } from "@/components/forms/table-booking-form";

export const metadata: Metadata = {
  title: "Reservar mesa",
  description: "Reserve sua mesa no Restaurante Dom Dina — data, horário e número de pessoas.",
  alternates: { canonical: "/restaurante/reservar-mesa" },
};

export default function ReservarMesaPage() {
  return (
    <>
      <PageHero
        eyebrow="Restaurante Dom Dina"
        title="Reservar mesa"
        description="Preencha os dados abaixo — confirmamos por e-mail ou WhatsApp em até 24 horas."
        palette={["#b56a4a", "#d9a48c"]}
      />
      <section className="bg-paper py-16 md:py-20">
        <Container className="max-w-2xl">
          <TableBookingForm />
        </Container>
      </section>
    </>
  );
}
