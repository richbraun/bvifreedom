"use client";
import { useState } from "react";
import type { GuestPhoto } from "@/lib/db";

export default function ModerationList({ initial }: { initial: GuestPhoto[] }) {
  const [rows, setRows] = useState(initial);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected" | "all">("pending");

  async function set(id: number, status: GuestPhoto["status"]) {
    const res = await fetch(`/api/photos/${id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ status }) });
    if (res.ok) setRows((r) => r.map((p) => (p.id === id ? { ...p, status } : p)));
  }
  async function remove(id: number) {
    if (!confirm("Delete this photo permanently?")) return;
    const res = await fetch(`/api/photos/${id}`, { method: "DELETE" });
    if (res.ok) setRows((r) => r.filter((p) => p.id !== id));
  }

  const shown = rows.filter((r) => filter === "all" || r.status === filter);
  return (
    <>
      <div className="mt-6 flex gap-2 text-sm">
        {(["pending", "approved", "rejected", "all"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 ${filter === f ? "bg-navy text-white" : "bg-sand"}`}>
            {f} ({f === "all" ? rows.length : rows.filter((r) => r.status === f).length})
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((p) => (
          <div key={p.id} className="card !p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.url} alt="" className="h-48 w-full rounded-lg object-cover" />
            <div className="mt-2 text-sm">{p.caption || <span className="text-navy/40">no caption</span>}</div>
            <div className="text-xs text-navy/55">{[p.guest_name, p.sailed_week].filter(Boolean).join(" · ")} · {new Date(p.created_at).toLocaleDateString()}</div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {p.status !== "approved" && <button onClick={() => set(p.id, "approved")} className="rounded-full bg-sea px-3 py-1 text-white">Approve</button>}
              {p.status !== "rejected" && <button onClick={() => set(p.id, "rejected")} className="rounded-full bg-sand px-3 py-1">Reject</button>}
              <button onClick={() => remove(p.id)} className="rounded-full border border-coral px-3 py-1 text-coral">Delete</button>
            </div>
          </div>
        ))}
        {shown.length === 0 && <p className="text-navy/60">Nothing here.</p>}
      </div>
    </>
  );
}
