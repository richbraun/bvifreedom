/**
 * Image manifest. Local path -> original source URL on the current bvifreedom.com
 * (stock Fountaine Pajot Aura 51 photography). Run `npm run fetch-assets` to
 * download everything into /public/images. Replace any file with an actual
 * photo of Freedom and keep the same filename — nothing else needs to change.
 */
export type SiteImage = { src: string; alt: string; source?: string };

const WP = "https://bvifreedom.com/wp-content/uploads";

export const IMAGES = {
  logo: { src: "/images/logo.jpg", alt: "Freedom BVI logo", source: `${WP}/2024/02/main-logo.jpg` },
  logoWide: { src: "/images/logo-wide.jpg", alt: "Freedom BVI", source: `${WP}/2024/02/FreedomFx-01-scaled.jpg` },
  boatSvg: { src: "/images/boat.svg", alt: "Catamaran illustration", source: `${WP}/2024/03/Boat.svg` },

  // Home feature trio
  home1: { src: "/images/home-fountaine-pajot.jpg", alt: "Fountaine Pajot Aura 51 catamaran under sail", source: `${WP}/2024/02/home-1.jpg` },
  home2: { src: "/images/home-latest-largest.jpg", alt: "Fountaine Pajot Aura 51 flybridge and cockpit", source: `${WP}/2024/02/home-2.jpg` },
  home3: { src: "/images/home-sail-of-a-lifetime.jpg", alt: "Sailing the British Virgin Islands aboard Freedom", source: `${WP}/2024/02/home-3.jpg` },

  // Home gallery
  gal1: { src: "/images/gallery-sailing-capital.jpg", alt: "Sailing capital of the Caribbean — catamarans in the Sir Francis Drake Channel", source: `${WP}/2024/02/home-gallery-1-2.jpg` },
  gal2: { src: "/images/gallery-luxury.jpg", alt: "Luxury catamaran saloon", source: `${WP}/2024/02/home-gallery-2-2.jpg` },
  gal3: { src: "/images/gallery-sailing-vacation.jpg", alt: "Sailing vacation in the BVI", source: `${WP}/2024/02/home-gallery-3-1.jpg` },
  gal4: { src: "/images/gallery-sunset-cruise.jpg", alt: "Sunset cruise aboard a catamaran", source: `${WP}/2024/02/home-gallery-4-1.jpg` },
  gal5: { src: "/images/gallery-yacht-racing.jpg", alt: "Catamaran sailing fast on a reach", source: `${WP}/2024/02/home-gallery-5-1.jpg` },

  // About Freedom
  about1: { src: "/images/about-freedom.png", alt: "Fountaine Pajot Aura 51 at anchor", source: `${WP}/2024/02/about-img-1.png` },
  interior: { src: "/images/boat-interior.jpg", alt: "Aura 51 interior saloon and galley", source: `${WP}/2024/03/boat-interior.jpg` },
  sn1: { src: "/images/sailing-nav-1.jpg", alt: "Flybridge helm station", source: `${WP}/2021/07/s-and-n01.jpg` },
  sn2: { src: "/images/sailing-nav-2.jpg", alt: "Owner's cabin", source: `${WP}/2021/07/s-and-n02.jpg` },
  sn3: { src: "/images/sailing-nav-3.jpg", alt: "Cockpit dining area", source: `${WP}/2021/07/s-and-n3.jpg` },
  sn4: { src: "/images/sailing-nav-4.jpg", alt: "Guest cabin", source: `${WP}/2021/07/s-and-n04.jpg` },
  sn5: { src: "/images/sailing-nav-5.jpg", alt: "Forward cockpit lounge", source: `${WP}/2024/02/s-and-n05.jpg` },
  sn6: { src: "/images/sailing-nav-6.jpg", alt: "Galley", source: `${WP}/2024/02/s-and-n6.jpg` },
  sn7: { src: "/images/sailing-nav-7.jpg", alt: "Aura 51 under sail, aerial view", source: `${WP}/2024/02/s-and-n07.jpg` },
  sn8: { src: "/images/sailing-nav-8.jpg", alt: "Swim platform and transom", source: `${WP}/2024/02/s-and-n8.jpg` },

  // Experience the BVI
  journey: { src: "/images/embarking-on-a-journey.jpg", alt: "Catamaran leaving the harbour", source: `${WP}/2024/03/embarking-on-a-journey.jpg` },
  bviFreedom: { src: "/images/bvi-freedom.jpg", alt: "Freedom in the British Virgin Islands", source: `${WP}/2024/03/bvi-freedom.jpg` },
  exp44: { src: "/images/bvi-beach.jpg", alt: "White sand beach in the BVI", source: `${WP}/2024/03/gallery44.jpg` },
  clearWater: { src: "/images/crystal-clear-waters.jpg", alt: "Crystal clear water over a reef", source: `${WP}/2024/03/crystal-clear-waters.jpg` },
  exp55: { src: "/images/bvi-anchorage.jpg", alt: "Catamarans moored in a BVI anchorage", source: `${WP}/2024/03/gallery55.jpg` },

  // Pricing page
  inquiryForm: { src: "/images/inquiries.jpg", alt: "Catamaran at anchor at sunset", source: `${WP}/2024/03/inquiries-form.jpg` },
  pressMultihulls: { src: "/images/press-multihulls.jpg", alt: "Multihulls magazine", source: `${WP}/2024/02/Multihulls-1.jpg` },
  pressYW: { src: "/images/press-yachting-world.jpg", alt: "Yachting World", source: `${WP}/2024/03/yachting-world.jpg` },
  pressToprik: { src: "/images/press-toprik.jpg", alt: "topRik", source: `${WP}/2024/02/Toprik-1.jpg` },
  pressYachtStyle: { src: "/images/press-yachtstyle.jpg", alt: "Yacht Style", source: `${WP}/2024/02/yachtstyle.jpg` },
  badgeTrust: { src: "/images/badge-trustindex.png", alt: "Trust Index reviews", source: `${WP}/2024/02/logo1-1.png` },
  badgeTripadvisor: { src: "/images/badge-tripadvisor.png", alt: "TripAdvisor reviews", source: `${WP}/2024/02/tripadvisor1.png` },
  badgeGoogle: { src: "/images/badge-google.png", alt: "Google reviews", source: `${WP}/2024/02/google2.png` },
  favicon: { src: "/images/favicon.png", alt: "", source: `${WP}/2024/03/favicon.png` },
} satisfies Record<string, SiteImage>;

export const ALL_IMAGES: SiteImage[] = Object.values(IMAGES);
