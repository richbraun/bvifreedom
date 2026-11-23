import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
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
    <section className="rule pt-6">
      <h2 className="text-[1.75rem]">{title}</h2>
      {intro && <p className="mt-3 text-ink/75">{intro}</p>}
      <ul className="mt-4 space-y-2">
        {items.map((i) => (
          <li key={i.url}>
            <a href={i.url} target={i.url.startsWith("/") ? undefined : "_blank"} rel="noopener" className="link">{i.label}</a>
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
      <PageHero kicker="Plan your trip" title="Trip resources">
        Everything you need to get from your front door to Freedom's deck in Road Town, Tortola.
      </PageHero>

      <section className="container-x grid gap-x-16 gap-y-12 py-20 md:grid-cols-2">
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
          intro="A private water taxi from St. Thomas airport straight to the BVI Yacht Charters dock is the fastest option for a group of 6–10, and often costs about the same per person as the ferry plus taxis."
          items={RESOURCES.waterTaxis}
        />
        <LinkList title="Sample itineraries" intro="Start with our own seven-day loop, then compare notes." items={[{ label: "Our seven-day Freedom itinerary", url: "/experience-the-bvi" }, ...RESOURCES.itineraries]} />
        <LinkList
          title="Guidebooks and charts"
          intro="The Cruising Guide to the Virgin Islands is the one every charter boat carries; read it on the plane."
          items={RESOURCES.guidebooks}
        />
        <section className="rule pt-6">
          <h2 className="text-[1.75rem]">Ready to book?</h2>
          <p className="mt-3 text-ink/75">Send us your dates and group size and we'll confirm availability within a business day.</p>
          <Link href="/pricing-and-inquiries#inquire" className="btn-primary mt-6">Check availability</Link>
        </section>
      </section>
    </>
  );
}
