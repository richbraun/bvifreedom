# bvifreedom.com — rebuild

Next.js 16 (App Router, Tailwind 4) · Vercel · Neon · Resend · Vercel Blob

## Setup
1. `npm i`
2. `node scripts/fetch-assets.mjs` — downloads the stock Aura 51 photos from the current site into `public/images`.
   Replace any file with a real photo of Freedom (same filename) whenever you have one.
3. Create a Neon database and run `db/schema.sql`.
4. In Vercel: add a Blob store to the project, set the env vars from `.env.example`.
5. In Resend: verify `bvifreedom.com` and add the DNS records at GoDaddy.
6. `npm run dev`

## Features
- Brochure pages: Home, About Freedom (full spec sheet), Pricing & Inquiries, Experience the BVI (7-day itinerary), Trip Resources, FAQ
- Inquiry form → Neon `inquiries` table + Resend email to INQUIRY_TO + confirmation to guest. Honeypot anti-spam, no reCAPTCHA.
- Guest photo wall: `/aboard` (QR target) → upload to Vercel Blob → `/admin/photos` approve/reject → `/gallery` with share buttons
  (native share sheet incl. Instagram on phones, Facebook, X, download, copy caption). Print the boat QR from `/api/qr?size=2000`.
- AI / search visibility: server-rendered HTML, JSON-LD (Organization, WebSite, Product+Offers, FAQPage, BreadcrumbList, ImageGallery),
  question-style headings with direct answers, `robots.txt` explicitly allowing AI crawlers, `sitemap.xml`, `/llms.txt`.
  **Turn OFF "Block AI bots" in Cloudflare for this zone.**

## Content to confirm
`src/lib/content.ts` holds every word of copy and every number. Items written as reasonable defaults, not taken from the old site:
PRICING_NOTES (deposit %, mooring-ball cost, inclusions), the three testimonial paraphrases, FAQ answers on booking/deposit, and the
sample itinerary. Edit freely.
