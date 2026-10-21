import { Phone, MessageSquare, Calculator, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FARM_INFO } from '../data/constants';

interface MobileStickyBarProps {
  onOpenCalculator: () => void;
}

export function MobileStickyBar({ onOpenCalculator }: MobileStickyBarProps) {
  const { totalCount, setIsCartOpen, lang } = useCart();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#050807]/95 backdrop-blur-lg border-t border-[#00A86B]/20 px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto text-center">
        {/* Call Farm */}
        <a
          href={`tel:${FARM_INFO.phone1}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#091F14] border border-[#00A86B]/20 text-[#B7F7D4] active:scale-95 transition-transform"
        >
          <Phone size={16} className="text-[#00A86B]" />
          <span className="text-[10px] font-bold mt-1">
            {lang === 'bn' ? 'কল দিন' : 'Call'}
          </span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${FARM_INFO.whatsappInternational}?text=Hello%20SHAHI%20AGRO%20FARM,%20I%20want%20to%20order%20products.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#0B2A18] border border-[#25D366]/30 text-[#25D366] active:scale-95 transition-transform"
        >
          <MessageSquare size={16} />
          <span className="text-[10px] font-bold mt-1">
            {lang === 'bn' ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}
          </span>
        </a>

        {/* Calculator */}
        <button
          onClick={onOpenCalculator}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#091F14] border border-[#00A86B]/20 text-[#B7F7D4] active:scale-95 transition-transform"
        >
          <Calculator size={16} className="text-[#00A86B]" />
          <span className="text-[10px] font-bold mt-1">
            {lang === 'bn' ? 'হিসাব' : 'Calculator'}
          </span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-gradient-to-r from-[#2CF5A2] to-[#00A86B] text-[#04120B] font-extrabold active:scale-95 transition-transform shadow-md shadow-[#00A86B]/20"
        >
          <div className="relative">
            <ShoppingBag size={16} />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-[#050807] text-[#00A86B] font-black text-[9px] flex items-center justify-center font-mono">
                {totalCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-black mt-1">
            {lang === 'bn' ? 'কার্ট' : 'Cart'}
          </span>
        </button>
      </div>
    </div>
  );
}
