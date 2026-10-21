export interface ProductItem {
  id: string;
  name: string;
  bengaliName: string;
  subtitle: string;
  bengaliSubtitle: string;
  category: 'forage' | 'dairy' | 'consulting';
  price: number;
  unit: string;
  bengaliUnit: string;
  image: string;
  minQty: number;
  maxQty: number;
  stepQty: number;
  description: string;
  bengaliDescription: string;
  highlights: string[];
  bengaliHighlights: string[];
}

export const PRODUCTS: ProductItem[] = [
  {
    id: 'silage',
    name: 'Shahi Grass Silage',
    bengaliName: 'শাহী ঘাস সাইলেজ',
    subtitle: '50 KG Sealed Airtight Bag',
    bengaliSubtitle: '৫০ কেজি বায়ুরোধী প্যাকেট',
    category: 'forage',
    price: 350,
    unit: 'packet',
    bengaliUnit: 'ব্যাগ',
    image: '/assets/shahi_silage_pack_1792563051083.jpg',
    minQty: 20,
    maxQty: 400,
    stepQty: 10,
    description: 'Freshly harvested, uniformly chopped green forage sealed in heavy-duty airtight bags. Lactic fermentation preserves crucial crude protein, digestible fiber, and moisture for steady herd intake.',
    bengaliDescription: 'উচ্চ পুষ্টিমানের কাঁচা ঘাস বৈজ্ঞানিক পদ্ধতিতে সংরক্ষণকৃত। সঠিক আর্দ্রতা ও বায়ুরোধী প্যাকেটে ফার্মেন্টেশন হওয়ায় এটি সারা বছর গরুকে তাজা ঘাসের মতো পুষ্টি দেয়।',
    highlights: ['50 KG Airtight Bag', 'Natural Lactic Fermentation', 'Minimum 20 Bags (1,000 KG)', 'Zero Added Chemicals'],
    bengaliHighlights: ['৫০ কেজি বায়ুরোধী শক্ত বস্তা', 'প্রাকৃতিক ল্যাকটিক গাঁজন', 'সর্বনিম্ন অর্ডার ২০ বস্তা (১,০০০ কেজি)', 'কোনো ক্ষতিকর রাসায়নিক নেই']
  },
  {
    id: 'ghee200',
    name: 'Pure Shahi Ghee (200g)',
    bengaliName: 'খাঁটি শাহী ঘি (২০০ গ্রাম)',
    subtitle: 'Handy Table Glass Jar',
    bengaliSubtitle: 'টেবিল সাইজ কাচের জার',
    category: 'dairy',
    price: 750,
    unit: 'jar',
    bengaliUnit: 'জার',
    image: '/assets/shahi_ghee_jars_1792563051113.jpg',
    minQty: 1,
    maxQty: 50,
    stepQty: 1,
    description: '100% pure cow milk fat clarified through traditional simmering. Distinct appetizing aroma and authentic granular (দানাদার) texture for everyday dining, sampling, and table serving.',
    bengaliDescription: 'শতভাগ খাঁটি গাভীর দুধের মাখন থেকে ঐতিহ্যবাহী পদ্ধতিতে তৈরি দানাদার শাহী ঘি। এর মনমাতানো সুবাস ও বিশুদ্ধ স্বাদ আপনার প্রতিদিনের খাবারে আনে পরম তৃপ্তি।',
    highlights: ['200g Sealed Glass Jar', 'Natural Granular Texture', 'Traditional Kitchen Aroma', 'Pure Milk Fat'],
    bengaliHighlights: ['২০০ গ্রাম সিলযুক্ত কাচের জার', 'খাঁটি দানাদার টেক্সচার', 'ঐতিহ্যবাহী সুবাস', 'শতভাগ খাঁটি মাখন']
  },
  {
    id: 'ghee900',
    name: 'Pure Shahi Ghee (900g)',
    bengaliName: 'খাঁটি শাহী ঘি (৯০০ গ্রাম)',
    subtitle: 'Family Value Glass Jar',
    bengaliSubtitle: 'ফ্যামিলি প্যাক কাচের জার',
    category: 'dairy',
    price: 1450,
    unit: 'jar',
    bengaliUnit: 'জার',
    image: '/assets/shahi_ghee_jars_1792563051113.jpg',
    minQty: 1,
    maxQty: 50,
    stepQty: 1,
    description: 'Our larger economic jar designed for regular family cooking, polao, biryani, baking, and festive sweets. Airtight food-grade seal protects fresh aroma across months.',
    bengaliDescription: 'পারিবারিক রান্নাবান্না, পোলাও, বিরিয়ানি, মিষ্টি ও উৎসবের খাবারের জন্য আমাদের বড় সাশ্রয়ী জার। উন্নত সিল থাকায় দীর্ঘদিন সুবাস ও মান অটুট থাকে।',
    highlights: ['900g Economic Family Size', 'Airtight Safety Seal', 'Best Value per Gram', '100% Pure & Unadulterated'],
    bengaliHighlights: ['৯০০ গ্রাম বড় সাশ্রয়ী প্যাক', 'বায়ুরোধী সুরক্ষা সিল', 'সেরা মূল্যে সর্বোচ্চ বিশুদ্ধতা', '১০০% খাঁটি ও নির্ভেজাল']
  }
];

export const BENEFITS = [
  {
    id: '01',
    category: 'DIGESTION',
    title: 'Good Source of Fiber',
    bengaliTitle: 'পর্যাপ্ত আঁশ ও হজম শক্তি',
    description: 'Maintains structural roughage scratch in the rumen, stimulating active rumination, natural saliva buffering, and stabilized digestive pH in cattle.',
    bengaliDesc: 'গরুর রুমেনে প্রয়োজনীয় আঁশ সরবরাহ করে জাবর কাটার প্রক্রিয়া স্বাভাবিক রাখে এবং পাকস্থলীর অম্লতা নিয়ন্ত্রণ করে স্বাস্থ্য অটুট রাখে।',
    icon: '🌾'
  },
  {
    id: '02',
    category: 'AVAILABILITY',
    title: 'Year-Round Feed Supply',
    bengaliTitle: 'সারা বছর ঘাসের নিরবচ্ছিন্ন জোগান',
    description: 'Capture surplus forage during lush monsoon harvests and preserve it cleanly for dry seasons, flooding, or sudden local green fodder scarcity.',
    bengaliDesc: 'বর্ষাকালে অতিরিক্ত কাঁচা ঘাস সংগ্রহ করে সাইলেজ করে রাখা হয়, যা খরা, বন্যা বা বর্ষার ঘাটতির সময়ও নিশ্চিত ঘাস সরবরাহ করে।',
    icon: '☀️'
  },
  {
    id: '03',
    category: 'DAIRY RATION',
    title: 'Supports Milk Production',
    bengaliTitle: 'দুধ উৎপাদনে কার্যকর সহায়তা',
    description: 'Supplies predictable dry matter intake, allowing commercial dairy herds to balance energy and protein concentrates on an uncompromised roughage baseline.',
    bengaliDesc: 'সাইলেজে পুষ্টির অনুপাত সমান থাকায় গাভী সঠিক ড্রাই ম্যাটার পায়, যা দানাদার খাদ্যের সাথে মিশে দুধের ধারাবাহিক ফলন বজায় রাখে।',
    icon: '🥛'
  },
  {
    id: '04',
    category: 'NUTRITION',
    title: 'Preserves Natural Nutrients',
    bengaliTitle: 'প্রাকৃতিক পুষ্টি উপাদান অক্ষুণ্ণ রাখা',
    description: 'Rapid anaerobic fermentation seals in digestible carbohydrates, proteins, and carotenes that are otherwise destroyed during uncontrolled open-sun wilting.',
    bengaliDesc: 'বায়ুরোধী প্রক্রিয়ায় ঘাস পচতে না দিয়ে প্রোটিন, ক্যারোটিন ও হজমযোগ্য শর্করা ধরে রাখে, যা রোদে শুকানো খড়ে নষ্ট হয়ে যায়।',
    icon: '🌱'
  },
  {
    id: '05',
    category: 'FEED EFFICIENCY',
    title: 'Reduces Feed Wastage',
    bengaliTitle: 'খাবারের অপচয় নাটকীয়ভাবে কমায়',
    description: 'Finely chopped and naturally acidified grass is softer and aromatic. Cattle eagerly consume both leaves and stems without leaving rejected stalks in the manger.',
    bengaliDesc: 'সূক্ষ্মভাবে কাটা এবং সুস্বাদু অম্লীয় সুবাস থাকায় গরু ডাঁটা বা পাতা কোনো অংশই ফেলে দেয় না; খাদ্য পাত্র পুরোপুরি পরিষ্কার থাকে।',
    icon: '♻️'
  },
  {
    id: '06',
    category: 'FARM LABOR',
    title: 'Convenient for Farmers',
    bengaliTitle: 'খামারীদের কষ্ট ও সময় সাশ্রয়',
    description: 'Eliminates grueling daily pasture cutting during storms and rain. Simply slice open a 50 KG bag, portion out rations, and feed your herd in minutes.',
    bengaliDesc: 'বৃষ্টি, ঝড় বা তীব্র গরমে প্রতিদিন ঘাস কাটা ও কুঁচি করার ঝামেলা নেই। বস্তা খুলে সরাসরি সঠিক ওজনে গরুকে পরিবেশন করুন।',
    icon: '🚜'
  },
  {
    id: '07',
    category: 'BUDGETING',
    title: 'Reduces Feeding Costs',
    bengaliTitle: 'খাদ্য খরচ সাশ্রয়ী ও নিয়ন্ত্রিত',
    description: 'Lock in bulk roughage supplies at stable farm-gate rates, protecting your livestock operating budget from erratic open-market fodder price surges.',
    bengaliDesc: 'বাজারে কাঁচা ঘাসের মৌসুমি দাম বাড়লেও সাইলেজ ব্যবহারে খামারের দৈনিক খাদ্য বাজেট সবসময় নিয়ন্ত্রণে থাকে।',
    icon: '📈'
  },
  {
    id: '08',
    category: 'COMMERCIAL DAIRIES',
    title: 'Essential for Dairy Farms',
    bengaliTitle: 'বাণিজ্যিক ডেইরি ফার্মের নির্ভরতা',
    description: 'Large milking herds require strict ration predictability. Standardized silage deliveries allow farm managers to sustain consistent milk yields.',
    bengaliDesc: 'বড় ডেইরি ও মোটাতাজাকরণ খামারে রুটিনমাফিক খাবারের বিকল্প নেই। শাহী সাইলেজ বড় খামারের জন্য একটি নির্ভরযোগ্য সমাধান।',
    icon: '🐄'
  }
];

export const HOW_TO_ORDER_STEPS = [
  {
    step: '01',
    title: 'Select Your Quantity',
    bengaliTitle: '১. পরিমাণ নির্বাচন করুন',
    description: 'Choose between 20 to 400 packets of 50 KG grass silage, or pick your desired jars of Shahi Ghee (200g or 900g).',
    bengaliDesc: 'সাইলেজ ক্যালকুলেটর থেকে আপনার চাহিদা অনুযায়ী ২০ থেকে ৪০০ বস্তা সাইলেজ বা শাহী ঘি নির্বাচন করুন।'
  },
  {
    step: '02',
    title: 'Confirm Location & Transport',
    bengaliTitle: '২. ঠিকানা ও পরিবহন নিশ্চিত করুন',
    description: 'Provide your farm address, district, and mobile number. We arrange truck or courier transport from Shubornochar, Noakhali.',
    bengaliDesc: 'আপনার খামারের নাম, জেলা ও ঠিকানা দিন। সুবর্ণচর, নোয়াখালী খামার থেকে গাড়ি বা কুরিয়ারে পাঠানোর ব্যবস্থা করা হবে।'
  },
  {
    step: '03',
    title: 'Send Token Advance',
    bengaliTitle: '৩. টোকেন অগ্রিম প্রদান করুন',
    description: 'Send vehicle freight advance or order token via bKash, Rocket, or Upay. The remaining product balance is verified upon dispatch.',
    bengaliDesc: 'গাড়ির ভাড়া বা বুকিং টোকেন বিকাশ, রকেট বা উপায়ের মাধ্যমে পাঠিয়ে ট্রানজেকশন আইডি প্রদান করুন।'
  },
  {
    step: '04',
    title: 'WhatsApp Dispatch Updates',
    bengaliTitle: '৪. হোয়াটসঅ্যাপে ট্র্যাকিং আপডেট',
    description: 'Receive direct dispatch receipts, driver phone number, truck photo, and live tracking reference via WhatsApp.',
    bengaliDesc: 'হোয়াটসঅ্যাপে তাৎক্ষণিক বুকিং মেমো, গাড়ির ড্রাইভারের নম্বর এবং ট্র্যাকিং রসিদ পেয়ে যাবেন।'
  }
];

export const FARM_INFO = {
  name: 'SHAHI AGRO FARM',
  bengaliName: 'শাহী এগ্রো ফার্ম',
  tagline: 'Farm-focused quality. Feeding with care.',
  bengaliTagline: 'উন্নত পুষ্টি, টেকসই খামার। সেবায় সদা জাগ্রত।',
  location: 'Babul Chearman Bari, Char Bojlul Korim, Char Bata-3813, Shubornochar, Noakhali, Bangladesh',
  bengaliLocation: 'বাবুল চেয়ারম্যান বাড়ি, চর বজলুল করিম, চর বাটা-৩৮১৩, সুবর্ণচর, নোয়াখালী, বাংলাদেশ',
  district: 'Noakhali, Bangladesh',
  whatsappNumber: '01814026318',
  whatsappInternational: '8801814026318',
  phone1: '01799900886',
  phone2: '01632638470',
  facebookUrl: 'https://www.facebook.com/share/1Fpd5uyuVb/',
  instagramUrl: 'https://www.instagram.com/shahi_agro_limited?stkn=MWUzM3R4Nmkzd3IwMw==',
  videoUrl: 'https://www.facebook.com/share/v/1CFdFC5hdS/',
  paymentNumbers: {
    bkash: '01814026318 (Personal)',
    rocket: '01814026318-7 (Personal)',
    upay: '01814026318 (Personal)'
  }
};
