import type { Metadata } from "next";
import UploadForm from "@/components/UploadForm";

export const metadata: Metadata = {
  title: "Share your photos from Freedom",
  description: "Aboard Freedom? Upload a few photos from your charter to the Life Aboard gallery and share them with #BVIFreedom.",
  robots: { index: false, follow: true },
};

export default function Aboard() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-x py-16">
          <p className="eyebrow text-sea-light">Welcome aboard</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-5xl">Share your week on Freedom</h1>
          <p className="mt-4 max-w-xl text-white/85">
            Scanned the QR on the boat? Drop a few favourite photos below. We review everything before it appears in the
            <strong> Life Aboard</strong> gallery, and you can share straight to Instagram, Facebook or X from there.
          </p>
        </div>
      </section>
      <section className="container-x max-w-2xl py-12">
        <UploadForm />
        <p className="mt-6 text-xs text-navy/55">
          By uploading you confirm the photos are yours, everyone in them is OK being shown, and you give Freedom BVI permission to
          display them on this site and its social accounts. Email sailaway@bvifreedom.com any time to have a photo removed.
        </p>
      </section>
    </>
  );
}
