import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { adminCookie, checkPassword, isAdmin } from "@/lib/admin";
import { sql, type GuestPhoto } from "@/lib/db";
import ModerationList from "@/components/ModerationList";

export const metadata: Metadata = { title: "Photo moderation", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

async function login(formData: FormData) {
  "use server";
  const pw = (formData.get("password") as string) ?? "";
  if (checkPassword(pw)) {
    const c = adminCookie();
    (await cookies()).set(c.name, c.value, c);
  }
  redirect("/admin/photos");
}

export default async function AdminPhotos() {
  if (!(await isAdmin())) {
    return (
      <section className="container-narrow max-w-sm pb-24 pt-36">
        <h1 className="text-3xl">Admin</h1>
        <form action={login} className="panel mt-6 grid gap-3">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
          <button className="btn-ink">Sign in</button>
        </form>
      </section>
    );
  }
  const rows = (await sql()`select id, url, caption, guest_name, sailed_week, status, created_at from guest_photos order by (status='pending') desc, created_at desc limit 500`) as GuestPhoto[];
  const pending = rows.filter((r) => r.status === "pending").length;
  return (
    <section className="container-x pb-16 pt-32">
      <div className="flex items-end justify-between">
        <div>
          <p className="kicker">Admin</p>
          <h1 className="mt-2 text-4xl">Guest photos</h1>
        </div>
        <div className="text-sm text-ink/70">{pending} pending · <a className="text-lagoon-deep underline" href="/api/qr?size=2000" target="_blank">Download boat QR (PNG)</a></div>
      </div>
      <ModerationList initial={rows} />
    </section>
  );
}
