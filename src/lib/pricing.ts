import { addDays, startOfDay } from "./utils";

export type DayPrice = {
  date: Date;
  rate: number;
  isWeekend: boolean;
  isHoliday: boolean;
  isHighSeason: boolean;
  holidayLabel?: string;
  available: boolean;
};

function easterSunday(year: number): Date {
  // Meeus/Jones/Butcher Gregorian algorithm
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function fixedHoliday(year: number, month: number, day: number, label: string) {
  return { date: startOfDay(new Date(year, month - 1, day)), label };
}

/** Fixed-date national holidays + variable (Easter-derived) + local seasonal anchors. */
function holidaysForYear(year: number) {
  const easter = easterSunday(year);
  return [
    fixedHoliday(year, 1, 1, "Ano Novo"),
    { date: startOfDay(addDays(easter, -47)), label: "Carnaval" },
    { date: startOfDay(addDays(easter, -46)), label: "Carnaval" },
    { date: startOfDay(addDays(easter, -2)), label: "Sexta-feira Santa" },
    fixedHoliday(year, 4, 21, "Tiradentes"),
    fixedHoliday(year, 5, 1, "Dia do Trabalho"),
    { date: startOfDay(addDays(easter, 60)), label: "Corpus Christi" },
    fixedHoliday(year, 9, 7, "Independência"),
    fixedHoliday(year, 10, 12, "N. Sra. Aparecida"),
    fixedHoliday(year, 11, 2, "Finados"),
    fixedHoliday(year, 11, 15, "Proclamação da República"),
    fixedHoliday(year, 11, 20, "Consciência Negra"),
    fixedHoliday(year, 12, 25, "Natal"),
    fixedHoliday(year, 12, 31, "Réveillon"),
  ];
}

function holidayInfo(date: Date): { isHoliday: boolean; label?: string } {
  const d = startOfDay(date);
  const list = holidaysForYear(d.getFullYear());
  const hit = list.find((h) => h.date.getTime() === d.getTime());
  if (hit) return { isHoliday: true, label: hit.label };

  // São João (regional anchor, cap. 05 — sazonalidade do Agreste)
  if (d.getMonth() === 5 && d.getDate() >= 18 && d.getDate() <= 24) {
    return { isHoliday: true, label: "São João" };
  }
  // Festival de Inverno de Garanhuns (FIG) — janela cultural de julho
  if (d.getMonth() === 6 && d.getDate() >= 1 && d.getDate() <= 20) {
    return { isHoliday: true, label: "Festival de Inverno de Garanhuns" };
  }
  return { isHoliday: false };
}

function isHighSeason(date: Date) {
  const m = date.getMonth();
  // Dez-Jan (verão/férias) e Jun-Jul (frio do Agreste + FIG + São João) são alta temporada
  return m === 11 || m === 0 || m === 5 || m === 6;
}

function isWeekendNight(date: Date) {
  const day = date.getDay();
  // A diária de sexta e sábado é considerada "fim de semana" (check-out sáb/dom)
  return day === 5 || day === 6;
}

/** Hash determinístico (sem Math.random) para simular disponibilidade estável entre servidor e cliente. */
function deterministicHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function isAvailable(roomSlug: string, date: Date): boolean {
  const key = `${roomSlug}:${date.toISOString().slice(0, 10)}`;
  const hash = deterministicHash(key);
  // ~12% das noites indisponíveis, sempre iguais para a mesma data/quarto
  return hash % 100 >= 12;
}

export function priceForNight(roomSlug: string, basePrice: number, date: Date): DayPrice {
  const weekend = isWeekendNight(date);
  const { isHoliday, label } = holidayInfo(date);
  const highSeason = isHighSeason(date);

  let multiplier = 1;
  if (weekend) multiplier *= 1.18;
  if (highSeason) multiplier *= 1.22;
  if (isHoliday) multiplier *= 1.4;

  // Antecedência: reservas de última hora (próx. 3 dias) têm pequeno prêmio; datas distantes, leve desconto de early-bird
  const daysFromNow = Math.round(
    (startOfDay(date).getTime() - startOfDay(new Date()).getTime()) / 86_400_000,
  );
  if (daysFromNow >= 0 && daysFromNow <= 3) multiplier *= 1.08;
  else if (daysFromNow > 60) multiplier *= 0.94;

  const rate = Math.round((basePrice * multiplier) / 10) * 10;

  return {
    date,
    rate,
    isWeekend: weekend,
    isHoliday,
    isHighSeason: highSeason,
    holidayLabel: label,
    available: isAvailable(roomSlug, date),
  };
}

export function priceRange(roomSlug: string, basePrice: number, start: Date, nights: number): DayPrice[] {
  const out: DayPrice[] = [];
  for (let i = 0; i < nights; i++) {
    out.push(priceForNight(roomSlug, basePrice, addDays(start, i)));
  }
  return out;
}

export function monthCalendar(roomSlug: string, basePrice: number, year: number, month: number): DayPrice[] {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const out: DayPrice[] = [];
  for (let d = 0; d < daysInMonth; d++) {
    out.push(priceForNight(roomSlug, basePrice, addDays(first, d)));
  }
  return out;
}
