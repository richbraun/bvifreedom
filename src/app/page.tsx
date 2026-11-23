import Link from "next/link";
import Photo from "@/components/Photo";
import JsonLd from "@/components/JsonLd";
import { IMAGES } from "@/lib/images";
import { BOAT, SEASONS, SITE, WHY_BVI } from "@/lib/content";
import { productLd } from "@/lib/schema";
import { approvedPhotos } from "@/lib/db";

export const revalidate = 3600;

export default async function Home() {
  const minRate = Math.min(...SEASONS.map((s) => s.weeklyRate));
  const recent = await approvedPhotos(6).catch(() => []);

  return (
    <>
      <JsonLd data={productLd} />

      {/* Hero */}
      <section className="relative isolate min-h-[92vh] overflow-hidden bg-ink text-white">
        <Photo image={IMAGES.home1} priority className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/35 to-ink/20" />
        <div className="container-x flex min-h-[92vh] flex-col justify-end pb-36 pt-40 md:pb-40">
          <p className="kicker rise text-white/90">A private catamaran charter in the British Virgin Islands</p>
          <h1 className="rise-2 mt-3 max-w-5xl text-[3.2rem] leading-[0.98] md:text-[5.5rem]">
            Seven days. Sixty islands. One boat called Freedom.
          </h1>
          <p className="rise-3 lead mt-6 max-w-xl !text-white/85">
            A {BOAT.year} Fountaine Pajot Aura 51 with five private cabins, sailed by you or by a captain we arrange.
          </p>
          <div className="rise-3 mt-8 flex flex-wrap gap-3">
            <Link href="/pricing-and-inquiries#inquire" className="btn-primary">Check availability</Link>
            <Link href="/about-freedom" className="btn-outline">See the boat</Link>
          </div>
        </div>
        {/* facts bar */}
        <div className="container-x absolute inset-x-0 bottom-0 translate-y-1/2">
          <dl className="glass mx-auto grid max-w-4xl grid-cols-2 divide-x divide-line rounded-xl text-ink md:grid-cols-4">
            {[
              ["Length", BOAT.loaFt],
              ["Cabins", `${BOAT.cabins} ensuite`],
              ["Guests", `Up to ${BOAT.guests}`],
              ["From", `$${minRate.toLocaleString()} / week`],
            ].map(([k, v]) => (
              <div key={k} className="px-5 py-4 md:px-7 md:py-5">
                <dt className="text-sm text-ink/60">{k}</dt>
                <dd className="display mt-0.5 text-2xl md:text-[1.75rem]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* The boat */}
      <section className="container-x grid items-center gap-12 pb-24 pt-32 md:pt-40 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="kicker">The yacht</p>
          <h2 className="mt-2">The largest Fountaine Pajot you can still sail yourself.</h2>
          <div className="prose-x mt-6">
            <p>
              Freedom is an Aura 51 in the Maestro layout: an owner's suite running the length of the starboard hull, four guest
              cabins to port and forward, every one with its own head and shower. At {BOAT.loaFt} with a {BOAT.beamFt} beam, she has the
              room of a villa and still handles like a boat a couple can run.
            </p>
            <p>
              She was ordered new with the upgrades a BVI week actually uses — Starlink, a 12 kW generator, 68,000 BTU of air
              conditioning, a watermaker, electric winches, Garmin navigation with AIS, and a hydraulic platform for the dinghy.
            </p>
          </div>
          <Link href="/about-freedom" className="btn-ink mt-8">Full specifications</Link>
        </div>
        <div className="grid grid-cols-6 gap-3 lg:col-span-7">
          <Photo image={IMAGES.home2} className="col-span-4 aspect-[4/3] w-full rounded-lg object-cover" />
          <Photo image={IMAGES.sn1} className="col-span-2 aspect-[2/3] w-full rounded-lg object-cover" />
          <Photo image={IMAGES.interior} className="col-span-3 aspect-[3/2] w-full rounded-lg object-cover" />
          <Photo image={IMAGES.home3} className="col-span-3 aspect-[3/2] w-full rounded-lg object-cover" />
        </div>
      </section>

      {/* Operator */}
      <section className="bg-lagoon-pale">
        <div className="container-x grid gap-10 py-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="kicker">Professionally managed</p>
            <h2 className="mt-2">Owned by a sailor, run by the best base in Tortola.</h2>
          </div>
          <div className="prose-x lg:col-span-7 lg:col-start-6">
            <p>
              Freedom lives at <a className="link" href={SITE.operator.url} target="_blank" rel="noopener">{SITE.operator.name}</a> in
              Road Town — one of the longest-running, highest-rated charter companies in the islands. Their crew maintains the boat
              between charters, runs your chart and boat briefings, arranges provisioning and crew, and is on the radio all week.
            </p>
            <p>
              Inquire here and you deal with the owner first. Booking is completed through BVI Yacht Charters at their standard terms,
              and you receive a welcome-aboard gift from us.
            </p>
            <Link href="/pricing-and-inquiries#reviews" className="link">Read guest reviews</Link>
          </div>
        </div>
      </section>

      {/* Why BVI */}
      <section className="container-x py-24">
        <div className="max-w-2xl">
          <p className="kicker">The destination</p>
          <h2 className="mt-2">Why the BVI is where sailors go to sail.</h2>
        </div>
        <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {WHY_BVI.map((w) => (
            <div key={w.title} className="rule pt-5">
              <h3>{w.title}</h3>
              <p className="mt-2 text-ink/75">{w.body}</p>
            </div>
          ))}
        </div>
        <Link href="/experience-the-bvi" className="btn-ghost mt-12">See a seven-day itinerary</Link>
      </section>

      {/* Gallery */}
      <section className="grid grid-cols-2 gap-1 md:grid-cols-4">
        <Photo image={IMAGES.gal1} className="col-span-2 row-span-2 h-full min-h-[22rem] w-full object-cover" />
        <Photo image={IMAGES.gal2} className="aspect-square w-full object-cover" />
        <Photo image={IMAGES.gal4} className="aspect-square w-full object-cover" />
        <Photo image={IMAGES.gal3} className="aspect-square w-full object-cover" />
        <Photo image={IMAGES.gal5} className="aspect-square w-full object-cover" />
      </section>

      {/* Guest photos */}
      {recent.length > 0 && (
        <section className="container-x py-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="kicker">Life aboard</p>
              <h2 className="mt-2">Recent photos from our guests</h2>
            </div>
            <Link href="/gallery" className="link">See all</Link>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-2 md:grid-cols-6">
            {recent.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p.id} src={p.url} alt={p.caption ?? "Guest photo aboard Freedom"} className="aspect-square w-full rounded-md object-cover" loading="lazy" />
            ))}
          </div>
        </section>
      )}

      {/* Closing */}
      <section className="bg-ink text-white">
        <div className="container-x flex flex-col items-start gap-8 py-24 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker text-white/85">Plan your week</p>
            <h2 className="mt-2 max-w-xl">Tell us your dates and group size. We'll confirm within a day.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/pricing-and-inquiries#inquire" className="btn-primary">Check availability</Link>
            <a href={`tel:${SITE.phone}`} className="btn-outline">Call {SITE.phoneVanity}</a>
          </div>
        </div>
      </section>
    </>
  );
}
