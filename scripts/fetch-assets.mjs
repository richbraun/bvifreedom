// Downloads every image in src/lib/images.ts into public/images.
// Usage: node scripts/fetch-assets.mjs   (re-run safe; skips files that exist)
import { mkdir, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestSrc = await import("node:fs").then((fs) =>
  fs.readFileSync(path.join(root, "src/lib/images.ts"), "utf8"),
);

// Pull { src, source } pairs out of the TS file without needing a TS runtime.
const WP = "https://bvifreedom.com/wp-content/uploads";
const re = /src:\s*"([^"]+)"[^}]*?source:\s*`\$\{WP\}([^`]+)`/g;
const pairs = [];
let m;
while ((m = re.exec(manifestSrc))) pairs.push({ local: m[1], url: WP + m[2] });

await mkdir(path.join(root, "public/images"), { recursive: true });
let ok = 0, skipped = 0, failed = 0;
for (const { local, url } of pairs) {
  const out = path.join(root, "public", local);
  try { await access(out); skipped++; continue; } catch {}
  try {
    const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (bvifreedom rebuild)" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(out, Buffer.from(await res.arrayBuffer()));
    ok++;
    console.log("✓", local);
  } catch (e) {
    failed++;
    console.error("✗", local, "←", url, String(e.message || e));
  }
}
console.log(`\nDownloaded ${ok}, skipped ${skipped} existing, failed ${failed}.`);
