import type { Metadata } from "next";
import Photo from "@/components/Photo";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
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
      <PageHero kicker="Pricing" title="How much does a week on Freedom cost?">
        Between <strong className="font-semibold text-white">$15,000 and $19,000 per week</strong>, depending on the season — the whole catamaran,
        five ensuite cabins, up to 10 guests. Rates are bareboat; a captain or chef can be added.
      </PageHero>

      <section className="bg-sand">
        <div className="container-x py-16">
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4">
            {SEASONS.map((s) => (
              <div key={s.name} className="bg-white p-7">
                <div className="display text-xl italic text-lagoon-deep">{s.name}</div>
                <div className="display mt-3 text-5xl">${s.weeklyRate.toLocaleString()}</div>
                <div className="mt-1 text-sm text-ink/55">per week</div>
                <ul className="mt-5 space-y-1 text-[0.95rem] text-ink/80">
                  {s.ranges.map((r) => <li key={r}>{r}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-x-12 gap-y-3 md:grid-cols-2">
            <h2 className="md:col-span-2">What the rate covers</h2>
            {PRICING_NOTES.map((n) => <p key={n} className="rule pt-3 text-ink/80">{n}</p>)}
          </div>
        </div>
      </section>

      <section id="inquire" className="scroll-mt-24">
        <div className="container-x grid items-start gap-12 py-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="kicker">Inquire</p>
            <h2 className="mt-2">Check Freedom's availability</h2>
            <p className="mt-4 text-ink/75">
              Tell us your dates and group size. You'll hear from the owner within a business day, and booking is completed
              through {SITE.operator.name} at their standard terms. Prefer to talk? Call <a className="link" href={`tel:${SITE.phone}`}>{SITE.phoneVanity}</a>.
            </p>
            <Photo image={IMAGES.inquiryForm} className="mt-8 hidden aspect-[4/3] w-full rounded-lg object-cover lg:block" />
          </div>
          <div className="lg:col-span-7"><InquiryForm /></div>
        </div>
      </section>

      <section id="reviews" className="scroll-mt-24 bg-mist">
        <div className="container-x py-20">
          <p className="kicker">Reviews</p>
          <h2 className="mt-2">What the press says about the Aura 51</h2>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-4">
            {PRESS_REVIEWS.map((r) => (
              <a key={r.outlet} href={r.url} target="_blank" rel="noopener" className="rule block pt-4">
                <div className="display text-2xl">{r.outlet}</div>
                <p className="mt-2 text-[0.95rem] text-ink/70">{r.summary}</p>
                <span className="link mt-3 inline-block text-sm">Read the review</span>
              </a>
            ))}
          </div>

          <h2 className="mt-20">What guests say about {SITE.operator.name}</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.quote}>
                <blockquote className="display text-2xl leading-snug text-ink/90">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm text-ink/55">{t.name}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-8 opacity-70">
            <Photo image={IMAGES.badgeTripadvisor} className="h-9 w-auto" />
            <Photo image={IMAGES.badgeGoogle} className="h-9 w-auto" />
            <Photo image={IMAGES.badgeTrust} className="h-9 w-auto" />
          </div>
        </div>
      </section>
    </>
  );
}
