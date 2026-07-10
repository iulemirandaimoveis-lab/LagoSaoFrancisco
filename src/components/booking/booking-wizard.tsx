"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RoomPicker } from "./room-picker";
import { BookingCalendar, type DateRange } from "./calendar";
import { GuestSelector, type Guests } from "./guest-selector";
import { PriceBreakdown } from "./price-breakdown";
import { PlaceholderArt } from "@/components/ui/placeholder-art";
import { rooms, getRoomBySlug } from "@/content/rooms";
import { priceRange } from "@/lib/pricing";
import { formatBRL } from "@/lib/utils";

export function BookingWizard({ initialRoomSlug }: { initialRoomSlug?: string }) {
  const router = useRouter();
  const [roomSlug, setRoomSlug] = useState<string | null>(
    initialRoomSlug && getRoomBySlug(initialRoomSlug) ? initialRoomSlug : null,
  );
  const [range, setRange] = useState<DateRange>({ checkIn: null, checkOut: null });
  const [guests, setGuests] = useState<Guests>({ adults: 2, children: 0 });
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const room = roomSlug ? getRoomBySlug(roomSlug) : undefined;

  const nights = useMemo(() => {
    if (!room || !range.checkIn || !range.checkOut) return [];
    const nightCount = Math.round((range.checkOut.getTime() - range.checkIn.getTime()) / 86_400_000);
    if (nightCount <= 0) return [];
    return priceRange(room.slug, room.basePrice, range.checkIn, nightCount);
  }, [room, range]);

  const total = nights.reduce((sum, n) => sum + n.rate, 0);
  const readyForCheckout = Boolean(room && nights.length > 0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!room || !range.checkIn || !range.checkOut) return;
    setStatus("submitting");
    setErrorMsg(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      room: room.slug,
      checkIn: range.checkIn.toISOString().slice(0, 10),
      checkOut: range.checkOut.toISOString().slice(0, 10),
      adults: guests.adults,
      children: guests.children,
      total,
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
    };

    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Erro ao enviar reserva.");

      const params = new URLSearchParams({
        ref: data.reference,
        room: room.name,
        checkIn: payload.checkIn,
        checkOut: payload.checkOut,
        nights: String(nights.length),
        total: String(total),
      });
      router.push(`/reservar/confirmacao?${params.toString()}`);
    } catch {
      setStatus("error");
      setErrorMsg("Não foi possível concluir a solicitação. Tente novamente ou fale pelo WhatsApp.");
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-10">
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink">1. Escolha a acomodação</h2>
          <div className="mt-5">
            <RoomPicker rooms={rooms} selectedSlug={roomSlug} onSelect={setRoomSlug} />
          </div>
        </section>

        {room && (
          <section>
            <h2 className="font-serif text-2xl font-semibold text-ink">2. Escolha as datas</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Datas riscadas estão indisponíveis. O ponto dourado marca feriados e eventos regionais.
            </p>
            <div className="mt-5 rounded-2xl border border-black/5 bg-white p-5">
              <BookingCalendar roomSlug={room.slug} basePrice={room.basePrice} range={range} onChange={setRange} />
            </div>
          </section>
        )}

        {room && (
          <section>
            <h2 className="font-serif text-2xl font-semibold text-ink">3. Hóspedes</h2>
            <div className="mt-5 max-w-sm">
              <GuestSelector
                guests={guests}
                onChange={setGuests}
                maxAdults={room.maxAdults}
                maxChildren={room.maxChildren}
              />
            </div>
          </section>
        )}

        {readyForCheckout && (
          <section>
            <h2 className="font-serif text-2xl font-semibold text-ink">4. Seus dados</h2>
            <form id="checkout-form" onSubmit={handleSubmit} className="mt-5 grid max-w-lg gap-4">
              <div>
                <label htmlFor="ck-name" className="mb-1.5 block text-sm font-medium text-ink">
                  Nome completo
                </label>
                <input id="ck-name" name="name" required minLength={2} className={inputClass} />
              </div>
              <div>
                <label htmlFor="ck-email" className="mb-1.5 block text-sm font-medium text-ink">
                  E-mail
                </label>
                <input id="ck-email" name="email" type="email" required className={inputClass} />
              </div>
              <div>
                <label htmlFor="ck-phone" className="mb-1.5 block text-sm font-medium text-ink">
                  Telefone / WhatsApp
                </label>
                <input id="ck-phone" name="phone" type="tel" required minLength={8} className={inputClass} />
              </div>
            </form>
          </section>
        )}
      </div>

      <aside className="h-fit lg:sticky lg:top-28">
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          {room ? (
            <div className="flex gap-3 border-b border-black/5 pb-5">
              <PlaceholderArt palette={room.heroPalette} className="h-16 w-16 shrink-0 rounded-xl" />
              <div>
                <p className="text-sm font-semibold text-ink">{room.name}</p>
                <p className="text-xs text-ink-soft">{formatBRL(room.basePrice)} / noite (base)</p>
              </div>
            </div>
          ) : (
            <p className="border-b border-black/5 pb-5 text-sm text-ink-soft">Escolha uma acomodação para começar.</p>
          )}

          <div className="pt-5">
            <PriceBreakdown nights={nights} />
          </div>

          {errorMsg && <p className="mt-4 text-sm text-clay-600">{errorMsg}</p>}

          <button
            type="submit"
            form="checkout-form"
            disabled={!readyForCheckout || status === "submitting"}
            className="mt-6 w-full rounded-full bg-gold-500 px-8 py-3.5 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === "submitting" ? "Enviando..." : "Confirmar solicitação de reserva"}
          </button>
          <p className="mt-3 text-center text-xs text-ink-soft">
            Nenhum valor é cobrado agora. Nossa equipe confirma disponibilidade e envia o link de pagamento.
          </p>
        </div>
      </aside>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-ink focus:border-forest-600";
