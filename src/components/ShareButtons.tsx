"use client";
import { useState } from "react";

type Props = { url: string; imageUrl: string; caption?: string | null };

export default function ShareButtons({ url, imageUrl, caption }: Props) {
  const [copied, setCopied] = useState(false);
  const text = `${caption ? caption + " — " : ""}aboard the catamaran Freedom in the BVI #BVIFreedom #SailingBVI`;
  const enc = encodeURIComponent;

  async function nativeShare() {
    try {
      // On phones this opens the OS share sheet, which includes Instagram when installed.
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const file = new File([blob], "freedom.jpg", { type: blob.type || "image/jpeg" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text, title: "Freedom BVI" });
        return;
      }
      await navigator.share({ url, text, title: "Freedom BVI" });
    } catch { /* user cancelled or unsupported */ }
  }

  async function copy() {
    await navigator.clipboard.writeText(`${text}\n${url}`);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  }

  const canNative = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {canNative && <button onClick={nativeShare} className="rounded-full bg-navy px-3 py-1.5 text-white">Share / Instagram</button>}
      <a className="rounded-full bg-[#1877F2] px-3 py-1.5 text-white" target="_blank" rel="noopener"
        href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}&quote=${enc(text)}`}>Facebook</a>
      <a className="rounded-full bg-black px-3 py-1.5 text-white" target="_blank" rel="noopener"
        href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(text)}`}>X</a>
      <a className="rounded-full border border-navy/20 px-3 py-1.5" href={imageUrl} download target="_blank" rel="noopener">Download</a>
      <button onClick={copy} className="rounded-full border border-navy/20 px-3 py-1.5">{copied ? "Copied!" : "Copy caption + link"}</button>
    </div>
  );
}
