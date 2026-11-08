"use client";
import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/content";
import { NAV } from "@/lib/nav";


export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 text-white backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:bg-white focus:px-3 focus:py-1 focus:text-navy">
        Skip to content
      </a>
      <div className="container-x hidden items-center justify-end gap-6 py-1.5 text-xs text-white/70 md:flex">
        <a href={`tel:${SITE.phone}`} className="hover:text-white">{SITE.phoneVanity} · {SITE.phone}</a>
        <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
      </div>
      <div className="container-x flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="display text-2xl font-semibold tracking-wide">FREEDOM</span>
          <span className="hidden text-xs uppercase tracking-[0.25em] text-sea-light sm:inline">British Virgin Islands</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-white/85 hover:text-white">{n.label}</Link>
          ))}
          <Link href="/pricing-and-inquiries#inquire" className="btn-primary !px-5 !py-2">Inquire Now</Link>
        </nav>
        <button className="lg:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="container-x flex flex-col gap-3 pb-5 text-sm lg:hidden" aria-label="Mobile">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-1 text-white/90">{n.label}</Link>
          ))}
          <Link href="/pricing-and-inquiries#inquire" onClick={() => setOpen(false)} className="btn-primary mt-2 self-start">Inquire Now</Link>
        </nav>
      )}
    </header>
  );
}
