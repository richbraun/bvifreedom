import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { RESOURCES } from "@/lib/content";
import { breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Trip Resources — getting to Tortola, ferries, water taxis, guidebooks",
  description:
    "How to get to the British Virgin Islands for your charter: flights to Beef Island (EIS) or St. Thomas (STT), ferry and water-taxi options to Road Town and West End, sample itineraries and recommended cruising guides.",
  alternates: { canonical: "/trip-resources" },
};

function LinkList({ title, items, intro }: { title: string; intro?: string; items: { label: string; url: string }[] }) {
  return (
    <section className="card">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {intro && <p className="mt-2 text-navy/75">{intro}</p>}
      <ul className="mt-4 space-y-2">
        {items.map((i) => (
          <li key={i.url}>
            <a href={i.url} target="_blank" rel="noopener" className="font-medium text-sea hover:underline">{i.label} ↗</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Resources() {
  return (
    <>
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "Trip Resources", path: "/trip-resources" }])} />
      <section className="bg-navy text-white">
        <div className="container-x py-20">
          <p className="eyebrow text-sea-light">Plan your trip</p>
          <h1 className="mt-3 text-5xl font-semibold">Trip resources</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Everything you need to get from your front door to Freedom's deck in Road Town, Tortola.
          </p>
        </div>
      </section>

      <section className="container-x grid gap-6 py-16 md:grid-cols-2">
        <LinkList
          title="Getting to the BVI"
          intro="The easiest and most efficient way to get to the BVI is to fly into Beef Island / Tortola (EIS). American Airlines has several flights per day connecting through Miami, and it's a 20-minute taxi from the airport to Road Town — we recommend the American flight. Alternatively, fly into St. Thomas (STT) and take the ferry to Tortola (45–60 minutes to West End or Road Town; bring your passport, you're crossing a border)."
          items={RESOURCES.gettingThere}
        />
        <LinkList
          title="Ferries from St. Thomas"
          intro="Ferries run from Charlotte Amalie and Red Hook to West End and Road Town several times a day. Check schedules the week before; the last boat is usually late afternoon."
          items={RESOURCES.ferries}
        />
        <LinkList
          title="Water taxis"
          intro="A private water taxi from St. Thomas airport straight to the BVI Yacht Charters dock is the fastest option for a group of 6–10 and often costs about the same per person as the ferry plus taxis."
          items={RESOURCES.waterTaxis}
        />
        <LinkList title="Sample itineraries" intro="Start with our own 7-day loop, then compare notes." items={[{ label: "Our 7-day Freedom itinerary", url: "/experience-the-bvi" }, ...RESOURCES.itineraries]} />
        <LinkList
          title="Guidebooks and charts"
          intro="The Cruising Guide to the Virgin Islands is the one every charter boat carries; read it on the plane."
          items={RESOURCES.guidebooks}
        />
        <section className="card bg-sand">
          <h2 className="text-2xl font-semibold">Ready to book?</h2>
          <p className="mt-2 text-navy/75">Send us your dates and group size and we'll confirm availability within a business day.</p>
          <Link href="/pricing-and-inquiries#inquire" className="btn-primary mt-5">Inquire about chartering Freedom</Link>
        </section>
      </section>
    </>
  );
}
