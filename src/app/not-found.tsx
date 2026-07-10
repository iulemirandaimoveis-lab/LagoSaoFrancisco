import type { Metadata } from "next";
import { PlaceholderArt } from "@/components/ui/placeholder-art";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-forest-950">
      <PlaceholderArt palette={["#0c1310", "#2a4334"]} motif="mist" className="absolute inset-0" />
      <div className="absolute inset-0 bg-black/30" />
      <Container className="relative text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">Erro 404</p>
        <h1 className="mx-auto mt-4 max-w-xl text-balance-pretty font-serif text-4xl font-semibold text-paper sm:text-5xl">
          Essa trilha ainda não foi mapeada
        </h1>
        <p className="mx-auto mt-4 max-w-md text-paper/75">
          A página que você procura não existe ou foi movida. Que tal voltar para a beira do lago?
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/" size="lg">
            Voltar à home
          </Button>
          <Button href="/contato" variant="secondary" size="lg" className="border-paper/30 text-paper hover:border-paper/60">
            Falar com a fazenda
          </Button>
        </div>
      </Container>
    </section>
  );
}
