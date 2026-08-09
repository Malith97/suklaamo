import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://suklaamo.fi",
      lastModified: new Date(),
    },
    {
      url: "https://suklaamo.fi/about",
      lastModified: new Date(),
    },
    {
      url: "https://suklaamo.fi/catalogue",
      lastModified: new Date(),
    },
    {
      url: "https://suklaamo.fi/contact",
      lastModified: new Date(),
    },
  ];
}