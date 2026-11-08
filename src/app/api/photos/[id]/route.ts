import { NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";
import { isAdmin } from "@/lib/admin";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { status } = (await req.json()) as { status: "approved" | "rejected" | "pending" };
  if (!["approved", "rejected", "pending"].includes(status)) return NextResponse.json({ error: "Bad status" }, { status: 400 });
  await sql()`update guest_photos set status = ${status}, reviewed_at = now() where id = ${Number(id)}`;
  revalidatePath("/gallery"); revalidatePath("/");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const rows = await sql()`delete from guest_photos where id = ${Number(id)} returning url`;
  const url = (rows[0] as { url?: string } | undefined)?.url;
  if (url && process.env.BLOB_READ_WRITE_TOKEN) await del(url).catch(() => {});
  revalidatePath("/gallery"); revalidatePath("/");
  return NextResponse.json({ ok: true });
}
