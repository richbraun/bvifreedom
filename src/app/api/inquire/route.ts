import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sql } from "@/lib/db";
import { SITE } from "@/lib/content";

export const runtime = "nodejs";

type Body = Partial<Record<"first_name" | "last_name" | "email" | "phone" | "contact_pref" | "dates" | "guests" | "details" | "website", string>>;

const clean = (v?: string) => (v ?? "").toString().trim().slice(0, 2000);

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as Body;
  if (clean(b.website)) return NextResponse.json({ ok: true }); // honeypot — pretend success

  const first_name = clean(b.first_name), email = clean(b.email), phone = clean(b.phone);
  if (!first_name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !phone) {
    return NextResponse.json({ error: "Please fill in your name, a valid email and phone." }, { status: 400 });
  }
  const row = {
    first_name, last_name: clean(b.last_name), email, phone,
    contact_pref: clean(b.contact_pref), dates: clean(b.dates), guests: clean(b.guests), details: clean(b.details),
  };

  if (process.env.DATABASE_URL) {
    await sql()`insert into inquiries (first_name,last_name,email,phone,contact_pref,dates,guests,details)
      values (${row.first_name},${row.last_name},${row.email},${row.phone},${row.contact_pref},${row.dates},${row.guests},${row.details})`;
  }

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = (process.env.INQUIRY_TO ?? SITE.email).split(",").map((s) => s.trim());
    const from = process.env.INQUIRY_FROM ?? `Freedom BVI <inquiries@bvifreedom.com>`;
    const text = Object.entries(row).map(([k, v]) => `${k.replace("_", " ")}: ${v || "—"}`).join("\n");
    await resend.emails.send({
      from, to, replyTo: row.email,
      subject: `Charter inquiry — ${row.first_name} ${row.last_name}`.trim() + (row.dates ? ` (${row.dates})` : ""),
      text: `New inquiry from bvifreedom.com\n\n${text}\n`,
    });
    // confirmation to the guest
    await resend.emails.send({
      from, to: row.email,
      subject: "We received your inquiry about Freedom",
      text: `Hi ${row.first_name},\n\nThanks for your interest in chartering Freedom in the British Virgin Islands. We'll confirm availability for your dates and get back to you within one business day.\n\nIn the meantime, you can read about the boat at ${SITE.domain}/about-freedom and planning tips at ${SITE.domain}/trip-resources.\n\nFair winds,\nFreedom BVI\n${SITE.phoneVanity} · ${SITE.email}`,
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
