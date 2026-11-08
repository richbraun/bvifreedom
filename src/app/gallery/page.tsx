import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
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
    image: photos.slice(0, 50).map((p) => ({
      "@type": "ImageObject", contentUrl: p.url, caption: p.caption ?? undefined, datePublished: p.created_at,
    })),
  };
  return (
    <>
      <JsonLd data={[galleryLd, breadcrumb([{ name: "Home", path: "/" }, { name: "Life Aboard", path: "/gallery" }])]} />
      <section className="bg-navy text-white">
        <div className="container-x py-20">
          <p className="eyebrow text-sea-light">Life aboard</p>
          <h1 className="mt-3 text-5xl font-semibold">Guest photos from Freedom</h1>
          <p className="mt-4 max-w-xl text-white/85">
            Real weeks, real guests. Were you aboard? <Link href="/aboard" className="underline">Add your photos</Link> and tag <strong>#BVIFreedom</strong>.
          </p>
        </div>
      </section>
      <section className="container-x py-14">
        {photos.length === 0 ? (
          <div className="rounded-2xl bg-sand p-10 text-center text-navy/70">
            No photos yet — the first charter guests to scan the QR aboard will be up here. <Link href="/aboard" className="text-sea underline">Add yours</Link>.
          </div>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
            {photos.map((p) => (
              <figure key={p.id} id={`p${p.id}`} className="card !p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={p.caption ?? "Guest photo aboard Freedom"} className="w-full rounded-xl" loading="lazy" />
                <figcaption className="mt-3 px-1">
                  {p.caption && <div className="font-medium">{p.caption}</div>}
                  <div className="text-xs text-navy/55">
                    {[p.guest_name, p.sailed_week].filter(Boolean).join(" · ") || new Date(p.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
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
