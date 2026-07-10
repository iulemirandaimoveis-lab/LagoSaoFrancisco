"use client";

import { Minus, Plus } from "lucide-react";

export type Guests = { adults: number; children: number };

export function GuestSelector({
  guests,
  onChange,
  maxAdults,
  maxChildren,
}: {
  guests: Guests;
  onChange: (guests: Guests) => void;
  maxAdults: number;
  maxChildren: number;
}) {
  return (
    <div className="divide-y divide-black/5 rounded-xl border border-black/10 bg-white">
      <Stepper
        label="Adultos"
        value={guests.adults}
        min={1}
        max={maxAdults}
        onDecrement={() => onChange({ ...guests, adults: Math.max(1, guests.adults - 1) })}
        onIncrement={() => onChange({ ...guests, adults: Math.min(maxAdults, guests.adults + 1) })}
      />
      <Stepper
        label="Crianças"
        sublabel="0–12 anos"
        value={guests.children}
        min={0}
        max={maxChildren}
        onDecrement={() => onChange({ ...guests, children: Math.max(0, guests.children - 1) })}
        onIncrement={() => onChange({ ...guests, children: Math.min(maxChildren, guests.children + 1) })}
      />
    </div>
  );
}

function Stepper({
  label,
  sublabel,
  value,
  min,
  max,
  onDecrement,
  onIncrement,
}: {
  label: string;
  sublabel?: string;
  value: number;
  min: number;
  max: number;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        {sublabel && <p className="text-xs text-ink-soft">{sublabel}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrement}
          disabled={value <= min}
          aria-label={`Diminuir ${label.toLowerCase()}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 text-ink disabled:opacity-30"
        >
          <Minus size={14} />
        </button>
        <span className="w-4 text-center text-sm font-medium tabular-nums" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          onClick={onIncrement}
          disabled={value >= max}
          aria-label={`Aumentar ${label.toLowerCase()}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 text-ink disabled:opacity-30"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}
