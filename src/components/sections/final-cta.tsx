import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <Image
        src="/images/lago/hero-lago-arvores.jpg"
        alt="Lago visto entre troncos de eucalipto, com o lodge ao fundo"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/55 to-forest-950/40" />
      <Container className="relative text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-300 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
            Desenhe seus dias
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance-pretty font-serif text-4xl font-semibold leading-tight tracking-tight text-paper [text-shadow:0_2px_20px_rgba(0,0,0,0.4)] sm:text-5xl">
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
