import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const runtime = "nodejs";

const MAX = 5;
const clean = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");

/** Registers already-uploaded Blob URLs as pending guest photos. */
export async function POST(req: Request) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "Photo uploads aren't configured yet." }, { status: 503 });
  const b = (await req.json().catch(() => ({}))) as { urls?: unknown; guest_name?: unknown; sailed_week?: unknown; caption?: unknown; website?: unknown };
  if (clean(b.website, 10)) return NextResponse.json({ ok: true, count: 0 }); // honeypot

  const urls = (Array.isArray(b.urls) ? b.urls : []).filter((u): u is string => typeof u === "string" && /^https:\/\/[^/]+\.public\.blob\.vercel-storage\.com\/guests\//.test(u)).slice(0, MAX);
  if (!urls.length) return NextResponse.json({ error: "No photos received." }, { status: 400 });

  const guest_name = clean(b.guest_name, 80) || null;
  const sailed_week = clean(b.sailed_week, 60) || null;
  const caption = clean(b.caption, 300) || null;
  const db = sql();
  for (const url of urls) {
    await db`insert into guest_photos (url, caption, guest_name, sailed_week) values (${url}, ${caption}, ${guest_name}, ${sailed_week})`;
  }
  return NextResponse.json({ ok: true, count: urls.length });
}
