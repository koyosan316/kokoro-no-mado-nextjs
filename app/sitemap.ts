import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kokoronomado.vercel.app";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/breathe`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/form`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/check`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/scan`,
      lastModified: new Date(),
    },
  ];
}