import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Stars from "@/components/Stars";
import { approvedReviews } from "@/lib/db";
import { PRESS_REVIEWS, SITE, TESTIMONIALS } from "@/lib/content";
import { breadcrumb, charterLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Reviews — what guests say about chartering Freedom in the BVI",
  description: "First-hand reviews from crews who have chartered the Fountaine Pajot Aura 51 catamaran Freedom in the British Virgin Islands, plus press reviews of the Aura 51.",
  alternates: { canonical: "/reviews" },
};
export const revalidate = 3600;

export default async function ReviewsPage() {
  const reviews = await approvedReviews(200);
  const avg = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0;
  return (
    <>
      <JsonLd data={[charterLd(reviews), breadcrumb([{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }])]} />
      <PageHero kicker="From the guest book" title="Reviews">
        {reviews.length > 0
          ? <span className="inline-flex flex-wrap items-center gap-3"><Stars value={avg} size={22} /> <span>{avg.toFixed(1)} out of 5 from {reviews.length} crew{reviews.length === 1 ? "" : "s"} who have sailed Freedom.</span></span>
          : "Crews who sail Freedom leave their reviews here."}
      </PageHero>

      <section className="container-x py-16">
        {reviews.length === 0 ? (
          <div className="rounded-lg bg-lagoon-pale p-10 text-center">
            <p className="display text-2xl">No reviews posted yet.</p>
            <p className="mt-2 text-ink/70">Sailed with us? <Link href="/aboard" className="link">Leave the first one</Link>.</p>
          </div>
        ) : (
          <div className="columns-1 gap-x-12 md:columns-2 lg:columns-3 [&>*]:mb-10 [&>*]:break-inside-avoid">
            {reviews.map((r) => (
              <figure key={r.id} className="rule pt-5">
                <Stars value={r.rating} />
                <blockquote className="mt-3 text-ink/85">“{r.body}”</blockquote>
                <figcaption className="mt-3 text-sm text-ink/55">{r.guest_name}{r.sailed_week ? `, ${r.sailed_week}` : ""}</figcaption>
              </figure>
            ))}
          </div>
        )}
        <div className="mt-12 flex flex-col items-start gap-4 rounded-lg bg-lagoon-pale p-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="display text-2xl">Sailed on Freedom?</p>
            <p className="mt-1 text-ink/70">Two minutes, and it helps the next crew decide.</p>
          </div>
          <Link href="/aboard" className="btn-primary">Leave a review</Link>
        </div>
      </section>

      <section className="bg-mist">
        <div className="container-x py-20">
          <h2>What the press says about the Aura 51</h2>
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
        </div>
      </section>
    </>
  );
}
