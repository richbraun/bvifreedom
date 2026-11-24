import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";
import { isAdmin } from "@/lib/admin";

export const runtime = "nodejs";
type Ctx = { params: Promise<{ id: string }> };
const paths = ["/", "/pricing-and-inquiries", "/reviews", "/about-freedom"];

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { status } = (await req.json()) as { status: string };
  if (!["approved", "rejected", "pending"].includes(status)) return NextResponse.json({ error: "Bad status" }, { status: 400 });
  await sql()`update guest_reviews set status = ${status}, reviewed_at = now() where id = ${Number(id)}`;
  paths.forEach((p) => revalidatePath(p));
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await sql()`delete from guest_reviews where id = ${Number(id)}`;
  paths.forEach((p) => revalidatePath(p));
  return NextResponse.json({ ok: true });
}
