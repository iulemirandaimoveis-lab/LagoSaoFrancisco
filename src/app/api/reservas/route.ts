import { NextResponse } from "next/server";
import { z } from "zod";

const bookingRequestSchema = z.object({
  room: z.string().min(1),
  checkIn: z.string().min(1),
  checkOut: z.string().min(1),
  adults: z.coerce.number().int().min(1).max(12),
  children: z.coerce.number().int().min(0).max(12),
  total: z.coerce.number().nonnegative(),
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(8).max(20),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = bookingRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  // TODO(produção): criar hold atômico de disponibilidade no Postgres (Supabase),
  // processar pagamento (Mercado Pago — Pix/parcelamento) e enviar confirmação
  // transacional via Resend, conforme cap. 04 e 13 do blueprint. Sem credenciais
  // de backend/pagamento neste ambiente, apenas registramos a solicitação.
  const reference = `LSF-${Date.now().toString(36).toUpperCase()}`;
  console.info("[reserva] nova solicitação", { reference, ...parsed.data });

  return NextResponse.json({ ok: true, reference });
}
