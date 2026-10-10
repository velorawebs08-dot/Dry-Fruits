export interface WeightOption {
  weight: string; // e.g. "250g", "500g", "1kg", "Fixed Pack"
  price: number;
  mrp: number;
}

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  slug: string;
  category: 'Nuts' | 'Dried Fruits' | 'Seeds' | 'Mixes & Snacks' | 'Gifts';
  image: string;
  images?: string[];
  weights: WeightOption[];
  description: string;
  healthBenefits: string[];
  rating: number;
  reviewCount: number;
  bestSeller?: boolean;
  newArrival?: boolean;
  inclusions?: string[]; // for gifts
  occasion?: ('Diwali' | 'Wedding' | 'Family' | 'Corporate' | 'Birthday / Anniversary')[];
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface HeroSlide {
  id: string;
  image: string;
  badge: string;
  headline: string;
  subtext: string;
  ctaPrimaryText: string;
  ctaPrimaryAction: string; // anchor or filter
  ctaSecondaryText: string;
  ctaSecondaryAction: string;
}

export const store = {
  name: "Royal Mewa Dry Fruits",
  tagline: "Fresh • Premium • Hygienic Dry Fruits",
  phone: "+919876543210",          // used for tel: links
  whatsapp: "919876543210",        // used for wa.me (no + sign)
  address: "Shop 14, Royal Heritage Arcade, MG Road, Bengaluru, Karnataka 560001",
  timings: "Mon–Sun, 9:00 AM – 9:00 PM",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9855562725477!2d77.60742137599026!3d12.97277881485608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167f0857b6ab%3A0xe54e6378e90e75e1!2sMG%20Road%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  social: {
    instagram: "https://instagram.com/royalmewadryfruits",
    facebook: "https://facebook.com/royalmewadryfruits",
    youtube: "https://youtube.com/@royalmewadryfruits"
  },
  freeDeliveryAbove: 999,          // INR, for progress bar
  fssai: "11223344556677",
  logo: "https://i.postimg.cc/g00NVP7y/Chat-GPT-Image-Oct-4-2026-06-04-00-PM-removebg-preview.png",
};

export const heroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    image: "https://i.postimg.cc/mgFGgXzv/image.png",
    badge: "100% Farm Fresh & Grade-A Handpicked",
    headline: "Handpicked Royal Dry Fruits & Rich Exotic Nuts",
    subtext: "Slow sun-dried, vacuum nitrogen packed to preserve authentic natural crunch, royal aroma, and wholesome goodness.",
    ctaPrimaryText: "Shop Best Sellers",
    ctaPrimaryAction: "#products",
    ctaSecondaryText: "Order on WhatsApp",
    ctaSecondaryAction: "whatsapp",
  },
  {
    id: "slide-2",
    image: "https://i.postimg.cc/q7dWMkdG/image.png",
    badge: "Festive & Wedding Special",
    headline: "Luxurious Handcrafted Festive Gift Hampers",
    subtext: "Curated with royal gold motifs, organic velvet ribbons, and signature dry fruits for Diwali, Weddings & Corporate celebrations.",
    ctaPrimaryText: "Explore Gift Hampers",
    ctaPrimaryAction: "#gifts",
    ctaSecondaryText: "Customise Gift Box",
    ctaSecondaryAction: "#gift-builder",
  },
  {
    id: "slide-3",
    image: "https://i.postimg.cc/bND5xGyJ/image.png",
    badge: "Power Your Wellness",
    headline: "Wholesome Daily Nutrition & Nutrient-Dense Seeds",
    subtext: "Packed with clean plant protein, Omega-3 fatty acids, and essential trace minerals for your everyday vitality.",
    ctaPrimaryText: "Shop Super Seeds",
    ctaPrimaryAction: "#products",
    ctaSecondaryText: "Order on WhatsApp",
    ctaSecondaryAction: "whatsapp",
  },
  {
    id: "slide-4",
    image: "https://i.postimg.cc/wMskmmX9/image.png",
    badge: "Special Wholesale Rates on 25+ Boxes",
    headline: "Bulk & Corporate Gifting with Custom Branding",
    subtext: "Delight clients, employees, and wedding guests with tailored dry fruit gift assortments delivered pan-India.",
    ctaPrimaryText: "Send Bulk Enquiry",
    ctaPrimaryAction: "#bulk-enquiry",
    ctaSecondaryText: "Chat on WhatsApp",
    ctaSecondaryAction: "whatsapp",
  },
];

export const categories = [
  { id: "all", name: "All Products", description: "Browse our entire artisanal selection", image: "https://i.postimg.cc/mgFGgXzv/image.png" },
  { id: "Nuts", name: "Nuts", description: "Almonds, cashews, pista, walnuts & brazil nuts", image: "https://i.postimg.cc/7PpxTsj9/image.png" },
  { id: "Dried Fruits", name: "Dried Fruits", description: "Succulent dates, Afghan anjeer, raisins & prunes", image: "https://i.postimg.cc/zXJxp8mn/image.png" },
  { id: "Seeds", name: "Seeds", description: "Chia, pumpkin, sunflower & roasted flax seeds", image: "https://i.postimg.cc/sDkvsD38/image.png" },
  { id: "Mixes & Snacks", name: "Mixes & Snacks", description: "Crunchy roasted makhana, trail mixes & snack blends", image: "https://i.postimg.cc/VkFrgP8y/image.png" },
  { id: "Gifts", name: "Gifts & Hampers", description: "Festive hampers, wedding boxes & custom gifting", image: "https://i.postimg.cc/d0kF1GnW/image.png", isGift: true },
];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Premium Almonds (Badam)",
    hindiName: "कैलिफ़ोर्निया बादाम",
    slug: "premium-almonds-badam",
    category: "Nuts",
    image: "https://i.postimg.cc/7PpxTsj9/image.png",
    weights: [
      { weight: "250g", price: 260, mrp: 325 },
      { weight: "500g", price: 510, mrp: 640 },
      { weight: "1kg", price: 990, mrp: 1250 },
    ],
    description: "Jumbo California almonds, uniformly graded and crisp with a sweet nutty crunch. Rich in Vitamin E, magnesium, and dietary fibre.",
    healthBenefits: [
      "Rich in Vitamin E for glowing skin & hair",
      "Heart-friendly monosaturated healthy fats",
      "High dietary fibre aids digestive wellness",
      "Natural energy booster for daily stamina",
    ],
    rating: 4.8,
    reviewCount: 342,
    bestSeller: true,
  },
  {
    id: "prod-2",
    name: "Whole Cashews (Kaju)",
    hindiName: "काजू W320",
    slug: "whole-cashews-kaju",
    category: "Nuts",
    image: "https://i.postimg.cc/RF2zKhp5/image.png",
    weights: [
      { weight: "250g", price: 280, mrp: 350 },
      { weight: "500g", price: 550, mrp: 690 },
      { weight: "1kg", price: 1080, mrp: 1350 },
    ],
    description: "Grade W320 creamy white cashews, harvested from coastal Konkan orchards. Silky smooth texture, naturally sweet and preservative free.",
    healthBenefits: [
      "Natural source of plant-based protein & copper",
      "Loaded with antioxidants & lutein for eye health",
      "Zero trans fats and cholesterol-safe",
      "Essential minerals: zinc, iron, and phosphorus",
    ],
    rating: 4.9,
    reviewCount: 288,
    bestSeller: true,
  },
  {
    id: "prod-3",
    name: "Pistachios (Pista)",
    hindiName: "नमकीन पिस्ता",
    slug: "pistachios-pista",
    category: "Nuts",
    image: "https://i.postimg.cc/nc4t9H4p/image.png",
    weights: [
      { weight: "250g", price: 340, mrp: 425 },
      { weight: "500g", price: 670, mrp: 840 },
      { weight: "1kg", price: 1300, mrp: 1625 },
    ],
    description: "Naturally opened Iranian-style pistachios, lightly salted with pink Himalayan salt. Distinctive emerald green kernels with an irresistible crunch.",
    healthBenefits: [
      "One of the lowest calorie nuts for guilt-free snacking",
      "High levels of Vitamin B6 and thiamine",
      "Supports healthy gut bacteria with prebiotic fibre",
      "Promotes optimal blood vessel and cardiovascular health",
    ],
    rating: 4.7,
    reviewCount: 195,
    bestSeller: true,
  },
  {
    id: "prod-4",
    name: "Walnuts (Akhrot)",
    hindiName: "कश्मीरी अखरोट गिरी",
    slug: "walnuts-akhrot",
    category: "Nuts",
    image: "https://i.postimg.cc/4d7DfZ4g/image.png",
    weights: [
      { weight: "250g", price: 250, mrp: 315 },
      { weight: "500g", price: 490, mrp: 615 },
      { weight: "1kg", price: 950, mrp: 1190 },
    ],
    description: "Cold-harvested Kashmiri walnut halves (Akhrot Giri) with light amber color and rich buttery finish. Superior concentration of Omega-3 ALA.",
    healthBenefits: [
      "Highest plant Omega-3 (ALA) for enhanced memory & brain function",
      "Supports reduced inflammation throughout the body",
      "Promotes sound sleep with natural melatonin",
      "Great for balanced metabolic wellness",
    ],
    rating: 4.8,
    reviewCount: 210,
    newArrival: true,
  },
  {
    id: "prod-5",
    name: "Brazil Nuts",
    hindiName: "ब्राजील नट्स",
    slug: "brazil-nuts",
    category: "Nuts",
    image: "https://i.postimg.cc/1X1jyqYY/image.png",
    weights: [
      { weight: "250g", price: 380, mrp: 475 },
      { weight: "500g", price: 750, mrp: 940 },
      { weight: "1kg", price: 1450, mrp: 1820 },
    ],
    description: "Giant wild-harvested Amazonian Brazil nuts. The world's richest natural dietary source of Selenium for thyroid balance and cellular defense.",
    healthBenefits: [
      "Just 2 nuts fulfill 100% daily Selenium requirement",
      "Supports thyroid function & immune strength",
      "Potent antioxidant properties against oxidative stress",
      "Heart-protective unsaturated healthy fatty acids",
    ],
    rating: 4.6,
    reviewCount: 84,
    newArrival: true,
  },
  {
    id: "prod-6",
    name: "Raisins (Kishmish)",
    hindiName: "गोल्डन किशमिश",
    slug: "raisins-kishmish",
    category: "Dried Fruits",
    image: "https://i.postimg.cc/zXJxp8mn/image.png",
    weights: [
      { weight: "250g", price: 120, mrp: 150 },
      { weight: "500g", price: 230, mrp: 290 },
      { weight: "1kg", price: 440, mrp: 550 },
    ],
    description: "Sun-ripened Indian golden Kishmish, naturally seedless, plump and juicy with zero added artificial syrups. Ideal for desserts, porridge, or daily soaked snacking.",
    healthBenefits: [
      "Natural iron source helps combat fatigue & anemia",
      "Rich in calcium and boron for bone strength",
      "Aids digestion with gentle soluble fibre",
      "Quick sustained natural carbohydrate energy",
    ],
    rating: 4.7,
    reviewCount: 165,
  },
  {
    id: "prod-7",
    name: "Dates (Khajoor)",
    hindiName: "मदीना खजूर",
    slug: "dates-khajoor",
    category: "Dried Fruits",
    image: "https://i.postimg.cc/8kbH797y/image.png",
    weights: [
      { weight: "250g", price: 130, mrp: 165 },
      { weight: "500g", price: 250, mrp: 315 },
      { weight: "1kg", price: 480, mrp: 600 },
    ],
    description: "Handpicked premium dates with caramel sweetness and tender fleshy texture. Grown in desert oases and packaged in hygienic air-tight containers.",
    healthBenefits: [
      "Pure, unrefined natural sweetener alternative to cane sugar",
      "High potassium supports healthy blood pressure levels",
      "Soothes digestion and supports gut health",
      "Packed with immune-enhancing polyphenols",
    ],
    rating: 4.9,
    reviewCount: 312,
    bestSeller: true,
  },
  {
    id: "prod-8",
    name: "Dried Figs (Anjeer)",
    hindiName: "अफ़गानी अंजीर",
    slug: "dried-figs-anjeer",
    category: "Dried Fruits",
    image: "https://i.postimg.cc/NMBXYGkL/image.png",
    weights: [
      { weight: "250g", price: 280, mrp: 350 },
      { weight: "500g", price: 550, mrp: 690 },
      { weight: "1kg", price: 1070, mrp: 1340 },
    ],
    description: "Authentic Afghan dried figs threaded on natural twine. Naturally sweet with a satisfying seed crunch, rich in dietary calcium and iron.",
    healthBenefits: [
      "Remarkable non-dairy plant calcium source for bone density",
      "Helps regulate bowel movements & digestive tract",
      "Low glycemic index supports steady blood sugar",
      "Helps purify blood and supports glowing skin",
    ],
    rating: 4.8,
    reviewCount: 178,
    newArrival: true,
  },
  {
    id: "prod-9",
    name: "Prunes (Aloo Bukhara)",
    hindiName: "आलू बुखारा",
    slug: "prunes-aloo-bukhara",
    category: "Dried Fruits",
    image: "https://i.postimg.cc/cJNgM1jR/image.png",
    weights: [
      { weight: "250g", price: 220, mrp: 275 },
      { weight: "500g", price: 430, mrp: 540 },
      { weight: "1kg", price: 840, mrp: 1050 },
    ],
    description: "Pitted French prunes with a deep, succulent tangy-sweet flavour profile. Known globally as nature's most trusted gentle digestive cleanser.",
    healthBenefits: [
      "Exceptional sorbitol & fibre content promotes regular digestion",
      "Contains boron and Vitamin K to safeguard bone structure",
      "Abundant in anthocyanins and phenolic compounds",
      "Naturally curbs hunger cravings between meals",
    ],
    rating: 4.5,
    reviewCount: 92,
  },
  {
    id: "prod-10",
    name: "Pumpkin Seeds",
    hindiName: "कद्दू के बीज",
    slug: "pumpkin-seeds",
    category: "Seeds",
    image: "https://i.postimg.cc/sDkvsD38/image.png",
    weights: [
      { weight: "250g", price: 180, mrp: 225 },
      { weight: "500g", price: 350, mrp: 440 },
      { weight: "1kg", price: 680, mrp: 850 },
    ],
    description: "Raw AAA-grade pepitas, hulled and ready to eat. Gently nutty flavor, ideal to sprinkle over morning yogurt bowls, smoothies, and salads.",
    healthBenefits: [
      "Powerhouse of organic Zinc for immunity & male wellness",
      "High magnesium content aids muscle recovery and relaxation",
      "Rich in tryptophan to encourage deeper sleep",
      "Plant phytosterols help balance cholesterol levels",
    ],
    rating: 4.8,
    reviewCount: 144,
    newArrival: true,
  },
  {
    id: "prod-11",
    name: "Sunflower Seeds",
    hindiName: "सूरजमुखी के बीज",
    slug: "sunflower-seeds",
    category: "Seeds",
    image: "https://i.postimg.cc/k4YgZ71q/image.png",
    weights: [
      { weight: "250g", price: 110, mrp: 140 },
      { weight: "500g", price: 210, mrp: 265 },
      { weight: "1kg", price: 400, mrp: 500 },
    ],
    description: "Clean dehusked sunflower kernels with mild nutty crunch. Cleaned through optical colour sorters for supreme purity.",
    healthBenefits: [
      "Rich in Vitamin E, protecting cell membranes from damage",
      "Abundant in selenium and folate for vitality",
      "Helps relieve stress and nervous tension",
      "Great keto-friendly snack with high healthy fat ratio",
    ],
    rating: 4.6,
    reviewCount: 88,
  },
  {
    id: "prod-12",
    name: "Chia Seeds",
    hindiName: "चिया सीड्स",
    slug: "chia-seeds",
    category: "Seeds",
    image: "https://i.postimg.cc/8zdPGRK3/image.png",
    weights: [
      { weight: "250g", price: 130, mrp: 165 },
      { weight: "500g", price: 250, mrp: 315 },
      { weight: "1kg", price: 480, mrp: 600 },
    ],
    description: "Raw organic black chia seeds. Absorbs up to 12 times its weight in water to create a soothing, detoxifying mucilage that keeps you hydrated.",
    healthBenefits: [
      "Supercharged with soluble fibre for healthy weight management",
      "Rich plant Omega-3 ALA content",
      "Promotes sustained hydration throughout athletic activity",
      "Supports balanced metabolic rhythm",
    ],
    rating: 4.9,
    reviewCount: 267,
    bestSeller: true,
  },
  {
    id: "prod-13",
    name: "Flax Seeds",
    hindiName: "अलसी के बीज",
    slug: "flax-seeds",
    category: "Seeds",
    image: "https://i.postimg.cc/vDFbFT5K/image.png",
    weights: [
      { weight: "250g", price: 70, mrp: 90 },
      { weight: "500g", price: 130, mrp: 165 },
      { weight: "1kg", price: 250, mrp: 315 },
    ],
    description: "Golden-brown roasted flax seeds with a pleasant nutty aroma. Known for exceptional dietary lignans and gut-loving dietary fibres.",
    healthBenefits: [
      "Highest plant source of lignans for hormonal harmony",
      "Helps lower LDL cholesterol naturally",
      "Soothes gut lining and alleviates sluggish digestion",
      "Easy to blend into daily roti dough, smoothies or dal",
    ],
    rating: 4.5,
    reviewCount: 76,
  },
  {
    id: "prod-14",
    name: "Mixed Dry Fruits",
    hindiName: "रॉयल मिक्स ड्राई फ्रूट्स",
    slug: "mixed-dry-fruits",
    category: "Mixes & Snacks",
    image: "https://i.postimg.cc/VkFrgP8y/image.png",
    weights: [
      { weight: "250g", price: 240, mrp: 300 },
      { weight: "500g", price: 470, mrp: 590 },
      { weight: "1kg", price: 920, mrp: 1150 },
    ],
    description: "The ultimate 5-in-1 medley: whole California almonds, cashew nuts, green kishmish, walnut halves, and black raisins. Perfectly balanced ratio.",
    healthBenefits: [
      "All-in-one daily dose of healthy fats, protein, and iron",
      "Perfect fuel for active kids, athletes, and seniors",
      "Helps stave off evening 4 PM cravings sustainably",
      "Free of artificial preservatives or added sodium",
    ],
    rating: 4.9,
    reviewCount: 420,
    bestSeller: true,
  },
  {
    id: "prod-15",
    name: "Trail Mix",
    hindiName: "एनर्जी ट्रेल मिक्स",
    slug: "trail-mix",
    category: "Mixes & Snacks",
    image: "https://i.postimg.cc/v864jVsW/image.png",
    weights: [
      { weight: "250g", price: 200, mrp: 250 },
      { weight: "500g", price: 390, mrp: 490 },
      { weight: "1kg", price: 760, mrp: 950 },
    ],
    description: "Artisan blend of roasted almonds, pumpkin seeds, dried cranberries, sunflower seeds, and dark chocolate nibs. Sweet, tart, and crunchy in every bite.",
    healthBenefits: [
      "Instant clean energy for workouts, hikes, and desk sessions",
      "Cranberries provide powerful urinary tract and gum defense",
      "Wholesome crunch reduces sugar cravings naturally",
      "Rich in brain-boosting polyphenols",
    ],
    rating: 4.7,
    reviewCount: 153,
  },
  {
    id: "prod-16",
    name: "Makhana (Fox Nuts)",
    hindiName: "रोस्टेड मखाना",
    slug: "makhana-fox-nuts",
    category: "Mixes & Snacks",
    image: "https://i.postimg.cc/GmztYPFy/image.png",
    weights: [
      { weight: "250g", price: 220, mrp: 275 },
      { weight: "500g", price: 430, mrp: 540 },
      { weight: "1kg", price: 840, mrp: 1050 },
    ],
    description: "Handpicked jumbo Phool Makhana from Bihar's pristine freshwater lakes. Roasted to airy perfection with a light pinch of Himalayan pink salt.",
    healthBenefits: [
      "Very low calorie and virtually zero fat snack",
      "Contains anti-aging enzyme L-isoaspartyl methyltransferase",
      "High calcium content strengthens teeth and bones",
      "Excellent low-sodium option for blood pressure care",
    ],
    rating: 4.8,
    reviewCount: 169,
    newArrival: true,
  },
  {
    id: "prod-17",
    name: "Salted & Roasted Snacks",
    hindiName: "मसाला ड्राई फ्रूट स्नैक्स",
    slug: "salted-roasted-snacks",
    category: "Mixes & Snacks",
    image: "https://i.postimg.cc/7ZPYxCpF/image.png",
    weights: [
      { weight: "250g", price: 200, mrp: 250 },
      { weight: "500g", price: 390, mrp: 490 },
      { weight: "1kg", price: 760, mrp: 950 },
    ],
    description: "Dry-roasted cashews, almonds, and peanuts tossed in fragrant toasted cumin, black salt, and mild paprika. Never fried, 100% wholesome indulgence.",
    healthBenefits: [
      "Zero palm oil; dry roasted in ceramic hot air ovens",
      "Digestive spices like jeera and hing promote gut ease",
      "Ideal companion for evening chai or party platters",
      "High protein satisfies hunger longer than fried chips",
    ],
    rating: 4.6,
    reviewCount: 118,
  },
  {
    id: "prod-18",
    name: "Diwali Hamper",
    hindiName: "दिवाली रॉयल गिफ्ट हैंपर",
    slug: "diwali-hamper",
    category: "Gifts",
    image: "https://i.postimg.cc/d0kF1GnW/image.png",
    weights: [
      { weight: "Fixed Pack (750g)", price: 1499, mrp: 1899 },
    ],
    description: "An opulent festive gift box with embossed golden mandala patterns. Features 4 airtight brass-finish jars filled with Jumbo Almonds, Roasted Cashews, Afghan Anjeer, and Iranian Pistachios.",
    inclusions: [
      "Jumbo California Almonds (200g)",
      "Creamy Whole Cashews W320 (200g)",
      "Lightly Salted Pistachios (175g)",
      "Afghan Dried Anjeer Figs (175g)",
      "Handmade Terracotta Diya with pure soy wax",
      "Festive greeting card with custom message",
    ],
    healthBenefits: [
      "A healthy, guilt-free gift of wellness over sugar-heavy sweets",
      "Airtight reusable decorative brass-tone canisters",
      "Ready to gift with silk festive ribbon and seal",
    ],
    rating: 4.9,
    reviewCount: 230,
    bestSeller: true,
    occasion: ["Diwali", "Family", "Corporate"],
  },
  {
    id: "prod-19",
    name: "Wedding Gift Box",
    hindiName: "वेडिंग शगुन गिफ्ट बॉक्स",
    slug: "wedding-gift-box",
    category: "Gifts",
    image: "https://i.postimg.cc/rscCsCG5/image.png",
    weights: [
      { weight: "Fixed Pack (1000g)", price: 1999, mrp: 2499 },
    ],
    description: "Handcrafted velvet-lined keepsake chest crafted for wedding invitations, shagun favors, and VIP return gifts. Includes 6 partitioned compartments with signature dry fruits and seeds.",
    inclusions: [
      "Royal California Almonds (200g)",
      "Konkan Grade-A Cashews (200g)",
      "Kashmiri Walnut Halves (150g)",
      "Pitted Medjool-style Dates (200g)",
      "Iranian Roasted Pistachios (150g)",
      "Berry & Seeds Superfood Trail Mix (100g)",
      "Personalized wedding parchment with wax seal",
    ],
    healthBenefits: [
      "Royal presentation makes a memorable statement",
      "Traditional shagun staple honoring age-old wedding customs",
      "Eco-friendly wooden chest that recipients cherish forever",
    ],
    rating: 5.0,
    reviewCount: 147,
    occasion: ["Wedding", "Family", "Corporate", "Birthday / Anniversary"],
  },
  {
    id: "prod-20",
    name: "Family Pack (1 kg Combo)",
    hindiName: "फैमिली मेगा पैक (1 किग्रा)",
    slug: "family-pack-1kg-combo",
    category: "Gifts",
    image: "https://i.postimg.cc/g2fhrHm8/image.png",
    weights: [
      { weight: "Fixed Pack (1000g)", price: 1199, mrp: 1499 },
    ],
    description: "The quintessential wholesome family combo box. 4 separate 250g vacuum pouches keeping each dry fruit fresh until opened. Maximum value for everyday household wellness.",
    inclusions: [
      "California Almonds (250g)",
      "Whole Cashew Nuts (250g)",
      "Golden Raisins Kishmish (250g)",
      "Selected Arabian Dates (250g)",
      "Sturdy reusable carry box with comfort handle",
    ],
    healthBenefits: [
      "Saves over ₹300 compared to individual retail packs",
      "4 separate vacuum sealed pouches preserve freshness",
      "Complete family nutrition for parents, kids, and grandparents",
    ],
    rating: 4.8,
    reviewCount: 395,
    occasion: ["Family", "Corporate", "Birthday / Anniversary"],
  },
];

export const giftsConfig = {
  occasions: ["All", "Diwali", "Wedding", "Family", "Corporate", "Birthday / Anniversary"] as const,
  boxSizes: [
    {
      id: "small",
      name: "Classic Box",
      capacity: 3,
      capacityLabel: "Select 3 Dry Fruits",
      basePrice: 150,
      description: "Elegant 3-jar compact box, perfect for tokens of gratitude and return gifts.",
    },
    {
      id: "medium",
      name: "Royal Chest",
      capacity: 4,
      capacityLabel: "Select 4 Dry Fruits",
      basePrice: 250,
      description: "Our signature 4-compartment golden motif box, ideal for festive celebrations.",
    },
    {
      id: "large",
      name: "Emperor Hamper",
      capacity: 6,
      capacityLabel: "Select 6 Dry Fruits",
      basePrice: 380,
      description: "Grand velvet keepsake chest for weddings, milestone anniversaries & VIP clients.",
    },
  ],
  wraps: [
    {
      id: "standard",
      name: "Festive Satin Ribbon & Card",
      price: 0,
      description: "Crisp kraft box with golden satin bow and handwritten note.",
    },
    {
      id: "royal",
      name: "Velvet Ribbon + Gold Wax Seal + Diya",
      price: 99,
      description: "Royal maroon velvet band with metallic gold wax stamp and hand-poured diya.",
    },
  ],
  bulkDiscountNote: "Special wholesale rates on 25+ boxes. Custom corporate branding & pan-India courier available.",
};

export const reviews: Review[] = [
  {
    id: "rev-1",
    name: "Sunita Deshmukh",
    location: "Bengaluru, Karnataka",
    rating: 5,
    date: "2 days ago",
    comment: "Ordered 50 Diwali gift hampers for our tech team. The boxes were breathtaking and the cashew quality was the best we've tasted. Instant order on WhatsApp, very polite team!",
    verified: true,
  },
  {
    id: "rev-2",
    name: "Rajesh Khandelwal",
    location: "Mumbai, Maharashtra",
    rating: 5,
    date: "1 week ago",
    comment: "The California almonds are huge and crisp! No damp smell, vacuum packing was intact. WhatsApp ordering is so convenient—no OTP or card hassle, paid via GPay on confirmation.",
    verified: true,
  },
  {
    id: "rev-3",
    name: "Dr. Ananya Rao",
    location: "Hyderabad, Telangana",
    rating: 5,
    date: "2 weeks ago",
    comment: "I recommend their pumpkin and chia seeds to all my fitness clients. Extremely fresh and clean. The 1kg family combo is our monthly household essential now.",
    verified: true,
  },
  {
    id: "rev-4",
    name: "Vikramaditya Verma",
    location: "Delhi NCR",
    rating: 5,
    date: "3 weeks ago",
    comment: "Got the Wedding Gift Boxes customized with our bride & groom monogram message. Arrived in 48 hours without a single dent. Outstanding royal finish!",
    verified: true,
  },
  {
    id: "rev-5",
    name: "Meera Patel",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    date: "3 days ago",
    comment: "The Afghan Anjeer and W320 cashews are unmatched in sweetness and natural size. You can immediately smell the farm-fresh purity the moment you open the vacuum seal.",
    verified: true,
  },
  {
    id: "rev-6",
    name: "Sanjay Menon",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    date: "5 days ago",
    comment: "Royal Mewa's festive velvet boxes made our wedding anniversary gifting truly grand. Guests kept calling asking where we got such royal dry fruits!",
    verified: true,
  },
];

export const trustPillars = [
  {
    id: "trust-1",
    title: "100% Farm Fresh",
    description: "Slow roasted and sun-cured from origin farms with zero artificial polish or sulfur bleaching.",
    icon: "ShieldCheck",
  },
  {
    id: "trust-2",
    title: "Hygienically Packed",
    description: "Packed in ISO certified cleanrooms with food-grade nitrogen flush to lock in crispness.",
    icon: "Sparkles",
  },
  {
    id: "trust-3",
    title: "FSSAI Certified",
    description: "Govt. of India Food Safety certified (#11223344556677). Rigorous multi-stage quality tests.",
    icon: "Award",
  },
  {
    id: "trust-4",
    title: "Express Delivery",
    description: "Fast doorstep delivery across India. Carefully packed in protective thermal cushioning.",
    icon: "Truck",
  },
  {
    id: "trust-5",
    title: "Bulk & Corporate",
    description: "Customized boxes with your logo, gift cards, and special wholesale tier pricing.",
    icon: "Gift",
  },
];
