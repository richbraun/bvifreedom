import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "fbvi_admin";

function token() {
  const secret = process.env.ADMIN_PASSWORD ?? "";
  return createHmac("sha256", secret).update("admin-session").digest("hex");
}

export async function isAdmin(): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD) return false;
  const c = (await cookies()).get(COOKIE)?.value ?? "";
  const t = token();
  return c.length === t.length && timingSafeEqual(Buffer.from(c), Buffer.from(t));
}

export function checkPassword(pwRaw: string) {
  const want = (process.env.ADMIN_PASSWORD ?? "").trim();
  const pw = (pwRaw ?? "").trim();
  return want.length > 0 && pw.length === want.length && timingSafeEqual(Buffer.from(pw), Buffer.from(want));
}

export const adminCookie = () => ({
  name: COOKIE,
  value: token(),
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
});
