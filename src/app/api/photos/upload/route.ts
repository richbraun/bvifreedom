import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

export const runtime = "nodejs";

const TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

/** Token exchange for direct-to-Blob client uploads (no 4.5 MB server limit). */
export async function POST(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Photo uploads aren't configured yet." }, { status: 503 });
  }
  const body = (await req.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("guests/")) throw new Error("Bad path");
        return {
          allowedContentTypes: TYPES,
          maximumSizeInBytes: 20 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: "",
        };
      },
      onUploadCompleted: async () => { /* metadata is registered by POST /api/photos */ },
    });
    return NextResponse.json(json);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
