import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import ShareButtons from "@/components/ShareButtons";
import { approvedPhotos } from "@/lib/db";
import { SITE } from "@/lib/content";
import { breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Life Aboard — guest photos from Freedom",
  description: "Photos shared by guests during their charter weeks on the catamaran Freedom in the British Virgin Islands.",
  alternates: { canonical: "/gallery" },
};
export const revalidate = 600;

export default async function Gallery() {
  const photos = await approvedPhotos().catch(() => []);
  const galleryLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Life Aboard Freedom — guest photos",
    url: `${SITE.domain}/gallery`,
    image: photos.slice(0, 50).map((p) => ({ "@type": "ImageObject", contentUrl: p.url, caption: p.caption ?? undefined, datePublished: new Date(p.created_at).toISOString() })),
  };
  return (
    <>
      <JsonLd data={[galleryLd, breadcrumb([{ name: "Home", path: "/" }, { name: "Life Aboard", path: "/gallery" }])]} />
      <PageHero kicker="Life aboard" title="Guest photos from Freedom">
        Real weeks, real guests. Were you aboard? <Link href="/aboard" className="underline underline-offset-4">Add your photos</Link> and tag #BVIFreedom.
      </PageHero>
      <section className="container-x py-16">
        {photos.length === 0 ? (
          <div className="rounded-lg bg-lagoon-pale p-12 text-center">
            <p className="display text-2xl">No photos yet.</p>
            <p className="mt-2 text-ink/70">The first guests to scan the QR aboard will be up here. <Link href="/aboard" className="link">Add yours</Link>.</p>
          </div>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
            {photos.map((p) => (
              <figure key={p.id} id={`p${p.id}`} className="panel !p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={p.caption ?? "Guest photo aboard Freedom"} className="w-full rounded-md" loading="lazy" />
                <figcaption className="px-2 pb-1 pt-3">
                  {p.caption && <div className="display text-xl">{p.caption}</div>}
                  <div className="text-sm text-ink/55">
                    {[p.guest_name, p.sailed_week].filter(Boolean).join(", ") || new Date(p.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </div>
                  <div className="mt-3"><ShareButtons url={`${SITE.domain}/gallery#p${p.id}`} imageUrl={p.url} caption={p.caption} /></div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
