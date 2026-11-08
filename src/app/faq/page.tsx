import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
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
      <section className="bg-navy text-white">
        <div className="container-x py-20">
          <p className="eyebrow text-sea-light">Questions</p>
          <h1 className="mt-3 text-5xl font-semibold">Frequently asked questions</h1>
        </div>
      </section>
      <section className="container-x max-w-3xl py-16">
        <dl className="divide-y divide-navy/10">
          {FAQ.map((f) => (
            <div key={f.q} className="py-6">
              <dt><h2 className="text-xl font-semibold">{f.q}</h2></dt>
              <dd className="mt-2 leading-relaxed text-navy/80">{f.a}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 rounded-2xl bg-sand p-6">
          <p className="font-medium">Didn't find your answer?</p>
          <p className="mt-1 text-navy/75">Email <a className="text-sea underline" href="mailto:sailaway@bvifreedom.com">sailaway@bvifreedom.com</a> or <Link className="text-sea underline" href="/pricing-and-inquiries#inquire">send an inquiry</Link>.</p>
        </div>
      </section>
    </>
  );
}
