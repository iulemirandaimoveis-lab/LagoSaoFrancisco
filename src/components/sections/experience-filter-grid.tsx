"use client";

import { useMemo, useState } from "react";
import { EntityCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatBRL } from "@/lib/utils";
import { experienceCategories, type Experience } from "@/content/experiences";

const difficultyOrder: Record<Experience["difficulty"], number> = { leve: 0, moderado: 1, intenso: 2 };

export function ExperienceFilterGrid({ experiences }: { experiences: Experience[] }) {
  const [category, setCategory] = useState<Experience["category"] | "todas">("todas");
  const [maxDifficulty, setMaxDifficulty] = useState<"todas" | Experience["difficulty"]>("todas");

  const filtered = useMemo(() => {
    return experiences.filter((e) => {
      if (category !== "todas" && e.category !== category) return false;
      if (maxDifficulty !== "todas" && difficultyOrder[e.difficulty] > difficultyOrder[maxDifficulty]) return false;
      return true;
    });
  }, [experiences, category, maxDifficulty]);

  return (
    <div>
      <h2 className="mb-6 font-serif text-2xl font-semibold text-ink">Todas as experiências</h2>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por categoria">
        <FilterChip active={category === "todas"} onClick={() => setCategory("todas")}>
          Todas
        </FilterChip>
        {experienceCategories.map((c) => (
          <FilterChip key={c.value} active={category === c.value} onClick={() => setCategory(c.value)}>
            {c.label}
          </FilterChip>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por intensidade">
        <span className="text-xs uppercase tracking-wide text-ink-soft">Intensidade até:</span>
        {(["todas", "leve", "moderado", "intenso"] as const).map((d) => (
          <FilterChip key={d} active={maxDifficulty === d} onClick={() => setMaxDifficulty(d)} small>
            {d === "todas" ? "Todas" : d}
          </FilterChip>
        ))}
      </div>

      <p className="mt-6 text-sm text-ink-soft" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "experiência encontrada" : "experiências encontradas"}
      </p>

      <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((exp) => (
          <EntityCard
            key={exp.slug}
            href={`/experiencias/${exp.slug}`}
            title={exp.name}
            subtitle={exp.tagline}
            priceLabel={exp.price > 0 ? `${formatBRL(exp.price)} ${exp.priceUnit}` : "Cortesia para hóspedes"}
            palette={exp.heroPalette}
            motif="mist"
          />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
  small,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border font-medium capitalize transition-colors",
        small ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm",
        active
          ? "border-forest-700 bg-forest-700 text-paper"
          : "border-black/10 text-ink-soft hover:border-forest-600 hover:text-forest-700",
      )}
    >
      {children}
    </button>
  );
}
