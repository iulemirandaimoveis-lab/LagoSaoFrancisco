"use client";

import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { weddingPackages } from "@/content/weddings";
import { formatBRL, cn } from "@/lib/utils";

export function WeddingSimulator() {
  const [packageSlug, setPackageSlug] = useState(weddingPackages[1]?.slug ?? weddingPackages[0]!.slug);
  const [guests, setGuests] = useState(100);
  const [eventDate, setEventDate] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const pkg = weddingPackages.find((p) => p.slug === packageSlug) ?? weddingPackages[0]!;

  const estimate = useMemo(() => {
    const extraGuests = Math.max(0, Math.min(guests, pkg.maxGuests) - pkg.includedGuests);
    let total = pkg.startingPrice + extraGuests * pkg.extraGuestCost;

    if (eventDate) {
      const d = new Date(`${eventDate}T12:00:00`);
      const day = d.getDay();
      const month = d.getMonth();
      if (day === 6) total *= 1.12; // sábado
      if (month === 5 || month === 6 || month === 11) total *= 1.08; // São João/FIG/verão
    }

    return Math.round(total / 100) * 100;
  }, [pkg, guests, eventDate]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    const payload = {
      package: pkg.name,
      guests,
      eventDate: eventDate || undefined,
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      estimate,
      message: form.get("message") || undefined,
    };
    try {
      const res = await fetch("/api/casamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-gold-500/30 bg-white p-10 text-center">
        <CheckCircle2 className="text-forest-600" size={32} />
        <p className="font-serif text-2xl text-ink">Recebemos sua solicitação</p>
        <p className="max-w-sm text-sm text-ink-soft">
          Nossa equipe de eventos entra em contato em até 48 horas com a proposta detalhada e a verificação
          de disponibilidade da data.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">Simulador de orçamento</p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-ink">Monte uma estimativa</h2>

        <div className="mt-6">
          <span className="mb-2 block text-sm font-medium text-ink">Pacote</span>
          <div className="flex flex-col gap-2">
            {weddingPackages.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => {
                  setPackageSlug(p.slug);
                  setGuests(p.includedGuests);
                }}
                className={cn(
                  "rounded-xl border px-4 py-3 text-left transition-colors",
                  packageSlug === p.slug
                    ? "border-forest-700 bg-forest-700/5"
                    : "border-black/10 hover:border-forest-600/50",
                )}
              >
                <span className="block text-sm font-semibold text-ink">{p.name}</span>
                <span className="block text-xs text-ink-soft">{p.guests} · a partir de {formatBRL(p.startingPrice)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="guests-range" className="mb-2 block text-sm font-medium text-ink">
            Número de convidados: <span className="font-semibold text-forest-700">{guests}</span>
          </label>
          <input
            id="guests-range"
            type="range"
            min={20}
            max={pkg.maxGuests}
            step={10}
            value={Math.min(guests, pkg.maxGuests)}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full accent-forest-700"
          />
        </div>

        <div className="mt-6">
          <label htmlFor="event-date" className="mb-2 block text-sm font-medium text-ink">
            Data prevista (opcional)
          </label>
          <input
            id="event-date"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-ink focus:border-forest-600"
          />
        </div>

        <div className="mt-8 rounded-2xl bg-forest-950 p-6 text-paper">
          <p className="text-xs uppercase tracking-wide text-paper/60">Estimativa</p>
          <p className="mt-1 font-serif text-3xl font-semibold">{formatBRL(estimate)}</p>
          <p className="mt-1 text-xs text-paper/60">
            Valor aproximado, sujeito a confirmação de data e visita técnica.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <h3 className="font-serif text-xl font-semibold text-ink">Receber proposta detalhada</h3>
        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="w-name" className="mb-1.5 block text-sm font-medium text-ink">
              Nome
            </label>
            <input id="w-name" name="name" required minLength={2} className={inputClass} />
          </div>
          <div>
            <label htmlFor="w-email" className="mb-1.5 block text-sm font-medium text-ink">
              E-mail
            </label>
            <input id="w-email" name="email" type="email" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="w-phone" className="mb-1.5 block text-sm font-medium text-ink">
              Telefone / WhatsApp
            </label>
            <input id="w-phone" name="phone" type="tel" required minLength={8} className={inputClass} />
          </div>
          <div>
            <label htmlFor="w-message" className="mb-1.5 block text-sm font-medium text-ink">
              Conte um pouco sobre a celebração (opcional)
            </label>
            <textarea id="w-message" name="message" rows={3} className={inputClass} />
          </div>
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-6 w-full rounded-full bg-gold-500 px-8 py-3.5 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-300 disabled:opacity-60"
        >
          {status === "submitting" ? "Enviando..." : "Solicitar proposta"}
        </button>
        {status === "error" && <p className="mt-3 text-sm text-clay-600">Algo deu errado. Tente novamente.</p>}
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-ink focus:border-forest-600";
