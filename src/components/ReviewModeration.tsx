"use client";
import { useState } from "react";
import type { GuestReview } from "@/lib/db";
import Stars from "./Stars";

export default function ReviewModeration({ initial }: { initial: GuestReview[] }) {
  const [rows, setRows] = useState(initial);
  async function set(id: number, status: GuestReview["status"]) {
    const res = await fetch(`/api/reviews/${id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ status }) });
    if (res.ok) setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
  }
  async function remove(id: number) {
    if (!confirm("Delete this review permanently?")) return;
    const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    if (res.ok) setRows((r) => r.filter((x) => x.id !== id));
  }
  if (!rows.length) return <p className="mt-4 text-ink/60">No reviews yet.</p>;
  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2">
      {rows.map((r) => (
        <div key={r.id} className="panel">
          <div className="flex items-center justify-between">
            <Stars value={r.rating} />
            <span className={`rounded-full px-2.5 py-0.5 text-xs ${r.status === "approved" ? "bg-lagoon-pale text-lagoon-deep" : r.status === "rejected" ? "bg-red-50 text-red-700" : "bg-sand"}`}>{r.status}</span>
          </div>
          <p className="mt-3 text-ink/85">“{r.body}”</p>
          <div className="mt-2 text-sm text-ink/55">{r.guest_name}{r.sailed_week ? `, ${r.sailed_week}` : ""} · {new Date(r.created_at).toLocaleDateString()}</div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {r.status !== "approved" && <button onClick={() => set(r.id, "approved")} className="rounded-full bg-lagoon px-3 py-1 text-white">Approve</button>}
            {r.status !== "rejected" && <button onClick={() => set(r.id, "rejected")} className="rounded-full bg-lagoon-pale px-3 py-1">Reject</button>}
            <button onClick={() => remove(r.id)} className="rounded-full border border-red-700 px-3 py-1 text-red-700">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
