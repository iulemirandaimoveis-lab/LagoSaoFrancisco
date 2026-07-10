import { ImageResponse } from "next/og";
import { rooms, getRoomBySlug } from "@/content/rooms";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  const [from, to] = room?.heroPalette ?? ["#0c1310", "#2a4334"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: `linear-gradient(155deg, ${from} 0%, ${to} 100%)`,
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 6, color: "#c9a86a", textTransform: "uppercase", display: "flex" }}>
          Hospedagem · Fazenda Lago São Francisco
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 64,
            color: "#f8f6f0",
            textAlign: "center",
            lineHeight: 1.1,
            fontWeight: 600,
            display: "flex",
          }}
        >
          {room?.name ?? "Hospedagem"}
        </div>
        {room && (
          <div style={{ marginTop: 22, fontSize: 26, color: "rgba(248,246,240,0.75)", textAlign: "center", display: "flex" }}>
            {room.tagline}
          </div>
        )}
      </div>
    ),
    { ...size },
  );
}
