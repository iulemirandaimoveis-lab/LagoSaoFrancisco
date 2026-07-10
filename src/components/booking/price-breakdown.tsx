import { formatBRL } from "@/lib/utils";
import type { DayPrice } from "@/lib/pricing";

export function PriceBreakdown({ nights, experiencesTotal = 0 }: { nights: DayPrice[]; experiencesTotal?: number }) {
  const subtotal = nights.reduce((sum, n) => sum + n.rate, 0);
  const total = subtotal + experiencesTotal;

  if (nights.length === 0) {
    return <p className="text-sm text-ink-soft">Selecione as datas para ver o valor total.</p>;
  }

  return (
    <div className="space-y-2 text-sm">
      {nights.map((n) => (
        <div key={n.date.toISOString()} className="flex items-center justify-between text-ink-soft">
          <span>
            {n.date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
            {n.isHoliday && <span className="ml-1.5 text-xs text-gold-700">· {n.holidayLabel}</span>}
            {n.isWeekend && !n.isHoliday && <span className="ml-1.5 text-xs">· fim de semana</span>}
          </span>
          <span className="tabular-nums text-ink">{formatBRL(n.rate)}</span>
        </div>
      ))}
      <div className="flex items-center justify-between border-t border-black/5 pt-2 text-ink-soft">
        <span>
          {nights.length} {nights.length === 1 ? "diária" : "diárias"}
        </span>
        <span className="tabular-nums text-ink">{formatBRL(subtotal)}</span>
      </div>
      {experiencesTotal > 0 && (
        <div className="flex items-center justify-between text-ink-soft">
          <span>Experiências adicionadas</span>
          <span className="tabular-nums text-ink">{formatBRL(experiencesTotal)}</span>
        </div>
      )}
      <div className="flex items-center justify-between border-t border-black/10 pt-3 text-base font-semibold text-ink">
        <span>Total</span>
        <span className="tabular-nums">{formatBRL(total)}</span>
      </div>
    </div>
  );
}
