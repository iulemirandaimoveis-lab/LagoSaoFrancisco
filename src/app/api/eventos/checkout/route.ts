import { NextResponse } from "next/server";
import { z } from "zod";
import { getEventBySlug } from "@/content/events";
import { createEventPreference } from "@/lib/mercadopago";
import { siteConfig } from "@/lib/site-config";

const checkoutSchema = z.object({
  eventSlug: z.string().min(1),
  tickets: z
    .array(
      z.object({
        ticketId: z.string().min(1),
        quantity: z.coerce.number().int().min(0).max(20),
      }),
    )
    .min(1),
  buyer: z.object({
    name: z.string().min(2).max(120),
    email: z.string().email(),
    phone: z.string().min(8).max(20),
    document: z
      .string()
      .transform((v) => v.replace(/\D/g, ""))
      .refine((v) => v.length === 11, "CPF deve ter 11 dígitos"),
  }),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  const { eventSlug, tickets, buyer } = parsed.data;
  const event = getEventBySlug(eventSlug);
  if (!event) {
    return NextResponse.json({ ok: false, error: "EVENT_NOT_FOUND" }, { status: 404 });
  }

  const selected = tickets
    .filter((t) => t.quantity > 0)
    .map((t) => {
      const ticket = event.tickets.find((et) => et.id === t.ticketId);
      return ticket ? { ticket, quantity: t.quantity } : null;
    });

  if (selected.some((s) => s === null) || selected.length === 0) {
    return NextResponse.json({ ok: false, error: "INVALID_TICKETS" }, { status: 400 });
  }

  const lines = selected as { ticket: (typeof event.tickets)[number]; quantity: number }[];
  const total = lines.reduce((sum, l) => sum + l.ticket.price * l.quantity, 0);
  const headcount = lines.reduce((sum, l) => sum + l.quantity, 0);
  const reference = `EVT-${Date.now().toString(36).toUpperCase()}`;

  // TODO(produção): reservar headcount/estoque de forma atômica no Postgres (Supabase)
  // antes de gerar a preferência, e persistir o pedido (linhas + status) para reconciliar
  // com o webhook — mesmo padrão do cap. 04/13 do blueprint.
  console.info("[eventos] novo pedido", {
    reference,
    event: event.slug,
    headcount,
    total,
    buyer: { name: buyer.name, email: buyer.email },
  });

  const origin = request.headers.get("origin") ?? new URL(request.url).origin ?? siteConfig.url;
  const confirmationUrl = `${origin}/eventos/${event.slug}/confirmacao?ref=${reference}`;

  const paidLines = lines.filter((l) => l.ticket.price > 0);

  if (paidLines.length === 0) {
    // Pedido 100% cortesia (ex.: apenas crianças até 4 anos) — não precisa de pagamento.
    return NextResponse.json({ ok: true, reference, redirectUrl: `${confirmationUrl}&free=1` });
  }

  const phoneDigits = buyer.phone.replace(/\D/g, "");
  const preference = await createEventPreference({
    reference,
    items: paidLines.map((l) => ({
      id: l.ticket.id,
      title: `${event.name} — ${l.ticket.name}`,
      quantity: l.quantity,
      unit_price: l.ticket.price,
    })),
    buyer: {
      name: buyer.name,
      email: buyer.email,
      areaCode: phoneDigits.slice(0, 2),
      phoneNumber: phoneDigits.slice(2),
    },
    backUrls: {
      success: `${confirmationUrl}&outcome=success`,
      pending: `${confirmationUrl}&outcome=pending`,
      failure: `${confirmationUrl}&outcome=failure`,
    },
    notificationUrl: `${origin}/api/eventos/webhook`,
    statementDescriptor: "LAGO SAO FRANCISCO",
  });

  if (!preference.ok) {
    if (preference.error === "MERCADOPAGO_NOT_CONFIGURED") {
      return NextResponse.json(
        {
          ok: false,
          error: "PAYMENT_NOT_CONFIGURED",
          message:
            "O checkout de pagamento ainda não foi configurado neste ambiente. Configure MERCADOPAGO_ACCESS_TOKEN para ativar.",
        },
        { status: 503 },
      );
    }
    console.error("[eventos] erro ao criar preferência Mercado Pago", preference.error);
    return NextResponse.json({ ok: false, error: "PAYMENT_PROVIDER_ERROR" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, reference, redirectUrl: preference.data.initPoint });
}
