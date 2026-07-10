import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { formatBRL, formatDatePt } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Solicitação recebida",
  robots: { index: false, follow: false },
};

export default async function ConfirmacaoPage({
  searchParams,
}: {
  searchParams: Promise<{
    ref?: string;
    room?: string;
    checkIn?: string;
    checkOut?: string;
    nights?: string;
    total?: string;
  }>;
}) {
  const params = await searchParams;

  if (!params.ref) {
    return (
      <section className="bg-paper py-24">
        <Container className="max-w-lg text-center">
          <p className="font-serif text-2xl text-ink">Nenhuma solicitação encontrada.</p>
          <Button href="/reservar" className="mt-6">
            Voltar para o motor de reservas
          </Button>
        </Container>
      </section>
    );
  }

  const checkIn = params.checkIn ? formatDatePt(new Date(`${params.checkIn}T12:00:00`)) : null;
  const checkOut = params.checkOut ? formatDatePt(new Date(`${params.checkOut}T12:00:00`)) : null;

  return (
    <section className="bg-paper py-24 md:py-32">
      <Container className="max-w-lg text-center">
        <CheckCircle2 className="mx-auto text-forest-600" size={40} />
        <p className="mt-6 font-serif text-3xl font-semibold text-ink">Solicitação recebida</p>
        <p className="mt-3 text-ink-soft">
          Referência <span className="font-semibold text-ink">{params.ref}</span>. Nossa equipe confirma
          disponibilidade e envia o link de pagamento por e-mail em até 24 horas.
        </p>

        <div className="mt-8 space-y-3 rounded-2xl border border-black/5 bg-white p-6 text-left text-sm">
          {params.room && (
            <Row label="Acomodação" value={params.room} />
          )}
          {checkIn && checkOut && <Row label="Período" value={`${checkIn} — ${checkOut}`} />}
          {params.nights && <Row label="Diárias" value={params.nights} />}
          {params.total && <Row label="Total estimado" value={formatBRL(Number(params.total))} bold />}
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">Voltar à home</Button>
          <Button href={`https://wa.me/${siteConfig.contact.whatsapp}`} variant="secondary">
            Falar pelo WhatsApp
          </Button>
        </div>
        <p className="mt-6 text-xs text-ink-soft">
          Precisa alterar algo?{" "}
          <Link href="/reservar" className="underline">
            Ajustar solicitação
          </Link>
        </p>
      </Container>
    </section>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-black/5 pb-3 last:border-0 last:pb-0">
      <span className="text-ink-soft">{label}</span>
      <span className={bold ? "font-semibold text-ink" : "font-medium text-ink"}>{value}</span>
    </div>
  );
}
