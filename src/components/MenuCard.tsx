import { useState } from 'react';
import type { MenuItem } from '../types/menu';

const badgeConfig = {
  best:     { label: '★ Best Choice', color: 'bg-red-600 text-white' },
  chef:     { label: '★ Chef Pick',   color: 'bg-[#c9a84c] text-[#0a1628]' },
  favorite: { label: '♥ Favorite',    color: 'bg-rose-500 text-white' },
};

interface Props {
  item: MenuItem;
  clickable?: boolean;
}

export default function MenuCard({ item, clickable = false }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <div
        onClick={() => clickable && setOpen(true)}
        className={`menu-card bg-[#0d1f3c] border border-[#c9a84c]/20 rounded-xl p-4 flex flex-col gap-2 hover:border-[#c9a84c]/60 hover:shadow-lg hover:shadow-[#c9a84c]/10 ${
          clickable ? 'cursor-pointer' : ''
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-white font-semibold text-base leading-tight">{item.name}</p>
              {clickable && (
                <span className="text-[#c9a84c]/60 text-xs">📷</span>
              )}
            </div>
            <p className="text-[#8ab4d4] text-xs mt-0.5">{item.nameEn}</p>
            <p className="text-[#5a7a9a] text-xs">{item.nameRu}</p>
            <p className="text-[#5a7a9a] text-xs">{item.nameGr}</p>
          </div>
          {item.badge && (
            <span className={`badge-pulse flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${badgeConfig[item.badge].color}`}>
              {badgeConfig[item.badge].label}
            </span>
          )}
        </div>

        {item.description && (
          <p className="text-[#6a8aaa] text-xs leading-relaxed border-t border-white/5 pt-2">
            {item.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
          <div className="flex gap-1 flex-wrap">
            {item.allergens?.map((a) => (
              <span key={a} className="text-[10px] bg-white/5 text-[#8ab4d4] border border-white/10 rounded px-1.5 py-0.5">
                {a}
              </span>
            ))}
          </div>
          {item.price && (
            <span className="text-[#c9a84c] font-bold text-sm ml-2 whitespace-nowrap">
              {item.price} лв.
            </span>
          )}
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-[#0d1f3c] border border-[#c9a84c]/40 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl shadow-black/60"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image area */}
            <div className="w-full h-64 bg-[#071020] flex items-center justify-center border-b border-[#c9a84c]/20">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.nameEn}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-[#4a6a8a]">
                  <span className="text-5xl">🍽️</span>
                  <p className="text-xs">Image coming soon</p>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-white font-bold text-lg">{item.name}</h3>
                  <p className="text-[#8ab4d4] text-sm">{item.nameEn}</p>
                  <p className="text-[#5a7a9a] text-xs">{item.nameRu} · {item.nameGr}</p>
                </div>
                {item.price && (
                  <span className="text-[#c9a84c] font-bold text-xl whitespace-nowrap">
                    {item.price} лв.
                  </span>
                )}
              </div>

              {item.description && (
                <p className="text-[#6a8aaa] text-sm leading-relaxed mb-3">
                  {item.description}
                </p>
              )}

              {item.allergens && item.allergens.length > 0 && (
                <div className="flex gap-1 flex-wrap mb-4">
                  {item.allergens.map((a) => (
                    <span key={a} className="text-[10px] bg-white/5 text-[#8ab4d4] border border-white/10 rounded px-1.5 py-0.5">
                      Allergen {a}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={() => setOpen(false)}
                className="w-full py-2 rounded-lg border border-[#c9a84c]/40 text-[#c9a84c] text-sm font-semibold hover:bg-[#c9a84c]/10 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}