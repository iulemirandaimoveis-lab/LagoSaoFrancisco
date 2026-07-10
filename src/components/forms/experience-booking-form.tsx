"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function ExperienceBookingForm({ experienceSlug, schedule }: { experienceSlug: string; schedule: string[] }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    const payload = {
      experience: experienceSlug,
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      date: form.get("date"),
      time: form.get("time"),
      people: form.get("people"),
    };
    try {
      const res = await fetch("/api/experiencias", {
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
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-forest-600/20 bg-forest-950/[0.03] p-8 text-center">
        <CheckCircle2 className="text-forest-600" size={28} />
        <p className="font-serif text-xl text-ink">Solicitação enviada</p>
        <p className="max-w-xs text-sm text-ink-soft">Confirmamos a vaga por e-mail ou WhatsApp em breve.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="exp-name" className="mb-1.5 block text-sm font-medium text-ink">
          Nome
        </label>
        <input id="exp-name" name="name" required minLength={2} className={inputClass} />
      </div>
      <div>
        <label htmlFor="exp-email" className="mb-1.5 block text-sm font-medium text-ink">
          E-mail
        </label>
        <input id="exp-email" name="email" type="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="exp-phone" className="mb-1.5 block text-sm font-medium text-ink">
          Telefone
        </label>
        <input id="exp-phone" name="phone" type="tel" required minLength={8} className={inputClass} />
      </div>
      <div>
        <label htmlFor="exp-date" className="mb-1.5 block text-sm font-medium text-ink">
          Data
        </label>
        <input id="exp-date" name="date" type="date" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="exp-time" className="mb-1.5 block text-sm font-medium text-ink">
          Horário
        </label>
        <select id="exp-time" name="time" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Selecione
          </option>
          {schedule.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="exp-people" className="mb-1.5 block text-sm font-medium text-ink">
          Número de participantes
        </label>
        <input id="exp-people" name="people" type="number" min={1} max={30} defaultValue={2} required className={inputClass} />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="sm:col-span-2 mt-1 rounded-full bg-gold-500 px-8 py-3 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-300 disabled:opacity-60"
      >
        {status === "submitting" ? "Enviando..." : "Solicitar esta experiência"}
      </button>
      {status === "error" && (
        <p className="sm:col-span-2 text-sm text-clay-600">Algo deu errado. Tente novamente.</p>
      )}
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-ink focus:border-forest-600";
