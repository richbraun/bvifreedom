import { neon } from "@neondatabase/serverless";

export function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

export type GuestPhoto = {
  id: number;
  url: string;
  caption: string | null;
  guest_name: string | null;
  sailed_week: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export async function approvedPhotos(limit = 200): Promise<GuestPhoto[]> {
  if (!process.env.DATABASE_URL) return [];
  const rows = await sql()`
    select id, url, caption, guest_name, sailed_week, status, created_at
    from guest_photos where status = 'approved'
    order by created_at desc limit ${limit}`;
  return rows as GuestPhoto[];
}
