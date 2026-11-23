"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/content";
import { IMAGES } from "@/lib/images";
import { NAV } from "@/lib/nav";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-white text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:bg-ink focus:px-3 focus:py-1 focus:text-white">Skip to content</a>
      <div className="container-x flex items-center justify-between py-3">
        <Link href="/" className="flex items-center" aria-label="Freedom BVI home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMAGES.logo.src} alt="Freedom BVI" className="h-12 w-auto md:h-14" />
        </Link>
        <nav className="hidden items-center gap-6 text-[0.95rem] lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={`border-b pb-0.5 transition-colors hover:text-ink ${pathname === n.href ? "border-ink text-ink" : "border-transparent text-ink/70"}`}>{n.label}</Link>
          ))}
          <Link href="/pricing-and-inquiries#inquire" className="btn-primary !px-5 !py-2.5">Check availability</Link>
        </nav>
        <button className="rounded p-1 lg:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="container-x flex flex-col gap-4 border-t border-line pb-6 pt-4 text-lg lg:hidden" aria-label="Mobile">
          {NAV.map((n) => <Link key={n.href} href={n.href} className="text-ink/85">{n.label}</Link>)}
          <Link href="/pricing-and-inquiries#inquire" className="btn-primary mt-2 self-start">Check availability</Link>
          <div className="mt-2 text-sm text-ink/60"><a href={`tel:${SITE.phone}`}>{SITE.phoneVanity}</a> · <a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
        </nav>
      )}
    </header>
  );
}
