import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import JsonLd from "@/components/JsonLd";
import { IMAGES } from "@/lib/images";
import { BOAT, COMFORT_FEATURES, SAILING_FEATURES } from "@/lib/content";
import { breadcrumb, productLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Freedom — 2024 Fountaine Pajot Aura 51 Maestro, 5 cabins",
  description:
    "Full specifications of the charter catamaran Freedom: 52 ft Fountaine Pajot Aura 51, five ensuite cabins for 10 guests, Starlink, generator, A/C, watermaker, twin 75 HP engines. Based in Tortola, BVI.",
  alternates: { canonical: "/about-freedom" },
};

const specs: [string, string][] = [
  ["Builder / model", `${BOAT.builder} ${BOAT.model}, ${BOAT.edition} edition`],
  ["Year", String(BOAT.year)],
  ["Designer", BOAT.designer],
  ["Length overall", `${BOAT.loaFt} (${BOAT.loaM})`],
  ["Beam", `${BOAT.beamFt} (${BOAT.beamM})`],
  ["Draft", `${BOAT.draftFt} (${BOAT.draftM})`],
  ["Displacement", BOAT.displacement],
  ["Cabins / heads", `${BOAT.cabins} double cabins, ${BOAT.heads} ensuite heads with showers`],
  ["Guests", `Up to ${BOAT.guests}`],
  ["Mainsail", BOAT.mainsail],
  ["Genoa", BOAT.genoa],
  ["Engines", BOAT.engines],
  ["Fuel", BOAT.fuel],
  ["Water", BOAT.water],
  ["Generator", BOAT.generator],
  ["Air conditioning", BOAT.ac],
  ["Home port", "BVI Yacht Charters, Road Town, Tortola, British Virgin Islands"],
];

export default function AboutFreedom() {
  return (
    <>
      <JsonLd data={[productLd, breadcrumb([{ name: "Home", path: "/" }, { name: "About Freedom", path: "/about-freedom" }])]} />
      <section className="relative isolate bg-navy text-white">
        <Photo image={IMAGES.about1} priority className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/30 to-navy" />
        <div className="container-x py-24 md:py-32">
          <p className="eyebrow text-sea-light">About the yacht</p>
          <h1 className="mt-3 text-5xl font-semibold md:text-6xl">Freedom</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            A {BOAT.year} {BOAT.builder} {BOAT.model} sailing catamaran, {BOAT.edition} edition, with {BOAT.cabins} ensuite cabins for
            up to {BOAT.guests} guests. {BOAT.loaFt} long, {BOAT.beamFt} wide, and the largest Fountaine Pajot still offered bareboat.
          </p>
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 lg:grid-cols-5">
        <div className="prose-x lg:col-span-3">
          <h2 className="mb-4 text-3xl font-semibold">What is the Aura 51?</h2>
          <p>
            The Aura 51 is Fountaine Pajot's flagship owner-operated catamaran, designed by Berret-Racoupeau and built in La Rochelle,
            France. It replaced the Saba 50 in 2021 and is known for a huge flybridge lounge, a forward cockpit connected to the saloon
            through an opening window, and a galley and saloon on one level with the aft cockpit.
          </p>
          <p>
            Freedom is the {BOAT.edition} version: the whole starboard hull is a single owner's suite with a king island berth, desk,
            and a large bathroom with separate shower. The port hull has two double cabins with ensuite heads, and two more doubles sit
            forward, each with its own head — five private cabins in total.
          </p>
          <p>
            She was commissioned new in {BOAT.year} specifically for BVI charter, so the options list leans toward comfort at anchor and
            easy handling for a couple or a family crew.
          </p>
          <h2 className="mb-4 mt-10 text-3xl font-semibold">Comfort at anchor</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {COMFORT_FEATURES.map((f) => (
              <li key={f} className="flex gap-2 text-navy/80"><span className="text-sea">◆</span>{f}</li>
            ))}
          </ul>
          <h2 className="mb-4 mt-10 text-3xl font-semibold">Sailing and navigation</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {SAILING_FEATURES.map((f) => (
              <li key={f} className="flex gap-2 text-navy/80"><span className="text-sea">◆</span>{f}</li>
            ))}
          </ul>
        </div>
        <aside className="lg:col-span-2">
          <div className="card sticky top-28">
            <h2 className="text-xl font-semibold">Specifications</h2>
            <dl className="mt-4 divide-y divide-navy/10 text-sm">
              {specs.map(([k, v]) => (
                <div key={k} className="grid grid-cols-5 gap-3 py-2">
                  <dt className="col-span-2 text-navy/60">{k}</dt>
                  <dd className="col-span-3 font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <Link href="/pricing-and-inquiries#inquire" className="btn-primary mt-6 w-full">Check availability</Link>
          </div>
        </aside>
      </section>

      <section className="bg-sand py-20">
        <div className="container-x">
          <p className="eyebrow">Aboard</p>
          <h2 className="mt-3 text-3xl font-semibold">Photo tour</h2>
          <p className="mt-2 text-sm text-navy/60">
            Photos are Fountaine Pajot stock imagery of the Aura 51 {BOAT.edition} layout; Freedom is the same model and configuration.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[IMAGES.sn1, IMAGES.sn2, IMAGES.sn3, IMAGES.sn4, IMAGES.sn5, IMAGES.sn6, IMAGES.sn7, IMAGES.sn8].map((im) => (
              <Photo key={im.src} image={im} className="h-56 w-full rounded-xl object-cover" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
