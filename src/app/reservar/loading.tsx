import { Container } from "@/components/ui/container";

export default function ReservarLoading() {
  return (
    <section className="bg-paper py-16 md:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]" aria-busy="true" aria-label="Carregando motor de reservas">
          <div className="space-y-4">
            <div className="h-8 w-64 animate-pulse rounded-lg bg-black/5" />
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 animate-pulse rounded-2xl bg-black/5" />
              ))}
            </div>
          </div>
          <div className="h-80 animate-pulse rounded-2xl bg-black/5" />
        </div>
      </Container>
    </section>
  );
}
