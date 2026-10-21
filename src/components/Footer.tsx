import { Phone, MessageSquare, MapPin, ArrowUp, ExternalLink } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FARM_INFO } from '../data/constants';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export function Footer({ setActiveTab }: FooterProps) {
  const { lang } = useCart();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    scrollToTop();
  };

  return (
    <footer className="bg-[#030605] border-t border-[#00A86B]/15 pt-16 pb-12 text-[#A3B7A7] text-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Brand Info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#091F14] border border-[#00A86B]/40 flex items-center justify-center font-black text-xs text-[#00A86B]">
                SAF
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">
                SHAHI <span className="text-[#00A86B]">AGRO FARM</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#8EA093]">
              {lang === 'bn'
                ? 'সুবর্ণচর, নোয়াখালী ভিত্তিক উন্নত ঘাস সংরক্ষণ ও ঐতিহ্যবাহী খাঁটি দুগ্ধপণ্য উৎপাদন প্রতিষ্ঠান। খামারের স্বাস্থ্য ও লাভজনক খাদ্য পরিকল্পনায় নিবেদিত।'
                : 'Specialized forage conservation and authentic traditional dairy production based in Shubornochar, Noakhali. Dedicated to livestock nutrition, rumen health, and farm productivity.'}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href={FARM_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-[#091F14] border border-[#00A86B]/20 text-xs font-semibold text-white hover:text-[#00A86B] hover:border-[#00A86B] transition-colors inline-flex items-center gap-1"
              >
                Facebook <ExternalLink size={10} />
              </a>
              <a
                href={FARM_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-[#091F14] border border-[#00A86B]/20 text-xs font-semibold text-white hover:text-[#00A86B] hover:border-[#00A86B] transition-colors inline-flex items-center gap-1"
              >
                Instagram <ExternalLink size={10} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">
              {lang === 'bn' ? 'পেজ সমূহ' : 'Explore Pages'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-[#00A86B] transition-colors">
                  {lang === 'bn' ? 'হোম পেজ' : 'Home Overview'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-[#00A86B] transition-colors">
                  {lang === 'bn' ? 'পণ্য তালিকা' : 'Product Catalog'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('ghee')} className="hover:text-[#00A86B] transition-colors">
                  {lang === 'bn' ? 'শাহী ঘি পেজ' : 'Shahi Ghee Showcase'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('benefits')} className="hover:text-[#00A86B] transition-colors">
                  {lang === 'bn' ? 'সাইলেজের ৮টি স্তম্ভ' : 'Silage Benefits (8 Pillars)'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('how-to-order')} className="hover:text-[#00A86B] transition-colors">
                  {lang === 'bn' ? 'অর্ডার করার নিয়ম' : 'How to Order Guide'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('order')} className="hover:text-[#00A86B] transition-colors">
                  {lang === 'bn' ? 'লাইভ ক্যালকুলেটর' : 'Order Calculator'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('checkout')} className="hover:text-[#00A86B] transition-colors">
                  {lang === 'bn' ? 'কার্ট ও চেকআউট' : 'Cart & Checkout'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('track')} className="hover:text-[#00A86B] transition-colors">
                  {lang === 'bn' ? 'অর্ডার ট্র্যাকিং' : 'Track Existing Order'}
                </button>
              </li>
            </ul>
          </div>

          {/* Ordering & Mobile Banking */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">
              {lang === 'bn' ? 'অর্ডার ও পেমেন্ট' : 'Direct Ordering'}
            </h4>
            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-[#00A86B] font-semibold block">
                  {lang === 'bn' ? 'সর্বনিম্ন সাইলেজ অর্ডার:' : 'Minimum Silage Order:'}
                </span>
                <span>{lang === 'bn' ? '২০ বস্তা (১,০০০ কেজি / ৭,০০০ টাকা)' : '20 Packets (1,000 KG / ৳7,000)'}</span>
              </div>
              <div>
                <span className="text-[#00A86B] font-semibold block">
                  {lang === 'bn' ? 'শাহী ঘি এর সাইজ:' : 'Shahi Ghee Options:'}
                </span>
                <span>{lang === 'bn' ? '২০০ গ্রাম (৭৫০ টাকা) · ৯০০ গ্রাম (১,৪৫০ টাকা)' : '200g (৳750) · 900g (৳1,450)'}</span>
              </div>
              <div className="pt-2 border-t border-white/5">
                <span className="text-[#D6B56D] font-semibold block">
                  {lang === 'bn' ? 'বুকিং টোকেন পাঠানোর নম্বর:' : 'Token Advance Accounts:'}
                </span>
                <span className="font-mono text-[11px] block text-[#E5E0D3]">bKash (Personal): 01814026318</span>
                <span className="font-mono text-[11px] block text-[#E5E0D3]">Rocket: 01814026318-7</span>
              </div>
            </div>
          </div>

          {/* Farm Address & Hotlines */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">
              {lang === 'bn' ? 'খামারের অবস্থান ও যোগাযোগ' : 'Farm Location & Contact'}
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#00A86B] shrink-0 mt-0.5" />
                <span>{lang === 'bn' ? FARM_INFO.bengaliLocation : FARM_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare size={14} className="text-[#00A86B] shrink-0" />
                <span>
                  WhatsApp:{' '}
                  <a
                    href={`https://wa.me/${FARM_INFO.whatsappInternational}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#00A86B] font-mono"
                  >
                    {FARM_INFO.whatsappNumber}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#00A86B] shrink-0" />
                <span>
                  Hotline 1:{' '}
                  <a href={`tel:${FARM_INFO.phone1}`} className="text-white hover:text-[#00A86B] font-mono">
                    {FARM_INFO.phone1}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#00A86B] shrink-0" />
                <span>
                  Hotline 2:{' '}
                  <a href={`tel:${FARM_INFO.phone2}`} className="text-white hover:text-[#00A86B] font-mono">
                    {FARM_INFO.phone2}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E8575]">
          <div>
            © {new Date().getFullYear()} {FARM_INFO.name}. All rights reserved. Grass Silage & Traditional Dairy.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#091F14] text-white hover:text-[#00A86B] transition-colors"
            >
              {lang === 'bn' ? 'উপরে যান' : 'Back to Top'} <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
