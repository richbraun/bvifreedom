import Link from "next/link";
import { SITE } from "@/lib/content";
import { NAV } from "@/lib/nav";

export default function Footer() {
  const a = SITE.address;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${a.street}, ${a.city}, ${a.region} ${a.postal}`)}`;
  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="display text-3xl text-white">FREEDOM</div>
          <p className="mt-3 max-w-md text-sm leading-relaxed">
            A 2024 Fountaine Pajot Aura 51 catamaran available for private charter in the British Virgin Islands,
            professionally managed by {SITE.operator.name} in Road Town, Tortola.
          </p>
          <div className="mt-5 flex gap-4 text-sm">
            <a href={SITE.facebook} target="_blank" rel="noopener" className="hover:text-white">Facebook</a>
            <Link href="/aboard" className="hover:text-white">Share your photos</Link>
          </div>
        </div>
        <div>
          <div className="eyebrow mb-3 text-sea-light">Quick links</div>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.href}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-3 text-sea-light">Contact</div>
          <ul className="space-y-2 text-sm">
            <li><a href={`tel:${SITE.phone}`} className="hover:text-white">{SITE.phoneVanity} ({SITE.phone})</a></li>
            <li><a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
            <li><a href={maps} target="_blank" rel="noopener" className="hover:text-white">{a.street}<br />{a.city}, {a.region} {a.postal}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs md:flex-row">
          <div>© {new Date().getFullYear()} Freedom BVI · All rights reserved</div>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
