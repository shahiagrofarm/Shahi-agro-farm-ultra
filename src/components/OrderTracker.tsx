import { useState } from 'react';
import { Search, CheckCircle, Clock, Truck, Home, MessageSquare, AlertCircle } from 'lucide-react';
import { useCart, PlacedOrder } from '../context/CartContext';
import { FARM_INFO } from '../data/constants';

interface OrderTrackerProps {
  initialOrderId?: string;
}

export function OrderTracker({ initialOrderId = '' }: OrderTrackerProps) {
  const { lookupOrder, orders } = useCart();
  const [searchQuery, setSearchQuery] = useState(initialOrderId || 'SAF-2026-1042');
  const [activeOrder, setActiveOrder] = useState<PlacedOrder | null>(() => {
    return lookupOrder(initialOrderId || 'SAF-2026-1042') || orders[0] || null;
  });
  const [searched, setSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = lookupOrder(searchQuery);
    setActiveOrder(found);
    setSearched(true);
  };

  const stages = [
    { id: 'Received', label: 'Order Logged', icon: Clock },
    { id: 'Confirmed', label: 'Stock Confirmed', icon: CheckCircle },
    { id: 'Dispatched', label: 'Truck Dispatched', icon: Truck },
    { id: 'Delivered', label: 'Delivered', icon: Home },
  ];

  const getStageIndex = (status: string) => {
    switch (status) {
      case 'Received': return 0;
      case 'Confirmed': return 1;
      case 'Dispatched': return 2;
      case 'Delivered': return 3;
      default: return 0;
    }
  };

  const currentStageIdx = activeOrder ? getStageIndex(activeOrder.status) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Search Bar */}
      <div className="bg-[#0B2518] p-6 sm:p-8 rounded-3xl border border-[#00A86B]/25 shadow-xl">
        <div className="max-w-xl mx-auto text-center space-y-2 mb-6">
          <span className="text-xs font-bold tracking-widest text-[#00A86B] uppercase">Order Verification</span>
          <h3 className="text-2xl font-extrabold text-white">Track Your Farm Shipment</h3>
          <p className="text-xs text-[#A3B7A7]">
            Enter your Order Reference ID (e.g. <button onClick={() => setSearchQuery('SAF-2026-1042')} className="text-[#00A86B] underline font-mono">SAF-2026-1042</button>) or your registered phone number.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8EA093]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SAF-2026-XXXX or Phone Number"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#050807] border border-[#00A86B]/30 text-white text-sm font-mono placeholder:text-[#6E8575] focus:outline-none focus:border-[#00A86B]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#00A86B] text-[#050807] font-bold text-xs uppercase tracking-wider hover:bg-[#10D88B] transition-colors shrink-0"
          >
            Track Status
          </button>
        </form>
      </div>

      {/* Results View */}
      {activeOrder ? (
        <div className="bg-[#081C12] border border-[#00A86B]/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl font-black text-white font-mono">
                  #{activeOrder.orderId}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#00A86B]/20 border border-[#00A86B]/40 text-[#00A86B] text-xs font-bold uppercase tracking-wider">
                  {activeOrder.status}
                </span>
              </div>
              <div className="text-xs text-[#A3B7A7] mt-1">
                Placed on <span className="font-mono">{activeOrder.date}</span> · Recipient: <strong className="text-white">{activeOrder.customerName}</strong>
              </div>
            </div>

            <a
              href={`https://wa.me/${FARM_INFO.whatsappInternational}?text=Hello%20SHAHI%20AGRO%20FARM,%20checking%20status%20for%20order%20%23${activeOrder.orderId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0E2C1C] border border-[#00A86B]/30 text-xs font-bold text-[#B7F7D4] hover:border-[#00A86B] hover:text-white transition-colors"
            >
              <MessageSquare size={14} className="text-[#00A86B]" />
              Inquire on WhatsApp ↗
            </a>
          </div>

          {/* 4-Stage Progress Line */}
          <div className="py-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
              {stages.map((stage, idx) => {
                const isPassed = idx <= currentStageIdx;
                const isCurrent = idx === currentStageIdx;
                const Icon = stage.icon;
                return (
                  <div
                    key={stage.id}
                    className={`p-4 rounded-2xl border transition-all text-center space-y-2 ${
                      isCurrent
                        ? 'bg-[#00A86B]/15 border-[#00A86B] shadow-lg shadow-[#00A86B]/10'
                        : isPassed
                        ? 'bg-[#050807] border-[#00A86B]/30'
                        : 'bg-[#050807]/40 border-white/5 opacity-40'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center ${
                        isCurrent
                          ? 'bg-[#00A86B] text-[#050807]'
                          : isPassed
                          ? 'bg-[#0E2C1C] text-[#00A86B]'
                          : 'bg-white/5 text-[#A3B7A7]'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] text-[#A3B7A7] uppercase font-bold tracking-wider">
                        Step 0{idx + 1}
                      </div>
                      <div className={`text-xs font-bold mt-0.5 ${isCurrent ? 'text-white' : 'text-[#CFE0D3]'}`}>
                        {stage.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Itemized Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-[#050807] p-5 rounded-2xl border border-white/5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#00A86B]">Ordered Items</h4>
              <div className="space-y-2 text-xs">
                {activeOrder.items.map((it, i) => (
                  <div key={i} className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white">
                      {it.name} <span className="text-[#A3B7A7]">× {it.quantity}</span>
                    </span>
                    <span className="font-mono text-[#00A86B] tabular-nums font-bold">
                      ৳{it.subtotal.toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="pt-2 flex justify-between font-bold text-sm">
                  <span className="text-white">Total Product Value:</span>
                  <span className="font-mono text-[#10D88B] tabular-nums">
                    ৳{activeOrder.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-[#8EA093]">
                  <span>Total Payload Weight:</span>
                  <span className="font-mono">{activeOrder.totalWeightKg.toLocaleString()} KG</span>
                </div>
              </div>
            </div>

            <div className="bg-[#050807] p-5 rounded-2xl border border-white/5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#00A86B]">Logistics & Recipient</h4>
              <div className="space-y-1.5 text-xs text-[#A3B7A7]">
                <div>
                  <span className="text-[#8EA093] block text-[10px] uppercase font-bold">Delivery Destination</span>
                  <span className="text-white font-medium">{activeOrder.deliveryAddress}</span>
                </div>
                <div>
                  <span className="text-[#8EA093] block text-[10px] uppercase font-bold">Contact Phone</span>
                  <span className="font-mono text-white">{activeOrder.phone}</span>
                </div>
                <div>
                  <span className="text-[#8EA093] block text-[10px] uppercase font-bold">Payment & Advance</span>
                  <span className="text-white">
                    {activeOrder.paymentMethod} {activeOrder.trxId ? `(Ref: ${activeOrder.trxId})` : ''}
                  </span>
                </div>
                <div className="pt-2 text-[11px] text-[#00A86B]">
                  Dispatching from: <em>Babul Chearman Bari, Char Bata, Shubornochar</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : searched ? (
        <div className="p-8 rounded-2xl bg-[#081810] border border-white/10 text-center max-w-md mx-auto space-y-3">
          <AlertCircle size={32} className="mx-auto text-amber-400" />
          <h4 className="text-base font-bold text-white">No Order Found</h4>
          <p className="text-xs text-[#A3B7A7]">
            We could not find an order matching "{searchQuery}". Check the reference ID from your WhatsApp booking or contact farm dispatch directly.
          </p>
          <a
            href={`https://wa.me/${FARM_INFO.whatsappInternational}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 rounded-full bg-[#00A86B] text-[#050807] font-bold text-xs uppercase"
          >
            Chat with Farm Desk
          </a>
        </div>
      ) : null}
    </div>
  );
}
