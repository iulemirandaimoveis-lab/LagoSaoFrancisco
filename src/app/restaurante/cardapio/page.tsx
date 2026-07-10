import type { Metadata } from "next";
import { Wine, Leaf } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { menu } from "@/content/menu";
import { formatBRL } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cardápio digital",
  description: "Cardápio digital do Restaurante Dom Dina: entradas, pratos principais, sobremesas e harmonização.",
  alternates: { canonical: "/restaurante/cardapio" },
};

export default function CardapioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Cardápio Dom Dina",
    hasMenuSection: menu.map((cat) => ({
      "@type": "MenuSection",
      name: cat.name,
      description: cat.description,
      hasMenuItem: cat.dishes.map((d) => ({
        "@type": "MenuItem",
        name: d.name,
        description: d.description,
        offers: { "@type": "Offer", price: d.price, priceCurrency: "BRL" },
      })),
    })),
  };

  return (
    <>
      <PageHero
        eyebrow="Restaurante Dom Dina"
        title="Cardápio digital"
        description="Atualizado pela cozinha — os preços e disponibilidades podem variar por safra e sazonalidade."
        palette={["#1d2f25", "#3a5b46"]}
      />

      <section className="bg-paper py-16 md:py-20">
        <Container className="max-w-3xl">
          <div className="flex flex-wrap gap-3">
            {menu.map((cat) => (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className="rounded-full border border-black/10 px-4 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:border-forest-600 hover:text-forest-700"
              >
                {cat.name}
              </a>
            ))}
          </div>

          <div className="mt-10 space-y-16">
            {menu.map((cat) => (
              <div key={cat.slug} id={cat.slug} className="scroll-mt-28">
                <Reveal>
                  <h2 className="font-serif text-3xl font-semibold text-ink">{cat.name}</h2>
                  <p className="mt-1 text-sm text-ink-soft">{cat.description}</p>
                </Reveal>
                <ul className="mt-8 divide-y divide-black/5">
                  {cat.dishes.map((dish, i) => (
                    <Reveal key={dish.name} delay={i * 0.04} as="li">
                      <div className="flex items-start justify-between gap-6 py-5">
                        <div>
                          <p className="flex items-center gap-2 font-medium text-ink">
                            {dish.name}
                            {dish.tags?.includes("vegetariano") && (
                              <Leaf size={14} className="text-forest-600" aria-label="Vegetariano" />
                            )}
                          </p>
                          <p className="mt-1 max-w-md text-sm text-ink-soft">{dish.description}</p>
                          {dish.pairing && (
                            <p className="mt-2 flex items-center gap-1.5 text-xs text-gold-700">
                              <Wine size={13} /> Harmoniza com {dish.pairing}
                            </p>
                          )}
                        </div>
                        <p className="shrink-0 font-medium text-ink">{formatBRL(dish.price)}</p>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl bg-forest-950 p-10 text-center">
              <p className="font-serif text-2xl text-paper">Pronto para reservar sua mesa?</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="/restaurante/reservar-mesa">Reservar mesa</Button>
                <Button
                  href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  variant="secondary"
                  className="border-paper/30 text-paper hover:border-paper/60"
                >
                  Falar pelo WhatsApp
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
