import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { adminCookie, checkPassword, isAdmin } from "@/lib/admin";
import { ensureReviewsTable, sql, type GuestPhoto, type GuestReview } from "@/lib/db";
import ReviewModeration from "@/components/ReviewModeration";
import ModerationList from "@/components/ModerationList";

export const metadata: Metadata = { title: "Guest photos & reviews", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

async function login(formData: FormData) {
  "use server";
  const pw = (formData.get("password") as string) ?? "";
  if (!process.env.ADMIN_PASSWORD) redirect("/admin/photos?err=unset");
  if (checkPassword(pw)) {
    const c = adminCookie();
    (await cookies()).set(c.name, c.value, c);
    redirect("/admin/photos");
  }
  redirect("/admin/photos?err=wrong");
}

export default async function AdminPhotos({ searchParams }: { searchParams: Promise<{ err?: string }> }) {
  if (!(await isAdmin())) {
    const { err } = await searchParams;
    return (
      <section className="container-narrow max-w-sm pb-24 pt-36">
        <h1 className="text-3xl">Admin</h1>
        <form action={login} className="panel mt-6 grid gap-3">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required autoFocus />
          <button className="btn-ink">Sign in</button>
          {err === "wrong" && <p className="text-sm text-red-700">Incorrect password. It must match ADMIN_PASSWORD in Vercel exactly (case-sensitive).</p>}
          {err === "unset" && <p className="text-sm text-red-700">ADMIN_PASSWORD isn't set in Vercel, so no password can work yet. Add it and redeploy.</p>}
        </form>
      </section>
    );
  }
  const rows = (await sql()`select id, url, caption, guest_name, sailed_week, status, created_at from guest_photos order by (status='pending') desc, created_at desc limit 500`) as GuestPhoto[];
  const pending = rows.filter((r) => r.status === "pending").length;
  await ensureReviewsTable();
  const reviews = (await sql()`select id, guest_name, rating, body, sailed_week, status, created_at from guest_reviews order by (status='pending') desc, created_at desc limit 200`) as GuestReview[];
  const pendingReviews = reviews.filter((r) => r.status === "pending").length;
  return (
    <section className="container-x pb-16 pt-32">
      <div className="flex items-end justify-between">
        <div>
          <p className="kicker">Admin</p>
          <h1 className="mt-2 text-4xl">Guest photos &amp; reviews</h1>
        </div>
        <div className="text-sm text-ink/70">{pending} pending · <a className="text-lagoon-deep underline" href="/api/qr?size=2000" target="_blank">Download boat QR (PNG)</a></div>
      </div>
      <ModerationList initial={rows} />
      <h2 className="mt-16 text-3xl">Reviews <span className="text-base text-ink/55">({pendingReviews} pending)</span></h2>
      <ReviewModeration initial={reviews} />
    </section>
  );
}
