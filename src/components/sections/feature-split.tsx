import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PlaceholderArt } from "@/components/ui/placeholder-art";
import { Reveal } from "@/components/motion/reveal";

export function FeatureSplit({
  eyebrow,
  title,
  description,
  ctaHref,
  ctaLabel,
  palette,
  motif = "ripple",
  reverse = false,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
  palette: [string, string];
  motif?: "ripple" | "topo" | "mist";
  reverse?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <section className={cn("py-20 md:py-28", tone === "dark" ? "bg-forest-950" : "bg-paper")}>
      <Container>
        <div className={cn("grid items-center gap-10 md:grid-cols-2 md:gap-16", reverse && "md:[&>*:first-child]:order-2")}>
          <Reveal>
            <PlaceholderArt
              palette={palette}
              motif={motif}
              className="aspect-[4/3] w-full rounded-3xl"
              label={title}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className={cn("text-xs font-semibold uppercase tracking-[0.28em]", tone === "dark" ? "text-gold-500" : "text-gold-700")}>
              {eyebrow}
            </p>
            <h2 className={cn("mt-3 text-balance-pretty font-serif text-3xl font-semibold leading-tight sm:text-4xl", tone === "dark" ? "text-paper" : "text-ink")}>
              {title}
            </h2>
            <p className={cn("mt-4 text-base leading-relaxed", tone === "dark" ? "text-paper/70" : "text-ink-soft")}>
              {description}
            </p>
            <Button href={ctaHref} variant={tone === "dark" ? "primary" : "secondary"} className="mt-7">
              {ctaLabel}
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
