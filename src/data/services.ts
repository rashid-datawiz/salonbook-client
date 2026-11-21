export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number; // minutes
  shortDescription: string;
  description: string;
  image: string;
  isActive: boolean;
  rating: number;
  reviewsCount: number;
  features: string[];
  isPopular?: boolean;
}

export const CATEGORIES = [
  "All",
  "Haircut & Styling",
  "Beard & Hot Shave",
  "Hair Coloring",
  "Facial & Skincare",
  "Hair & Scalp Care",
  "Spa & Massage",
  "Manicure & Pedicure",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const ALL_SERVICES: Service[] = [
  {
    id: "1",
    name: "Classic Master Haircut & Hot Rinse",
    category: "Haircut & Styling",
    price: 35,
    duration: 45,
    shortDescription: "Precision shear cutting tailored to your face shape, followed by warm hair rinse and styling finish.",
    description: "An editorial barbering ritual combining consultation, bespoke scissor work, clipper fading, invigorating warm hair wash with scalp massage, and natural matte clay styling.",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=600&fit=crop&q=80",
    isActive: true,
    rating: 4.9,
    reviewsCount: 142,
    features: ["Bespoke facial shape consultation", "Precision scissors & taper fading", "Invigorating tea tree scalp wash", "Luxury styling finish"],
    isPopular: true,
  },
  {
    id: "2",
    name: "Kids & Youth Precision Haircut",
    category: "Haircut & Styling",
    price: 25,
    duration: 30,
    shortDescription: "Gentle, patient scissor styling and modern tapers designed specifically for younger clients.",
    description: "A friendly and patient grooming experience tailored to young gentlemen and ladies. Includes custom scissor work, neck clean-up, and gentle organic finishing tonic.",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&h=600&fit=crop&q=80",
    isActive: true,
    rating: 4.8,
    reviewsCount: 68,
    features: ["Child-friendly consultation", "Low-noise clipper equipment", "Organic fragrance-free spray", "Complimentary treat"],
  },
  {
    id: "3",
    name: "Beard Sculpt & Straight Razor Edge",
    category: "Beard & Hot Shave",
    price: 25,
    duration: 30,
    shortDescription: "Clipper contouring, razor-sharp edge detailing, warm towel compress, and organic cedarwood oils.",
    description: "Sculpt and define your facial hair with meticulous razor lines, symmetry blending, steamed eucalyptus towels to soften hair, and a deep-penetrating argan oil treatment.",
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&h=600&fit=crop&q=80",
    isActive: true,
    rating: 4.9,
    reviewsCount: 116,
    features: ["Symmetry analysis & outline", "Steamed eucalyptus hot compress", "Traditional straight-edge razor line", "Cedarwood conditioning serum"],
    isPopular: true,
  },
  {
    id: "4",
    name: "Hot Towel Straight Razor Shave",
    category: "Beard & Hot Shave",
    price: 30,
    duration: 40,
    shortDescription: "Traditional straight razor hot lather shave with steamed eucalyptus towels and cooling balm.",
    description: "Experience the timeless art of the traditional wet shave. Three hot towel wraps, rich badger brush botanical lather, two passes with a fresh Japanese feather blade, and cold stone tonic closure.",
    image: "https://images.unsplash.com/photo-1512690459411-b9245aed614b?w=800&h=600&fit=crop&q=80",
    isActive: true,
    rating: 5.0,
    reviewsCount: 94,
    features: ["Pre-shave essential oil prep", "Rich warm lather application", "Two-pass feather razor shave", "Cold towel alum & cooling balm"],
  },
  {
    id: "5",
    name: "Hydra Glow Ultrasonic Facial Ritual",
    category: "Facial & Skincare",
    price: 65,
    duration: 60,
    shortDescription: "Deep pore ultrasonic extraction, botanical clay mask, LED light therapy, and hyaluronic seal.",
    description: "Rejuvenate stressed skin with a 6-step clinical aesthetic ritual. Includes deep ultrasonic pore cleansing, dead cell peel, targeted LED skin stimulation, and high-potency marine collagen hydration.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop&q=80",
    isActive: true,
    rating: 4.9,
    reviewsCount: 185,
    features: ["Ultrasonic deep pore extraction", "Botanical detoxifying clay mask", "LED collagen light stimulation", "Hyaluronic barrier hydration"],
    isPopular: true,
  },
  {
    id: "6",
    name: "Dimensional Balayage & Glossing",
    category: "Hair Coloring",
    price: 130,
    duration: 120,
    shortDescription: "Freehand dimensional color painting with non-ammonia glossing for soft, sun-kissed movement.",
    description: "Expert colorist artistry tailored to your skin tone and hair texture. Hand-painted highlights creating seamless depth, followed by an acidic gloss formulation that adds diamond-like shine.",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop&q=80",
    isActive: true,
    rating: 4.9,
    reviewsCount: 88,
    features: ["Custom color consultation", "Ammonia-free French balayage", "Acidic gloss tonal seal", "Bond-builder reconstructive wash"],
    isPopular: true,
  },
  {
    id: "7",
    name: "Hot Stone Aromatherapy Spa Massage",
    category: "Spa & Massage",
    price: 85,
    duration: 75,
    shortDescription: "Deep tension relief using heated volcanic basalt river stones and organic botanical oils.",
    description: "Surrender tension with our therapeutic hot stone massage. Smooth heated basalt stones glide across acupressure points, melting tight shoulder, back, and neck knots while lavender vapor calms the senses.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop&q=80",
    isActive: true,
    rating: 5.0,
    reviewsCount: 130,
    features: ["Heated volcanic basalt stones", "Custom essential oil infusion", "Targeted neck, shoulder & back therapy", "Herbal decompression tea service"],
    isPopular: true,
  },
  {
    id: "8",
    name: "Keratin Follicle Detox & Scalp Mask",
    category: "Hair & Scalp Care",
    price: 50,
    duration: 45,
    shortDescription: "Keratin infusion treatment and tea tree detox restoring scalp balance, hydration, and hair strength.",
    description: "A clinical sanctuary for thinning or stressed hair. Clears product buildup with micro-exfoliating salicylic acid, followed by an oxygenated steam cap and pure keratin polypeptide infusion.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop&q=80",
    isActive: true,
    rating: 4.8,
    reviewsCount: 74,
    features: ["Micro-dermabrasion scalp cleanse", "Oxygenated warm steam dome", "Pure keratin protein infusion", "Follicle stimulation brushwork"],
  },
  {
    id: "9",
    name: "Luxury Gel Manicure & Hand Ritual",
    category: "Manicure & Pedicure",
    price: 45,
    duration: 50,
    shortDescription: "Cuticle perfection, diamond nail shaping, exfoliating hand scrub, and chip-resistant LED gel polish.",
    description: "Elevate your hands with Japanese gel techniques. Includes warm chamomile soak, gentle cuticle care, organic brown sugar exfoliation, warm paraffin dip, and high-shine LED cured lacquer.",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop&q=80",
    isActive: true,
    rating: 4.9,
    reviewsCount: 102,
    features: ["Japanese precision cuticle care", "Brown sugar & jojoba scrub", "Warm paraffin hydration treatment", "Chip-free LED gel application"],
  },
  {
    id: "10",
    name: "Deep Restorative Pedicure & Foot Scrub",
    category: "Manicure & Pedicure",
    price: 55,
    duration: 60,
    shortDescription: "Epsom salt foot soak, callus buffing, dead sea salt scrub, and therapeutic foot massage.",
    description: "Relieve tired feet with a comprehensive pedicure ritual. Heated whirlpool soak with rosemary salts, pumice exfoliation, warm towel wrap, and restorative reflexology massage.",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&h=600&fit=crop&q=80",
    isActive: true,
    rating: 4.8,
    reviewsCount: 65,
    features: ["Whirlpool rosemary salt soak", "Callus smoothing & nail shaping", "Dead sea salt scrub", "15-min reflexology foot massage"],
  },
  {
    id: "11",
    name: "Bridal & Gala Signature Hair Updo",
    category: "Haircut & Styling",
    price: 95,
    duration: 75,
    shortDescription: "Intricate red-carpet styling, romantic chignons, and textured waves locked with anti-humidity shield.",
    description: "Designed for special occasions and weddings. Master stylists sculpt modern romantic updos, Hollywood waves, or avant-garde braided crowns with long-lasting structural hold.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=600&fit=crop&q=80",
    isActive: true,
    rating: 5.0,
    reviewsCount: 78,
    features: ["Style moodboard consultation", "Volume & texture foundation prep", "Architectural pin architecture", "All-day micro-fine mist fix"],
  },
  {
    id: "12",
    name: "Grey Blending & Natural Camouflage",
    category: "Hair Coloring",
    price: 55,
    duration: 40,
    shortDescription: "Subtle, semi-permanent demi-color blending grey hair naturally without harsh line regrowth.",
    description: "A fast, discreet 15-minute processing color treatment that softens silver strands into your natural base tone, leaving zero artificial brassiness or harsh grow-out borders.",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&h=600&fit=crop&q=80",
    isActive: true,
    rating: 4.8,
    reviewsCount: 52,
    features: ["Fast 15-minute demi-glaze", "Translucent natural blending", "No demarcation line on grow-out", "Nourishing avocado oil base"],
  },
  {
    id: "13",
    name: "Intense Botanical Hair Glossing Treatment",
    category: "Hair & Scalp Care",
    price: 40,
    duration: 30,
    shortDescription: "Clear conditioning gloss that seals split ends and imparts luminous glass-like shine.",
    description: "Revive dull color and smooth frizz with an instant acid-balanced shine glaze infused with organic camellia oil and silk peptides.",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&h=600&fit=crop&q=80",
    isActive: false, // Inactive service: should NOT be displayed on public Browse Services page!
    rating: 4.6,
    reviewsCount: 31,
    features: ["Acidic balance pH 4.5", "Frizz smoothing seal", "Zero pigment clear formula"],
  },
];

/**
 * Returns only active services for the public catalog
 */
export function getActiveServices(): Service[] {
  return ALL_SERVICES.filter((s) => s.isActive);
}

/**
 * Returns a service by ID (supports matching "1", "srv-1", etc.)
 */
export function getServiceById(id: string): Service | undefined {
  const normalizedId = id.replace(/^srv-/, "");
  return ALL_SERVICES.find(
    (s) => s.id === id || s.id === normalizedId || `srv-${s.id}` === id
  );
}
