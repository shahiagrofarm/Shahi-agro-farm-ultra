import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Check, 
  Phone, 
  MapPin, 
  MessageSquare, 
  ExternalLink, 
  ShieldCheck, 
  Scale,
  Calendar,
  Sparkles,
  HelpCircle,
  Copy
} from 'lucide-react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ThreeHeroScene } from './components/ThreeHeroScene';
import { Card3D } from './components/Card3D';
import { CartDrawer } from './components/CartDrawer';
import { SilageCalculator } from './components/SilageCalculator';
import { OrderTracker } from './components/OrderTracker';
import { HowToOrderSection } from './components/HowToOrderSection';
import { CheckoutView } from './components/CheckoutView';
import { MobileStickyBar } from './components/MobileStickyBar';
import { CartProvider, useCart } from './context/CartContext';
import { PRODUCTS, BENEFITS, FARM_INFO } from './data/constants';

function MainWebsite() {
  const [activeTab, setActiveTab] = useState('home');
  const { addToCart, setIsCartOpen, lang } = useCart();
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Sync hash routing if user enters with #products, #ghee, etc.
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (
        hash && 
        ['home', 'products', 'ghee', 'benefits', 'how-to-order', 'order', 'story', 'track', 'contact', 'checkout'].includes(hash)
      ) {
        setActiveTab(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyPhoneNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050807] text-[#F4F8F1] flex flex-col pb-16 lg:pb-0 selection:bg-[#00A86B]/30 selection:text-[#B7F7D4]">
      {/* Global Navigation Header with Bilingual Support */}
      <Header activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Shopping Bag Drawer */}
      <CartDrawer onProceedToCheckout={() => handleTabChange('checkout')} />

      {/* Persistent Mobile Bottom Action Bar */}
      <MobileStickyBar onOpenCalculator={() => handleTabChange('order')} />

      {/* Main Content Router */}
      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 1. HOME TAB */}
        {/* ========================================================================= */}
        {activeTab === 'home' && (
          <div className="space-y-20 sm:space-y-28 pb-20">
            {/* Cinematic 3D Hero Section */}
            <section className="relative min-h-[82vh] flex items-center pt-6 pb-14 overflow-hidden border-b border-[#00A86B]/15">
              {/* Three.js 3D WebGL Canvas with Fallback */}
              <ThreeHeroScene theme="emerald" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  {/* Hero Copy */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#00A86B] uppercase">
                      <span>{lang === 'bn' ? 'সুবর্ণচর, নোয়াখালী' : 'SHUBORNOCHAR, NOAKHALI'}</span>
                      <span aria-hidden="true">·</span>
                      <span>{lang === 'bn' ? 'উন্নত গবাদিপশু পুষ্টি' : 'PREMIUM LIVESTOCK NUTRITION'}</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
                      {lang === 'bn' ? (
                        <>
                          সঠিক খাদ্য.<br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2CF5A2] to-[#00A86B]">
                            নিশ্চিত সমৃদ্ধি।
                          </span>
                        </>
                      ) : (
                        <>
                          Feed better.<br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2CF5A2] to-[#00A86B]">
                            Grow stronger.
                          </span>
                        </>
                      )}
                    </h1>

                    <p className="text-base sm:text-lg text-[#B3C7B8] max-w-xl leading-relaxed">
                      {lang === 'bn'
                        ? 'আপনার খামারের গবাদিপশুর জন্য ৫০ কেজি বায়ুরোধী শাহী ঘাস সাইলেজ এবং পরিবারের জন্য ১০০% খাঁটি দানাদার শাহী ঘি।'
                        : 'Reliable nutrition for your livestock with carefully fermented 50 KG packaged grass silage and authentic pure Shahi Ghee from SHAHI AGRO FARM.'}
                    </p>

                    <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                      <button
                        onClick={() => handleTabChange('order')}
                        className="py-3.5 px-7 rounded-full bg-gradient-to-r from-[#2CF5A2] to-[#00A86B] hover:from-[#10D88B] hover:to-[#00915C] text-[#04120B] font-extrabold text-sm tracking-wide flex items-center gap-2 shadow-xl shadow-[#00A86B]/25 transition-all hover:scale-[1.02]"
                      >
                        {lang === 'bn' ? 'সাইলেজ হিসাব ও বুকিং' : 'Order Grass Silage'} <ArrowRight size={16} />
                      </button>

                      <button
                        onClick={() => handleTabChange('ghee')}
                        className="py-3.5 px-6 rounded-full bg-[#161206] border border-[#D6B56D]/40 text-[#F7D287] hover:border-[#D6B56D] hover:bg-[#241C0A] font-extrabold text-sm tracking-wide flex items-center gap-2 transition-all"
                      >
                        {lang === 'bn' ? 'শাহী ঘি দেখুন ↓' : 'Explore Shahi Ghee ↓'}
                      </button>

                      <a
                        href={`https://wa.me/${FARM_INFO.whatsappInternational}?text=Hello%20SHAHI%20AGRO%20FARM,%20I%20want%20to%20order.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3.5 px-5 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-[#050807] font-extrabold text-sm tracking-wide flex items-center gap-2 transition-all"
                      >
                        <MessageSquare size={16} /> WhatsApp
                      </a>
                    </div>

                    {/* Trust Indicators */}
                    <div className="pt-6 border-t border-[#00A86B]/20 flex flex-wrap items-center gap-6 text-xs text-[#A3B7A7]">
                      <div>
                        <strong className="text-white block text-sm font-extrabold">
                          {lang === 'bn' ? '৫০ কেজি বায়ুরোধী বস্তা' : '50 KG Sealed Bags'}
                        </strong>
                        <span>{lang === 'bn' ? 'ল্যাকটিক এসিড ফারমেন্টেশন' : 'Anaerobic lactic fermentation'}</span>
                      </div>
                      <div className="h-8 w-px bg-white/10 hidden sm:block" />
                      <div>
                        <strong className="text-[#F7D287] block text-sm font-extrabold">
                          {lang === 'bn' ? '১০০% খাঁটি দুধের মাখন' : '100% Pure Milk Fat'}
                        </strong>
                        <span>{lang === 'bn' ? 'দানাদার স্বাদ ও প্রাকৃতিক সুবাস' : 'Traditional aroma & granular texture'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hero 3D Card Visual */}
                  <div className="lg:col-span-5 relative">
                    <Card3D className="bg-gradient-to-b from-[#0E2C1C] to-[#06140E] border border-[#00A86B]/30 shadow-2xl p-6 sm:p-7">
                      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-5 bg-[#050807] border border-white/5">
                        <img
                          src="/assets/shahi_silage_pack_1792563051083.jpg"
                          alt="Shahi Grass Silage 50 KG Packet"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#050807]/80 backdrop-blur-md border border-[#00A86B]/30 text-[10px] font-bold text-[#00A86B] uppercase tracking-wider">
                          {lang === 'bn' ? 'অফিসিয়াল বস্তা' : 'Official Pack'}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-xl font-extrabold text-white">
                            {lang === 'bn' ? 'শাহী ঘাস সাইলেজ' : 'Shahi Grass Silage'}
                          </h3>
                          <div className="text-right">
                            <span className="text-2xl font-black text-[#10D88B] font-mono tabular-nums">৳350</span>
                            <span className="text-xs text-[#A3B7A7] ml-1">/ {lang === 'bn' ? '৫০ কেজি' : '50 KG'}</span>
                          </div>
                        </div>

                        <p className="text-xs text-[#A3B7A7] leading-relaxed">
                          {lang === 'bn'
                            ? 'উচ্চমানের তাজা ঘাস বায়ুরোধী মোড়কে সংরক্ষিত। উদ্ভিদের প্রোটিন, ক্যারোটিন ও হজমযোগ্য আঁশ নিশ্চিত করে।'
                            : 'Anaerobic chopped forage sealed against oxygen. Protects leaf carotenes and crude protein for uniform daily feeding.'}
                        </p>

                        <div className="pt-2 border-t border-white/5 flex gap-2">
                          <button
                            onClick={() => addToCart('silage', 20)}
                            className="flex-1 py-2.5 px-4 rounded-xl bg-[#00A86B] text-[#050807] font-extrabold text-xs uppercase tracking-wider hover:bg-[#10D88B] transition-colors"
                          >
                            {lang === 'bn' ? 'কার্টে যোগ করুন (২০ বস্তা)' : 'Add 20 Bags (1,000 KG)'}
                          </button>
                          <button
                            onClick={() => handleTabChange('order')}
                            className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-colors"
                          >
                            {lang === 'bn' ? 'ক্যালকুলেটর ↗' : 'Custom Qty ↗'}
                          </button>
                        </div>
                      </div>
                    </Card3D>
                  </div>
                </div>
              </div>
            </section>

            {/* Marquee Ticker */}
            <div className="border-y border-[#00A86B]/15 bg-[#081810] py-4 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap text-xs font-bold tracking-widest text-[#B7F7D4] uppercase">
                <span className="mx-6">SHAHI GRASS SILAGE</span>
                <span className="text-[#00A86B]">✦</span>
                <span className="mx-6">50 KG AIRTIGHT PACKS (৳350)</span>
                <span className="text-[#00A86B]">✦</span>
                <span className="mx-6">SHUBORNOCHAR, NOAKHALI</span>
                <span className="text-[#00A86B]">✦</span>
                <span className="mx-6">PURE SHAHI GHEE (200G & 900G)</span>
                <span className="text-[#00A86B]">✦</span>
                <span className="mx-6">YEAR-ROUND ROUGHAGE RESERVE</span>
                <span className="text-[#00A86B]">✦</span>
                <span className="mx-6">REDUCES FEED WASTAGE</span>
                <span className="text-[#00A86B]">✦</span>
              </div>
            </div>

            {/* Featured Product Catalog Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                  <div className="text-xs font-bold tracking-widest text-[#00A86B] uppercase">
                    {lang === 'bn' ? 'আমাদের পণ্যসম্ভার' : 'Our Products'}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                    {lang === 'bn' ? 'খামারের খাদ্য ও ঐতিহ্যবাহী দুগ্ধপণ্য' : 'Quality Feed & Traditional Dairy'}
                  </h2>
                </div>
                <button
                  onClick={() => handleTabChange('products')}
                  className="text-sm font-bold text-[#00A86B] hover:text-[#10D88B] inline-flex items-center gap-1.5 transition-colors self-start md:self-auto"
                >
                  {lang === 'bn' ? 'সম্পূর্ণ ক্যাটালগ দেখুন' : 'View Full Catalog Specifications'} <ArrowRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {PRODUCTS.map((product) => (
                  <Card3D
                    key={product.id}
                    glowColor={product.category === 'dairy' ? 'gold' : 'emerald'}
                    className="bg-[#081810] border border-[#00A86B]/20 flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[4/3] bg-[#050807] overflow-hidden relative border-b border-white/5">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#050807]/80 backdrop-blur-md border border-white/10 uppercase tracking-wider text-[#B7F7D4]">
                          {lang === 'bn' ? product.bengaliSubtitle : product.subtitle}
                        </div>
                      </div>

                      <div className="p-6 space-y-2.5">
                        <div className="text-[10px] font-bold text-[#8EA093] uppercase tracking-wider">
                          {product.category === 'forage' 
                            ? (lang === 'bn' ? 'গবাদিপশুর খাবার' : 'LIVESTOCK FORAGE')
                            : (lang === 'bn' ? 'খাঁটি দুগ্ধপণ্য' : 'PURE DAIRY')}
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {lang === 'bn' ? product.bengaliName : product.name}
                        </h3>
                        <p className="text-xs text-[#A3B7A7] leading-relaxed line-clamp-3">
                          {lang === 'bn' ? product.bengaliDescription : product.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-white/5 mt-4 space-y-3.5">
                      <div className="flex justify-between items-baseline pt-3">
                        <span className="text-xs text-[#A3B7A7]">{lang === 'bn' ? 'মূল্য:' : 'Price:'}</span>
                        <span className={`text-2xl font-black font-mono tabular-nums ${product.category === 'dairy' ? 'text-[#F7D287]' : 'text-[#10D88B]'}`}>
                          ৳{product.price.toLocaleString()}
                          <span className="text-xs font-sans text-[#A3B7A7] ml-1 font-normal">
                            / {lang === 'bn' ? product.bengaliUnit : product.unit}
                          </span>
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => addToCart(product.id, product.minQty)}
                          className={`flex-1 py-2.5 px-4 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all ${
                            product.category === 'dairy'
                              ? 'bg-gradient-to-r from-[#F7D287] to-[#D6B56D] text-[#171103] hover:from-[#fce0a2]'
                              : 'bg-gradient-to-r from-[#2CF5A2] to-[#00A86B] text-[#04120B] hover:from-[#10D88B]'
                          }`}
                        >
                          {lang === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart'}
                        </button>
                        <button
                          onClick={() => {
                            if (product.id === 'silage') handleTabChange('order');
                            else handleTabChange('ghee');
                          }}
                          className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-colors"
                        >
                          {lang === 'bn' ? 'বিস্তারিত ↗' : 'Details ↗'}
                        </button>
                      </div>
                    </div>
                  </Card3D>
                ))}
              </div>
            </section>

            {/* Spotlight Banner on Shahi Ghee */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-gradient-to-r from-[#171105] via-[#0E2015] to-[#06140D] border border-[#D6B56D]/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-bold tracking-widest text-[#F7D287] uppercase flex items-center gap-2">
                      <Sparkles size={14} className="text-[#F7D287]" />
                      <span>{lang === 'bn' ? 'শতভাগ বিশুদ্ধ দুগ্ধপণ্য' : 'TRADITIONAL DAIRY SPOTLIGHT'}</span>
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                      {lang === 'bn' ? (
                        <>খাঁটি দানাদার <span className="text-[#F7D287]">শাহী ঘি</span></>
                      ) : (
                        <>Meet Pure <span className="text-[#F7D287]">Shahi Ghee</span></>
                      )}
                    </h2>
                    <p className="text-sm text-[#E5E0D3] leading-relaxed max-w-lg">
                      {lang === 'bn'
                        ? 'খাঁটি গাভীর দুধের মাখন থেকে ঐতিহ্যবাহী পদ্ধতিতে ধীরে ধীরে ফুটিয়ে তৈরি। কোনো কৃত্রিম রং বা সেন্ট নেই; রয়েছে কেবল খাঁটি ঘ্রাণ ও দানাদার স্বাদ।'
                        : 'Crafted from pure milk fat with classic granular (danadar) texture and natural rich aroma. Sealed in food-grade glass jars for household meals, polao, sweets, and everyday nutrition.'}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                      <div className="p-3.5 rounded-xl bg-[#081810] border border-[#D6B56D]/30 min-w-[130px]">
                        <span className="text-[11px] text-[#A3B7A7] uppercase block font-semibold">
                          {lang === 'bn' ? 'ছোট জার' : 'Table Jar'}
                        </span>
                        <strong className="text-lg font-black text-[#F7D287] font-mono">৳750</strong>
                        <span className="text-xs text-[#8EA093] block">200 Grams</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#081810] border border-[#D6B56D]/50 min-w-[130px]">
                        <span className="text-[11px] text-[#A3B7A7] uppercase block font-semibold">
                          {lang === 'bn' ? 'ফ্যামিলি প্যাক' : 'Family Pack'}
                        </span>
                        <strong className="text-lg font-black text-[#F7D287] font-mono">৳1,450</strong>
                        <span className="text-xs text-[#8EA093] block">900 Grams</span>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap gap-3">
                      <a
                        href={`https://wa.me/${FARM_INFO.whatsappInternational}?text=Hello%20SHAHI%20AGRO%20FARM,%20I%20would%20like%20to%20order%20Shahi%20Ghee.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-6 rounded-full bg-[#25D366] text-[#050807] font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#20bd5a] transition-all"
                      >
                        <MessageSquare size={16} /> {lang === 'bn' ? 'হোয়াটসঅ্যাপে অর্ডার করুন ↗' : 'Order Ghee on WhatsApp ↗'}
                      </a>
                      <button
                        onClick={() => handleTabChange('ghee')}
                        className="py-3 px-6 rounded-full bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-colors"
                      >
                        {lang === 'bn' ? 'ঘি এর বিস্তারিত দেখুন' : 'View Jar Specs & Details'}
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative">
                    <div className="aspect-square rounded-3xl overflow-hidden max-w-sm mx-auto bg-[#050807] border border-[#D6B56D]/30 shadow-2xl">
                      <img
                        src="/assets/shahi_ghee_jars_1792563051113.jpg"
                        alt="Pure Shahi Ghee in Glass Jars"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 8 Grounded Benefit Cards Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                <div className="text-xs font-bold tracking-widest text-[#00A86B] uppercase">
                  {lang === 'bn' ? 'বৈজ্ঞানিক উপকারিতা' : 'Agronomic Foundations'}
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  {lang === 'bn' ? 'ঘাস সাইলেজের ৮টি প্রধান সুবিধা' : 'Why Farmers Rely on Grass Silage'}
                </h2>
                <p className="text-xs sm:text-sm text-[#A3B7A7]">
                  {lang === 'bn'
                    ? 'কাঁচা ঘাসের তুলনায় ফারমেন্টেড সাইলেজ গবাদিপশুর হজম ও দুধের উৎপাদনে বৈপ্লবিক ভূমিকা রাখে।'
                    : 'Preserving chopped forage through anaerobic lactic fermentation creates a durable roughage safety net for cattle herds in all weather conditions.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {BENEFITS.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 rounded-2xl bg-[#081C12] border border-[#00A86B]/20 hover:border-[#00A86B]/40 transition-colors space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#00A86B]/15 border border-[#00A86B]/30 flex items-center justify-center text-xl">
                      {item.icon}
                    </div>
                    <div className="text-[10px] font-bold text-[#00A86B] tracking-wider uppercase">
                      {item.id} · {item.category}
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {lang === 'bn' ? item.bengaliTitle : item.title}
                    </h3>
                    <p className="text-xs text-[#A3B7A7] leading-relaxed">
                      {lang === 'bn' ? item.bengaliDesc : item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Safe Feeding Quality Advisory */}
              <div className="mt-8 p-6 rounded-2xl bg-[#091F14] border-l-4 border-[#00A86B] text-xs text-[#B7F7D4] space-y-1">
                <strong className="text-white block uppercase tracking-wider text-xs">
                  {lang === 'bn' ? 'খামারিদের জন্য সতর্কতা ও সঠিক ব্যবহার' : 'Quality Assurance & Safe Barn Practice'}
                </strong>
                <p className="text-[#A3B7A7] leading-relaxed">
                  {lang === 'bn'
                    ? 'সাইলেজের গুণমান নির্ভর করে বায়ুরোধী প্যাকেটের ওপর। যদি কোনো বস্তা ফুটা হয়ে বাতাস ঢুকে ছত্রাক বা দুর্গন্ধযুক্ত হয়, তা গরুকে দেওয়া যাবে না। বস্তা খোলার পর কয়েকদিনের মধ্যে খাইয়ে শেষ করুন।'
                    : 'Silage preservation depends on airtight hermetic sealing. Bags showing puncture leaks, foul off-odors, or mold should never be fed to cattle. Always reseal or feed opened packets promptly.'}
                </p>
              </div>
            </section>

            {/* Embedded Live Silage Booking Calculator */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <div className="text-xs font-bold tracking-widest text-[#00A86B] uppercase">
                  {lang === 'bn' ? 'লাইভ ক্যালকুলেটর' : 'Order Simulator'}
                </div>
                <h2 className="text-3xl font-extrabold text-white mt-1">
                  {lang === 'bn' ? 'আপনার খামারের চাহিদা অনুযায়ী হিসাব করুন' : 'Configure Your Farm Order'}
                </h2>
              </div>
              <SilageCalculator onOrderSuccess={(orderId) => handleTabChange('track')} />
            </section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. PRODUCTS TAB */}
        {/* ========================================================================= */}
        {activeTab === 'products' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div>
              <div className="text-xs font-bold tracking-widest text-[#00A86B] uppercase">
                {lang === 'bn' ? 'পণ্য তালিকা' : 'Products & Services'}
              </div>
              <h1 className="text-4xl font-extrabold text-white mt-1">
                {lang === 'bn' ? 'আমাদের পণ্য ও সেবাসমূহ' : 'Our Complete Catalog'}
              </h1>
              <p className="text-sm text-[#A3B7A7] max-w-xl mt-2">
                {lang === 'bn'
                  ? 'সুবর্ণচর, নোয়াখালীর নিজস্ব খামারে উৎপাদিত ও প্রস্তুতকৃত।'
                  : 'Every product is grown or prepared with strict agricultural integrity in Shubornochar, Noakhali.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  className="rounded-3xl bg-[#081810] border border-[#00A86B]/20 p-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#050807] border border-white/5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#00A86B] uppercase tracking-wider">
                        {lang === 'bn' ? product.subtitle : product.bengaliName}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1">
                        {lang === 'bn' ? product.bengaliName : product.name}
                      </h3>
                      <p className="text-xs text-[#A3B7A7] mt-2 leading-relaxed">
                        {lang === 'bn' ? product.bengaliDescription : product.description}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-[#CFE0D3]">
                      {(lang === 'bn' ? product.bengaliHighlights : product.highlights).map((h, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check size={14} className="text-[#00A86B]" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 mt-6 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-[#A3B7A7]">{lang === 'bn' ? 'খামার গেট মূল্য:' : 'Farm-Gate Price:'}</span>
                      <span className="text-2xl font-black text-[#10D88B] font-mono tabular-nums">
                        ৳{product.price.toLocaleString()}
                        <span className="text-xs text-[#A3B7A7] font-sans font-normal ml-1">
                          / {lang === 'bn' ? product.bengaliUnit : product.unit}
                        </span>
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(product.id, product.minQty)}
                        className="flex-1 py-3 px-4 rounded-xl bg-[#00A86B] text-[#050807] font-extrabold text-xs uppercase tracking-wider hover:bg-[#10D88B] transition-colors"
                      >
                        {lang === 'bn' ? `কার্টে যোগ করুন (${product.minQty} ${product.bengaliUnit})` : `Add to Cart (${product.minQty} ${product.unit})`}
                      </button>
                      <button
                        onClick={() => {
                          if (product.id === 'silage') handleTabChange('order');
                          else handleTabChange('ghee');
                        }}
                        className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold"
                      >
                        {lang === 'bn' ? 'অর্ডার ফর্ম ↗' : 'Order Form ↗'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Farm Services & Bulk Transport Note */}
            <div className="p-8 rounded-3xl bg-[#091F14] border border-[#00A86B]/20 text-xs sm:text-sm text-[#A3B7A7] space-y-2">
              <h3 className="text-lg font-bold text-white">
                {lang === 'bn' ? 'ট্রাকলোড ও বাণিজ্যিক ডেইরি যোগাযোগ' : 'Truckload Dispatch & Dairy Farm Inquiries'}
              </h3>
              <p className="leading-relaxed">
                {lang === 'bn'
                  ? `বাণিজ্যিক খামারিদের জন্য ১০০ থেকে ৪০০ বস্তা (৫ থেকে ২০ টন) সাইলেজ সরাসরি নোয়াখালী থেকে পৌঁছে দেওয়া হয়। বিস্তারিত জানতে আমাদের হটলাইনে কল দিন: ${FARM_INFO.phone1} অথবা ${FARM_INFO.phone2}।`
                  : `For commercial dairy farms requiring 100 to 400 packets (5 to 20 metric tons), road vehicle freight can be coordinated directly from our farm storage in Shubornochar to your district. Contact our hotlines at ${FARM_INFO.phone1} or ${FARM_INFO.phone2}.`}
              </p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. SHAHI GHEE TAB */}
        {/* ========================================================================= */}
        {activeTab === 'ghee' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="text-xs font-bold tracking-widest text-[#F7D287] uppercase">
                  {lang === 'bn' ? 'ঐতিহ্যবাহী দুগ্ধপণ্য · ১০০% খাঁটি মাখন' : 'TRADITIONAL DAIRY · 100% PURE MILK FAT'}
                </div>
                <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
                  {lang === 'bn' ? (
                    <>খাঁটি সুবাসিত <span className="text-[#F7D287]">শাহী ঘি</span></>
                  ) : (
                    <>Golden Granular <span className="text-[#F7D287]">Shahi Ghee</span></>
                  )}
                </h1>
                <p className="text-base text-[#D8D2C2] leading-relaxed">
                  {lang === 'bn'
                    ? 'তাজা দুধের খাঁটি মাখন থেকে সুনির্দিষ্ট তাপে প্রস্তুতকৃত দানাদার শাহী ঘি। রান্নায় অপূর্ব সুবাস এবং স্বাস্থ্যে অতুলনীয়।'
                    : 'Clarified using traditional low-heat simmering to separate water and milk solids from pure butterfat. Authentic aroma and classic danadar grain without artificial dyes or additives.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-[#141005] border border-[#D6B56D]/40 space-y-3">
                    <span className="text-xs font-bold text-[#F7D287] uppercase tracking-wider">
                      {lang === 'bn' ? 'ছোট টেবিল সাইজ' : 'Small Table Size'}
                    </span>
                    <h3 className="text-xl font-bold text-white">200g Jar</h3>
                    <div className="text-3xl font-black text-[#F7D287] font-mono tabular-nums">৳750</div>
                    <p className="text-xs text-[#A3B7A7]">
                      {lang === 'bn' ? 'ছোট পরিবার, রুটি বা ভাতের সাথে খাওয়ার জন্য আদর্শ।' : 'Handy jar for dining tables, morning rice, parathas, and light cooking.'}
                    </p>
                    <button
                      onClick={() => addToCart('ghee200', 1)}
                      className="w-full py-2.5 rounded-xl bg-[#D6B56D] text-[#171103] font-extrabold text-xs uppercase tracking-wider hover:bg-[#F7D287] transition-colors"
                    >
                      {lang === 'bn' ? '২০০ গ্রাম কার্টে নিন' : 'Add 200g Jar to Cart'}
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#141005] border border-[#D6B56D]/60 space-y-3">
                    <span className="text-xs font-bold text-[#F7D287] uppercase tracking-wider">
                      {lang === 'bn' ? 'ফ্যামিলি ভ্যালু প্যাক' : 'Family Value Pack'}
                    </span>
                    <h3 className="text-xl font-bold text-white">900g Jar</h3>
                    <div className="text-3xl font-black text-[#F7D287] font-mono tabular-nums">৳1,450</div>
                    <p className="text-xs text-[#A3B7A7]">
                      {lang === 'bn' ? 'বড় সাশ্রয়ী প্যাক। পোলাও, বিরিয়ানি ও পারিবারিক রান্নার জন্য।' : 'Larger jar designed for regular family cooking, polao, sweets, and roasting.'}
                    </p>
                    <button
                      onClick={() => addToCart('ghee900', 1)}
                      className="w-full py-2.5 rounded-xl bg-[#D6B56D] text-[#171103] font-extrabold text-xs uppercase tracking-wider hover:bg-[#F7D287] transition-colors"
                    >
                      {lang === 'bn' ? '৯০০ গ্রাম কার্টে নিন' : 'Add 900g Jar to Cart'}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${FARM_INFO.whatsappInternational}?text=Hello%20SHAHI%20AGRO%20FARM,%20I%20would%20like%20to%20order%20Shahi%20Ghee.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#25D366] text-[#050807] font-black text-xs uppercase tracking-wider hover:bg-[#20bd5a] transition-all"
                  >
                    <MessageSquare size={16} /> {lang === 'bn' ? 'হোয়াটসঅ্যাপে অর্ডার করুন ↗' : 'Direct WhatsApp Order ↗'}
                  </a>
                  <button
                    onClick={() => handleTabChange('checkout')}
                    className="py-3 px-6 rounded-full bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-colors"
                  >
                    {lang === 'bn' ? 'কার্ট ও চেকআউট' : 'View Cart & Checkout'}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-[#050807] border border-[#D6B56D]/40 shadow-2xl">
                  <img
                    src="/assets/shahi_ghee_jars_1792563051113.jpg"
                    alt="Shahi Ghee Glass Jars with Traditional Grain"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. BENEFITS TAB */}
        {/* ========================================================================= */}
        {activeTab === 'benefits' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
            <div className="max-w-2xl space-y-2">
              <div className="text-xs font-bold tracking-widest text-[#00A86B] uppercase">
                {lang === 'bn' ? 'কৃষি ও প্রাণিসম্পদ জ্ঞান' : 'Knowledge & Agronomy'}
              </div>
              <h1 className="text-4xl font-extrabold text-white">
                {lang === 'bn' ? 'ঘাস সাইলেজের ৮টি স্তম্ভ' : 'The 8 Pillars of Silage Nutrition'}
              </h1>
              <p className="text-sm text-[#A3B7A7]">
                {lang === 'bn'
                  ? 'কেন আধুনিক খামারিরা কাঁচা ঘাসের মৌসুমি ঘাটতি মোকাবিলায় সাইলেজকে প্রথম পছন্দ হিসেবে বেছে নেন।'
                  : 'Why fermented forage has become an essential operational standard for progressive cattle farmers.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BENEFITS.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-[#081C12] border border-[#00A86B]/20 space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00A86B]/15 border border-[#00A86B]/30 flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                  <div className="text-[11px] font-bold text-[#00A86B] tracking-wider uppercase">
                    Pillar {item.id} · {item.category}
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {lang === 'bn' ? item.bengaliTitle : item.title}
                  </h3>
                  <p className="text-xs text-[#A3B7A7] leading-relaxed pt-1">
                    {lang === 'bn' ? item.bengaliDesc : item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. HOW TO ORDER TAB */}
        {/* ========================================================================= */}
        {activeTab === 'how-to-order' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <HowToOrderSection onGoToCalculator={() => handleTabChange('order')} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* 6. ORDER CALCULATOR TAB */}
        {/* ========================================================================= */}
        {activeTab === 'order' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
            <div>
              <div className="text-xs font-bold tracking-widest text-[#00A86B] uppercase">
                {lang === 'bn' ? 'অর্ডার ক্যালকুলেটর' : 'Order Configuration'}
              </div>
              <h1 className="text-4xl font-extrabold text-white mt-1">
                {lang === 'bn' ? 'ঘাস সাইলেজ হিসাব ও বুকিং' : 'Live Grass Silage Calculator'}
              </h1>
              <p className="text-sm text-[#A3B7A7] max-w-xl mt-2">
                {lang === 'bn'
                  ? 'বস্তা অনুযায়ী মোট কেজি, টন ও টাকার পরিমাণ তাৎক্ষণিক হিসাব করুন। সর্বনিম্ন অর্ডার ২০ বস্তা (১,০০০ কেজি)।'
                  : 'Calculate total kilograms, tonnage, and price in real-time. Minimum order is 20 packets (1,000 KG).'}
              </p>
            </div>

            <SilageCalculator onOrderSuccess={() => handleTabChange('track')} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* 7. CART & CHECKOUT TAB */}
        {/* ========================================================================= */}
        {activeTab === 'checkout' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <CheckoutView
              onGoToProducts={() => handleTabChange('products')}
              onOrderCompleted={() => handleTabChange('track')}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* 8. ABOUT FARM TAB */}
        {/* ========================================================================= */}
        {activeTab === 'story' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
            <div className="max-w-2xl space-y-2">
              <div className="text-xs font-bold tracking-widest text-[#00A86B] uppercase">
                {lang === 'bn' ? 'আমাদের পরিচিতি' : 'Our Background'}
              </div>
              <h1 className="text-4xl font-extrabold text-white">
                {lang === 'bn' ? 'শাহী এগ্রো ফার্মের গল্প' : 'About SHAHI AGRO FARM'}
              </h1>
              <p className="text-sm text-[#A3B7A7]">
                {lang === 'bn'
                  ? 'নোয়াখালী জেলার সুবর্ণচরে অবস্থিত আমাদের কৃষি ও দুগ্ধ খামার।'
                  : 'Located in Shubornochar, Noakhali, Bangladesh. Combining traditional coastal fertility with modern silage packing technology.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-[#050807] border border-white/10 shadow-2xl">
                <img
                  src="/assets/hero_silage_farm_1792563050551.jpg"
                  alt="Farm harvest in Shubornochar Noakhali"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#B3C7B8] leading-relaxed">
                <h3 className="text-2xl font-bold text-white">
                  {lang === 'bn' ? 'খামারিদের নির্ভরযোগ্য সহযাত্রী' : 'Practical Feeding for Real Herds'}
                </h3>
                <p>
                  {lang === 'bn'
                    ? 'বাংলাদেশের প্রাণিসম্পদ খাতে কাঁচা ঘাসের মৌসুমি সংকট একটি বড় চ্যালেঞ্জ। বর্ষায় অতিরিক্ত পানি এবং শীতে বা খরার দিনে পর্যাপ্ত কাঁচা ঘাসের অভাব খামারের দুধ ও মাংস উৎপাদন ক্ষতিগ্রস্ত করে।'
                    : 'Dairy and livestock farming in Bangladesh face constant seasonal interruptions: sudden heavy monsoon rain, dry season shortages, and unstable fresh grass market prices.'}
                </p>
                <p>
                  {lang === 'bn'
                    ? 'শাহী এগ্রো ফার্ম সুবর্ণচরের উর্বর চরাঞ্চলে সেরা জাতের ঘাস সঠিক পরিপক্কতায় কেটে তা বায়ুরোধী ভারী ৫০ কেজির ব্যাগে সংরক্ষণ করে। ফলে কৃষক পান সারা বছর নিরবচ্ছিন্ন পুষ্টিকর খাবার।'
                    : 'SHAHI AGRO FARM was established with a singular objective: harvesting high-yield green forage at optimal maturity, finely chopping it, and expelling oxygen in airtight 50 KG bags. This allows dairy cows and beef cattle to receive consistent, appetizing roughage 365 days a year.'}
                </p>
                <div className="pt-2">
                  <a
                    href={FARM_INFO.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full bg-[#0E2C1C] border border-[#00A86B]/30 text-xs font-bold text-[#B7F7D4] hover:border-[#00A86B] hover:text-white transition-colors"
                  >
                    {lang === 'bn' ? 'ফেসবুকে খামারের ভিডিও দেখুন ↗' : 'Watch Farm Video on Facebook'} <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>

            {/* Pasture Photo Strip */}
            <div className="rounded-3xl overflow-hidden aspect-[21/9] bg-[#050807] border border-white/5 relative">
              <img
                src="/assets/farm_green_pasture_1792563051867.jpg"
                alt="Green pasture fields in Noakhali"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                <div>
                  <h4 className="text-xl font-bold text-white">
                    {lang === 'bn' ? 'সুবর্ণচরের সবুজ চরাঞ্চল' : 'Fertile Coastal Greenlands'}
                  </h4>
                  <p className="text-xs text-[#A3B7A7] mt-1">{FARM_INFO.location}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 9. TRACK ORDER TAB */}
        {/* ========================================================================= */}
        {activeTab === 'track' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
            <div>
              <div className="text-xs font-bold tracking-widest text-[#00A86B] uppercase">
                {lang === 'bn' ? 'অর্ডার ট্র্যাকিং' : 'Order Logistics'}
              </div>
              <h1 className="text-4xl font-extrabold text-white mt-1">
                {lang === 'bn' ? 'আপনার অর্ডার ট্র্যাক করুন' : 'Track Your Order'}
              </h1>
              <p className="text-sm text-[#A3B7A7] max-w-xl mt-2">
                {lang === 'bn'
                  ? 'অর্ডার নম্বর বা আপনার ফোন নম্বর দিয়ে গাড়ির বর্তমান অবস্থা যাচাই করুন।'
                  : 'Check dispatch status, estimated net weight, and logistics coordination for your farm deliveries.'}
              </p>
            </div>

            <OrderTracker />
          </div>
        )}

        {/* ========================================================================= */}
        {/* 10. CONTACT TAB */}
        {/* ========================================================================= */}
        {activeTab === 'contact' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div>
              <div className="text-xs font-bold tracking-widest text-[#00A86B] uppercase">
                {lang === 'bn' ? 'সরাসরি যোগাযোগ' : 'Direct Inquiries'}
              </div>
              <h1 className="text-4xl font-extrabold text-white mt-1">
                {lang === 'bn' ? 'শাহী এগ্রো ফার্ম যোগাযোগ' : 'Contact SHAHI AGRO FARM'}
              </h1>
              <p className="text-sm text-[#A3B7A7] max-w-xl mt-2">
                {lang === 'bn'
                  ? 'সরাসরি নোয়াখালী খামার ব্যবস্থাপকের সাথে কথা বলুন এবং পরামর্শ নিন।'
                  : 'Speak directly with our farm managers in Shubornochar to verify batch quantities or arrange freight trucks.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#081C12] border border-[#00A86B]/25 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#00A86B]/20 text-[#00A86B] flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <h3 className="text-base font-bold text-white">
                  {lang === 'bn' ? 'ফোন হটলাইন' : 'Direct Phone Hotlines'}
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center bg-[#050807] p-2 rounded-lg">
                    <a href={`tel:${FARM_INFO.phone1}`} className="font-mono text-white text-sm font-bold hover:text-[#00A86B]">
                      {FARM_INFO.phone1}
                    </a>
                    <button
                      onClick={() => copyPhoneNumber(FARM_INFO.phone1)}
                      className="text-[#8EA093] hover:text-white"
                      title="Copy"
                    >
                      <Copy size={13} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center bg-[#050807] p-2 rounded-lg">
                    <a href={`tel:${FARM_INFO.phone2}`} className="font-mono text-white text-sm font-bold hover:text-[#00A86B]">
                      {FARM_INFO.phone2}
                    </a>
                    <button
                      onClick={() => copyPhoneNumber(FARM_INFO.phone2)}
                      className="text-[#8EA093] hover:text-white"
                      title="Copy"
                    >
                      <Copy size={13} />
                    </button>
                  </div>
                </div>
                {copiedPhone && <span className="text-[10px] text-[#00A86B] block">Number copied to clipboard!</span>}
              </div>

              <div className="p-6 rounded-2xl bg-[#081C12] border border-[#00A86B]/25 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center">
                  <MessageSquare size={20} />
                </div>
                <h3 className="text-base font-bold text-white">
                  {lang === 'bn' ? 'অফিসিয়াল হোয়াটসঅ্যাপ' : 'Official WhatsApp'}
                </h3>
                <p className="text-xs text-[#A3B7A7]">
                  {lang === 'bn' ? 'দ্রুত স্টক নিশ্চিতকরণ ও ডেলিভারি মেসেজের জন্য।' : 'Instant response for stock confirmation, batch photos, and delivery advance transfers.'}
                </p>
                <a
                  href={`https://wa.me/${FARM_INFO.whatsappInternational}?text=Hello%20SHAHI%20AGRO%20FARM,%20I%20am%20calling%20to%20inquire%20about%20your%20products.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-2 px-4 rounded-full bg-[#25D366] text-[#050807] font-bold text-xs uppercase"
                >
                  Chat: {FARM_INFO.whatsappNumber} ↗
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-[#081C12] border border-[#00A86B]/25 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#00A86B]/20 text-[#00A86B] flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <h3 className="text-base font-bold text-white">
                  {lang === 'bn' ? 'খামারের সঠিক অবস্থান' : 'Physical Farm Gate'}
                </h3>
                <p className="text-xs text-[#A3B7A7] leading-relaxed">
                  {lang === 'bn' ? FARM_INFO.bengaliLocation : FARM_INFO.location}
                </p>
                <div className="text-[11px] text-[#00A86B] pt-1">
                  {lang === 'bn' ? 'খামার গেট থেকে সরাসরি পণ্য নেওয়ার সুবিধা রয়েছে।' : 'Local pickup available directly from farm storage.'}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Synchronized Footer */}
      <Footer setActiveTab={handleTabChange} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainWebsite />
    </CartProvider>
  );
}
