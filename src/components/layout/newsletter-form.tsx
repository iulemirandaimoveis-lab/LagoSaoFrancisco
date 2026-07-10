"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("sent");
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        E-mail
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="seu@email.com"
        className="w-full rounded-full border border-paper/20 bg-transparent px-5 py-3 text-sm text-paper placeholder:text-paper/40 focus:border-gold-500"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-300"
      >
        {status === "sent" ? "Recebido ✓" : "Assinar"}
      </button>
    </form>
  );
}
