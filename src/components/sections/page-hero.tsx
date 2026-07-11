import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PlaceholderArt } from "@/components/ui/placeholder-art";

export function PageHero({
  eyebrow,
  title,
  description,
  palette,
  motif = "ripple",
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  palette: [string, string];
  motif?: "ripple" | "topo" | "mist";
  /** Foto real opcional (ex.: acervo do museu). Sem isso, usa a composição gráfica padrão. */
  image?: { src: string; alt: string };
}) {
  return (
    <section className="relative flex h-[62svh] min-h-[420px] items-end overflow-hidden bg-forest-950 pb-16 pt-32">
      {image ? (
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
      ) : (
        <PlaceholderArt palette={palette} motif={motif} className="absolute inset-0" label={title} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/35 to-black/15" />
      <Container className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold-300 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-balance-pretty font-serif text-4xl font-semibold leading-tight tracking-tight text-paper [text-shadow:0_2px_20px_rgba(0,0,0,0.35)] sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.35)] md:text-lg">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
