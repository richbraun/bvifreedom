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
  const recent = (await approvedPhotos(6).catch(() => []));

  return (
    <>
      <JsonLd data={productLd} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <Photo image={IMAGES.home1} priority className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/40 via-navy/50 to-navy" />
        <div className="container-x py-28 md:py-40">
          <p className="eyebrow text-sea-light">British Virgin Islands · Road Town, Tortola</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] md:text-7xl">Welcome aboard Freedom.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            Freedom is a {BOAT.year} {BOAT.builder} {BOAT.model} — a five-cabin sailing catamaran for up to {BOAT.guests} guests,
            available for private bareboat or captained charter in the BVI. Weekly rates from ${minRate.toLocaleString()}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/pricing-and-inquiries#inquire" className="btn-primary">Inquire Now</Link>
            <Link href="/about-freedom" className="btn-outline">Learn about the boat</Link>
          </div>
        </div>
      </section>

      {/* Boat showcase */}
      <section className="container-x py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">The yacht</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight">Space, performance and luxury in one boat.</h2>
            <div className="prose-x mt-5">
              <p>
                Freedom is a {BOAT.year} {BOAT.model} in the {BOAT.edition} layout: an owner's suite that runs the length of the
                starboard hull, four guest cabins to port and forward, and every cabin with its own head and shower. At {BOAT.loaFt} and
                {" "}{BOAT.beamFt} of beam she is the largest Fountaine Pajot you can still charter without crew.
              </p>
              <p>
                She was ordered new with the long list of upgrades a BVI week actually uses: Starlink, a 12 kW generator, 68k BTU of
                air conditioning, a watermaker, electric winches, Garmin navigation with AIS, and a hydraulic swim platform for the dinghy.
              </p>
            </div>
            <dl className="mt-6 grid grid-cols-3 gap-4 text-sm">
              {[
                ["Length", BOAT.loaFt], ["Cabins", `${BOAT.cabins} ensuite`], ["Guests", `up to ${BOAT.guests}`],
                ["Beam", BOAT.beamFt], ["Draft", BOAT.draftFt], ["Engines", "2 × 75 HP"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-sand p-3">
                  <dt className="text-xs uppercase tracking-wider text-navy/60">{k}</dt>
                  <dd className="mt-1 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <Link href="/about-freedom" className="btn-navy mt-8">Full specifications</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Photo image={IMAGES.home2} className="h-72 w-full rounded-2xl object-cover" />
            <Photo image={IMAGES.home3} className="mt-8 h-72 w-full rounded-2xl object-cover" />
            <Photo image={IMAGES.interior} className="col-span-2 h-64 w-full rounded-2xl object-cover" />
          </div>
        </div>
      </section>

      {/* Operator */}
      <section className="bg-sand">
        <div className="container-x grid gap-10 py-20 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <p className="eyebrow">Professionally managed</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight">The ultimate charter experience</h2>
          </div>
          <div className="prose-x lg:col-span-2">
            <p>
              Freedom is based at <a className="underline" href={SITE.operator.url} target="_blank" rel="noopener">{SITE.operator.name}</a> in
              Road Town, Tortola — one of the longest-running and highest-rated charter companies in the BVI. Their team maintains the
              boat between charters, runs your chart and boat briefings, arranges provisioning and crew, and is on the radio if you need
              anything during the week.
            </p>
            <p>
              Inquire directly through this site and you'll deal with the owner first, then book through BVI Yacht Charters at their
              standard terms — plus a Welcome Aboard gift from us.
            </p>
            <Link href="/pricing-and-inquiries#reviews" className="font-semibold text-sea">Read guest reviews →</Link>
          </div>
        </div>
      </section>

      {/* Why BVI */}
      <section className="container-x py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">The destination</p>
          <h2 className="mt-3 text-4xl font-semibold leading-tight">Why the British Virgin Islands are the sailing capital of the Caribbean</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {WHY_BVI.map((w) => (
            <div key={w.title} className="card">
              <h3 className="text-xl font-semibold">{w.title}</h3>
              <p className="mt-2 leading-relaxed text-navy/75">{w.body}</p>
            </div>
          ))}
        </div>
        <Link href="/experience-the-bvi" className="btn-navy mt-10">Experience the BVI</Link>
      </section>

      {/* Gallery */}
      <section className="bg-navy py-20 text-white">
        <div className="container-x">
          <p className="eyebrow text-sea-light">The magic of sailing the BVI</p>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
            {[IMAGES.gal1, IMAGES.gal2, IMAGES.gal3, IMAGES.gal4, IMAGES.gal5].map((im, i) => (
              <Photo key={im.src} image={im} className={`h-48 w-full rounded-xl object-cover ${i === 0 ? "col-span-2 md:col-span-2 md:h-full" : ""}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Guest photos */}
      {recent.length > 0 && (
        <section className="container-x py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Life aboard</p>
              <h2 className="mt-3 text-3xl font-semibold">Recent photos from our guests</h2>
            </div>
            <Link href="/gallery" className="font-semibold text-sea">See all →</Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-6">
            {recent.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p.id} src={p.url} alt={p.caption ?? "Guest photo aboard Freedom"} className="h-40 w-full rounded-xl object-cover" loading="lazy" />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container-x py-20 text-center">
        <h2 className="text-4xl font-semibold">Discover Freedom</h2>
        <p className="mx-auto mt-4 max-w-xl text-navy/75">
          Tell us your dates and group size and we'll confirm availability within a day.
        </p>
        <Link href="/pricing-and-inquiries#inquire" className="btn-primary mt-8">Inquire Now</Link>
      </section>
    </>
  );
}
