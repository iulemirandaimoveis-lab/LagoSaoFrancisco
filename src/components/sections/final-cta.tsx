import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PlaceholderArt } from "@/components/ui/placeholder-art";
import { Reveal } from "@/components/motion/reveal";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <PlaceholderArt palette={["#0c1310", "#1d2f25"]} motif="mist" className="absolute inset-0" />
      <div className="absolute inset-0 bg-black/25" />
      <Container className="relative text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">Desenhe seus dias</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance-pretty font-serif text-4xl font-semibold leading-tight text-paper sm:text-5xl">
            Você não reserva um quarto. Você desenha dias que vai lembrar.
          </h2>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/reservar" size="lg">
              Reservar agora
            </Button>
            <Button href="/contato" variant="secondary" size="lg" className="border-paper/30 text-paper hover:border-paper/60">
              Falar com a fazenda
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
