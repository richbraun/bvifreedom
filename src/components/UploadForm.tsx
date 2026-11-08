"use client";
import { useState } from "react";

export default function UploadForm() {
  const [previews, setPreviews] = useState<string[]>([]);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, 5);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const res = await fetch("/api/photos", { method: "POST", body: new FormData(e.currentTarget) });
    const j = await res.json().catch(() => ({}));
    if (res.ok) { setState("done"); setMsg(`${j.count} photo${j.count === 1 ? "" : "s"} received — thank you!`); }
    else { setState("error"); setMsg(j.error ?? "Upload failed. Try fewer or smaller photos."); }
  }

  if (state === "done") {
    return (
      <div className="card text-center">
        <div className="display text-2xl font-semibold">{msg}</div>
        <p className="mt-2 text-navy/70">We'll add them to the gallery shortly. Tag <strong>#BVIFreedom</strong> if you post your own.</p>
        <a href="/gallery" className="btn-navy mt-5">See the gallery</a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card grid gap-4">
      <div>
        <label htmlFor="photos">Photos (up to 5, 12 MB each)</label>
        <input id="photos" name="photos" type="file" accept="image/*" multiple required onChange={onFiles}
          className="file:mr-3 file:rounded-full file:border-0 file:bg-navy file:px-4 file:py-2 file:text-white" />
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
        {state === "sending" ? "Uploading…" : "Upload photos"}
      </button>
      {state === "error" && <p className="text-sm text-coral">{msg}</p>}
    </form>
  );
}
