import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";

export function ManifestoQuote({ quote, attribution }: { quote: string; attribution?: string }) {
  return (
    <section className="bg-paper py-24 md:py-32">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <p className="text-balance-pretty font-serif text-3xl italic leading-snug text-ink sm:text-4xl md:text-5xl">
            &ldquo;{quote}&rdquo;
          </p>
          {attribution && <p className="mt-6 text-sm uppercase tracking-[0.2em] text-ink-soft">{attribution}</p>}
        </Reveal>
      </Container>
    </section>
  );
}
