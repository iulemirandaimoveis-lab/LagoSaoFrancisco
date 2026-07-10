import { NextResponse } from "next/server";
import { z } from "zod";

const tableRequestSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(8).max(20),
  date: z.string().min(1),
  time: z.string().min(1),
  guests: z.coerce.number().int().min(1).max(20),
  occasion: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = tableRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  // TODO(produção): persistir no Supabase (tabela `table_bookings`) e disparar
  // e-mail de confirmação via Resend + notificação interna para o restaurante.
  // Sem credenciais de backend neste ambiente, registramos a solicitação no log do servidor.
  console.info("[reserva-mesa] nova solicitação", parsed.data);

  return NextResponse.json({ ok: true });
}
