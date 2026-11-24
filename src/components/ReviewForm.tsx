"use client";
import { useState } from "react";

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!rating) { setState("error"); setMsg("Tap a star rating first."); return; }
    setState("sending");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/reviews", { method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ rating, guest_name: fd.get("guest_name"), body: fd.get("body"), sailed_week: fd.get("sailed_week"), website: fd.get("website") }) });
    const j = await res.json().catch(() => ({}));
    if (res.ok) setState("done"); else { setState("error"); setMsg(j.error ?? "Something went wrong."); }
  }

  if (state === "done") {
    return <div className="panel text-center"><div className="display text-2xl">Thank you for the review.</div><p className="mt-2 text-ink/70">We'll post it once we've read it.</p></div>;
  }
  return (
    <form onSubmit={onSubmit} className="panel grid gap-4">
      <div>
        <label>Your rating</label>
        <div className="flex gap-1" role="radiogroup" aria-label="Star rating">
          {[1, 2, 3, 4, 5].map((i) => (
            <button key={i} type="button" role="radio" aria-checked={rating === i} aria-label={`${i} star${i > 1 ? "s" : ""}`}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)} onClick={() => setRating(i)} className="p-0.5">
              <svg width="30" height="30" viewBox="0 0 24 24"><path fill={(hover || rating) >= i ? "#e9b949" : "#d9dee3"} d="M12 2.5l2.9 6.1 6.7.8-4.9 4.6 1.3 6.6L12 17.4 6 20.6l1.3-6.6L2.4 9.4l6.7-.8z" /></svg>
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="r_name">Your name *</label><input id="r_name" name="guest_name" required placeholder="First name and last initial is fine" /></div>
        <div><label htmlFor="r_week">When were you aboard?</label><input id="r_week" name="sailed_week" placeholder="e.g. March 2026" /></div>
      </div>
      <div><label htmlFor="r_body">Your review *</label><textarea id="r_body" name="body" required rows={4} maxLength={1200} placeholder="How was the boat, the week, the islands?" /></div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button className="btn-primary justify-self-start" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Post review"}</button>
      {state === "error" && <p className="text-sm text-red-700">{msg}</p>}
    </form>
  );
}
