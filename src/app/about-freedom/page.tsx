import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { IMAGES } from "@/lib/images";
import { BOAT, COMFORT_FEATURES, SAILING_FEATURES } from "@/lib/content";
import { breadcrumb, charterLd } from "@/lib/schema";
import { approvedReviews } from "@/lib/db";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Freedom — 2024 Fountaine Pajot Aura 51 Maestro, 5 cabins",
  description:
    "Full specifications of the charter catamaran Freedom: 52 ft Fountaine Pajot Aura 51, five ensuite cabins for 10 guests, Starlink, generator, A/C, watermaker, twin 75 HP engines. Based in Tortola, BVI.",
  alternates: { canonical: "/about-freedom" },
};

const specs: [string, string][] = [
  ["Builder and model", `${BOAT.builder} ${BOAT.model}, ${BOAT.edition} edition`],
  ["Year", String(BOAT.year)],
  ["Designer", BOAT.designer],
  ["Length overall", `${BOAT.loaFt} (${BOAT.loaM})`],
  ["Beam", `${BOAT.beamFt} (${BOAT.beamM})`],
  ["Draft", `${BOAT.draftFt} (${BOAT.draftM})`],
  ["Displacement", BOAT.displacement],
  ["Cabins and heads", `${BOAT.cabins} double cabins, ${BOAT.heads} ensuite heads with showers`],
  ["Guests", `Up to ${BOAT.guests}`],
  ["Mainsail", BOAT.mainsail],
  ["Genoa", BOAT.genoa],
  ["Engines", BOAT.engines],
  ["Fuel", BOAT.fuel],
  ["Water", BOAT.water],
  ["Generator", BOAT.generator],
  ["Air conditioning", BOAT.ac],
  ["Home port", "BVI Yacht Charters, Road Town, Tortola"],
];

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
      {items.map((f) => <li key={f} className="rule pt-3 text-ink/80">{f}</li>)}
    </ul>
  );
}

export default async function AboutFreedom() {
  const reviews = await approvedReviews();
  return (
    <>
      <JsonLd data={[charterLd(reviews), breadcrumb([{ name: "Home", path: "/" }, { name: "About Freedom", path: "/about-freedom" }])]} />
      <PageHero image={IMAGES.about1} kicker="The yacht" title="Freedom" tall>
        A {BOAT.year} {BOAT.builder} {BOAT.model}, {BOAT.edition} edition — {BOAT.cabins} private cabins, each with its own head,
        for up to {BOAT.guests} guests. {BOAT.loaFt} long, {BOAT.beamFt} wide, offered bareboat or with a captain.
      </PageHero>

      <section className="container-x grid gap-16 py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2>What is the Aura 51?</h2>
          <div className="prose-x mt-5">
            <p>
              The Aura 51 is Fountaine Pajot's flagship owner-operated catamaran, designed by Berret-Racoupeau and built in La Rochelle,
              France. It replaced the Saba 50 in 2021 and is known for a huge flybridge lounge, a forward cockpit that opens into the
              saloon, and a galley and saloon on one level with the aft cockpit.
            </p>
            <p>
              Freedom is the {BOAT.edition} version: the whole starboard hull is one owner's suite with a king island berth, a desk,
              and a large bathroom with separate shower. The port hull has two double cabins with ensuite heads, and two more doubles
              sit forward, each with its own head — five private cabins in all.
            </p>
            <p>
              She was commissioned new in {BOAT.year} for BVI charter, so the options list leans toward comfort at anchor and easy
              handling for a couple or a family crew.
            </p>
          </div>

          <h2 className="mt-16">Comfort at anchor</h2>
          <div className="mt-6"><FeatureList items={COMFORT_FEATURES} /></div>

          <h2 className="mt-16">Sailing and navigation</h2>
          <div className="mt-6"><FeatureList items={SAILING_FEATURES} /></div>
        </div>

        <aside className="lg:col-span-5">
          <div className="panel sticky top-24 !p-0">
            <div className="display px-7 pt-6 text-2xl">Specifications</div>
            <dl className="mt-3 px-7 pb-6">
              {specs.map(([k, v]) => (
                <div key={k} className="rule grid grid-cols-5 gap-3 py-2.5 text-[0.95rem]">
                  <dt className="col-span-2 text-ink/60">{k}</dt>
                  <dd className="col-span-3">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="bg-lagoon-pale px-7 py-5">
              <Link href="/pricing-and-inquiries#inquire" className="btn-primary w-full">Check availability</Link>
            </div>
          </div>
        </aside>
      </section>

      <section className="bg-mist py-20">
        <div className="container-x">
          <p className="kicker">Aboard</p>
          <h2 className="mt-2">Photo tour</h2>
          <p className="mt-3 text-ink/65">
            Fountaine Pajot's photography of the Aura 51 {BOAT.edition} layout. Freedom is the same model and configuration.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-4">
            {[IMAGES.sn1, IMAGES.sn2, IMAGES.sn3, IMAGES.sn4, IMAGES.sn5, IMAGES.sn6, IMAGES.sn7, IMAGES.sn8].map((im) => (
              <Photo key={im.src} image={im} className="aspect-[4/3] w-full rounded-md object-cover" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
