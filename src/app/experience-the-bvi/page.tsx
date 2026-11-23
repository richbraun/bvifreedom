import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
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
      <PageHero image={IMAGES.journey} kicker="The destination" title="Experience the BVI" tall>
        Sixty islands and cays, steady trade winds, flat water, and an anchorage every hour or two. The easiest place in the world
        to sail a catamaran well — and the hardest to leave.
      </PageHero>

      <section className="container-x grid gap-14 py-20 lg:grid-cols-12">
        <div className="prose-x lg:col-span-6">
          <h2>Your week begins on Freedom</h2>
          <p className="mt-5">
            A BVI week is a loop around the Sir Francis Drake Channel. You pick up Freedom in Road Town, sit through a chart briefing
            with BVI Yacht Charters, and within two hours you're on a mooring at Norman Island with a snorkel on. From there every
            day is a short sail — one to three hours — to the next bay, with time to swim, go ashore, and be back aboard for
            sundowners on the flybridge.
          </p>
          <p>
            Snorkel the Caves and the Indians, swim through the boulders at The Baths, paddleboard the North Sound, eat lobster on
            Anegada's beach, and finish with a Painkiller at the Soggy Dollar. Nothing is more than a day's sail from anything else,
            and mooring fields mean you rarely have to anchor.
          </p>
          <h2 className="mt-12">Beyond the sea</h2>
          <p className="mt-5">
            Every island has its own personality: Tortola's Cane Garden Bay and the full-moon parties at Trellis Bay; Virgin Gorda's
            Baths and Spanish Town; the North Sound's Saba Rock and Bitter End; flat, coral Anegada with its flamingos and lobster
            shacks; and Jost Van Dyke's White Bay, the beach-bar capital of the Caribbean.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:col-span-6">
          <Photo image={IMAGES.bviFreedom} className="col-span-2 aspect-[16/10] w-full rounded-lg object-cover" />
          <Photo image={IMAGES.exp44} className="aspect-square w-full rounded-lg object-cover" />
          <Photo image={IMAGES.clearWater} className="aspect-square w-full rounded-lg object-cover" />
        </div>
      </section>

      <section className="bg-lagoon-pale py-20">
        <div className="container-x">
          <p className="kicker">Sample itinerary</p>
          <h2 className="mt-2">A classic seven-day loop on Freedom</h2>
          <p className="mt-4 max-w-2xl text-ink/75">
            Counter-clockwise around the Drake Channel, saving the long downwind run for the end. Swap days freely — that's the
            point of a bareboat.
          </p>
          <ol className="mt-12 border-l border-ink/20 pl-8 md:pl-12">
            {SAMPLE_ITINERARY.map((d, i) => (
              <li key={d.day} className="relative pb-10 last:pb-0">
                <span className="display absolute -left-8 top-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-ink text-sm text-white md:-left-12">{i + 1}</span>
                <div className="display text-base italic text-lagoon-deep">{d.day}</div>
                <h3 className="mt-1 text-[1.6rem]">{d.stop}</h3>
                <p className="mt-2 max-w-2xl text-ink/80">{d.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x py-20">
        <h2>Why sailors call the BVI the sailing capital of the Caribbean</h2>
        <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {WHY_BVI.map((w) => (
            <div key={w.title} className="rule pt-5">
              <h3>{w.title}</h3>
              <p className="mt-2 text-ink/75">{w.body}</p>
            </div>
          ))}
        </div>
        <Photo image={IMAGES.exp55} className="mt-16 aspect-[21/9] w-full rounded-lg object-cover" />
        <div className="mt-14 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-xl">Ready to sail it yourself?</h2>
          <Link href="/pricing-and-inquiries#inquire" className="btn-primary">Check availability</Link>
        </div>
      </section>
    </>
  );
}
