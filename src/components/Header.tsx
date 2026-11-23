"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/content";
import { NAV } from "@/lib/nav";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();
  const overHero = pathname === "/" || pathname === "/about-freedom" || pathname === "/experience-the-bvi";

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  const transparent = overHero && !solid && !open;
  return (
    <header className={`fixed inset-x-0 top-0 z-40 text-white transition-colors duration-300 ${transparent ? "bg-transparent" : "bg-ink/95 backdrop-blur border-b border-white/10"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:bg-white focus:px-3 focus:py-1 focus:text-ink">Skip to content</a>
      <div className="container-x flex items-center justify-between py-4">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="display text-[1.75rem] font-semibold tracking-[0.12em]">FREEDOM</span>
          <span className="display hidden text-base italic text-white/75 xl:inline">British Virgin Islands</span>
        </Link>
        <nav className="hidden items-center gap-6 text-[0.95rem] lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={`border-b border-transparent pb-0.5 transition-colors hover:text-white ${pathname === n.href ? "border-white/70 text-white" : "text-white/80"}`}>{n.label}</Link>
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
        <nav className="container-x flex flex-col gap-4 pb-6 pt-2 text-lg lg:hidden" aria-label="Mobile">
          {NAV.map((n) => <Link key={n.href} href={n.href} className="text-white/90">{n.label}</Link>)}
          <Link href="/pricing-and-inquiries#inquire" className="btn-primary mt-2 self-start">Check availability</Link>
          <div className="mt-2 text-sm text-white/60"><a href={`tel:${SITE.phone}`}>{SITE.phoneVanity}</a> · <a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
        </nav>
      )}
    </header>
  );
}
