import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Ruler, MessageCircle, HelpCircle } from 'lucide-react';

export const SizeGuideModal = () => {
  const { sizeGuideOpen, setSizeGuideOpen, settings } = useStore();
  const [unit, setUnit] = useState('in'); // 'in' or 'cm'

  if (!sizeGuideOpen) return null;

  const womenSizes = [
    { size: "XS", bustIn: "32-34", bustCm: "81-86", waistIn: "24-26", waistCm: "61-66", hipIn: "34-36", hipCm: "86-91" },
    { size: "S", bustIn: "34-36", bustCm: "86-91", waistIn: "26-28", waistCm: "66-71", hipIn: "36-38", hipCm: "91-96" },
    { size: "M", bustIn: "36-38", bustCm: "91-96", waistIn: "28-30", waistCm: "71-76", hipIn: "38-40", hipCm: "96-101" },
    { size: "L", bustIn: "38-40", bustCm: "96-101", waistIn: "30-32", waistCm: "76-81", hipIn: "40-42", hipCm: "101-106" },
    { size: "XL", bustIn: "40-42", bustCm: "101-106", waistIn: "32-34", waistCm: "81-86", hipIn: "42-44", hipCm: "106-111" },
    { size: "XXL", bustIn: "42-44", bustCm: "106-111", waistIn: "34-36", waistCm: "86-91", hipIn: "44-46", hipCm: "111-116" }
  ];

  const menSizes = [
    { size: "S / 38", chestIn: "36-38", chestCm: "91-96", waistIn: "30-32", waistCm: "76-81", lengthIn: "28", lengthCm: "71" },
    { size: "M / 40", chestIn: "38-40", chestCm: "96-101", waistIn: "32-34", waistCm: "81-86", lengthIn: "29", lengthCm: "73" },
    { size: "L / 42", chestIn: "40-42", chestCm: "101-106", waistIn: "34-36", waistCm: "86-91", lengthIn: "30", lengthCm: "76" },
    { size: "XL / 44", chestIn: "42-44", chestCm: "106-111", waistIn: "36-38", waistCm: "91-96", lengthIn: "31", lengthCm: "78" },
    { size: "XXL / 46", chestIn: "44-46", chestCm: "111-116", waistIn: "38-40", waistCm: "96-101", lengthIn: "32", lengthCm: "81" }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl animate-scale-up my-auto p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-black" />
            <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
              QISSA Official Size Chart
            </h2>
          </div>
          <button
            onClick={() => setSizeGuideOpen(false)}
            className="p-2 hover:bg-zinc-100 rounded-full text-zinc-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center justify-between py-4">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Standard Measurements
          </span>
          <div className="flex items-center bg-zinc-100 p-1 rounded-full text-xs font-bold">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 rounded-full transition-colors ${unit === 'in' ? 'bg-black text-white' : 'text-zinc-600'}`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-full transition-colors ${unit === 'cm' ? 'bg-black text-white' : 'text-zinc-600'}`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Size Table */}
        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900 mb-2">
              Women's Co-ords, Dresses & Anarkalis
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-zinc-200 rounded-xl overflow-hidden">
                <thead className="bg-zinc-100 font-bold uppercase text-zinc-700">
                  <tr>
                    <th className="p-2.5">Size</th>
                    <th className="p-2.5">Bust ({unit})</th>
                    <th className="p-2.5">Waist ({unit})</th>
                    <th className="p-2.5">Hip ({unit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {womenSizes.map((row, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50">
                      <td className="p-2.5 font-bold text-black">{row.size}</td>
                      <td className="p-2.5 text-zinc-600">{unit === 'in' ? row.bustIn : row.bustCm}</td>
                      <td className="p-2.5 text-zinc-600">{unit === 'in' ? row.waistIn : row.waistCm}</td>
                      <td className="p-2.5 text-zinc-600">{unit === 'in' ? row.hipIn : row.hipCm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900 mb-2">
              Men's & Unisex Streetwear / Bandhgalas
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-zinc-200 rounded-xl overflow-hidden">
                <thead className="bg-zinc-100 font-bold uppercase text-zinc-700">
                  <tr>
                    <th className="p-2.5">Size</th>
                    <th className="p-2.5">Chest ({unit})</th>
                    <th className="p-2.5">Waist ({unit})</th>
                    <th className="p-2.5">Garment Length ({unit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {menSizes.map((row, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50">
                      <td className="p-2.5 font-bold text-black">{row.size}</td>
                      <td className="p-2.5 text-zinc-600">{unit === 'in' ? row.chestIn : row.chestCm}</td>
                      <td className="p-2.5 text-zinc-600">{unit === 'in' ? row.waistIn : row.waistCm}</td>
                      <td className="p-2.5 text-zinc-600">{unit === 'in' ? row.lengthIn : row.lengthCm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Custom Tailoring Advice Box */}
        <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-emerald-950">
            <strong className="block font-bold">Need a Custom Bespoke Measurement?</strong>
            <span>Send your exact height, chest & waist measurements to our master cutter on WhatsApp!</span>
          </div>
          <a
            href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Salam / Hi Qissa! 🧵 I need help with sizing advice and custom alterations for an ensemble.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#25D366] text-white rounded-full text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 shadow"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Ask Stylist on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
