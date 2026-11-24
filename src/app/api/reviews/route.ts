import { NextResponse } from "next/server";
import { ensureReviewsTable, sql } from "@/lib/db";

export const runtime = "nodejs";
const clean = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");

export async function POST(req: Request) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "Reviews aren't configured yet." }, { status: 503 });
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (clean(b.website, 10)) return NextResponse.json({ ok: true });
  const guest_name = clean(b.guest_name, 80);
  const body = clean(b.body, 1200);
  const sailed_week = clean(b.sailed_week, 60) || null;
  const rating = Number(b.rating);
  if (!guest_name || !body || !(rating >= 1 && rating <= 5)) {
    return NextResponse.json({ error: "Please add your name, a star rating and a sentence or two." }, { status: 400 });
  }
  await ensureReviewsTable();
  await sql()`insert into guest_reviews (guest_name, rating, body, sailed_week) values (${guest_name}, ${rating}, ${body}, ${sailed_week})`;
  return NextResponse.json({ ok: true });
}
