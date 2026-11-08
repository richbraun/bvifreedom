import type { Metadata } from "next";
import Photo from "@/components/Photo";
import JsonLd from "@/components/JsonLd";
import InquiryForm from "@/components/InquiryForm";
import { IMAGES } from "@/lib/images";
import { PRESS_REVIEWS, PRICING_NOTES, SEASONS, SITE, TESTIMONIALS } from "@/lib/content";
import { breadcrumb, productLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Pricing & Inquiries — BVI catamaran charter rates from $15,000/week",
  description:
    "Weekly charter rates for the Fountaine Pajot Aura 51 catamaran Freedom in the British Virgin Islands: high season $19,000, mid $17,500, low $16,500, off season $15,000. Inquire for availability.",
  alternates: { canonical: "/pricing-and-inquiries" },
};

export default function Pricing() {
  return (
    <>
      <JsonLd data={[productLd, breadcrumb([{ name: "Home", path: "/" }, { name: "Pricing & Inquiries", path: "/pricing-and-inquiries" }])]} />
      <section className="bg-navy text-white">
        <div className="container-x py-20">
          <p className="eyebrow text-sea-light">Pricing</p>
          <h1 className="mt-3 text-5xl font-semibold">How much does a week on Freedom cost?</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Freedom charters for <strong>$15,000 to $19,000 per week</strong> depending on season — the whole catamaran, five ensuite
            cabins, up to 10 guests. Rates below are bareboat; captain and chef can be added.
          </p>
        </div>
      </section>

      <section className="container-x -mt-10 grid gap-4 md:grid-cols-4">
        {SEASONS.map((s) => (
          <div key={s.name} className="card">
            <div className="eyebrow">{s.name}</div>
            <div className="display mt-2 text-4xl font-semibold">${s.weeklyRate.toLocaleString()}</div>
            <div className="text-sm text-navy/60">per week</div>
            <ul className="mt-4 space-y-1 text-sm text-navy/80">
              {s.ranges.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="container-x py-14">
        <h2 className="text-2xl font-semibold">What the rate includes</h2>
        <ul className="mt-4 grid gap-2 md:grid-cols-2">
          {PRICING_NOTES.map((n) => <li key={n} className="flex gap-2 text-navy/80"><span className="text-sea">◆</span>{n}</li>)}
        </ul>
      </section>

      <section id="inquire" className="scroll-mt-24 bg-sand py-20">
        <div className="container-x grid items-start gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="eyebrow">Inquire now</p>
            <h2 className="mt-3 text-3xl font-semibold">Check Freedom's availability</h2>
            <p className="mt-3 text-navy/75">
              Tell us your dates and group size. You'll hear back from the owner within a business day, and booking is completed
              through {SITE.operator.name} at their standard terms. Prefer to talk? Call {SITE.phoneVanity} ({SITE.phone}).
            </p>
            <Photo image={IMAGES.inquiryForm} className="mt-6 hidden h-64 w-full rounded-2xl object-cover lg:block" />
          </div>
          <div className="lg:col-span-3"><InquiryForm /></div>
        </div>
      </section>

      <section id="reviews" className="scroll-mt-24 container-x py-20">
        <p className="eyebrow">Reviews</p>
        <h2 className="mt-3 text-3xl font-semibold">What the press says about the Aura 51</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {PRESS_REVIEWS.map((r) => (
            <a key={r.outlet} href={r.url} target="_blank" rel="noopener" className="card block hover:shadow-lg">
              <div className="font-semibold">{r.outlet}</div>
              <p className="mt-2 text-sm text-navy/70">{r.summary}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-sea">Read the review →</span>
            </a>
          ))}
        </div>

        <h2 className="mt-16 text-3xl font-semibold">What guests say about {SITE.operator.name}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.quote} className="card">
              <blockquote className="leading-relaxed text-navy/85">“{t.quote}”</blockquote>
              <figcaption className="mt-3 text-sm text-navy/55">— {t.name}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-6 opacity-80">
          <Photo image={IMAGES.badgeTripadvisor} className="h-10 w-auto" />
          <Photo image={IMAGES.badgeGoogle} className="h-10 w-auto" />
          <Photo image={IMAGES.badgeTrust} className="h-10 w-auto" />
        </div>
      </section>
    </>
  );
}
