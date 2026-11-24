import { Resend } from "resend";
import { SITE } from "./content";

/** Emails the owner about something waiting in the moderation queue. Never throws. */
export async function notifyOwner(subject: string, lines: string[]) {
  try {
    if (!process.env.RESEND_API_KEY) return;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = (process.env.INQUIRY_TO ?? SITE.email).split(",").map((s) => s.trim());
    const from = process.env.INQUIRY_FROM ?? `Freedom BVI <inquiries@bvifreedom.com>`;
    await resend.emails.send({
      from, to, subject,
      text: `${lines.join("\n")}\n\nReview and approve: ${SITE.domain}/admin/photos\n`,
    });
  } catch { /* notifications are best-effort */ }
}
