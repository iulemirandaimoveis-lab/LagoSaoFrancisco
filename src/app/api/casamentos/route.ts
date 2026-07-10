import { NextResponse } from "next/server";
import { z } from "zod";

const weddingLeadSchema = z.object({
  package: z.string().min(1),
  guests: z.coerce.number().int().min(1).max(500),
  eventDate: z.string().optional(),
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(8).max(20),
  estimate: z.coerce.number().nonnegative(),
  message: z.string().max(1000).optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = weddingLeadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  // TODO(produção): persistir no CRM (Supabase + funil de leads, cap. 12/17 V2),
  // notificar o time comercial e disparar e-mail automático via Resend.
  console.info("[lead-casamento] nova solicitação", parsed.data);

  return NextResponse.json({ ok: true });
}
