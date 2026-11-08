import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { organizationLd, websiteLd } from "@/lib/schema";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: "Freedom BVI | Fountaine Pajot Aura 51 Catamaran Charter, British Virgin Islands",
    template: "%s | Freedom BVI",
  },
  description:
    "Charter Freedom, a 2024 Fountaine Pajot Aura 51 five-cabin catamaran, bareboat or with captain, from Road Town, Tortola. Weekly rates from $15,000. Managed by BVI Yacht Charters.",
  keywords: [
    "BVI catamaran charter", "Fountaine Pajot Aura 51 charter", "British Virgin Islands sailing",
    "bareboat charter BVI", "5 cabin catamaran charter", "Tortola yacht charter",
  ],
  openGraph: {
    type: "website",
    siteName: "Freedom BVI",
    url: SITE.domain,
    title: "Freedom BVI | Aura 51 Catamaran Charter",
    description: "A 2024 Fountaine Pajot Aura 51 for private charter in the British Virgin Islands.",
    images: [{ url: "/images/home-fountaine-pajot.jpg", width: 1600, height: 1000, alt: "Freedom under sail" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: { icon: "/images/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet" />
        <JsonLd data={[organizationLd, websiteLd]} />
      </head>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
