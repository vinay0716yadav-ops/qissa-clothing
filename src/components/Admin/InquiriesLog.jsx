import React from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageCircle, Clock, ShoppingBag, ArrowUpRight, Trash2 } from 'lucide-react';

export const InquiriesLog = () => {
  const { inquiries, settings } = useStore();

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading text-2xl font-black uppercase tracking-wide text-black">
            WhatsApp Orders & Inquiries Log
          </h3>
          <p className="text-xs text-zinc-500">
            Real-time activity of customer clicks on "Order on WhatsApp" and Showcase Bag checkouts.
          </p>
        </div>
        <div className="px-3.5 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{inquiries.length} Total Clicks Logged</span>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-zinc-200 text-center space-y-3">
          <MessageCircle className="w-10 h-10 text-zinc-300 mx-auto" />
          <h4 className="font-heading text-xl font-bold uppercase text-zinc-700">No Orders Logged Yet</h4>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            When users click "Order on WhatsApp" from your product pages or showcase bag, their order intent will automatically appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-zinc-300 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#25D366]/10 text-[#25D366] font-bold text-[10px] uppercase rounded">
                    {inq.type}
                  </span>
                  <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    {new Date(inq.timestamp).toLocaleString()}
                  </span>
                </div>

                <div className="font-bold text-sm text-black">
                  {inq.productName || `Showcase Bag Order (${inq.itemCount || 0} items)`}
                </div>

                <div className="text-xs text-zinc-600">
                  {inq.size && <span>Size: <strong className="text-black">{inq.size}</strong> • </span>}
                  {inq.color && <span>Color: <strong className="text-black">{inq.color}</strong> • </span>}
                  {inq.quantity && <span>Qty: <strong className="text-black">{inq.quantity}</strong></span>}
                </div>
              </div>

              <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                <div className="text-base font-black text-black">
                  {settings.currencySymbol}{(inq.totalAmount || inq.price || 0).toLocaleString()}
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  Sent to WhatsApp ✓
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
