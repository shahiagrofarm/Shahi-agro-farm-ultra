import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Scale } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export function CartDrawer({ onProceedToCheckout }: CartDrawerProps) {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal, totalWeightKg } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#081810] border-l border-[#00A86B]/20 text-[#F4F8F1] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#00A86B]/15 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold tracking-widest text-[#00A86B] uppercase">Order Selection</div>
              <h2 className="text-xl font-extrabold text-white">Your Shopping Cart</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#A3B7A7] hover:text-white rounded-full hover:bg-white/5 transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-[#0B2518] border border-[#00A86B]/20 flex items-center justify-center text-3xl mb-4 text-[#00A86B]">
                  🛒
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Your cart is empty</h3>
                <p className="text-sm text-[#A3B7A7] max-w-xs mb-6">
                  Add 50 KG packaged grass silage or jars of traditional Shahi Ghee to calculate total order values.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#00A86B] text-[#050807] font-extrabold text-xs uppercase tracking-wider hover:bg-[#10D88B] transition-colors"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.product.id}
                  className="p-4 rounded-2xl bg-[#0C2216]/90 border border-[#00A86B]/15 hover:border-[#00A86B]/30 transition-colors flex gap-4"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#050807] shrink-0 border border-white/5 relative">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-xl bg-[#0C2216] -z-10">
                      {item.product.id === 'silage' ? '🌾' : '🍯'}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-bold text-sm text-white truncate">{item.product.name}</h4>
                        <div className="text-xs text-[#00A86B] font-mono tabular-nums">
                          ৳{item.product.price} / {item.product.unit}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#A3B7A7] hover:text-rose-400 p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 bg-[#050807] border border-[#00A86B]/20 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - item.product.stepQty)}
                          disabled={item.quantity <= item.product.minQty}
                          className="w-7 h-7 flex items-center justify-center rounded bg-[#0E2C1C] text-[#00A86B] hover:bg-[#16442C] disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-12 text-center text-xs font-bold text-white font-mono tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + item.product.stepQty)}
                          disabled={item.quantity >= item.product.maxQty}
                          className="w-7 h-7 flex items-center justify-center rounded bg-[#0E2C1C] text-[#00A86B] hover:bg-[#16442C] disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-extrabold text-white font-mono tabular-nums">
                          ৳{(item.product.price * item.quantity).toLocaleString()}
                        </div>
                        {item.product.id === 'silage' && (
                          <div className="text-[11px] text-[#A3B7A7] font-mono tabular-nums">
                            {(item.quantity * 50).toLocaleString()} KG
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#00A86B]/15 bg-[#06140D] space-y-4">
              <div className="space-y-1.5 text-xs text-[#A3B7A7]">
                <div className="flex justify-between">
                  <span>Product Subtotal</span>
                  <span className="font-mono text-white tabular-nums font-bold">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <Scale size={12} /> Estimated Net Weight
                  </span>
                  <span className="font-mono text-[#00A86B] tabular-nums font-semibold">
                    {totalWeightKg.toLocaleString()} KG
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-[#8EA093] pt-1">
                  <span>Transport / Freight</span>
                  <span>Calculated with Farm Dispatch</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Estimated Payable</span>
                <span className="text-2xl font-black text-[#10D88B] font-mono tabular-nums">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#091F14] border border-[#00A86B]/20 text-[11px] text-[#B7F7D4] flex items-start gap-2">
                <ShieldCheck size={16} className="text-[#00A86B] shrink-0 mt-0.5" />
                <span>
                  Official farm dispatch from Shubornochar, Noakhali. You will review delivery details and pay token advance before vehicle loading.
                </span>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#2CF5A2] to-[#00A86B] hover:from-[#10D88B] hover:to-[#00915C] text-[#04120B] font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#00A86B]/20 transition-all hover:scale-[1.01]"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
