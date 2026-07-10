import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";
import { faq } from "@/content/faq";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Fazenda Lago São Francisco, veja como chegar e tire suas dúvidas no FAQ.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Fale com a fazenda"
        description="Dúvidas sobre hospedagem, eventos ou o restaurante — respondemos rápido."
        palette={["#4c636b", "#7d97a1"]}
      />

      <section className="bg-paper py-16 md:py-20">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">Envie uma mensagem</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">Informações diretas</h2>
            <ul className="mt-6 space-y-4 text-sm text-ink-soft">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-forest-600" />
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>{siteConfig.contact.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-forest-600" />
                <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-forest-600" />
                {siteConfig.location.address}
              </li>
            </ul>

            <div id="como-chegar" className="mt-10 scroll-mt-24">
              <h3 className="font-serif text-xl font-semibold text-ink">Como chegar</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                A cerca de 2h30 de Recife pela BR-232, no eixo Recife–Caruaru–Garanhuns. A fazenda fica na
                zona rural de Garanhuns, com acesso sinalizado a partir do centro da cidade.
              </p>
              <div className="mt-4 aspect-video overflow-hidden rounded-2xl border border-black/5">
                <iframe
                  title="Mapa de localização da Fazenda Lago São Francisco"
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.location.mapsQuery)}&output=embed`}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="faq" className="scroll-mt-24 bg-forest-950 py-16 md:py-20">
        <Container className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">Perguntas frequentes</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-paper">Tudo o que você precisa saber</h2>
          <div className="mt-8 divide-y divide-white/10">
            {faq.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-paper">
                  {item.question}
                  <span className="shrink-0 text-gold-500 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
