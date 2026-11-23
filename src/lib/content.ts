export const SITE = {
  name: "Freedom BVI",
  domain: "https://bvifreedom.com",
  tagline: "Charter the catamaran Freedom — a Fountaine Pajot Aura 51 in the British Virgin Islands",
  phone: "567-373-3366",
  phoneVanity: "567-FREEDOM",
  email: "sailaway@bvifreedom.com",
  address: {
    street: "500 Westover Dr #32147",
    city: "Sanford",
    region: "NC",
    postal: "27330",
    country: "US",
  },
  facebook: "https://www.facebook.com/BVIFreedom",
  operator: {
    name: "BVI Yacht Charters",
    url: "https://www.bviyachtcharters.com",
    base: "Wickhams Cay II, Road Town, Tortola, British Virgin Islands",
  },
};

export const BOAT = {
  name: "Freedom",
  year: 2024,
  builder: "Fountaine Pajot",
  model: "Aura 51",
  edition: "Maestro",
  designer: "Berret-Racoupeau Yacht Design",
  cabins: 5,
  heads: 5,
  berths: 10,
  guests: 10,
  loaFt: "52′ 2″",
  loaM: "15.9 m",
  beamFt: "26′ 6″",
  beamM: "8.08 m",
  draftFt: "4′ 4″",
  draftM: "1.30 m",
  displacement: "39,900 lb (18,100 kg)",
  mainsail: "1,023 sq ft (95 m²)",
  genoa: "635 sq ft (59 m²)",
  engines: "2 × 75 HP Volvo Penta diesel (upgraded from standard 60 HP)",
  fuel: "238 US gal (900 L)",
  water: "238 US gal (900 L) + 27 GPH watermaker",
  generator: "12 kW genset with sound shielding",
  ac: "68,000 BTU air conditioning throughout",
};

export const COMFORT_FEATURES = [
  "Starlink high-speed internet throughout the boat",
  "Fusion marine stereo with Bluetooth, cockpit and flybridge speakers",
  "Five cabins in the Maestro layout — owner's suite spans the full starboard hull",
  "Five freshwater electric heads",
  "Hot-water deck shower on the transom",
  "Cockpit refrigerator and ice maker",
  "12 kW generator with sound shielding",
  "68,000 BTU air conditioning",
  "Additional 110 V outlets and USB ports, cabin fans",
  "27 gallon-per-hour watermaker",
  "Hydraulic swim platform for launching the dinghy",
  "Underwater lights for night swimming and tarpon watching",
];

export const SAILING_FEATURES = [
  "Forward-looking transducer for safe anchoring in shallow bays",
  "Wi-Fi mast cameras to check sail trim and the anchorage from the helm",
  "Line cutters on both saildrives",
  "Single-line reefing from the helm station",
  "Garmin electronics suite: autopilot, VHF with AIS, dual GPS, two multifunction displays",
  "Electric winches for mainsail and genoa",
  "ProFurl genoa furler",
  "Upgraded twin 75 HP engines",
  "Flybridge helm with full visibility over the bows",
];

export type Season = {
  name: string;
  weeklyRate: number;
  ranges: string[];
  dates: { start: string; end: string }[]; // MM-DD
};

export const SEASONS: Season[] = [
  {
    name: "High Season",
    weeklyRate: 19000,
    ranges: ["Dec 16 – Jan 1", "Feb 1 – Mar 31"],
    dates: [
      { start: "12-16", end: "01-01" },
      { start: "02-01", end: "03-31" },
    ],
  },
  {
    name: "Mid Season",
    weeklyRate: 17500,
    ranges: ["Jan 2 – Jan 31", "Apr 1 – Apr 30"],
    dates: [
      { start: "01-02", end: "01-31" },
      { start: "04-01", end: "04-30" },
    ],
  },
  {
    name: "Low Season",
    weeklyRate: 16500,
    ranges: ["May 1 – Jul 9", "Nov 6 – Dec 15"],
    dates: [
      { start: "05-01", end: "07-09" },
      { start: "11-06", end: "12-15" },
    ],
  },
  {
    name: "Off Season",
    weeklyRate: 15000,
    ranges: ["Jul 10 – Nov 5"],
    dates: [{ start: "07-10", end: "11-05" }],
  },
];

export const PRICING_NOTES = [
  "Rates are per week (7 nights) for the whole yacht, bareboat, in US dollars.",
  "Up to 10 guests in five double cabins, each with its own head and shower.",
  "A professional captain and/or chef can be arranged through BVI Yacht Charters at an additional daily rate.",
  "Fuel, provisioning, mooring balls, National Parks permit and BVI cruising tax are additional and settled at check-out.",
  "Inquire directly through this site and receive a Welcome Aboard gift when you book.",
];

export const PRESS_REVIEWS = [
  {
    outlet: "Multihulls",
    url: "https://www.caribbean-multihulls.com/fountaine-pajot/aura-51-catamaran/",
    summary: "Praises the Aura 51's balance of sailing performance and living space.",
    logo: "/images/press-multihulls.jpg",
  },
  {
    outlet: "Yachting World",
    url: "https://www.yachtingworld.com/reviews/boat-tests/aura-51-review-space-in-abundance",
    summary: "\"Space in abundance\" — a boat test of the Aura 51's volume and comfort.",
    logo: "/images/press-yachting-world.jpg",
  },
  {
    outlet: "topRik",
    url: "https://toprik.com/blog/review/fountaine-pajot-aura-51/",
    summary: "Detailed review of layout options, helm ergonomics and systems.",
    logo: "/images/press-toprik.jpg",
  },
  {
    outlet: "Yacht Style",
    url: "https://yachtstyle.co/review-fountaine-pajot-aura-51/",
    summary: "Highlights the flybridge lounge and outdoor living areas.",
    logo: "/images/press-yachtstyle.jpg",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "The boat was immaculate and the BVI Yacht Charters team handled everything from the chart briefing to provisioning. Easiest charter we've done.",
    name: "Google review",
  },
  {
    quote:
      "Professional, friendly staff. The captain they arranged knew every anchorage and the best snorkel spots. We'll be back.",
    name: "TripAdvisor review",
  },
  {
    quote:
      "Planning, booking and payment were smooth, and the yacht was exactly as described. Five stars.",
    name: "Trust Index review",
  },
];

export const WHY_BVI = [
  {
    title: "Steady trade winds, calm seas",
    body: "The Sir Francis Drake Channel is sheltered by the island chain, so you sail in 15–20 knot trades on flat water with line-of-sight navigation between islands.",
  },
  {
    title: "Short hops, mooring balls everywhere",
    body: "Most anchorages are one to two hours apart, and well-maintained mooring fields mean you rarely need to anchor unless you want to.",
  },
  {
    title: "World-class snorkeling and diving",
    body: "The Indians, the Caves at Norman Island, the wreck of the RMS Rhone, and the boulders of The Baths are all a short dinghy ride from a mooring.",
  },
  {
    title: "Beach bars and great food",
    body: "Soggy Dollar, Foxy's, Willy T, Cooper Island Beach Club, Saba Rock — every island has a place to come ashore for lunch, a Painkiller, or dinner.",
  },
];

export const SAMPLE_ITINERARY = [
  { day: "Day 1", stop: "Road Town → Norman Island (The Bight)", note: "Chart briefing, provision, short 1.5-hour sail. Snorkel the Caves, dinner at Pirates Bight, after-dinner drinks on the Willy T." },
  { day: "Day 2", stop: "Norman → Cooper Island", note: "Snorkel The Indians on the way. Mooring at Manchioneel Bay; Cooper Island Beach Club rum bar, and the Cooper Island restaurant for dinner." },
  { day: "Day 3", stop: "Cooper → The Baths / Spanish Town → North Sound, Virgin Gorda", note: "Depart Cooper early to arrive at The Baths before the day-trippers. Swim through the boulder caves to Devil's Bay. If conditions are red-flagged at The Baths, cruise around to Spanish Town and cab it to The Baths — if you've never been, your crew will thank you. From The Baths, arrive in the North Sound in the afternoon. Enjoy dinner at the Bitter End Yacht Club or Saba Rock. If you brought your hiking shoes, tender up at Bitter End and take the hike to the top of the hill for 360-degree views of the sound." },
  { day: "Day 4", stop: "North Sound (stay) — or sail to Anegada", note: "Remain in the North Sound and enjoy the protected anchorage and water sports. Or sail to Anegada: arrive around noon, rent a truck and drive to Tipsy's on the north side of the island — a great beach bar with a lovely beach and lots of fun. Enjoy a lobster dinner at one of the restaurants around the mooring field." },
  { day: "Day 5", stop: "North Sound or Anegada → Jost Van Dyke", note: "Depart the North Sound or Anegada for Jost Van Dyke — a long downwind sail. Stop by the Bubbly Pool or Sandy Spit and grab a cocktail at Foxy's Taboo. Cruise around to Great Harbour to moor for the night. Dinner and fun at Foxy's." },
  { day: "Day 6", stop: "Jost Van Dyke → Cane Garden Bay (or Soper's Hole)", note: "Take a cab or the dinghy from Great Harbour to White Bay and spend the day at the Soggy Dollar. Depart in the early afternoon for Cane Garden Bay — several fun options for dinner. If there are swells from the northeast, skip Cane Garden Bay and stay the night in Soper's Hole, with dinner at Pusser's." },
  { day: "Day 7", stop: "Jost → Norman Island or Peter Island", note: "Last swim, final-night dinner, short motor back to Road Town in the morning." },
];

export const FAQ = [
  {
    q: "How much does it cost to charter Freedom for a week in the BVI?",
    a: "Freedom charters from $15,000 per week in the off season (July 10 – November 5) to $19,000 per week in high season (December 16 – January 1 and February 1 – March 31). The rate covers the whole yacht for up to 10 guests; fuel, provisioning, mooring fees and BVI taxes are additional.",
  },
  {
    q: "What kind of boat is Freedom?",
    a: "Freedom is a 2024 Fountaine Pajot Aura 51 sailing catamaran in the five-cabin Maestro layout. She is 52 feet long with a 26.5-foot beam, five cabins each with a private head, a flybridge helm, Starlink internet, air conditioning, a generator and a watermaker.",
  },
  {
    q: "Can I charter Freedom without a captain?",
    a: "Yes. Freedom is offered bareboat to qualified skippers with catamaran experience; BVI Yacht Charters reviews your sailing résumé before confirming. If you'd rather relax, a licensed captain and a chef can be added for a daily fee.",
  },
  {
    q: "How many people can sleep aboard?",
    a: "Ten guests in five double cabins, each with its own ensuite head and shower. The Maestro owner's suite occupies the full starboard hull.",
  },
  {
    q: "Where does the charter start?",
    a: "Freedom is based with BVI Yacht Charters in Road Town, Tortola. The easiest way in is to fly to Beef Island (EIS) — American Airlines has several daily flights connecting through Miami, and it's 20 minutes by taxi to Road Town. Alternatively, fly into St. Thomas (STT) and take the ferry to Tortola.",
  },
  {
    q: "When is the best time to sail the BVI?",
    a: "December through April brings the most reliable trade winds and the busiest anchorages. May, June and early July offer warm, settled weather and lower rates. Hurricane season runs June through November, with the highest risk in August–October; the off-season rate reflects that.",
  },
  {
    q: "What is included in the charter price?",
    a: "The yacht, dinghy with outboard, snorkel gear, linens and towels, a full chart briefing and a boat briefing. Not included: fuel, provisioning, mooring balls (about $35–$50 per night), the BVI cruising tax, National Parks permit and optional crew.",
  },
  {
    q: "How do I book?",
    a: "Use the inquiry form on the Pricing page or email sailaway@bvifreedom.com with your preferred dates and group size. We'll confirm availability with BVI Yacht Charters, send the charter agreement, and a 50% deposit holds your week.",
  },
];

export const RESOURCES = {
  gettingThere: [
    { label: "American Airlines — Miami to Beef Island (EIS)", url: "https://www.aa.com/booking/find-flights" },
    { label: "How to get flights to the BVI (Aerial BVI)", url: "https://aerialbvi.com/blog/how-to-get-flights-to-bvi/" },
    { label: "Getting there — Frommer's BVI guide", url: "https://www.frommers.com/destinations/the-british-virgin-islands/planning-a-trip/getting-there" },
    { label: "BVI Tourism — official site", url: "https://www.bvitourism.com" },
  ],
  ferries: [
    { label: "Road Town Fast Ferry", url: "https://www.roadtownfastferry.com" },
    { label: "St. Thomas – BVI ferry schedules (usvi.net)", url: "https://www.usvi.net/ferry-schedules/" },
    { label: "Native Son Ferry", url: "https://nativesonferry.co" },
    { label: "Smith's Ferry", url: "https://www.smithsferry.com" },
  ],
  waterTaxis: [
    { label: "Dolphin Water Taxi", url: "https://www.dolphinshuttle.com" },
    { label: "Seahorse Water Taxi", url: "https://www.seahorse.com" },
  ],
  itineraries: [
    { label: "BVI Yacht Charters sample itineraries", url: "https://www.bviyachtcharters.com" },
    { label: "7-day BVI sailing itinerary (My Traveling Tastes)", url: "https://mytravelingtastes.com" },
  ],
  guidebooks: [
    { label: "The Cruising Guide to the Virgin Islands", url: "https://www.amazon.com/s?k=cruising+guide+to+the+virgin+islands" },
    { label: "The SmarterCharter Catamaran Guide", url: "https://www.amazon.com/s?k=smartercharter+catamaran+guide" },
    { label: "Fodor's U.S. & British Virgin Islands", url: "https://www.amazon.com/s?k=fodors+british+virgin+islands" },
  ],
};
