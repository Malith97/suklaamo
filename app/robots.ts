import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://suklaamo.fi/sitemap.xml",
    host: "https://suklaamo.fi",
  };
}