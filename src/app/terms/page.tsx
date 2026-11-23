import type { Metadata } from "next";
import { SITE } from "@/lib/content";
export const metadata: Metadata = { title: "Terms & Conditions", alternates: { canonical: "/terms" } };
export default function Terms() {
  return (
    <section className="container-narrow prose-x pb-16 pt-36">
      <h1 className="mb-6">Terms &amp; Conditions</h1>
      <p>This website provides information about the catamaran Freedom and lets you request a charter. Rates and availability shown are indicative and are confirmed only by a signed charter agreement with {SITE.operator.name}, whose booking terms, cancellation policy and security deposit requirements govern the charter itself.</p>
      <p>Photographs marked as stock imagery show the Fountaine Pajot Aura 51 model and layout; Freedom is the same model and configuration but individual finishes may differ.</p>
      <p>Content you upload to the guest gallery must be your own, must not include anyone who has not agreed to appear, and grants Freedom BVI a non-exclusive licence to display it on this site and its social media accounts. We may remove any content at our discretion.</p>
      <p>Questions: {SITE.email}.</p>
    </section>
  );
}
