import { BOAT, FAQ, SEASONS, SITE } from "./content";

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.domain}/#org`,
  name: "Freedom BVI",
  url: SITE.domain,
  logo: `${SITE.domain}/images/logo.jpg`,
  email: SITE.email,
  telephone: `+1-${SITE.phone}`,
  sameAs: [SITE.facebook],
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postal,
    addressCountry: SITE.address.country,
  },
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.domain}/#website`,
  url: SITE.domain,
  name: "Freedom BVI — Aura 51 catamaran charter, British Virgin Islands",
  publisher: { "@id": `${SITE.domain}/#org` },
  inLanguage: "en-US",
};

export const productLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE.domain}/#boat`,
  name: `Catamaran Freedom — ${BOAT.year} ${BOAT.builder} ${BOAT.model} (${BOAT.edition})`,
  description: `Private bareboat or captained charter of Freedom, a ${BOAT.year} ${BOAT.builder} ${BOAT.model} sailing catamaran with ${BOAT.cabins} ensuite cabins for up to ${BOAT.guests} guests, based in Road Town, Tortola, British Virgin Islands.`,
  brand: { "@type": "Brand", name: BOAT.builder },
  model: BOAT.model,
  image: [`${SITE.domain}/images/home-fountaine-pajot.jpg`, `${SITE.domain}/images/about-freedom.png`],
  url: `${SITE.domain}/about-freedom`,
  additionalProperty: [
    { "@type": "PropertyValue", name: "Length overall", value: `${BOAT.loaFt} / ${BOAT.loaM}` },
    { "@type": "PropertyValue", name: "Beam", value: `${BOAT.beamFt} / ${BOAT.beamM}` },
    { "@type": "PropertyValue", name: "Draft", value: `${BOAT.draftFt} / ${BOAT.draftM}` },
    { "@type": "PropertyValue", name: "Cabins", value: String(BOAT.cabins) },
    { "@type": "PropertyValue", name: "Heads", value: String(BOAT.heads) },
    { "@type": "PropertyValue", name: "Guests", value: String(BOAT.guests) },
    { "@type": "PropertyValue", name: "Engines", value: BOAT.engines },
    { "@type": "PropertyValue", name: "Home port", value: "Road Town, Tortola, British Virgin Islands" },
  ],
  offers: SEASONS.map((s) => ({
    "@type": "Offer",
    name: `${s.name} weekly charter`,
    price: s.weeklyRate,
    priceCurrency: "USD",
    description: `${s.ranges.join("; ")} — per week, whole yacht, bareboat`,
    availability: "https://schema.org/InStock",
    url: `${SITE.domain}/pricing-and-inquiries`,
    seller: { "@id": `${SITE.domain}/#org` },
  })),
};

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE.domain}${it.path}`,
  })),
});
