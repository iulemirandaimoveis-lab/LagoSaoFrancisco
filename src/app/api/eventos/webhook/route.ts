import { NextResponse } from "next/server";
import { getMercadoPagoPayment } from "@/lib/mercadopago";

/**
 * Recebe notificações do Mercado Pago (Checkout Pro). O payload de entrada nunca é
 * confiável por si só — buscamos o pagamento direto na API da MP com o access token
 * antes de considerar o status válido (cap. 13 — webhooks assinados/idempotentes).
 */
export async function POST(request: Request) {
  const url = new URL(request.url);
  const body = await request.json().catch(() => null as Record<string, unknown> | null);

  const type =
    (body?.type as string | undefined) ??
    (body?.action as string | undefined) ??
    url.searchParams.get("type") ??
    url.searchParams.get("topic");

  const dataId =
    (body?.data as { id?: string } | undefined)?.id ??
    url.searchParams.get("data.id") ??
    url.searchParams.get("id");

  if (type !== "payment" || !dataId) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const payment = await getMercadoPagoPayment(String(dataId));
  if (!payment) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  // TODO(produção): persistir status do pedido (por external_reference) no Postgres
  // e disparar e-mail transacional de confirmação/recusa via Resend (cap. 13).
  console.info("[eventos] webhook Mercado Pago", {
    paymentId: payment.id,
    status: payment.status,
    statusDetail: payment.status_detail,
    reference: payment.external_reference,
    amount: payment.transaction_amount,
  });

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
