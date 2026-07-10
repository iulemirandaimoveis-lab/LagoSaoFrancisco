import { Container } from "@/components/ui/container";
import { PlaceholderArt } from "@/components/ui/placeholder-art";

export function PageHero({
  eyebrow,
  title,
  description,
  palette,
  motif = "ripple",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  palette: [string, string];
  motif?: "ripple" | "topo" | "mist";
}) {
  return (
    <section className="relative flex h-[62svh] min-h-[420px] items-end overflow-hidden bg-forest-950 pb-16 pt-32">
      <PlaceholderArt palette={palette} motif={motif} className="absolute inset-0" label={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-black/10" />
      <Container className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold-300">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-balance-pretty font-serif text-4xl font-semibold leading-tight text-paper sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description && <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/75 md:text-lg">{description}</p>}
      </Container>
    </section>
  );
}
