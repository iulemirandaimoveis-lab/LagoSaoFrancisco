import { NextResponse } from "next/server";
import { z } from "zod";

const experienceRequestSchema = z.object({
  experience: z.string().min(1),
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(8).max(20),
  date: z.string().min(1),
  time: z.string().min(1),
  people: z.coerce.number().int().min(1).max(30),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = experienceRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  // TODO(produção): persistir no Supabase (tabela `experience_bookings`), checar
  // disponibilidade real de vagas por horário e disparar e-mail via Resend.
  console.info("[reserva-experiencia] nova solicitação", parsed.data);

  return NextResponse.json({ ok: true });
}
