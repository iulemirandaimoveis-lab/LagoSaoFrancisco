import { cn } from "@/lib/utils";

/**
 * Art-directed placeholder used wherever real photography/video is pending.
 * Cap. 01.9 do blueprint exige "honestidade premium": em vez de fotos falsas
 * ou geradas por IA se passando pela propriedade real, usamos composição
 * gráfica (gradiente + linhas topográficas) até a produção audiovisual entrar.
 */
export function PlaceholderArt({
  palette,
  motif = "ripple",
  className,
  label,
}: {
  palette: [string, string];
  motif?: "ripple" | "topo" | "mist";
  className?: string;
  label?: string;
}) {
  const gradientId = `grad-${palette[0].replace("#", "")}-${palette[1].replace("#", "")}`;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        background: `linear-gradient(155deg, ${palette[0]} 0%, ${palette[1]} 100%)`,
      }}
      role="img"
      aria-label={label ?? "Composição visual da Fazenda Lago São Francisco"}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-40 mix-blend-soft-light"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill={`url(#${gradientId})`} />
        {motif === "ripple" &&
          Array.from({ length: 6 }).map((_, i) => (
            <circle
              key={i}
              cx="200"
              cy="260"
              r={30 + i * 26}
              fill="none"
              stroke="#ffffff"
              strokeOpacity={0.16 - i * 0.018}
              strokeWidth="1"
            />
          ))}
        {motif === "topo" &&
          Array.from({ length: 7 }).map((_, i) => (
            <path
              key={i}
              d={`M0 ${300 - i * 22} C 100 ${260 - i * 22}, 300 ${340 - i * 22}, 400 ${290 - i * 22}`}
              fill="none"
              stroke="#ffffff"
              strokeOpacity={0.2 - i * 0.02}
              strokeWidth="1"
            />
          ))}
        {motif === "mist" &&
          Array.from({ length: 5 }).map((_, i) => (
            <ellipse
              key={i}
              cx={200 + (i % 2 === 0 ? -40 : 40)}
              cy={120 + i * 50}
              rx={180 - i * 10}
              ry={26}
              fill="#ffffff"
              opacity={0.05 + i * 0.015}
            />
          ))}
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0)_0%,rgba(0,0,0,0.25)_100%)]" />
    </div>
  );
}
