import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { sql } from "@/lib/db";

export const runtime = "nodejs";

const MAX_FILES = 5;
const MAX_BYTES = 12 * 1024 * 1024;
const TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]);

export async function POST(req: Request) {
  if (!process.env.DATABASE_URL || !process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Photo uploads aren't configured yet." }, { status: 503 });
  }
  const fd = await req.formData();
  if ((fd.get("website") as string | null)?.trim()) return NextResponse.json({ ok: true, count: 0 }); // honeypot

  const guest_name = ((fd.get("guest_name") as string) ?? "").trim().slice(0, 80);
  const sailed_week = ((fd.get("sailed_week") as string) ?? "").trim().slice(0, 60);
  const caption = ((fd.get("caption") as string) ?? "").trim().slice(0, 300);
  const files = fd.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0).slice(0, MAX_FILES);
  if (!files.length) return NextResponse.json({ error: "Pick at least one photo." }, { status: 400 });

  const db = sql();
  let count = 0;
  for (const f of files) {
    if (f.size > MAX_BYTES) return NextResponse.json({ error: `${f.name} is over 12 MB.` }, { status: 400 });
    if (!TYPES.has(f.type)) return NextResponse.json({ error: `${f.name} isn't a supported image type.` }, { status: 400 });
    const ext = (f.name.split(".").pop() || "jpg").toLowerCase();
    const blob = await put(`guests/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`, f, {
      access: "public",
      contentType: f.type,
      addRandomSuffix: false,
    });
    await db`insert into guest_photos (url, caption, guest_name, sailed_week) values (${blob.url}, ${caption || null}, ${guest_name || null}, ${sailed_week || null})`;
    count++;
  }
  return NextResponse.json({ ok: true, count });
}
