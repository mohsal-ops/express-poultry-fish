// Single source of truth for Express Poultry & Fish
import { atLeast, type PackageTier } from "./packages";
import type { ThemeSlug } from "./themes/registry";

const PACKAGE_TIER: PackageTier = "PRO";

const FEATURES = {
  catering: true,
  giftCard: false,
  rewards: true,
  blog: false,
};

type FeatureKey = keyof typeof FEATURES;
type NavLink = { label: string; href: string; feature?: FeatureKey; minTier?: PackageTier };

const ALL_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/Menu" },
  { label: "Catering", href: "/catering", feature: "catering", minTier: "STANDARD" },
  { label: "Gift Card", href: "/GiftCard", feature: "giftCard", minTier: "STANDARD" },
  { label: "Rewards", href: "/rewards", feature: "rewards", minTier: "PRO" },
  { label: "Our Story", href: "/story" },
];

const ALL_FOOTER_LINKS: NavLink[] = [
  { label: "Menu", href: "/Menu" },
  { label: "Catering", href: "/catering", feature: "catering", minTier: "STANDARD" },
  { label: "Terms", href: "/terms" },
];

const enabled = (l: NavLink) =>
  (!l.feature || FEATURES[l.feature]) && (!l.minTier || atLeast(PACKAGE_TIER, l.minTier));
const pickLink = ({ label, href }: NavLink) => ({ label, href });

export const SITE_CONFIG = {
  // Brand
  name: "Express Poultry & Fish",
  tagline: "Halal Fresh Poultry, Seafood & Carryout | Dearborn & Dearborn Heights",
  subTagline: "Family owned & serving 100% Halal Amish chicken, Chester Fried Chicken, and fresh fish.",
  legalName: "Express Poultry & Fish LLC",
  trademark: "Express Poultry & Fish",

  theme: "pop-bento" as ThemeSlug,
  loaderStyle: "logo",
  defaultTheme: "light" as "light" | "dark",
  menuCtaLabel: "Order online",

  trackWebsiteVisits: true,

  loyalty: {
    incentive: "weekly specials, fresh catch updates, and family deal discounts",
  },

  catering: {
    pdfUrl: "",
    animation: "grill",
    menu: [
      {
        title: "Chester Fried Chicken Platters",
        note: "Fresh 100% Halal Amish Chicken prepared daily",
        items: [
          { name: "Fried Chicken Tray", qty: "24 pieces", price: 34.99 },
          { name: "Fried Chicken Tray", qty: "48 pieces", price: 64.99 },
          { name: "Chicken Wings Tray", qty: "50 pieces", price: 59.99 },
          { name: "Chicken Tenders Tray", qty: "30 pieces", price: 49.99 },
        ],
      },
      {
        title: "Seafood & Grill Specialties",
        items: [
          { name: "Prepared Salmon Bowl Tray", price: 55.00 },
          { name: "Fish Shawarma Tray", price: 60.00 },
          { name: "Rotisserie Whole Chickens (4)", price: 45.00 },
        ],
      },
      {
        title: "Sides & Extras",
        items: [
          { name: "Pan Fattoush Salad", price: 30.00 },
          { name: "Pan Baba Ghanouj / Hummus", price: 28.00 },
          { name: "Large Box of Fries", price: 20.00 },
        ],
      },
    ] as { title: string; note?: string; items: { name: string; qty?: string; price: number }[] }[],
  },

  // Location details (Primary location: Dearborn Heights, MI)
  address: "26344 Ford Rd, Dearborn Heights, MI 48127",
  street: "26344 Ford Rd",
  city: "Dearborn Heights",
  state: "MI",
  zip: "48127",
  phone: "(313) 436-4397",
  email: "orders@expresspoultryandfish.com",
  cateringEmail: "catering@expresspoultryandfish.com",
  timezone: "America/Detroit",
  lat: 42.3248,
  lng: -83.2965,
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=26344%20Ford%20Rd%2C%20Dearborn%20Heights%2C%20MI%2048127",

  // Social
  instagram: "expresspoultryandfish",
  instagramUrl: "https://www.instagram.com/expresspoultryandfish/",
  facebookUrl: "https://www.facebook.com/expresspoultryandfish",
  tiktokUrl: "",
  beholdFeedId: "",

  // SEO
  siteUrl: "https://express-poultry-fish.vercel.app",
  seoTitle: "Express Poultry & Fish | 100% Halal Chicken & Seafood in Dearborn & Dearborn Heights",
  seoDescription:
    "Express Poultry & Fish in Dearborn Heights and Dearborn, MI. Family-owned market serving 100% Halal Amish chicken, Chester fried chicken, fish shawarma, and fresh seafood.",
  seoKeywords: [
    "Express Poultry and Fish",
    "Halal Chicken Dearborn",
    "Fresh Fish Dearborn Heights",
    "Chester Fried Chicken Dearborn",
    "Halal Amish Chicken Michigan",
    "Fish Shawarma Dearborn",
  ],
  ogImage: "/logo.png",

  cuisines: ["Seafood", "Halal", "Middle Eastern", "American"],
  priceRange: "$$",
  primaryDish: "Halal Poultry & Seafood",

  primaryColor: "#0284c7", // Deep Ocean Blue (from logo)
  secondaryColor: "#ea580c", // Crisp Orange Accent (from logo)
  accentColor: "#0369a1",

  outreach: {
    enabled: true,
    discountReason: "review",
    trialLengthDays: 14,
    calendlyUrl: "https://calendly.com/popdeveloper54/10-minute-meet",
    signalKey: "express-poultry",
    savings: { estimatedOrdersPerDay: 25, avgOrderValue: 22, commissionPct: 20 },
  },

  // Hours: Mon-Sat 10 AM - 7:30 PM, Sun 10 AM - 7 PM
  hours: [
    { day: "Sunday", open: 10, close: 19 },
    { day: "Monday", open: 10, close: 19.5 },
    { day: "Tuesday", open: 10, close: 19.5 },
    { day: "Wednesday", open: 10, close: 19.5 },
    { day: "Thursday", open: 10, close: 19.5 },
    { day: "Friday", open: 10, close: 19.5 },
    { day: "Saturday", open: 10, close: 19.5 },
  ] as { day: string; open: number | null; close: number | null }[],

  home: {
    heroHeadline: "Dearborn's Premier Halal Poultry & Seafood",
    heroSubHeadline: "100% Halal Amish chicken, Chester fried chicken, and fresh daily catches",
    heroSlides: [
      {
        image: "/general/generalPages/mainImage.jpg",
        headline: "Dearborn's Premier Halal Poultry & Seafood",
        subheadline: "100% Halal Amish chicken & fresh catches daily.",
        ctaLabel: "Order online",
        ctaHref: "/Menu",
      },
      {
        image: "/general/generalPages/enjoy.jpg",
        headline: "Party Trays & Catering",
        subheadline: "Feeding a group? Pre-order fried chicken & seafood trays.",
        ctaLabel: "See Catering",
        ctaHref: "/catering",
      },
    ] as { image: string; headline: string; subheadline: string; ctaLabel: string; ctaHref: string }[],
    galleryTitle: "Express Poultry & Fish",
    gallerySubtitle: "Dearborn (W Warren Ave) & Dearborn Heights (Ford Rd)",
    distinctiveFeatures: [
      {
        title: "100% Halal Amish Chicken & Fresh Poultry",
        description:
          "High-quality Halal Amish chicken cut fresh daily, including our famous Chester Fried Chicken and rotisserie options.",
        image: "/general/generalPages/enjoy.jpg",
      },
      {
        title: "Fresh Seafood & House Specialties",
        description:
          "From whole fresh fish cleaned to order to signature prepared salmon bowls and fish shawarma.",
        image: "/general/generalPages/vibe.jpg",
      },
    ],
    featuring: [
      { name: "Takeaway", icon: "PiPackageFill" },
      { name: "100% Halal", icon: "MdOutlineVerified" },
      { name: "Catering Trays", icon: "BsBagCheckFill" },
      { name: "2 Locations", icon: "IoLocationOutline" },
    ],
    faq: [
      {
        question: "Where are Express Poultry & Fish located?",
        answer:
          "We have two locations: 26344 Ford Rd in Dearborn Heights and 15038 W Warren Ave in Dearborn, MI.",
      },
      {
        question: "Is all your meat 100% Halal?",
        answer: "Yes! All of our poultry and meat products are strictly 100% Halal.",
      },
    ],
  },

  features: FEATURES,
  packageTier: PACKAGE_TIER,
  navLinks: ALL_NAV_LINKS.filter(enabled).map(pickLink),

  footer: {
    get copyright() {
      return `© ${new Date().getFullYear()} Express Poultry & Fish. All rights reserved.`;
    },
    links: ALL_FOOTER_LINKS.filter(enabled).map(pickLink),
  },
};

export type SiteConfig = typeof SITE_CONFIG;
