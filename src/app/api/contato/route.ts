import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  subject: z.string().min(2).max(150),
  message: z.string().min(5).max(2000),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  // TODO(produção): encaminhar via Resend para a caixa de atendimento da fazenda.
  console.info("[contato] nova mensagem", parsed.data);

  return NextResponse.json({ ok: true });
}
