import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { rooms } from "@/content/rooms";
import { experiences } from "@/content/experiences";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/a-fazenda",
    "/hospedagem",
    "/restaurante",
    "/restaurante/cardapio",
    "/restaurante/reservar-mesa",
    "/experiencias",
    "/casamentos",
    "/casamentos/pacotes",
    "/casamentos/orcamento",
    "/museu",
    "/contato",
    "/politica-de-privacidade",
    "/termos",
    "/acessibilidade",
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: now,
      changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "" ? 1 : 0.7,
    })),
    ...rooms.map((room) => ({
      url: `${siteConfig.url}/hospedagem/${room.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...experiences.map((exp) => ({
      url: `${siteConfig.url}/experiencias/${exp.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
