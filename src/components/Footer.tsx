import Link from "next/link";
import { SITE } from "@/lib/content";
import { NAV } from "@/lib/nav";
import { IMAGES } from "@/lib/images";

export default function Footer() {
  const a = SITE.address;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${a.street}, ${a.city}, ${a.region} ${a.postal}`)}`;
  return (
    <footer className="bg-ink-deep text-white/75">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMAGES.logoWide.src} alt="Freedom BVI" className="h-14 w-auto rounded bg-white p-2" />
          <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed">
            A 2024 Fountaine Pajot Aura 51 for private charter in the British Virgin Islands, based with {SITE.operator.name} in Road Town, Tortola.
          </p>
          <div className="mt-6 flex gap-5 text-sm">
            <a href={SITE.facebook} target="_blank" rel="noopener" className="hover:text-white">Facebook</a>
            <Link href="/aboard" className="hover:text-white">Share your photos</Link>
          </div>
        </div>
        <div className="md:col-span-3 md:col-start-7">
          <div className="display text-lg italic text-white/90">Pages</div>
          <ul className="mt-3 space-y-2 text-[0.95rem]">
            {NAV.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>)}
          </ul>
        </div>
        <div className="md:col-span-3">
          <div className="display text-lg italic text-white/90">Contact</div>
          <ul className="mt-3 space-y-2 text-[0.95rem]">
            <li><a href={`tel:${SITE.phone}`} className="hover:text-white">{SITE.phoneVanity}<br /><span className="text-white/55">{SITE.phone}</span></a></li>
            <li><a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
            <li><a href={maps} target="_blank" rel="noopener" className="hover:text-white">{a.street}<br />{a.city}, {a.region} {a.postal}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-5 text-sm text-white/55 md:flex-row">
          <div>© {new Date().getFullYear()} Freedom BVI</div>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
