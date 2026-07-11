import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getEventBySlug } from "@/content/events";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Confirmação do pedido",
  robots: { index: false, follow: false },
};

type Outcome = "approved" | "pending" | "rejected" | "free" | "unknown";

function resolveOutcome(mpStatus?: string, outcome?: string, isFree?: boolean): Outcome {
  if (isFree) return "free";
  if (mpStatus === "approved") return "approved";
  if (mpStatus === "rejected") return "rejected";
  if (mpStatus === "in_process" || mpStatus === "pending") return "pending";
  if (outcome === "success") return "approved";
  if (outcome === "failure") return "rejected";
  if (outcome === "pending") return "pending";
  return "unknown";
}

const copy: Record<Outcome, { title: string; body: string; icon: "ok" | "wait" | "fail" }> = {
  free: {
    title: "Ingressos gratuitos confirmados",
    body: "Seus ingressos de cortesia estão confirmados. Guarde o número do pedido e leve um documento com foto no dia do evento.",
    icon: "ok",
  },
  approved: {
    title: "Pagamento aprovado",
    body: "Seu ingresso está confirmado. Enviamos os detalhes para o e-mail informado na compra.",
    icon: "ok",
  },
  pending: {
    title: "Pagamento em análise",
    body: "Recebemos sua compra e estamos aguardando a confirmação do pagamento (comum em Pix e boleto). Você recebe um e-mail assim que for aprovado.",
    icon: "wait",
  },
  rejected: {
    title: "Pagamento não aprovado",
    body: "O pagamento não foi concluído. Você pode tentar novamente com outro método na página do evento.",
    icon: "fail",
  },
  unknown: {
    title: "Pedido registrado",
    body: "Seu pedido foi registrado. Se o pagamento já foi concluído no Mercado Pago, a confirmação chega por e-mail em instantes.",
    icon: "wait",
  },
};

export default async function EventConfirmacaoPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    ref?: string;
    outcome?: string;
    status?: string;
    payment_id?: string;
    external_reference?: string;
    free?: string;
  }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const sp = await searchParams;
  if (!sp.ref) {
    return (
      <section className="bg-paper py-24">
        <Container className="max-w-lg text-center">
          <p className="font-serif text-2xl text-ink">Nenhum pedido encontrado.</p>
          <Button href={`/eventos/${event.slug}`} className="mt-6">
            Voltar para os ingressos
          </Button>
        </Container>
      </section>
    );
  }

  const outcome = resolveOutcome(sp.status, sp.outcome, sp.free === "1");
  const { title, body, icon } = copy[outcome];
  const reference = sp.external_reference ?? sp.ref;

  return (
    <section className="bg-paper py-24 md:py-32">
      <Container className="max-w-lg text-center">
        {icon === "ok" && <CheckCircle2 className="mx-auto text-forest-600" size={40} />}
        {icon === "wait" && <Clock3 className="mx-auto text-gold-700" size={40} />}
        {icon === "fail" && <XCircle className="mx-auto text-clay-600" size={40} />}

        <p className="mt-6 font-serif text-3xl font-semibold text-ink">{title}</p>
        <p className="mt-3 text-ink-soft">{body}</p>

        <div className="mt-8 space-y-3 rounded-2xl border border-black/5 bg-white p-6 text-left text-sm">
          <Row label="Evento" value={event.name} />
          <Row label="Número do pedido" value={reference} bold />
          {sp.payment_id && <Row label="ID do pagamento" value={sp.payment_id} />}
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {outcome === "rejected" ? (
            <Button href={`/eventos/${event.slug}`}>Tentar novamente</Button>
          ) : (
            <Button href="/">Voltar à home</Button>
          )}
          <Button href={`https://wa.me/${siteConfig.contact.whatsapp}`} variant="secondary">
            Falar pelo WhatsApp
          </Button>
        </div>
        <p className="mt-6 text-xs text-ink-soft">
          Dúvidas sobre seu pedido?{" "}
          <Link href="/contato" className="underline">
            Fale com a gente
          </Link>
        </p>
      </Container>
    </section>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-black/5 pb-3 last:border-0 last:pb-0">
      <span className="text-ink-soft">{label}</span>
      <span className={bold ? "font-semibold text-ink" : "font-medium text-ink"}>{value}</span>
    </div>
  );
}
