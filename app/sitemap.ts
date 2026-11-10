import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.zevyq.de",
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.zevyq.de/sportwetten",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.zevyq.de/fussballtipps",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.zevyq.de/ki-sportwetten",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.zevyq.de/ki-fussballtipps",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.zevyq.de/sportwetten-analyse",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.zevyq.de/fussball-analyse",
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
