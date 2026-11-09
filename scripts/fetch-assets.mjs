// Populates public/images from (in order): existing local file → Vercel Blob backup → the
// original URL on the old bvifreedom.com. Anything fetched from the old site is also
// uploaded to Vercel Blob (when BLOB_READ_WRITE_TOKEN is set) so the photos survive the
// old site being switched off. Runs automatically as `prebuild` on Vercel; safe to re-run.
import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestSrc = await readFile(path.join(root, "src/lib/images.ts"), "utf8");
const WP = "https://bvifreedom.com/wp-content/uploads";
const re = /src:\s*"([^"]+)"[^}]*?source:\s*`\$\{WP\}([^`]+)`/g;
const pairs = [];
let m;
while ((m = re.exec(manifestSrc))) pairs.push({ local: m[1], url: WP + m[2] });

const token = process.env.BLOB_READ_WRITE_TOKEN;
let blob = null;
if (token) {
  try { blob = await import("@vercel/blob"); } catch { blob = null; }
}
const blobKey = (local) => `site-assets${local}`; // e.g. site-assets/images/home-1.jpg

async function fromBlob(local) {
  if (!blob) return null;
  try {
    const { blobs } = await blob.list({ prefix: blobKey(local), limit: 1, token });
    const hit = blobs.find((b) => b.pathname === blobKey(local));
    if (!hit) return null;
    const res = await fetch(hit.url);
    return res.ok ? Buffer.from(await res.arrayBuffer()) : null;
  } catch { return null; }
}
async function fromSource(url) {
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (bvifreedom rebuild)" }, signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}
async function toBlob(local, buf) {
  if (!blob) return;
  try { await blob.put(blobKey(local), buf, { access: "public", addRandomSuffix: false, token }); } catch (e) { console.warn("  (blob upload failed:", String(e.message || e), ")"); }
}

await mkdir(path.join(root, "public/images"), { recursive: true });
let ok = 0, skipped = 0, failed = 0;
for (const { local, url } of pairs) {
  const out = path.join(root, "public", local);
  try { await access(out); skipped++; continue; } catch {}
  let buf = await fromBlob(local);
  let via = "blob";
  if (!buf) {
    try { buf = await fromSource(url); via = "source"; await toBlob(local, buf); }
    catch (e) { failed++; console.error("✗", local, "←", url, String(e.message || e)); continue; }
  }
  await writeFile(out, buf);
  ok++;
  console.log("✓", local, `(${via})`);
}
console.log(`\nAssets: ${ok} fetched, ${skipped} already present, ${failed} failed.`);
// Never fail the build over missing stock photos — the Photo component shows a fallback.
