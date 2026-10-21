import { CheckCircle2, PhoneCall, HelpCircle, ShieldAlert } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { HOW_TO_ORDER_STEPS, FARM_INFO } from '../data/constants';

interface HowToOrderProps {
  onGoToCalculator: () => void;
}

export function HowToOrderSection({ onGoToCalculator }: HowToOrderProps) {
  const { lang } = useCart();

  const faqs = [
    {
      qEn: 'What is the minimum order for Shahi Grass Silage?',
      qBn: 'শাহী ঘাস সাইলেজের সর্বনিম্ন অর্ডার কত?',
      aEn: 'The minimum order is 20 packets (each packet weighs 50 KG, totaling 1,000 KG or 1.0 metric ton). Maximum single online booking is 400 packets (20 metric tons).',
      aBn: 'সর্বনিম্ন অর্ডার ২০ বস্তা (প্রতি বস্তায় ৫০ কেজি হিসেবে মোট ১,০০০ কেজি বা ১ টন)। এক চালানে সর্বোচ্চ ৪০০ বস্তা (২০ টন) পর্যন্ত পাঠানো যায়।'
    },
    {
      qEn: 'How is road delivery/transport arranged?',
      qBn: 'পরিবহন বা ডেলিভারি কীভাবে হয়?',
      aEn: 'We coordinate freight trucks or pickup vehicles directly from our farm gate in Shubornochar, Noakhali to your destination upazila or district. Transport fares are settled transparently with the driver/dispatch team.',
      aBn: 'নোয়াখালী সুবর্ণচর খামার থেকে আপনার জেলা বা উপজেলায় সরাসরি ট্রাক, পিকআপ বা লোকাল পরিবহনে পাঠানো হয়। গাড়ির ন্যায্য ভাড়া সরাসরি নিশ্চিত করা হয়।'
    },
    {
      qEn: 'How long can unopened silage bags be stored?',
      qBn: 'বায়ুরোধী প্যাকেটে সাইলেজ কতদিন ভালো থাকে?',
      aEn: 'Properly sealed in our heavy-duty airtight bags and kept away from rodents or sharp objects, silage remains fresh and nutritious for 12 to 18 months.',
      aBn: 'প্যাকেটে কোনো ফুটা না থাকলে এবং ধারালো বস্তু বা ইঁদুর থেকে নিরাপদ রাখলে ১২ থেকে ১৮ মাস পর্যন্ত পুষ্টিগুণ পুরোপুরি অক্ষুণ্ণ থাকে।'
    },
    {
      qEn: 'How to pay the token advance?',
      qBn: 'বুকিংয়ের জন্য অগ্রিম কীভাবে দিতে হবে?',
      aEn: `You can send the transport advance or token via bKash (${FARM_INFO.paymentNumbers.bkash}), Rocket (${FARM_INFO.paymentNumbers.rocket}), or Upay. The remaining product balance is settled upon dispatch confirmation.`,
      aBn: `বিকাশ (${FARM_INFO.paymentNumbers.bkash}), রকেট (${FARM_INFO.paymentNumbers.rocket}) অথবা উপায়ের মাধ্যমে টোকেন বা গাড়ি ভাড়া পাঠিয়ে ট্রানজেকশন আইডি দিন। বাকি টাকা গাড়ি লোডের পর যাচাই করে নেওয়া হয়।`
    }
  ];

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold tracking-widest text-[#00A86B] uppercase">
          {lang === 'bn' ? 'সহজ ও স্পষ্ট নির্দেশিকা' : 'Step-by-Step Guide'}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          {lang === 'bn' ? 'অর্ডার করার ৪টি সহজ নিয়ম' : 'How to Place Your Farm Order'}
        </h2>
        <p className="text-xs sm:text-sm text-[#A3B7A7]">
          {lang === 'bn'
            ? 'সুবর্ণচর খামার থেকে আপনার গোয়ালে নিরাপদে ঘাস সাইলেজ ও শাহী ঘি পৌঁছানোর সম্পূর্ণ প্রক্রিয়া।'
            : 'A transparent, reliable 4-step process from farm-gate packing to your barn door.'}
        </p>
      </div>

      {/* 4 Steps Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {HOW_TO_ORDER_STEPS.map((step, idx) => (
          <div
            key={step.step}
            className="p-6 rounded-3xl bg-[#081C12] border border-[#00A86B]/20 relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-[#00A86B] font-mono">
                  {step.step}
                </span>
                <span className="w-8 h-8 rounded-full bg-[#00A86B]/15 border border-[#00A86B]/30 flex items-center justify-center text-xs font-bold text-[#00A86B]">
                  ✓
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {lang === 'bn' ? step.bengaliTitle : step.title}
              </h3>
              <p className="text-xs text-[#A3B7A7] leading-relaxed">
                {lang === 'bn' ? step.bengaliDesc : step.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 mt-4 text-[11px] text-[#8EA093]">
              {idx === 0 && (lang === 'bn' ? 'ন্যূনতম ২০ বস্তা (১ টন)' : 'Min 20 bags (1,000 KG)')}
              {idx === 1 && (lang === 'bn' ? 'সারা বাংলাদেশে পরিবহন' : 'All districts in Bangladesh')}
              {idx === 2 && (lang === 'bn' ? 'বিকাশ / রকেট / উপায়' : 'bKash / Rocket / Upay')}
              {idx === 3 && (lang === 'bn' ? 'তাৎক্ষণিক মেমো ও গাড়ির নম্বর' : 'Instant Memo & Driver Contact')}
            </div>
          </div>
        ))}
      </div>

      {/* Payment Accounts Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0C2216] via-[#091F14] to-[#071710] border border-[#00A86B]/30 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#00A86B] uppercase">
              {lang === 'bn' ? 'ভেরিফাইড পেমেন্ট একাউন্ট' : 'Official Payment Numbers'}
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-1">
              {lang === 'bn' ? 'বুকিং টোকেন পাঠানোর একাউন্ট' : 'Advance Token Mobile Banking'}
            </h3>
          </div>
          <button
            onClick={onGoToCalculator}
            className="py-3 px-6 rounded-full bg-gradient-to-r from-[#2CF5A2] to-[#00A86B] text-[#04120B] font-extrabold text-xs uppercase tracking-wider self-start md:self-auto hover:scale-105 transition-transform"
          >
            {lang === 'bn' ? 'অর্ডার ক্যালকুলেটরে যান ↗' : 'Go to Order Calculator ↗'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#050807] border border-white/10 space-y-1">
            <span className="text-xs font-bold text-[#E2136E]">bKash (Personal)</span>
            <div className="font-mono text-base font-extrabold text-white">01814026318</div>
            <div className="text-[11px] text-[#A3B7A7]">{lang === 'bn' ? 'সেন্ড মানি করুন' : 'Send Money'}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#050807] border border-white/10 space-y-1">
            <span className="text-xs font-bold text-[#8C3494]">Rocket (Personal)</span>
            <div className="font-mono text-base font-extrabold text-white">01814026318-7</div>
            <div className="text-[11px] text-[#A3B7A7]">{lang === 'bn' ? 'সেন্ড মানি করুন' : 'Send Money'}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#050807] border border-white/10 space-y-1">
            <span className="text-xs font-bold text-[#00897B]">Upay (Personal)</span>
            <div className="font-mono text-base font-extrabold text-white">01814026318</div>
            <div className="text-[11px] text-[#A3B7A7]">{lang === 'bn' ? 'সেন্ড মানি করুন' : 'Send Money'}</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#081810] border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
          <ShieldAlert size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <span>
            {lang === 'bn'
              ? 'সতর্কতা: শুধুমাত্র উপরিউক্ত তিনটি নম্বরেই অগ্রিম প্রদান করবেন। টাকা পাঠানোর পর হোয়াটসঅ্যাপে ট্রানজেকশন আইডি বা স্ক্রিনশট পাঠিয়ে বুকিং নিশ্চিত করুন।'
              : 'Caution: Only transfer token advance to the verified numbers above. Send the TrxID or screenshot on WhatsApp to confirm vehicle scheduling.'}
          </span>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <h3 className="text-2xl font-extrabold text-white text-center flex items-center justify-center gap-2">
          <HelpCircle size={22} className="text-[#00A86B]" />
          {lang === 'bn' ? 'সাধারণ জিজ্ঞাসা (FAQ)' : 'Frequently Asked Questions'}
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#081810] border border-[#00A86B]/15 space-y-2"
            >
              <h4 className="text-sm font-bold text-white">
                {lang === 'bn' ? faq.qBn : faq.qEn}
              </h4>
              <p className="text-xs text-[#A3B7A7] leading-relaxed">
                {lang === 'bn' ? faq.aBn : faq.aEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
