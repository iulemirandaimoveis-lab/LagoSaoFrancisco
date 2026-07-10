"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { monthCalendar, type DayPrice } from "@/lib/pricing";
import { cn, formatBRL, isSameDay, startOfDay } from "@/lib/utils";

export type DateRange = { checkIn: Date | null; checkOut: Date | null };

const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];
const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

export function BookingCalendar({
  roomSlug,
  basePrice,
  range,
  onChange,
}: {
  roomSlug: string;
  basePrice: number;
  range: DateRange;
  onChange: (range: DateRange) => void;
}) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const maxCursor = useMemo(() => new Date(today.getFullYear(), today.getMonth() + 10, 1), [today]);
  const canGoBack = cursor.getFullYear() > today.getFullYear() || cursor.getMonth() > today.getMonth();
  const canGoForward = cursor < maxCursor;

  function handleDayClick(day: DayPrice) {
    if (!day.available || startOfDay(day.date) < today) return;

    const { checkIn, checkOut } = range;
    if (!checkIn || checkOut) {
      onChange({ checkIn: day.date, checkOut: null });
      return;
    }
    if (startOfDay(day.date) <= startOfDay(checkIn)) {
      onChange({ checkIn: day.date, checkOut: null });
      return;
    }
    onChange({ checkIn, checkOut: day.date });
  }

  function renderMonth(monthOffset: number) {
    const monthDate = new Date(cursor.getFullYear(), cursor.getMonth() + monthOffset, 1);
    const days = monthCalendar(roomSlug, basePrice, monthDate.getFullYear(), monthDate.getMonth());
    const firstWeekday = monthDate.getDay();

    return (
      <div key={monthOffset}>
        <p className="mb-4 text-center font-serif text-lg font-semibold text-ink">
          {MONTH_NAMES[monthDate.getMonth()]} {monthDate.getFullYear()}
        </p>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-ink-soft">
          {WEEKDAYS.map((w, i) => (
            <span key={i} className="py-1 font-medium">
              {w}
            </span>
          ))}
          {Array.from({ length: firstWeekday }).map((_, i) => (
            <span key={`pad-${i}`} />
          ))}
          {days.map((day) => {
            const isPast = startOfDay(day.date) < today;
            const isCheckIn = range.checkIn && isSameDay(day.date, range.checkIn);
            const isCheckOut = range.checkOut && isSameDay(day.date, range.checkOut);
            const inRange =
              range.checkIn &&
              range.checkOut &&
              day.date > range.checkIn &&
              day.date < range.checkOut;
            const disabled = isPast || !day.available;

            return (
              <button
                key={day.date.toISOString()}
                type="button"
                disabled={disabled}
                onClick={() => handleDayClick(day)}
                aria-pressed={Boolean(isCheckIn || isCheckOut)}
                aria-label={`${day.date.toLocaleDateString("pt-BR")}${disabled ? ", indisponível" : `, ${formatBRL(day.rate)}`}`}
                className={cn(
                  "relative flex aspect-square flex-col items-center justify-center rounded-lg text-xs transition-colors",
                  disabled && "cursor-not-allowed text-ink-soft/30 line-through",
                  !disabled && !isCheckIn && !isCheckOut && !inRange && "text-ink hover:bg-forest-700/10",
                  inRange && "rounded-none bg-forest-700/10 text-ink",
                  (isCheckIn || isCheckOut) && "bg-forest-700 text-paper",
                  !disabled && day.isHoliday && !isCheckIn && !isCheckOut && !inRange && "text-clay-600",
                )}
                title={day.holidayLabel}
              >
                <span className="font-medium">{day.date.getDate()}</span>
                {!disabled && <span className="text-[9px] opacity-80">{Math.round(day.rate / 10) / 100}k</span>}
                {day.isHoliday && <span className="absolute right-1 top-1 h-1 w-1 rounded-full bg-gold-500" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => canGoBack && setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          disabled={!canGoBack}
          aria-label="Mês anterior"
          className="rounded-full p-2 text-ink-soft transition-colors hover:bg-black/5 disabled:opacity-30"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-4 text-xs text-ink-soft">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-gold-500" /> feriado/evento
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-forest-700" /> selecionado
          </span>
        </div>
        <button
          type="button"
          onClick={() => canGoForward && setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          disabled={!canGoForward}
          aria-label="Próximo mês"
          className="rounded-full p-2 text-ink-soft transition-colors hover:bg-black/5 disabled:opacity-30"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        {renderMonth(0)}
        <div className="hidden sm:block">{renderMonth(1)}</div>
      </div>
    </div>
  );
}
