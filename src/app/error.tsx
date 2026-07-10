"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70svh] items-center bg-paper">
      <Container className="max-w-lg text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-700">Algo deu errado</p>
        <h1 className="mt-4 font-serif text-3xl font-semibold text-ink">
          A página encontrou um problema inesperado
        </h1>
        <p className="mt-4 text-ink-soft">
          Nossa equipe já foi notificada. Você pode tentar novamente ou voltar para a home.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button onClick={reset}>Tentar novamente</Button>
          <Button href="/" variant="secondary">
            Voltar à home
          </Button>
        </div>
      </Container>
    </section>
  );
}
