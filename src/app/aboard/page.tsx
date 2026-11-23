import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import UploadForm from "@/components/UploadForm";

export const metadata: Metadata = {
  title: "Share your photos from Freedom",
  description: "Aboard Freedom? Upload a few photos from your charter to the Life Aboard gallery and share them with #BVIFreedom.",
  robots: { index: false, follow: true },
};

export default function Aboard() {
  return (
    <>
      <PageHero kicker="Welcome aboard" title="Share your week on Freedom">
        Scanned the QR on the boat? Drop a few favourite photos below. We review everything before it appears in the Life Aboard
        gallery, and you can share straight to Instagram, Facebook or X from there.
      </PageHero>
      <section className="container-narrow py-14">
        <UploadForm />
        <p className="mt-6 text-sm text-ink/55">
          By uploading you confirm the photos are yours, everyone in them is OK being shown, and you give Freedom BVI permission to
          display them on this site and its social accounts. Email sailaway@bvifreedom.com any time to have a photo removed.
        </p>
      </section>
    </>
  );
}
