import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { FAQ } from "@/lib/content";
import { breadcrumb, faqLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ — chartering the catamaran Freedom in the BVI",
  description:
    "Answers to common questions about chartering Freedom: weekly cost, what's included, bareboat vs. captained, how many guests, where the charter starts, and the best time of year to sail the British Virgin Islands.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[faqLd, breadcrumb([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])]} />
      <PageHero kicker="Questions" title="Frequently asked questions" />
      <section className="container-narrow py-16">
        <dl>
          {FAQ.map((f) => (
            <div key={f.q} className="rule py-7">
              <dt><h2 className="text-[1.6rem]">{f.q}</h2></dt>
              <dd className="mt-3 text-ink/80">{f.a}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-12 rounded-lg bg-lagoon-pale p-7">
          <p className="display text-2xl">Didn't find your answer?</p>
          <p className="mt-2 text-ink/75">Email <a className="link" href="mailto:sailaway@bvifreedom.com">sailaway@bvifreedom.com</a> or <Link className="link" href="/pricing-and-inquiries#inquire">send an inquiry</Link>.</p>
        </div>
      </section>
    </>
  );
}
