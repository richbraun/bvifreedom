import type { Metadata } from "next";
import { SITE } from "@/lib/content";
export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy-policy" } };
export default function Privacy() {
  return (
    <section className="container-x prose-x max-w-3xl py-16">
      <h1 className="mb-6 text-4xl font-semibold">Privacy Policy</h1>
      <p>Freedom BVI ("we") operates {SITE.domain}. This page explains what we collect and why.</p>
      <h2 className="mb-2 mt-8 text-2xl font-semibold">Inquiries</h2>
      <p>When you send an inquiry we store the name, email, phone, preferred contact method, dates and message you provide so we can respond and, if you book, pass your details to BVI Yacht Charters to prepare the charter agreement. We do not sell or rent your information.</p>
      <h2 className="mb-2 mt-8 text-2xl font-semibold">Guest photos</h2>
      <p>Photos you upload through the "Share your photos" page are stored on our hosting provider, reviewed by us, and may be displayed in the Life Aboard gallery and on Freedom BVI social media accounts. Email {SITE.email} to have any photo removed and we will do so promptly.</p>
      <h2 className="mb-2 mt-8 text-2xl font-semibold">Analytics and cookies</h2>
      <p>We use privacy-respecting, cookie-free analytics to count page views. The only cookie we set is a sign-in cookie for the site administrator.</p>
      <h2 className="mb-2 mt-8 text-2xl font-semibold">Contact</h2>
      <p>{SITE.email} · {SITE.phone} · {SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.postal}</p>
    </section>
  );
}
