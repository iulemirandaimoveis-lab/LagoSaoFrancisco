"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const bgY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-forest-950">
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <Image
          src="/images/lago/hero-lago-panoramica.jpg"
          alt="Vista panorâmica do lago da Fazenda Lago São Francisco ao entardecer, com o lodge à beira d'água"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/35 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-gold-300 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]"
        >
          Garanhuns · Agreste pernambucano
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-balance-pretty font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-paper [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          O refúgio de altitude à beira do lago
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-paper/90 [text-shadow:0_1px_16px_rgba(0,0,0,0.4)]"
        >
          Gastronomia autoral, arte e hospitalidade de destino no ponto mais frio do Nordeste — onde a névoa
          sobe do lago e o tempo desacelera.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button href="/reservar" size="lg">
            Reservar sua estadia
          </Button>
          <Button href="/a-fazenda" variant="secondary" size="lg" className="text-paper border-paper/30 hover:border-paper/60">
            Conhecer a fazenda
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-paper/70"
        aria-hidden="true"
      >
        <ChevronDown className="animate-bounce" size={22} />
      </motion.div>
    </section>
  );
}
