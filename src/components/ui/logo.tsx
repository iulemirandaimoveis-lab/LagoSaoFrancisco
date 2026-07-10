import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/logo-mark-white.png"
      alt="Fazenda Lago São Francisco"
      width={310}
      height={141}
      priority={priority}
      className={cn("h-9 w-auto", className)}
    />
  );
}
