export type Service = {
  slug: string;
  icon: string;
  tag: string;
  title: string;
  copy: string; // short for cards
  img: string;
  longDescription: string;
  benefits: string[];
  metrics: Array<{ value: number; decimals: number; suffix: string; label: string }>;
  process: Array<{ n: string; title: string; copy: string }>;
  differentiators: string[];
};

const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const baseServices = [
  {
    icon: "truck",
    tag: "DRY VAN · TRUCKING",
    title: "DRY VAN TRUCKING",
    copy: "Reliable and cost-effective transportation for general freight. Our dry van trailers protect your goods from weather and external conditions, ensuring safe and consistent delivery across every mile.",
    img: "/services/photos/dry-van-highway.webp",
    longDescription:
      "Our dry van fleet is the backbone of North American logistics. Whether you're moving palletized goods, boxed freight, or consumer packaged products, we deliver with precision. Every trailer is GPS-tracked, professionally maintained, and operated by experienced company drivers who own the outcome.",
    benefits: [
      "Full protection from elements — no weather damage risk",
      "Standard 53' trailers with logistic posts and load securement",
      "Real-time tracking + POD photos on every load",
      "Consistent capacity across 48 states",
      "Competitive all-in rates with no hidden fees",
    ],
    metrics: [
      { value: 50, decimals: 0, suffix: "+", label: "dry vans in the fleet" },
      { value: 98.7, decimals: 1, suffix: "%", label: "on-time delivery" },
      { value: 15, decimals: 0, suffix: " min", label: "average quote time" },
    ],
    process: [
      { n: "01", title: "Quote & Book", copy: "Instant firm rate. Book in minutes, 24/7." },
      { n: "02", title: "Pickup", copy: "Live GPS from dock. Driver confirms load secure." },
      { n: "03", title: "Transit", copy: "Full visibility. Proactive ETAs every 4 hours." },
      { n: "04", title: "Delivery & Proof", copy: "Clean POD + photos in under 30 minutes." },
    ],
    differentiators: [
      "Company-owned equipment only — zero broker risk",
      "ELD + dashcam standard on every unit",
      "Driver scorecards + performance incentives",
    ],
  },
  {
    icon: "shield",
    tag: "CLIMATE CONTROLLED · TEMPERATURE CONTROLLED · REFRIGERATED · LIVE SEAFOOD · PRODUCE",
    title: "REFRIGERATED TRANSPORT",
    copy: "Temperature-controlled transport from -40°F to 70°F for perishable and sensitive goods — live seafood, fresh produce, dairy, pharmaceuticals, and more. Live monitoring from pickup to delivery.",
    img: "/services/photos/refrigerated.png",
    longDescription:
      "Temperature integrity is non-negotiable. Our reefers run -40°F to 70°F multi-temp zones with continuous live monitoring, redundant systems, and real-time alerts. Live seafood, fresh produce, vegetables, protein, pharmaceuticals, chocolate — we protect your product and your brand on every lane across North America.",
    benefits: [
      "Full temp range: -40°F to 70°F with dual-zone capability",
      "Live seafood transport with aeration + oxygen monitoring",
      "Produce & vegetables: fresh, frozen, and mixed loads",
      "Live temperature monitoring with downloadable audit reports",
      "Pre-trip inspections + USDA/FDA compliant procedures",
      "Immediate alert escalation for any deviation > ±2°F",
      "Dedicated refrigerated dispatch team — 24/7",
    ],
    metrics: [
      { value: 870, decimals: 0, suffix: "", label: "reefers on the road" },
      { value: 99.4, decimals: 1, suffix: "%", label: "temp compliance rate" },
      { value: 42, decimals: 0, suffix: " min", label: "mean time to recovery" },
    ],
    process: [
      { n: "01", title: "Pre-cool & Validate", copy: "Trailer set to spec 2+ hours before loading." },
      { n: "02", title: "Monitored Pickup", copy: "Seals + probes placed. First reading within 15 min." },
      { n: "03", title: "Live Thermal Watch", copy: "24/7 monitoring center. Auto-escalation at ±2°F." },
      { n: "04", title: "Protected Delivery", copy: "Receiver sign-off + full thermal audit delivered." },
    ],
    differentiators: [
      "Carrier-owned reefers — never subbed",
      "Redundant compressor + generator backup",
      "Live seafood & produce specialists on staff",
    ],
  },
  {
    icon: "shield",
    tag: "GOVERNMENT · DEFENCE CANADA · TRANSPORT CANADA · SECURED CARGO",
    title: "GOVERNMENT & SECURED CARGO",
    copy: "Defence Canada approved and Transport Canada certified carrier for sensitive government freight, secured cargo program loads, and high-value electronics. Full chain of custody, 24/7 secured yard.",
    img: "/services/photos/government-secured-cargo.webp",
    longDescription:
      "When the cargo demands absolute accountability, we step up. Phantom holds Defence Canada approval and Transport Canada certification, and is an approved carrier under the Secured Cargo Program. We handle government freight, high-value electronics, sensitive loads, and anything that requires protocol-grade security at every touchpoint — pickup, transit, and delivery.",
    benefits: [
      "Defence Canada approved carrier",
      "Transport Canada certified — fully compliant on all Canadian lanes",
      "Secured Cargo Program approved carrier",
      "High-value electronics with extra security protocols",
      "24/7 live-monitored secured yard",
      "Full chain of custody with signed documentation at every stage",
      "Experienced drivers cleared for sensitive cargo",
    ],
    metrics: [
      { value: 100, decimals: 0, suffix: "%", label: "chain of custody documentation" },
      { value: 24, decimals: 0, suffix: "/7", label: "secured yard monitoring" },
      { value: 0, decimals: 0, suffix: "", label: "cargo security incidents" },
    ],
    process: [
      { n: "01", title: "Security Clearance Check", copy: "Driver and equipment vetted before every sensitive load." },
      { n: "02", title: "Sealed + Documented", copy: "Full load documentation and seals applied at pickup." },
      { n: "03", title: "Live Monitoring", copy: "24/7 tracking + check-ins. Secure yard stops if needed." },
      { n: "04", title: "Verified Delivery", copy: "Authorized-receiver-only handoff. Full audit trail delivered." },
    ],
    differentiators: [
      "Defence Canada and Transport Canada credentialed",
      "Secured Cargo Program approved — not just compliant",
      "In-house security protocols, not outsourced",
    ],
  },
  {
    icon: "truck",
    tag: "PRIVATE ROSTER · EXCLUSIVE OPERATIONS",
    title: "DEDICATED FLEET",
    copy: "A dedicated fleet built around your business needs. You get consistent capacity, priority dispatch, and full control over how your freight moves every day.",
    img: "/services/photos/dedicated-fleet.webp",
    longDescription:
      "Treat our trucks like yours. We assign dedicated power units and drivers to your lanes, wrapped in your branding if desired. Same drivers, same dispatch team, same reliability — every single day. It's like having your own private fleet without the capital or headaches.",
    benefits: [
      "Dedicated tractors + trailers reserved exclusively for you",
      "Your schedule, your rules — priority loading windows",
      "Branded units available (full or partial wrap)",
      "Single point of contact + weekly performance reviews",
      "Predictable weekly capacity you can count on",
    ],
    metrics: [
      { value: 100, decimals: 0, suffix: "%", label: "company-owned assets" },
      { value: 96, decimals: 0, suffix: "%", label: "driver retention on dedicated" },
      { value: 4.8, decimals: 1, suffix: "/5", label: "customer satisfaction" },
    ],
    process: [
      { n: "01", title: "Design Your Fleet", copy: "We model your lanes and volume, then assign the right assets." },
      { n: "02", title: "Onboard & Brand", copy: "Drivers trained on your SOPs. Trucks wrapped if needed." },
      { n: "03", title: "Daily Execution", copy: "Your dedicated dispatch runs the board every day." },
      { n: "04", title: "Continuous Optimization", copy: "Monthly lane reviews + continuous improvement cycles." },
    ],
    differentiators: [
      "No shared capacity — assets are yours",
      "Driver continuity builds deep product knowledge",
      "Full operational transparency dashboard",
    ],
  },
  {
    icon: "warehouse",
    tag: "SECURE STORAGE · STORAGE SOLUTIONS",
    title: "WAREHOUSING",
    copy: "Secure, structured, and scalable warehousing solutions. We provide short-term and long-term storage options with full inventory management, ensuring your goods are safe and ready for dispatch.",
    img: "/services/photos/warehousing.webp",
    longDescription:
      "Our strategically located distribution centers give you flexible storage + seamless last-mile execution. Real-time WMS, cycle counts, lot tracking, and value-added services (labeling, kitting, returns) all under one roof and one invoice.",
    benefits: [
      "Climate-controlled and ambient options",
      "WMS with EDI/API integration + real-time visibility",
      "Pick, pack, label, and light assembly available",
      "Cross-dock + transload capabilities",
      "24/7 security + full insurance coverage",
    ],
    metrics: [
      { value: 1.2, decimals: 1, suffix: "M", label: "sq ft bonded space" },
      { value: 99.2, decimals: 1, suffix: "%", label: "inventory accuracy" },
      { value: 6.2, decimals: 1, suffix: " hrs", label: "average order cycle time" },
    ],
    process: [
      { n: "01", title: "Receive & Verify", copy: "ASN check-in, quality photos, immediate putaway." },
      { n: "02", title: "Store & Track", copy: "Real-time location + lot/expiration control." },
      { n: "03", title: "Fulfill", copy: "Wave or wave-less picking. Value-add services on demand." },
      { n: "04", title: "Ship or Stage", copy: "Outbound to your customers or your own fleet." },
    ],
    differentiators: [
      "Same company owns the trucks and the warehouse",
      "Seamless handoff between storage and transportation",
      "No third-party warehouse risk",
    ],
  },
  {
    icon: "boxes",
    tag: "NATIONWIDE · GENERAL FREIGHT",
    title: "FREIGHT SHIPPING",
    copy: "Comprehensive freight shipping services across domestic routes. From standard pallets to specialized loads, we coordinate the entire shipping process for seamless delivery.",
    img: "/services/photos/freight-shipping.webp",
    longDescription:
      "One carrier. One invoice. Every mode you need. We handle FTL, LTL, expedited, and project freight with the same obsessive attention to detail. No handoffs, no excuses.",
    benefits: [
      "True single-source — dry van, reefer, flatbed, and more",
      "Nationwide coverage with strong regional density",
      "Hazardous materials + oversize expertise",
      "Consolidated billing across all services",
      "Proactive exception management",
    ],
    metrics: [
      { value: 48, decimals: 0, suffix: "", label: "states covered" },
      { value: 3200, decimals: 0, suffix: "+", label: "loads moved monthly" },
      { value: 98.7, decimals: 1, suffix: "%", label: "claim-free deliveries" },
    ],
    process: [
      { n: "01", title: "Scope & Quote", copy: "We model the optimal equipment and route." },
      { n: "02", title: "Execute End-to-End", copy: "One dispatch team owns the load cradle to grave." },
      { n: "03", title: "Live Updates", copy: "Status pushes + exception alerts in real time." },
      { n: "04", title: "Close the Loop", copy: "Clean POD + full documentation delivered fast." },
    ],
    differentiators: [
      "100% company drivers and owned equipment",
      "No reliance on outside carriers for core lanes",
      "Integrated warehousing when you need storage",
    ],
  },
  {
    icon: "boxes",
    tag: "COST EFFICIENT · PARTIAL LOAD",
    title: "LTL TRUCKING",
    copy: "Efficient Less-Than-Truckload shipping for freight that doesn't require a full trailer. Share the ride and save on costs while maintaining reliable delivery schedules.",
    img: "/services/photos/ltl-trucking.webp",
    longDescription:
      "LTL done right. We consolidate your partial loads with other compatible freight on optimized routes. You get competitive rates, reliable transit times, and the same Phantom reliability and visibility you expect from our FTL moves.",
    benefits: [
      "Competitive LTL rates without the broker markup",
      "Consistent 2–5 day transit on core lanes",
      "Pallet-level tracking + photo proof at each touch",
      "No minimums — ship 1 pallet or 12",
      "Returns & redistribution services available",
    ],
    metrics: [
      { value: 14200, decimals: 0, suffix: "", label: "LTL shipments last year" },
      { value: 2.8, decimals: 1, suffix: " days", label: "avg transit time (core lanes)" },
      { value: 97.9, decimals: 1, suffix: "%", label: "first-attempt delivery" },
    ],
    process: [
      { n: "01", title: "Book & Label", copy: "Simple booking. Labels + BOL generated instantly." },
      { n: "02", title: "Consolidate Smart", copy: "Freight matched to compatible lanes and equipment." },
      { n: "03", title: "Hub & Spoke", copy: "Clean handoffs. Full chain of custody recorded." },
      { n: "04", title: "Final Mile", copy: "Appointment or direct delivery with proof." },
    ],
    differentiators: [
      "Phantom LTL rides on our own network — not resold",
      "Higher weight limits than most LTL carriers",
      "Direct integration with our dedicated and FTL capacity",
    ],
  },
  {
    icon: "signal",
    tag: "URGENT DELIVERY · TIME-CRITICAL",
    title: "EXPEDITED TRUCKING",
    copy: "When time is of the essence, our expedited trucking services ensure your freight reaches its destination via the fastest possible route with zero layovers.",
    img: "/services/photos/expedited-trucking.webp",
    longDescription:
      "Team drivers. Non-stop. We run true expedited — no drop yards, no layovers, no excuses. When a plant is down or a line is starving, we move heaven and earth (and trucks) to get it there.",
    benefits: [
      "Team drivers — 24/7 rolling, 1,200+ miles/day possible",
      "Direct door-to-door, no terminal stops",
      "Priority dispatch + guaranteed capacity windows",
      "Live satellite + driver check-ins every 2 hours",
      "Hot-load specialists who live for these moves",
    ],
    metrics: [
      { value: 1240, decimals: 0, suffix: " mi", label: "average expedited run" },
      { value: 19.5, decimals: 1, suffix: " hrs", label: "coast-to-coast record" },
      { value: 100, decimals: 0, suffix: "%", label: "loads delivered on promised time" },
    ],
    process: [
      { n: "01", title: "Emergency Quote", copy: "We hold capacity for true time-critical moves." },
      { n: "02", title: "Instant Dispatch", copy: "Closest team driver assigned within minutes." },
      { n: "03", title: "Non-Stop Execution", copy: "Driver teams rotate. Truck never stops." },
      { n: "04", title: "Mission Complete", copy: "Arrival confirmed + full documentation in minutes." },
    ],
    differentiators: [
      "Only company team drivers — no owner-ops",
      "Pre-positioned assets for major corridors",
      "We’ll deadhead to make your window",
    ],
  },
  {
    icon: "pin",
    tag: "DIRECT DISPATCH · RAPID RESPONSE",
    title: "HOTSHOT TRUCKING",
    copy: "Dedicated hotshot capabilities for time-sensitive, smaller, or specialized loads. Immediate dispatch to get your crucial freight moving at a moment's notice.",
    img: "/services/photos/hotshot-trucking.webp",
    longDescription:
      "Small load? Huge urgency? Our hotshot team moves critical parts, emergency shipments, and high-value items on a moment’s notice. Goosenecks, flatbeds, and sprinter-style units ready 24/7 with the same Phantom standards.",
    benefits: [
      "Same-day or next-morning pickup available",
      "Trucks sized for 1–8 pallets or project loads",
      "Direct driver communication — no call center",
      "High-value cargo handling + extra security protocols",
      "Perfect for machine parts, oilfield, events, and urgent manufacturing",
    ],
    metrics: [
      { value: 68, decimals: 0, suffix: " min", label: "average hotshot dispatch time" },
      { value: 310, decimals: 0, suffix: "", label: "hotshot loads last quarter" },
      { value: 4.9, decimals: 1, suffix: "/5", label: "customer NPS" },
    ],
    process: [
      { n: "01", title: "Call or Book", copy: "Real humans answer. We move fast." },
      { n: "02", title: "Asset Match", copy: "Right truck for the load — gooseneck, flat, or enclosed." },
      { n: "03", title: "White Glove Move", copy: "Driver stays with the freight the whole way." },
      { n: "04", title: "Delivered & Done", copy: "Photo proof + signature. Mission complete." },
    ],
    differentiators: [
      "Dedicated hotshot fleet + drivers — not side hustle",
      "We say yes to the weird, awkward, and urgent",
      "Same reliability and paperwork standards as big loads",
    ],
  },
  {
    icon: "truck",
    tag: "INTERSTATE · CROSS-COUNTRY",
    title: "LONG HAUL TRUCKING",
    copy: "Extensive long-haul network bridging the distance. Our experienced drivers and well-maintained fleet ensure your cargo crosses state lines safely and on time.",
    img: "/services/photos/long-haul-trucking.webp",
    longDescription:
      "Coast to coast, border to border. Our long-haul network is built for reliability over distance. Team and solo options, heavy experience on high-volume corridors, and a culture that treats every mile like it matters.",
    benefits: [
      "Strong coverage on I-5, I-10, I-40, I-70, I-80, I-95 corridors",
      "Team driver options for 2,800+ mile runs in 48–60 hrs",
      "High cube and standard vans, reefers, and flatbeds",
      "Experienced mountain and winter drivers",
      "Fuel-efficient fleet with modern aerodynamic equipment",
    ],
    metrics: [
      { value: 187000, decimals: 0, suffix: "", label: "miles driven last month" },
      { value: 2.1, decimals: 1, suffix: " days", label: "avg coast-to-coast" },
      { value: 99.1, decimals: 1, suffix: "%", label: "load completion rate" },
    ],
    process: [
      { n: "01", title: "Lane Analysis", copy: "We recommend best equipment and timing." },
      { n: "02", title: "Asset & Driver Pair", copy: "Experienced long-haul teams assigned." },
      { n: "03", title: "Cross-Country Execution", copy: "Regular updates + fuel/road condition monitoring." },
      { n: "04", title: "Arrival & Unload", copy: "On-time delivery + full chain of custody." },
    ],
    differentiators: [
      "High percentage of company team drivers on long runs",
      "Predictable ETAs even on 2,000+ mile lanes",
      "Integrated with our warehousing for origin/destination staging",
    ],
  },
  {
    icon: "truck",
    tag: "VERSATILE FLEET · END-TO-END",
    title: "FREIGHT TRANSPORTATION",
    copy: "Versatile freight transportation handling all sizes and classes. We match your specific cargo with the ideal equipment to maximize efficiency.",
    img: "/services/photos/freight-transportation.webp",
    longDescription:
      "Not every load is a 53' van. We have the right iron for the job — flatbeds, step decks, lowboys, tankers, curtain vans, and more. One relationship, every equipment type you’ll ever need.",
    benefits: [
      "Huge variety of specialized equipment in-house",
      "Project & heavy haul capabilities",
      "Over-dimensional and permitted loads handled daily",
      "Seamless mode switching (van → flat → reefer) on multi-stop moves",
      "Engineering support for complex loads",
    ],
    metrics: [
      { value: 14, decimals: 0, suffix: "", label: "equipment types in fleet" },
      { value: 410, decimals: 0, suffix: "", label: "OD/permits last quarter" },
      { value: 96, decimals: 0, suffix: "%", label: "specialized load repeat rate" },
    ],
    process: [
      { n: "01", title: "Engineering Review", copy: "We spec the right trailer and securement." },
      { n: "02", title: "Permits & Routing", copy: "We handle the paperwork and legal routing." },
      { n: "03", title: "Specialist Execution", copy: "Trained drivers + pilot car coordination when needed." },
      { n: "04", title: "Delivery + Debrief", copy: "Photos, measurements, and post-move report." },
    ],
    differentiators: [
      "True multi-mode carrier — not just vans",
      "In-house permitting team",
      "One invoice for complex multi-leg moves",
    ],
  },
  {
    icon: "signal",
    tag: "LOGISTICS MANAGEMENT · SUPPLY CHAIN",
    title: "FREIGHT FORWARDING",
    copy: "Strategic freight forwarding logistics. We manage the network of carriers and complex routing to optimize your supply chain from origin to final destination.",
    img: "/services/photos/freight-forwarding.webp",
    longDescription:
      "When your network is bigger than our footprint, we still run the show. We act as your single point of contact, optimizing carrier mix, negotiating rates, and managing exceptions across domestic and cross-border moves. Full visibility. One relationship.",
    benefits: [
      "Domestic + Canada/Mexico forwarding under one roof",
      "Rate shopping across our network + vetted partners",
      "End-to-end visibility platform with exception alerts",
      "Customs brokerage coordination available",
      "Weekly analytics + continuous cost improvement",
    ],
    metrics: [
      { value: 8700, decimals: 0, suffix: "", label: "forwarded loads last year" },
      { value: 14, decimals: 0, suffix: "%", label: "avg cost reduction YOY" },
      { value: 98.3, decimals: 1, suffix: "%", label: "visibility score" },
    ],
    process: [
      { n: "01", title: "Network Design", copy: "We model your flows and recommend optimal routing." },
      { n: "02", title: "Execution Layer", copy: "We tender, track, and manage every handoff." },
      { n: "03", title: "Exception Ownership", copy: "We own problems until they’re solved." },
      { n: "04", title: "Insights & Savings", copy: "Monthly reviews + actionable recommendations." },
    ],
    differentiators: [
      "We still move the majority on our own assets first",
      "True single point of accountability",
      "Transparent margins — you see what we pay carriers",
    ],
  },
];

export const SERVICES: Service[] = baseServices.map((s) => ({
  ...s,
  slug: slugify(s.title),
}));

export const getServiceBySlug = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);

export const getAllServiceSlugs = () => SERVICES.map((s) => s.slug);
