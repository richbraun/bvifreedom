"use client";
import { useState } from "react";
import { track } from "@vercel/analytics";

export default function InquiryForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());
    const res = await fetch("/api/inquire", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) { setState("sent"); track("inquiry_submitted"); }
    else { setErr((await res.json().catch(() => ({}))).error ?? "Something went wrong."); setState("error"); }
  }

  if (state === "sent") {
    return (
      <div className="panel text-center">
        <div className="display text-2xl">Thank you — we'll be in touch.</div>
        <p className="mt-2 text-ink/70">We'll confirm Freedom's availability for your dates within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="first_name">First name *</label>
        <input id="first_name" name="first_name" required autoComplete="given-name" />
      </div>
      <div>
        <label htmlFor="last_name">Last name</label>
        <input id="last_name" name="last_name" autoComplete="family-name" />
      </div>
      <div>
        <label htmlFor="email">Email *</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div>
        <label htmlFor="phone">Phone *</label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="contact_pref">Preferred contact *</label>
        <select id="contact_pref" name="contact_pref" required defaultValue="Email">
          <option>Email</option><option>Phone call</option><option>Text</option>
        </select>
      </div>
      <div>
        <label htmlFor="guests">Group size</label>
        <select id="guests" name="guests" defaultValue="">
          <option value="">Select…</option>
          {["2", "4", "6", "8", "10"].map((g) => <option key={g}>{g}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="dates">Preferred dates</label>
        <input id="dates" name="dates" placeholder="e.g. first two weeks of March 2027, flexible" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="details">Anything else?</label>
        <textarea id="details" name="details" rows={4} placeholder="Captain or chef needed? Sailing experience? Special occasion?" />
      </div>
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="sm:col-span-2 flex items-center justify-between gap-4">
        <p className="text-xs text-ink/55">We only use your details to reply to this inquiry.</p>
        <button className="btn-primary" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send inquiry"}</button>
      </div>
      {state === "error" && <p className="sm:col-span-2 text-sm text-red-700">{err}</p>}
    </form>
  );
}
