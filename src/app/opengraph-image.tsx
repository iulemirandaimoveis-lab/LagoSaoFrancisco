import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "linear-gradient(155deg, #0c1310 0%, #2a4334 100%)",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#c9a86a", textTransform: "uppercase", display: "flex" }}>
          Garanhuns · Agreste Pernambucano
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 68,
            color: "#f8f6f0",
            textAlign: "center",
            lineHeight: 1.1,
            fontWeight: 600,
            display: "flex",
          }}
        >
          {siteConfig.name}
        </div>
        <div style={{ marginTop: 24, fontSize: 28, color: "rgba(248,246,240,0.75)", textAlign: "center", display: "flex" }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
