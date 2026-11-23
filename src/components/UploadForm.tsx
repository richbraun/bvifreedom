"use client";
import { useState } from "react";
import { upload } from "@vercel/blob/client";

const MAX_FILES = 5;
const MAX_MB = 20;

export default function UploadForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [progress, setProgress] = useState("");
  const [msg, setMsg] = useState("");

  function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const list = Array.from(e.target.files ?? []).slice(0, MAX_FILES);
    setFiles(list);
    setPreviews(list.map((f) => URL.createObjectURL(f)));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!files.length) return;
    const fd = new FormData(e.currentTarget);
    if ((fd.get("website") as string)?.trim()) { setState("done"); setMsg("Thanks!"); return; }
    const big = files.find((f) => f.size > MAX_MB * 1024 * 1024);
    if (big) { setState("error"); setMsg(`${big.name} is over ${MAX_MB} MB.`); return; }

    setState("sending");
    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        setProgress(`Uploading ${i + 1} of ${files.length}…`);
        const f = files[i];
        const ext = (f.name.split(".").pop() || "jpg").toLowerCase();
        const blob = await upload(`guests/${Date.now()}.${ext}`, f, { access: "public", handleUploadUrl: "/api/photos/upload", contentType: f.type || "image/jpeg" });
        urls.push(blob.url);
      }
      setProgress("Saving…");
      const res = await fetch("/api/photos", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ urls, guest_name: fd.get("guest_name"), sailed_week: fd.get("sailed_week"), caption: fd.get("caption") }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error ?? "Could not save photos.");
      setState("done");
      setMsg(`${j.count} photo${j.count === 1 ? "" : "s"} received — thank you!`);
    } catch (err) {
      setState("error");
      setMsg((err as Error).message || "Upload failed. Try fewer or smaller photos.");
    }
  }

  if (state === "done") {
    return (
      <div className="panel text-center">
        <div className="display text-2xl">{msg}</div>
        <p className="mt-2 text-ink/70">We'll add them to the gallery shortly. Tag <strong>#BVIFreedom</strong> if you post your own.</p>
        <a href="/gallery" className="btn-ink mt-5">See the gallery</a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel grid gap-4">
      <div>
        <label htmlFor="photos">Photos (up to {MAX_FILES}, {MAX_MB} MB each)</label>
        <input id="photos" name="photos" type="file" accept="image/*" multiple required onChange={onFiles}
          className="file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-white" />
      </div>
      {previews.length > 0 && (
        <div className="grid grid-cols-5 gap-2">
          {previews.map((p) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={p} src={p} alt="" className="h-20 w-full rounded-lg object-cover" />
          ))}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="guest_name">Your first name (optional)</label>
          <input id="guest_name" name="guest_name" placeholder="Shown with the photo" />
        </div>
        <div>
          <label htmlFor="sailed_week">When were you aboard?</label>
          <input id="sailed_week" name="sailed_week" placeholder="e.g. March 2026" />
        </div>
      </div>
      <div>
        <label htmlFor="caption">Caption (optional)</label>
        <input id="caption" name="caption" placeholder="Sunset at the Bight, Norman Island" maxLength={300} />
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button className="btn-primary justify-self-start" disabled={state === "sending"}>
        {state === "sending" ? progress || "Uploading…" : "Upload photos"}
      </button>
      {state === "error" && <p className="text-sm text-red-700">{msg}</p>}
    </form>
  );
}
