"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { PlaceholderArt } from "@/components/ui/placeholder-art";
import { InstagramIcon, FacebookIcon } from "@/components/ui/social-icons";

const EASE = [0.16, 1, 0.3, 1] as const;

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-0 z-40 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <PlaceholderArt palette={["#0c1310", "#1d2f25"]} motif="mist" className="absolute inset-0" />
          <div className="relative flex min-h-screen flex-col justify-between px-6 pb-10 pt-28 md:px-16">
            <nav className="flex flex-col gap-2" aria-label="Links principais">
              {siteConfig.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08 * i, ease: EASE }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block font-serif text-4xl font-medium text-paper transition-colors hover:text-gold-300 sm:text-6xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 * siteConfig.nav.length, ease: EASE }}
              >
                <Link
                  href="/reservar"
                  onClick={onClose}
                  className="mt-4 inline-block rounded-full bg-gold-500 px-8 py-3 text-sm font-semibold tracking-wide text-forest-950 transition-colors hover:bg-gold-300"
                >
                  Reservar agora
                </Link>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-6 text-paper/80"
            >
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm">
                <Phone size={16} /> {siteConfig.contact.phone}
              </a>
              <div className="flex gap-4">
                <a href={siteConfig.social.instagram} aria-label="Instagram" className="hover:text-gold-300">
                  <InstagramIcon size={20} />
                </a>
                <a href={siteConfig.social.facebook} aria-label="Facebook" className="hover:text-gold-300">
                  <FacebookIcon size={20} />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
