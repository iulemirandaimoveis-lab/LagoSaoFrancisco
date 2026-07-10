"use client";

import { Check } from "lucide-react";
import { PlaceholderArt } from "@/components/ui/placeholder-art";
import { cn, formatBRL } from "@/lib/utils";
import type { Room } from "@/content/rooms";

export function RoomPicker({
  rooms,
  selectedSlug,
  onSelect,
}: {
  rooms: Room[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2" role="radiogroup" aria-label="Escolha a acomodação">
      {rooms.map((room) => {
        const selected = room.slug === selectedSlug;
        return (
          <button
            key={room.slug}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(room.slug)}
            className={cn(
              "relative flex gap-4 rounded-2xl border p-3 text-left transition-colors",
              selected ? "border-forest-700 bg-forest-700/5" : "border-black/10 hover:border-forest-600/40",
            )}
          >
            <PlaceholderArt palette={room.heroPalette} className="h-20 w-20 shrink-0 rounded-xl" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{room.name}</p>
              <p className="mt-0.5 text-xs text-ink-soft">
                até {room.maxAdults} adultos · {room.bedConfig}
              </p>
              <p className="mt-1 text-sm font-medium text-forest-700">{formatBRL(room.basePrice)} / noite</p>
            </div>
            {selected && (
              <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-forest-700 text-paper">
                <Check size={12} />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
