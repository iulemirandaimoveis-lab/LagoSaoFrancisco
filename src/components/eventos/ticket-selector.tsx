"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, ShieldCheck } from "lucide-react";
import type { EventItem } from "@/content/events";
import { formatBRLCents } from "@/lib/utils";

type Status = "idle" | "submitting" | "error";

export function TicketSelector({ event }: { event: EventItem }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "", document: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const headcount = useMemo(
    () => Object.values(quantities).reduce((sum, q) => sum + q, 0),
    [quantities],
  );

  const total = useMemo(
    () =>
      event.tickets.reduce((sum, ticket) => sum + ticket.price * (quantities[ticket.id] ?? 0), 0),
    [event.tickets, quantities],
  );

  function setQuantity(ticketId: string, next: number, max: number) {
    setQuantities((prev) => ({ ...prev, [ticketId]: Math.max(0, Math.min(max, next)) }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (headcount === 0) {
      setErrorMessage("Selecione ao menos um ingresso.");
      return;
    }
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/eventos/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventSlug: event.slug,
          tickets: Object.entries(quantities).map(([ticketId, quantity]) => ({ ticketId, quantity })),
          buyer,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMessage(
          data?.message ?? "Não foi possível iniciar o pagamento agora. Tente novamente em instantes.",
        );
        setStatus("error");
        return;
      }

      window.location.href = data.redirectUrl;
    } catch {
      setErrorMessage("Não foi possível conectar ao checkout. Verifique sua conexão e tente novamente.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        {event.tickets.map((ticket) => {
          const qty = quantities[ticket.id] ?? 0;
          return (
            <div
              key={ticket.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-black/5 bg-white p-4"
            >
              <div className="min-w-0">
                <p className="font-medium text-ink">{ticket.name}</p>
                <p className="mt-0.5 text-xs text-ink-soft">{ticket.description}</p>
                <p className="mt-1 text-sm font-semibold text-forest-700">
                  {ticket.price > 0 ? formatBRLCents(ticket.price) : "Grátis"}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(ticket.id, qty - 1, ticket.maxPerOrder)}
                  disabled={qty === 0}
                  aria-label={`Diminuir quantidade de ${ticket.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-ink transition-colors hover:border-forest-600 disabled:opacity-30"
                >
                  <Minus size={14} />
                </button>
                <span className="w-4 text-center text-sm font-semibold text-ink" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(ticket.id, qty + 1, ticket.maxPerOrder)}
                  disabled={qty >= ticket.maxPerOrder}
                  aria-label={`Aumentar quantidade de ${ticket.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-ink transition-colors hover:border-forest-600 disabled:opacity-30"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-black/10 pt-4 text-sm">
        <span className="text-ink-soft">{headcount} ingresso(s) selecionado(s)</span>
        <span className="font-serif text-xl font-semibold text-ink">{formatBRLCents(total)}</span>
      </div>

      <div className="space-y-4 border-t border-black/10 pt-6">
        <p className="text-sm font-medium text-ink">Dados de quem compra</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="buyer-name" className="mb-1.5 block text-sm font-medium text-ink">
              Nome completo
            </label>
            <input
              id="buyer-name"
              required
              minLength={2}
              value={buyer.name}
              onChange={(e) => setBuyer((b) => ({ ...b, name: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="buyer-email" className="mb-1.5 block text-sm font-medium text-ink">
              E-mail
            </label>
            <input
              id="buyer-email"
              type="email"
              required
              value={buyer.email}
              onChange={(e) => setBuyer((b) => ({ ...b, email: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="buyer-phone" className="mb-1.5 block text-sm font-medium text-ink">
              Telefone (WhatsApp)
            </label>
            <input
              id="buyer-phone"
              type="tel"
              required
              minLength={10}
              placeholder="(87) 99999-0000"
              value={buyer.phone}
              onChange={(e) => setBuyer((b) => ({ ...b, phone: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="buyer-document" className="mb-1.5 block text-sm font-medium text-ink">
              CPF
            </label>
            <input
              id="buyer-document"
              required
              minLength={11}
              maxLength={14}
              inputMode="numeric"
              placeholder="000.000.000-00"
              value={buyer.document}
              onChange={(e) => setBuyer((b) => ({ ...b, document: e.target.value }))}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting" || headcount === 0}
        className="w-full rounded-full bg-gold-500 px-8 py-3.5 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-300 disabled:opacity-60"
      >
        {status === "submitting"
          ? "Preparando pagamento..."
          : total > 0
            ? `Ir para pagamento — ${formatBRLCents(total)}`
            : "Confirmar ingressos gratuitos"}
      </button>

      {errorMessage && <p className="text-sm text-clay-600">{errorMessage}</p>}

      <p className="flex items-center gap-2 text-xs text-ink-soft">
        <ShieldCheck size={14} className="shrink-0 text-forest-600" />
        Pagamento processado com segurança pelo Mercado Pago — Pix, cartão em até 12x ou boleto. Seus
        dados de cartão nunca passam pelos nossos servidores.
      </p>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-ink focus:border-forest-600";
