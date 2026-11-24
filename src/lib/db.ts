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

export type GuestReview = {
  id: number;
  guest_name: string;
  rating: number;
  body: string;
  sailed_week: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string | Date;
};

/** Creates the reviews table on first use so no manual migration is needed. */
export async function ensureReviewsTable() {
  await sql()`create table if not exists guest_reviews (
    id bigserial primary key, guest_name text not null, rating smallint not null check (rating between 1 and 5),
    body text not null, sailed_week text, status text not null default 'pending' check (status in ('pending','approved','rejected')),
    created_at timestamptz not null default now(), reviewed_at timestamptz)`;
}

export async function approvedReviews(limit = 50): Promise<GuestReview[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    await ensureReviewsTable();
    const rows = await sql()`select id, guest_name, rating, body, sailed_week, status, created_at
      from guest_reviews where status = 'approved' order by created_at desc limit ${limit}`;
    // guests often paste their review wrapped in quote marks; the page adds its own
    return (rows as GuestReview[]).map((r) => ({ ...r, body: r.body.trim().replace(/^["“”']+|["“”']+$/g, "").trim() }));
  } catch (e) { console.error("approvedReviews failed:", e); return []; }
}
