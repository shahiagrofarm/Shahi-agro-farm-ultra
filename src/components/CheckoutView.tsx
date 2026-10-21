import { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, MessageSquare, AlertCircle, CheckCircle2, ShieldCheck, Scale, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { FARM_INFO } from '../data/constants';

interface CheckoutViewProps {
  onGoToProducts: () => void;
  onOrderCompleted: (orderId: string) => void;
}

export function CheckoutView({ onGoToProducts, onOrderCompleted }: CheckoutViewProps) {
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal, totalWeightKg, placeOrder, lang } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Noakhali');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bKash Advance Token');
  const [trxId, setTrxId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [placedOrder, setPlacedOrder] = useState<{ id: string; whatsappUrl: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (cart.length === 0) {
      setErrorMsg(lang === 'bn' ? 'আপনার কার্ট খালি। অনুগ্রহ করে পণ্য যোগ করুন।' : 'Your cart is empty. Please add products first.');
      return;
    }

    if (!customerName.trim()) {
      setErrorMsg(lang === 'bn' ? 'অনুগ্রহ করে আপনার নাম বা খামারের নাম লিখুন।' : 'Please enter your name or farm name.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 11) {
      setErrorMsg(lang === 'bn' ? '১১ ডিজিটের সঠিক মোবাইল নম্বর দিন।' : 'Please enter a valid 11-digit mobile number.');
      return;
    }

    if (!address.trim()) {
      setErrorMsg(lang === 'bn' ? 'ডেলিভারির সম্পূর্ণ ঠিকানা ও উপজেলা লিখুন।' : 'Please enter your delivery destination and upazila.');
      return;
    }

    const res = placeOrder({
      customerName,
      phone,
      district,
      address,
      paymentMethod,
      trxId: trxId.trim() || 'Pending WhatsApp verification',
    });

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00A86B', '#10D88B', '#F7D287', '#B7F7D4'],
      });
    } catch {
      // Confetti fallback
    }

    setPlacedOrder({ id: res.order.orderId, whatsappUrl: res.whatsappUrl });
    onOrderCompleted(res.order.orderId);
  };

  if (placedOrder) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center space-y-6">
        <div className="w-20 h-20 bg-[#00A86B]/20 border border-[#00A86B] text-[#00A86B] rounded-full flex items-center justify-center mx-auto text-4xl">
          <CheckCircle2 size={44} />
        </div>
        <div>
          <span className="text-xs font-bold tracking-widest text-[#00A86B] uppercase">
            {lang === 'bn' ? 'অর্ডার সফলভাবে সংরক্ষিত' : 'Order Successfully Logged'}
          </span>
          <h2 className="text-3xl font-black text-white mt-1">Reference: #{placedOrder.id}</h2>
          <p className="text-sm text-[#A3B7A7] mt-3 leading-relaxed">
            {lang === 'bn'
              ? 'আপনার অর্ডারটি ব্রাউজার ট্র্যাকিং সিস্টেমে যুক্ত হয়েছে। নিচে বাটনে চাপ দিয়ে সরাসরি খামার পরিচালকের হোয়াটসঅ্যাপে অর্ডার মেমো পাঠান।'
              : 'Your order is recorded in your local browser history. Tap the button below to send this directly to the farm manager on WhatsApp for dispatch booking.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <a
            href={placedOrder.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-7 rounded-full bg-[#25D366] text-[#050807] font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#20bd5a] shadow-lg shadow-[#25D366]/20 transition-all"
          >
            <MessageSquare size={18} /> {lang === 'bn' ? 'হোয়াটসঅ্যাপে পাঠান ↗' : 'Transmit via WhatsApp ↗'}
          </a>
          <button
            onClick={onGoToProducts}
            className="py-3 px-6 rounded-full bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-colors"
          >
            {lang === 'bn' ? 'আরও পণ্য দেখুন' : 'Browse More Products'}
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#0B2518] border border-[#00A86B]/20 flex items-center justify-center text-3xl mx-auto text-[#00A86B]">
          🛒
        </div>
        <h2 className="text-2xl font-bold text-white">
          {lang === 'bn' ? 'আপনার কার্ট বর্তমানে খালি' : 'Your Shopping Cart is Empty'}
        </h2>
        <p className="text-xs text-[#A3B7A7] leading-relaxed">
          {lang === 'bn'
            ? '৫০ কেজি শাহী ঘাস সাইলেজ বা শাহী ঘি কার্টে যুক্ত করে এক ক্লিকে চেকআউট করুন।'
            : 'Explore our farm products catalog to add silage bags or pure Shahi Ghee jars.'}
        </p>
        <button
          onClick={onGoToProducts}
          className="py-3 px-6 rounded-full bg-[#00A86B] text-[#050807] font-extrabold text-xs uppercase tracking-wider hover:bg-[#10D88B] transition-colors"
        >
          {lang === 'bn' ? 'পণ্য দেখুন ↗' : 'Browse Products ↗'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div>
        <span className="text-xs font-bold tracking-widest text-[#00A86B] uppercase">
          {lang === 'bn' ? 'অর্ডার সমাপ্তিকরণ' : 'Complete Your Purchase'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
          {lang === 'bn' ? 'কার্ট ও চেকআউট' : 'Review Cart & Place Order'}
        </h1>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-950/70 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2">
          <AlertCircle size={16} className="text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Cart Items Table */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <h3 className="text-base font-bold text-white">
              {lang === 'bn' ? 'নির্বাচিত পণ্যসমূহ' : 'Selected Products'} ({cart.length})
            </h3>
            <button
              onClick={clearCart}
              className="text-xs text-[#A3B7A7] hover:text-rose-400 transition-colors"
            >
              {lang === 'bn' ? 'সব মুছুন' : 'Clear All'}
            </button>
          </div>

          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="p-4 rounded-2xl bg-[#081810] border border-[#00A86B]/20 flex gap-4 items-center"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#050807] shrink-0 border border-white/5">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-white truncate">
                    {lang === 'bn' ? item.product.bengaliName : item.product.name}
                  </h4>
                  <div className="text-xs text-[#00A86B] font-mono">
                    ৳{item.product.price} / {lang === 'bn' ? item.product.bengaliUnit : item.product.unit}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5 bg-[#050807] border border-[#00A86B]/20 rounded-lg p-1 shrink-0">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - item.product.stepQty)}
                    disabled={item.quantity <= item.product.minQty}
                    className="w-7 h-7 flex items-center justify-center rounded bg-[#0E2C1C] text-[#00A86B] hover:bg-[#16442C] disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-white font-mono tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + item.product.stepQty)}
                    disabled={item.quantity >= item.product.maxQty}
                    className="w-7 h-7 flex items-center justify-center rounded bg-[#0E2C1C] text-[#00A86B] hover:bg-[#16442C] disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <div className="text-right shrink-0 min-w-[70px]">
                  <div className="text-sm font-extrabold text-white font-mono">
                    ৳{(item.product.price * item.quantity).toLocaleString()}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-[#8EA093] hover:text-rose-400 p-1 mt-1 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal & Weight Box */}
          <div className="p-5 rounded-2xl bg-[#091F14] border border-[#00A86B]/20 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#A3B7A7]">{lang === 'bn' ? 'পণ্যের মোট মূল্য:' : 'Product Subtotal:'}</span>
              <span className="font-mono text-base font-bold text-white">৳{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#A3B7A7] flex items-center gap-1">
                <Scale size={13} className="text-[#00A86B]" /> {lang === 'bn' ? 'মোট নেট ওজন:' : 'Total Net Weight:'}
              </span>
              <span className="font-mono text-sm font-semibold text-[#10D88B]">
                {totalWeightKg.toLocaleString()} KG ({(totalWeightKg / 1000).toFixed(2)} Tons)
              </span>
            </div>
            <div className="pt-2 border-t border-white/5 text-[11px] text-[#8EA093] flex items-center gap-1.5">
              <Truck size={13} className="text-[#00A86B] shrink-0" />
              <span>
                {lang === 'bn'
                  ? 'গাড়ির পরিবহন ভাড়া সুবর্ণচর খামার থেকে আপনার গন্তব্যের দূরত্ব অনুযায়ী চালকের সাথে সরাসরি সমন্বয় করা হয়।'
                  : 'Road freight is coordinated based on transport distance from Shubornochar, Noakhali.'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Customer Delivery & Payment Form */}
        <div className="lg:col-span-5 bg-[#081810] p-6 sm:p-8 rounded-3xl border border-[#00A86B]/25 space-y-4">
          <h3 className="text-lg font-bold text-white">
            {lang === 'bn' ? 'ডেলিভারি তথ্য ও অগ্রিম বুকিং' : 'Delivery & Booking Details'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-[#CFE0D3] mb-1">
                {lang === 'bn' ? 'আপনার নাম বা খামারের নাম *' : 'Recipient / Farm Name *'}
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Md. Hasan / Green Valley Dairy"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050807] border border-[#00A86B]/20 text-white text-xs placeholder:text-[#6E8575] focus:outline-none focus:border-[#00A86B]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#CFE0D3] mb-1">
                  {lang === 'bn' ? 'মোবাইল নম্বর (১১ ডিজিট) *' : 'Phone Number (11 Digits) *'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="018XXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050807] border border-[#00A86B]/20 text-white text-xs font-mono placeholder:text-[#6E8575] focus:outline-none focus:border-[#00A86B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#CFE0D3] mb-1">
                  {lang === 'bn' ? 'গন্তব্য জেলা *' : 'Delivery District *'}
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050807] border border-[#00A86B]/20 text-white text-xs focus:outline-none focus:border-[#00A86B]"
                >
                  <option value="Noakhali">Noakhali (Local Farm Gate)</option>
                  <option value="Feni">Feni</option>
                  <option value="Lakshmipur">Lakshmipur</option>
                  <option value="Cumilla">Cumilla</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Other Districts">Other Districts (Road Transport)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#CFE0D3] mb-1">
                {lang === 'bn' ? 'সম্পূর্ণ ঠিকানা ও নিকটস্থ বাজার / উপজেলা *' : 'Full Delivery Address & Landmark *'}
              </label>
              <textarea
                rows={2}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Village, Union, Upazila, District"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050807] border border-[#00A86B]/20 text-white text-xs placeholder:text-[#6E8575] focus:outline-none focus:border-[#00A86B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#CFE0D3] mb-1">
                {lang === 'bn' ? 'টোকেন অগ্রিম পেমেন্ট মাধ্যম' : 'Advance Payment Method'}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className={`p-2 rounded-xl border cursor-pointer flex items-center gap-1.5 ${paymentMethod === 'bKash Advance Token' ? 'bg-[#0E2C1C] border-[#00A86B] text-white' : 'bg-[#050807] border-white/5 text-[#A3B7A7]'}`}>
                  <input
                    type="radio"
                    name="checkoutPayMethod"
                    value="bKash Advance Token"
                    checked={paymentMethod === 'bKash Advance Token'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-[#00A86B]"
                  />
                  <span>bKash (01814026318)</span>
                </label>
                <label className={`p-2 rounded-xl border cursor-pointer flex items-center gap-1.5 ${paymentMethod === 'Rocket Advance Token' ? 'bg-[#0E2C1C] border-[#00A86B] text-white' : 'bg-[#050807] border-white/5 text-[#A3B7A7]'}`}>
                  <input
                    type="radio"
                    name="checkoutPayMethod"
                    value="Rocket Advance Token"
                    checked={paymentMethod === 'Rocket Advance Token'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-[#00A86B]"
                  />
                  <span>Rocket (01814026318-7)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#CFE0D3] mb-1">
                {lang === 'bn' ? 'সেন্ডার নম্বর বা ট্রানজেকশন আইডি (প্রযোজ্য ক্ষেত্রে)' : 'Sender Number or TrxID (If paid)'}
              </label>
              <input
                type="text"
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                placeholder="TrxID / Last 4 digits"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050807] border border-[#00A86B]/20 text-white text-xs font-mono placeholder:text-[#6E8575] focus:outline-none focus:border-[#00A86B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#2CF5A2] to-[#00A86B] hover:from-[#10D88B] hover:to-[#00915C] text-[#04120B] font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#00A86B]/25 transition-all hover:scale-[1.01]"
            >
              <MessageSquare size={16} />
              {lang === 'bn' ? 'হোয়াটসঅ্যাপে অর্ডার কনফার্ম করুন ↗' : 'Submit Booking via WhatsApp ↗'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
