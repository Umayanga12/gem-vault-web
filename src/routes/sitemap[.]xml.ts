import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { stones } from "@/data/stones";

// Confirmed production domain — do NOT include a trailing slash.
const BASE_URL = "https://www.rheacylone.lk";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // ISO date string used as a freshness signal for crawlers (YYYY-MM-DD).
        const today = new Date().toISOString().split("T")[0];

        const entries: SitemapEntry[] = [
          // Core pages
          { path: "/",             lastmod: today, changefreq: "weekly",  priority: "1.0" },
          { path: "/browse",       lastmod: today, changefreq: "daily",   priority: "0.9" },
          { path: "/about",        lastmod: today, changefreq: "monthly", priority: "0.7" },
          { path: "/contactus",    lastmod: today, changefreq: "monthly", priority: "0.6" },
          { path: "/trust",        lastmod: today, changefreq: "monthly", priority: "0.6" },
          { path: "/consultation", lastmod: today, changefreq: "monthly", priority: "0.6" },

          // Individual stone detail pages
          ...stones.map((s) => ({
            path:       `/stones/${s.id}`,
            lastmod:    today,
            changefreq: "weekly" as const,
            priority:   "0.8",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod    ? `    <lastmod>${e.lastmod}</lastmod>`       : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority   ? `    <priority>${e.priority}</priority>`   : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset`,
          `  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
          `  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"`,
          `  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9`,
          `    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type":  "application/xml; charset=utf-8",
            // Cache for 1 hour on CDN; revalidate after.
            "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
            // Prevent the sitemap URL itself from appearing in search results.
            "X-Robots-Tag":  "noindex, follow",
          },
        });
      },
    },
  },
});
