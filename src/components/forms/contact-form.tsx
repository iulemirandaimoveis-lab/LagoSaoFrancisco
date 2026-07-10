"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone") || undefined,
      subject: form.get("subject"),
      message: form.get("message"),
    };
    try {
      const res = await fetch("/api/contato", {
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
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-forest-600/20 bg-forest-950/[0.03] p-10 text-center">
        <CheckCircle2 className="text-forest-600" size={28} />
        <p className="font-serif text-xl text-ink">Mensagem enviada</p>
        <p className="max-w-xs text-sm text-ink-soft">Respondemos em até 24 horas úteis.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium text-ink">
            Nome
          </label>
          <input id="c-name" name="name" required minLength={2} className={inputClass} />
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium text-ink">
            E-mail
          </label>
          <input id="c-email" name="email" type="email" required className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="c-phone" className="mb-1.5 block text-sm font-medium text-ink">
          Telefone (opcional)
        </label>
        <input id="c-phone" name="phone" type="tel" className={inputClass} />
      </div>
      <div>
        <label htmlFor="c-subject" className="mb-1.5 block text-sm font-medium text-ink">
          Assunto
        </label>
        <input id="c-subject" name="subject" required minLength={2} className={inputClass} />
      </div>
      <div>
        <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium text-ink">
          Mensagem
        </label>
        <textarea id="c-message" name="message" required minLength={5} rows={5} className={inputClass} />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 rounded-full bg-gold-500 px-8 py-3.5 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-300 disabled:opacity-60"
      >
        {status === "submitting" ? "Enviando..." : "Enviar mensagem"}
      </button>
      {status === "error" && <p className="text-sm text-clay-600">Algo deu errado. Tente novamente.</p>}
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-ink focus:border-forest-600";
