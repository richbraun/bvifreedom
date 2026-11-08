import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import JsonLd from "@/components/JsonLd";
import { IMAGES } from "@/lib/images";
import { SAMPLE_ITINERARY, WHY_BVI } from "@/lib/content";
import { breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Experience the BVI — sailing itinerary, anchorages and beach bars",
  description:
    "What a week sailing the British Virgin Islands on a catamaran looks like: a 7-day itinerary from Road Town through Norman Island, Cooper, The Baths, North Sound, Anegada and Jost Van Dyke, with snorkeling, mooring and dining tips.",
  alternates: { canonical: "/experience-the-bvi" },
};

export default function Experience() {
  return (
    <>
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "Experience the BVI", path: "/experience-the-bvi" }])} />
      <section className="relative isolate bg-navy text-white">
        <Photo image={IMAGES.journey} priority className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/30 to-navy" />
        <div className="container-x py-24 md:py-32">
          <p className="eyebrow text-sea-light">The destination</p>
          <h1 className="mt-3 text-5xl font-semibold md:text-6xl">Experience the BVI</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Sixty islands and cays, steady trade winds, flat water and an anchorage every hour or two. The British Virgin Islands
            are the easiest place in the world to sail a catamaran well — and the hardest to leave.
          </p>
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 lg:grid-cols-2">
        <div className="prose-x">
          <h2 className="mb-4 text-3xl font-semibold">Your journey begins on Freedom</h2>
          <p>
            A BVI week is a loop around the Sir Francis Drake Channel. You pick up Freedom in Road Town, Tortola, sit through a chart
            briefing with BVI Yacht Charters, and within two hours you're on a mooring ball at Norman Island with a snorkel on. From
            there every day is a short sail — 1 to 3 hours — to the next bay, with time to swim, explore ashore and be back aboard for
            sundowners on the flybridge.
          </p>
          <p>
            Snorkel the Caves and the Indians, swim through the boulders at The Baths, paddleboard the North Sound, eat lobster on
            Anegada's beach and finish with a Painkiller at the Soggy Dollar. Nothing is more than a day's sail from anything else,
            and mooring fields mean you rarely have to anchor.
          </p>
          <h2 className="mb-4 mt-10 text-3xl font-semibold">Beyond the sea</h2>
          <p>
            Ashore, every island has its own personality: Tortola's Cane Garden Bay and full-moon parties at Trellis Bay; Virgin Gorda's
            Baths and Spanish Town; the North Sound's Saba Rock and Bitter End; the flat coral island of Anegada with its flamingos and
            lobster shacks; and Jost Van Dyke's White Bay, the beach-bar capital of the Caribbean.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Photo image={IMAGES.bviFreedom} className="col-span-2 h-72 w-full rounded-2xl object-cover" />
          <Photo image={IMAGES.exp44} className="h-56 w-full rounded-2xl object-cover" />
          <Photo image={IMAGES.clearWater} className="h-56 w-full rounded-2xl object-cover" />
          <Photo image={IMAGES.exp55} className="col-span-2 h-64 w-full rounded-2xl object-cover" />
        </div>
      </section>

      <section className="bg-sand py-20">
        <div className="container-x">
          <p className="eyebrow">Sample itinerary</p>
          <h2 className="mt-3 text-3xl font-semibold">A classic 7-day BVI loop on Freedom</h2>
          <p className="mt-3 max-w-2xl text-navy/75">
            Counter-clockwise around the Drake Channel, saving the long downwind run for the end. Swap days freely — that's the point
            of a bareboat.
          </p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {SAMPLE_ITINERARY.map((d) => (
              <li key={d.day} className="card">
                <div className="eyebrow">{d.day}</div>
                <h3 className="mt-1 text-lg font-semibold">{d.stop}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/75">{d.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x py-20">
        <h2 className="text-3xl font-semibold">Why sailors call the BVI the sailing capital of the Caribbean</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {WHY_BVI.map((w) => (
            <div key={w.title}>
              <h3 className="text-xl font-semibold">{w.title}</h3>
              <p className="mt-2 leading-relaxed text-navy/75">{w.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold">Discover Freedom</h2>
          <Link href="/pricing-and-inquiries#inquire" className="btn-primary mt-6">Inquire Now</Link>
        </div>
      </section>
    </>
  );
}
