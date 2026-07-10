import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PlaceholderArt } from "./placeholder-art";
import { formatBRL } from "@/lib/utils";

export function EntityCard({
  href,
  title,
  subtitle,
  priceLabel,
  palette,
  motif = "ripple",
  titleAs: Heading = "h3",
}: {
  href: string;
  title: string;
  subtitle: string;
  priceLabel?: string;
  palette: [string, string];
  motif?: "ripple" | "topo" | "mist";
  titleAs?: "h2" | "h3";
}) {
  return (
    <Link href={href} className="group block">
      <div className="overflow-hidden rounded-2xl">
        <PlaceholderArt
          palette={palette}
          motif={motif}
          label={title}
          className="aspect-[4/5] w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <Heading className="font-serif text-xl font-semibold text-ink transition-colors group-hover:text-forest-700">
            {title}
          </Heading>
          <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>
          {priceLabel && (
            <p className="mt-2 text-sm font-medium text-forest-700">a partir de {priceLabel}</p>
          )}
        </div>
        <ArrowUpRight
          size={18}
          className="mt-1 shrink-0 text-ink-soft transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-700"
        />
      </div>
    </Link>
  );
}

export function formatFrom(value: number) {
  return formatBRL(value);
}
