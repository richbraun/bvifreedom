import Photo from "@/components/Photo";
import type { SiteImage } from "@/lib/images";

type Props = { image?: SiteImage; kicker?: string; title: string; children?: React.ReactNode; tall?: boolean };

/** Inner-page hero: photo (optional) under an ink-blue wash, serif title, one lead paragraph. */
export default function PageHero({ image, kicker, title, children, tall }: Props) {
  return (
    <section className={`relative isolate overflow-hidden bg-ink text-white ${image ? (tall ? "min-h-[70vh]" : "min-h-[52vh]") : ""}`}>
      {image && (
        <>
          <Photo image={image} priority className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        </>
      )}
      <div className={`container-x flex flex-col justify-end ${image ? "pb-14 pt-40 md:pb-20" : "pb-14 pt-36"} ${image && tall ? "min-h-[70vh]" : image ? "min-h-[52vh]" : ""}`}>
        {kicker && <p className="kicker text-white/85">{kicker}</p>}
        <h1 className="mt-2 max-w-4xl text-5xl md:text-7xl">{title}</h1>
        {children && <div className="lead mt-5 max-w-2xl !text-white/85">{children}</div>}
      </div>
    </section>
  );
}
