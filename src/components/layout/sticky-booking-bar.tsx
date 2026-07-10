"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatBRL } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function StickyBookingBar({
  label,
  priceFrom,
  priceUnit = "diária",
  ctaHref,
  ctaLabel = "Ver disponibilidade",
}: {
  label: string;
  priceFrom: number;
  priceUnit?: string;
  ctaHref: string;
  ctaLabel?: string;
}) {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setVisible(!entry.isIntersecting);
      },
      { rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" />
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-forest-900/10 bg-paper/95 backdrop-blur-md shadow-[0_-8px_24px_rgba(0,0,0,0.08)]"
          >
            <div className="mx-auto flex max-w-8xl items-center justify-between gap-4 px-6 py-3.5 md:px-10">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{label}</p>
                <p className="text-xs text-ink-soft">
                  A partir de <span className="font-semibold text-forest-700">{formatBRL(priceFrom)}</span> / {priceUnit}
                </p>
              </div>
              <Button href={ctaHref} size="sm" className="shrink-0">
                {ctaLabel}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
