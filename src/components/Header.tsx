import { useState } from 'react';
import { ShoppingBag, Menu, X, PhoneCall, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FARM_INFO } from '../data/constants';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  const { totalCount, setIsCartOpen, lang, toggleLang } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', labelEn: 'Home', labelBn: 'হোম' },
    { id: 'products', labelEn: 'Products', labelBn: 'পণ্যসমূহ' },
    { id: 'ghee', labelEn: 'Shahi Ghee', labelBn: 'শাহী ঘি' },
    { id: 'benefits', labelEn: 'Benefits', labelBn: 'উপকারিতা' },
    { id: 'how-to-order', labelEn: 'How to Order', labelBn: 'অর্ডার নিয়ম' },
    { id: 'order', labelEn: 'Calculator', labelBn: 'ক্যালকুলেটর' },
    { id: 'story', labelEn: 'About Farm', labelBn: 'আমাদের খামার' },
    { id: 'track', labelEn: 'Track Order', labelBn: 'ট্র্যাকিং' },
    { id: 'contact', labelEn: 'Contact', labelBn: 'যোগাযোগ' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050807]/95 backdrop-blur-xl border-b border-[#00A86B]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group shrink-0"
        >
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#00A86B]/60 shadow-lg shadow-[#00A86B]/20 group-hover:border-[#00A86B] group-hover:scale-105 transition-all bg-[#091F14] shrink-0">
            <img
              src="/assets/aistudio/logo_3f4c8dbd.jpg"
              alt="SHAHI AGRO FARM Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to text if image blocked
                const target = e.target as HTMLElement;
                target.style.display = 'none';
              }}
            />
          </div>
          <div>
            <span className="text-base font-extrabold tracking-tight text-white whitespace-nowrap block">
              SHAHI <span className="text-[#00A86B]">AGRO FARM</span>
            </span>
            <span className="text-[10px] text-[#A3B7A7] block -mt-1 font-medium">
              {lang === 'bn' ? 'সুবর্ণচর, নোয়াখালী' : 'Shubornochar, Noakhali'}
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`whitespace-nowrap transition-colors py-1 relative text-xs font-semibold ${
                  isActive
                    ? 'text-[#00A86B] font-bold'
                    : 'text-[#A3B7A7] hover:text-white'
                }`}
              >
                {lang === 'bn' ? item.labelBn : item.labelEn}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A86B] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Language Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#00A86B]/30 bg-[#091F14] text-xs font-bold text-white hover:border-[#00A86B] transition-colors"
            title="Switch Language / ভাষা পরিবর্তন"
          >
            <Globe size={13} className="text-[#00A86B]" />
            <span className="font-semibold text-[11px]">{lang === 'en' ? 'বাংলা' : 'EN'}</span>
          </button>

          {/* Quick Phone Call Button */}
          <a
            href={`tel:${FARM_INFO.phone1}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#00A86B]/20 bg-[#06160F] text-xs font-medium text-[#B7F7D4] hover:border-[#00A86B] hover:text-white transition-colors"
          >
            <PhoneCall size={12} className="text-[#00A86B]" />
            <span className="font-mono tabular-nums">{FARM_INFO.phone1}</span>
          </a>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-3.5 py-2 rounded-full bg-[#0E2C1C] border border-[#00A86B]/30 text-white hover:border-[#00A86B] transition-all flex items-center gap-2 text-xs font-bold"
            aria-label={`Shopping cart with ${totalCount} items`}
          >
            <ShoppingBag size={15} className="text-[#00A86B]" />
            <span className="hidden md:inline">{lang === 'bn' ? 'কার্ট' : 'Cart'}</span>
            {totalCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#00A86B] text-[#050807] font-extrabold text-[11px] flex items-center justify-center font-mono">
                {totalCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-[#091F14] border border-[#00A86B]/20 text-[#A3B7A7] hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#071710] border-b border-[#00A86B]/20 px-6 py-5 space-y-1.5 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2 px-3 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                  activeTab === item.id
                    ? 'bg-[#00A86B]/20 text-[#00A86B]'
                    : 'text-[#A3B7A7] hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{lang === 'bn' ? item.labelBn : item.labelEn}</span>
                {activeTab === item.id && <span className="text-[10px]">●</span>}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={`https://wa.me/${FARM_INFO.whatsappInternational}?text=Hello%20SHAHI%20AGRO%20FARM,%20I%20want%20to%20order%20products.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-full bg-[#25D366] text-[#050807] font-extrabold text-xs text-center uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <span>WhatsApp: {FARM_INFO.whatsappNumber}</span>
            </a>
            <div className="flex gap-2">
              <a
                href={`tel:${FARM_INFO.phone1}`}
                className="flex-1 py-2 rounded-xl bg-[#091F14] border border-white/10 text-white font-mono text-xs text-center"
              >
                📞 {FARM_INFO.phone1}
              </a>
              <a
                href={`tel:${FARM_INFO.phone2}`}
                className="flex-1 py-2 rounded-xl bg-[#091F14] border border-white/10 text-white font-mono text-xs text-center"
              >
                📞 {FARM_INFO.phone2}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
