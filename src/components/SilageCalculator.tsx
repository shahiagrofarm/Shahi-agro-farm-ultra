import { useState } from 'react';
import { Scale, Calendar, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { FARM_INFO } from '../data/constants';

interface SilageCalculatorProps {
  onOrderSuccess?: (orderId: string) => void;
}

export function SilageCalculator({ onOrderSuccess }: SilageCalculatorProps) {
  const { placeOrder, addToCart } = useCart();

  const [packets, setPackets] = useState<number>(20);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Noakhali');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bKash Advance Token');
  const [trxId, setTrxId] = useState('');
  const [successOrder, setSuccessOrder] = useState<{ id: string; whatsappUrl: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const unitPrice = 350;
  const minPackets = 20;
  const maxPackets = 400;

  const totalKg = packets * 50;
  const totalTons = (totalKg / 1000).toFixed(2);
  const totalPrice = packets * unitPrice;

  // Approximate days of feed for an average 10-cow herd at 10 KG/cow/day
  const cowDays = Math.round(totalKg / (10 * 10));

  const handlePacketChange = (val: number) => {
    const clamped = Math.max(minPackets, Math.min(maxPackets, val));
    setPackets(clamped);
  };

  const handleDirectOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('Please enter your full name or farm name.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 11) {
      setErrorMsg('Please enter a valid 11-digit Bangladeshi mobile number.');
      return;
    }

    if (!address.trim()) {
      setErrorMsg('Please enter your delivery destination or upazila.');
      return;
    }

    // First ensure the silage is in cart or directly place order
    // We can simulate placing the order with this configured quantity
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `SAF-${new Date().getFullYear()}-${randomSuffix}`;

    const itemsSummary = [
      {
        name: 'Shahi Grass Silage (50 KG Bag)',
        quantity: packets,
        unit: 'packet',
        price: unitPrice,
        subtotal: totalPrice,
      },
    ];

    const orderData = {
      customerName,
      phone,
      district,
      address,
      paymentMethod,
      trxId: trxId.trim() || 'Pending WhatsApp verification',
    };

    const res = placeOrder(orderData);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00A86B', '#10D88B', '#F7D287', '#B7F7D4'],
      });
    } catch {
      // Confetti fallback
    }

    setSuccessOrder({ id: res.order.orderId, whatsappUrl: res.whatsappUrl });
    if (onOrderSuccess) onOrderSuccess(res.order.orderId);
  };

  return (
    <div className="bg-gradient-to-b from-[#0B2518] to-[#06140D] border border-[#00A86B]/25 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A86B]/10 rounded-full blur-3xl pointer-events-none" />

      {successOrder ? (
        <div className="text-center py-10 space-y-6 max-w-lg mx-auto">
          <div className="w-16 h-16 bg-[#00A86B]/20 border border-[#00A86B] text-[#00A86B] rounded-full flex items-center justify-center mx-auto text-3xl">
            <CheckCircle2 size={36} />
          </div>
          <div>
            <span className="text-xs font-bold tracking-widest text-[#00A86B] uppercase">Order Inquiry Created</span>
            <h3 className="text-2xl font-black text-white mt-1">Reference: #{successOrder.id}</h3>
            <p className="text-sm text-[#A3B7A7] mt-2 leading-relaxed">
              Your order for <strong className="text-white">{packets} bags ({totalKg.toLocaleString()} KG)</strong> has been logged in your browser. Tap the button below to send this directly to the farm dispatch manager on WhatsApp.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#050807] border border-[#00A86B]/20 text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-[#A3B7A7]">Order Value:</span>
              <span className="font-mono text-white font-bold">৳{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A3B7A7]">Payment Mode:</span>
              <span className="text-white">{paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A3B7A7]">Destination:</span>
              <span className="text-white">{district}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={successOrder.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded-full bg-[#25D366] text-[#050807] font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#20bd5a] shadow-lg shadow-[#25D366]/20 transition-all"
            >
              <MessageSquare size={16} /> Open in WhatsApp ↗
            </a>
            <button
              onClick={() => setSuccessOrder(null)}
              className="py-3 px-6 rounded-full bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-colors"
            >
              Calculate Another Order
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Interactive Weight & Cost Configurator */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#00A86B] uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00A86B]" /> Instant Booking Calculator
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Shahi Grass Silage <span className="text-[#00A86B]">50 KG</span>
              </h3>
              <p className="text-sm text-[#A3B7A7] mt-1">
                Fixed farm gate price: <strong className="text-white font-mono">৳350</strong> per 50 KG packet. Minimum order: 20 packets.
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="p-5 rounded-2xl bg-[#06160F] border border-[#00A86B]/20 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#CFE0D3]">
                  Select Packet Quantity
                </label>
                <div className="text-right">
                  <span className="text-3xl font-black text-[#10D88B] font-mono tabular-nums">
                    {packets}
                  </span>
                  <span className="text-xs text-[#A3B7A7] ml-1">packets</span>
                </div>
              </div>

              {/* Range Slider */}
              <input
                type="range"
                min={minPackets}
                max={maxPackets}
                step={10}
                value={packets}
                onChange={(e) => handlePacketChange(Number(e.target.value))}
                className="w-full h-2 bg-[#0E2C1C] rounded-lg appearance-none cursor-pointer accent-[#00A86B]"
              />

              {/* Quick Stepper Buttons */}
              <div className="grid grid-cols-4 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handlePacketChange(packets - 10)}
                  disabled={packets <= minPackets}
                  className="py-2 px-3 rounded-xl bg-[#0B2518] border border-[#00A86B]/20 text-xs font-bold text-[#B7F7D4] hover:bg-[#123624] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  −10 Bags
                </button>
                <button
                  type="button"
                  onClick={() => handlePacketChange(packets - 1)}
                  disabled={packets <= minPackets}
                  className="py-2 px-3 rounded-xl bg-[#0B2518] border border-[#00A86B]/20 text-xs font-bold text-[#B7F7D4] hover:bg-[#123624] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  −1 Bag
                </button>
                <button
                  type="button"
                  onClick={() => handlePacketChange(packets + 1)}
                  disabled={packets >= maxPackets}
                  className="py-2 px-3 rounded-xl bg-[#0B2518] border border-[#00A86B]/20 text-xs font-bold text-[#B7F7D4] hover:bg-[#123624] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  +1 Bag
                </button>
                <button
                  type="button"
                  onClick={() => handlePacketChange(packets + 10)}
                  disabled={packets >= maxPackets}
                  className="py-2 px-3 rounded-xl bg-[#0B2518] border border-[#00A86B]/20 text-xs font-bold text-[#B7F7D4] hover:bg-[#123624] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  +10 Bags
                </button>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-[#06160F] border border-[#00A86B]/15 text-center">
                <div className="text-[11px] text-[#A3B7A7] uppercase tracking-wider font-semibold">Total Weight</div>
                <div className="text-xl font-extrabold text-white font-mono tabular-nums mt-1">
                  {totalKg.toLocaleString()} <span className="text-xs font-sans text-[#A3B7A7]">KG</span>
                </div>
                <div className="text-[10px] text-[#00A86B] font-mono mt-0.5">({totalTons} Tons)</div>
              </div>

              <div className="p-4 rounded-xl bg-[#06160F] border border-[#00A86B]/15 text-center">
                <div className="text-[11px] text-[#A3B7A7] uppercase tracking-wider font-semibold">Feed Duration</div>
                <div className="text-xl font-extrabold text-white font-mono tabular-nums mt-1">
                  ~{cowDays} <span className="text-xs font-sans text-[#A3B7A7]">Days</span>
                </div>
                <div className="text-[10px] text-[#8EA093] mt-0.5">For 10 Dairy Cows</div>
              </div>

              <div className="p-4 rounded-xl bg-[#06160F] border border-[#00A86B]/20 text-center bg-gradient-to-br from-[#092215] to-[#05140D]">
                <div className="text-[11px] text-[#00A86B] uppercase tracking-wider font-bold">Estimated Cost</div>
                <div className="text-xl font-black text-[#10D88B] font-mono tabular-nums mt-1">
                  ৳{totalPrice.toLocaleString()}
                </div>
                <div className="text-[10px] text-[#A3B7A7] mt-0.5">৳350 / 50 KG</div>
              </div>
            </div>

            {/* Add to Cart Alternate */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => addToCart('silage', packets)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0D2A1C] border border-[#00A86B]/30 hover:border-[#00A86B] text-xs font-bold text-[#B7F7D4] transition-colors"
              >
                + Add {packets} Packets to Shopping Bag
              </button>
            </div>
          </div>

          {/* Right: Customer Delivery & Advance Token Form */}
          <div className="lg:col-span-6 bg-[#06160F] p-6 sm:p-7 rounded-2xl border border-[#00A86B]/20 space-y-4">
            <h4 className="text-base font-bold text-white flex items-center justify-between">
              <span>Direct Booking Form</span>
              <span className="text-xs font-mono text-[#00A86B] font-semibold">Step 2 of 2</span>
            </h4>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleDirectOrder} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#CFE0D3] mb-1">
                  Farm Name / Contact Person *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Al-Madina Dairy Farm / Md. Rahim"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#091F14] border border-[#00A86B]/20 text-white text-xs placeholder:text-[#6E8575] focus:outline-none focus:border-[#00A86B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#CFE0D3] mb-1">
                    Mobile Number (11-Digits) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#091F14] border border-[#00A86B]/20 text-white text-xs font-mono placeholder:text-[#6E8575] focus:outline-none focus:border-[#00A86B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#CFE0D3] mb-1">
                    Delivery District *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#091F14] border border-[#00A86B]/20 text-white text-xs focus:outline-none focus:border-[#00A86B]"
                  >
                    <option value="Noakhali">Noakhali (Local Farm Gate)</option>
                    <option value="Feni">Feni</option>
                    <option value="Lakshmipur">Lakshmipur</option>
                    <option value="Cumilla">Cumilla</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Dhaka">Dhaka & Vicinity</option>
                    <option value="Other Districts">Other Districts (Road Transport)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#CFE0D3] mb-1">
                  Full Farm Delivery Address & Upazila *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Char Bata, Shubornochar / Burichang, Cumilla"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#091F14] border border-[#00A86B]/20 text-white text-xs placeholder:text-[#6E8575] focus:outline-none focus:border-[#00A86B]"
                />
              </div>

              {/* Payment Mode Selector */}
              <div>
                <label className="block text-xs font-bold text-[#CFE0D3] mb-1">
                  Advance Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className={`p-2.5 rounded-xl border cursor-pointer flex items-center gap-2 ${paymentMethod === 'bKash Advance Token' ? 'bg-[#0E2C1C] border-[#00A86B] text-white' : 'bg-[#091F14] border-white/5 text-[#A3B7A7]'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bKash Advance Token"
                      checked={paymentMethod === 'bKash Advance Token'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-[#00A86B]"
                    />
                    <span>bKash (01814026318)</span>
                  </label>
                  <label className={`p-2.5 rounded-xl border cursor-pointer flex items-center gap-2 ${paymentMethod === 'Rocket Advance Token' ? 'bg-[#0E2C1C] border-[#00A86B] text-white' : 'bg-[#091F14] border-white/5 text-[#A3B7A7]'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
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
                  Sender Number / TrxID <span className="text-[#8EA093] font-normal">(Optional if paying upon WhatsApp call)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. TrxID or Last 4 digits of sender bKash"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#091F14] border border-[#00A86B]/20 text-white text-xs font-mono placeholder:text-[#6E8575] focus:outline-none focus:border-[#00A86B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#2CF5A2] to-[#00A86B] text-[#04120B] font-extrabold text-sm uppercase tracking-wider hover:from-[#10D88B] hover:to-[#00915C] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00A86B]/20"
              >
                <MessageSquare size={16} /> Send Booking via WhatsApp ↗
              </button>

              <div className="text-[11px] text-[#8EA093] text-center pt-1">
                Zero fake confirmations. You will directly talk to farm management in Shubornochar to schedule the freight truck.
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
