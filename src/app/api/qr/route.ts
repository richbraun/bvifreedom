import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { SITE } from "@/lib/content";

export const runtime = "nodejs";

/** GET /api/qr?size=1200 → PNG of the QR that points to /aboard. Print this for the boat. */
export async function GET(req: Request) {
  const size = Math.min(4000, Math.max(200, Number(new URL(req.url).searchParams.get("size") ?? 1200)));
  const buf = await QRCode.toBuffer(`${SITE.domain}/aboard?src=qr`, {
    width: size, margin: 2, errorCorrectionLevel: "H",
    color: { dark: "#0b2545", light: "#ffffff" },
  });
  return new NextResponse(new Uint8Array(buf), {
    headers: { "content-type": "image/png", "cache-control": "public, max-age=86400", "content-disposition": "inline; filename=freedom-aboard-qr.png" },
  });
}
