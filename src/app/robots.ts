import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

// Explicitly welcome the AI crawlers (and search bots). Cloudflare's "block AI bots"
// toggle must also be OFF for this domain, or none of this matters.
const AI_BOTS = [
  "GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "Claude-User", "Claude-SearchBot", "anthropic-ai",
  "PerplexityBot", "Perplexity-User", "Google-Extended", "Googlebot", "Bingbot", "Applebot", "Applebot-Extended",
  "DuckAssistBot", "Amazonbot", "CCBot", "meta-externalagent", "Bytespider", "YouBot", "cohere-ai", "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/admin", "/api/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...AI_BOTS.map((ua) => ({ userAgent: ua, allow: "/", disallow })),
    ],
    sitemap: `${SITE.domain}/sitemap.xml`,
    host: SITE.domain,
  };
}
