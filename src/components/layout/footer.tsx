import Link from "next/link";
import { MapPin, Phone, Mail, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "./newsletter-form";
import { InstagramIcon, FacebookIcon } from "@/components/ui/social-icons";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="bg-forest-950 text-paper/80">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo className="h-11" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{siteConfig.tagline}</p>
          <div className="mt-6 flex items-center gap-2 text-sm">
            <MapPin size={16} className="text-gold-500" />
            <span>{siteConfig.location.city} — {siteConfig.location.state}</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <Phone size={16} className="text-gold-500" />
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>{siteConfig.contact.phone}</a>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <Mail size={16} className="text-gold-500" />
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </div>
          <div className="mt-6 flex gap-4">
            <a href={siteConfig.social.instagram} aria-label="Instagram" className="hover:text-gold-300">
              <InstagramIcon size={18} />
            </a>
            <a href={siteConfig.social.facebook} aria-label="Facebook" className="hover:text-gold-300">
              <FacebookIcon size={18} />
            </a>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-8 md:col-span-5 md:grid-cols-3" aria-label="Mapa do site">
          <FooterColumn title="Descobrir" links={siteConfig.footerLinks.descobrir} />
          <FooterColumn title="Reservar" links={siteConfig.footerLinks.reservar} />
          <FooterColumn title="Ajuda" links={siteConfig.footerLinks.ajuda} />
        </nav>

        <div className="md:col-span-3">
          <p className="font-serif text-lg text-paper">Diário do Lago</p>
          <p className="mt-2 text-sm">Histórias do Agreste, gastronomia e novidades da fazenda — direto no seu e-mail.</p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-paper/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Fazenda Lago São Francisco. Todos os direitos reservados.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {siteConfig.footerLinks.institucional.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-paper">
                {l.label}
              </Link>
            ))}
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-gold-500" /> Pagamento seguro
            </span>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-paper">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
