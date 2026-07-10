"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const TIMES = ["12:00", "12:30", "13:00", "13:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

export function TableBookingForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      date: form.get("date"),
      time: form.get("time"),
      guests: form.get("guests"),
      occasion: form.get("occasion") || undefined,
    };

    try {
      const res = await fetch("/api/mesa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Não foi possível enviar sua solicitação.");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Algo deu errado. Tente novamente ou fale pelo WhatsApp.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-forest-600/20 bg-forest-950/[0.03] p-10 text-center">
        <CheckCircle2 className="text-forest-600" size={32} />
        <p className="font-serif text-2xl text-ink">Solicitação recebida</p>
        <p className="max-w-sm text-sm text-ink-soft">
          Nossa equipe confirma sua mesa por e-mail ou telefone em até 24 horas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <Field label="Nome" htmlFor="name">
        <input id="name" name="name" required minLength={2} className={inputClass} />
      </Field>
      <Field label="E-mail" htmlFor="email">
        <input id="email" name="email" type="email" required className={inputClass} />
      </Field>
      <Field label="Telefone / WhatsApp" htmlFor="phone">
        <input id="phone" name="phone" type="tel" required minLength={8} className={inputClass} />
      </Field>
      <Field label="Número de pessoas" htmlFor="guests">
        <input id="guests" name="guests" type="number" min={1} max={20} defaultValue={2} required className={inputClass} />
      </Field>
      <Field label="Data" htmlFor="date">
        <input id="date" name="date" type="date" required className={inputClass} />
      </Field>
      <Field label="Horário" htmlFor="time">
        <select id="time" name="time" required className={inputClass} defaultValue="">
          <option value="" disabled>
            Selecione
          </option>
          {TIMES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Ocasião (opcional)" htmlFor="occasion" full>
        <input id="occasion" name="occasion" placeholder="Aniversário, pedido de casamento, jantar de negócios..." className={inputClass} />
      </Field>

      {status === "error" && <p className="sm:col-span-2 text-sm text-clay-600">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="sm:col-span-2 mt-2 rounded-full bg-gold-500 px-8 py-3.5 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-300 disabled:opacity-60"
      >
        {status === "submitting" ? "Enviando..." : "Solicitar reserva de mesa"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-forest-600";

function Field({
  label,
  htmlFor,
  children,
  full,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}
