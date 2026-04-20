import { useState } from 'react';
import type { MenuItem } from '../types/menu';
import { useLang } from '../context/LanguageContext';
import { getItemName, getItemDescription } from '../utils/lang';
import AllergenIcon from './AllergenIcon';

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
  const [imgFailed, setImgFailed] = useState(false);
  const { lang } = useLang();
  const displayName = getItemName(item, lang);
  const description = getItemDescription(item, lang);
  const showThumb = !!item.image && !imgFailed;

  return (
    <>
      <div
        onClick={() => clickable && setOpen(true)}
        className={`menu-card bg-[#0d1f3c] border border-[#c9a84c]/20 rounded-xl overflow-hidden flex flex-col hover:border-[#c9a84c]/60 hover:shadow-lg hover:shadow-[#c9a84c]/10 transition-all ${
          clickable ? 'cursor-pointer' : ''
        }`}
      >
        {/* Thumbnail */}
        {showThumb && (
          <div className="relative w-full h-44 overflow-hidden flex-shrink-0">
            <img
              src={item.image}
              alt={item.nameEn}
              className="w-full h-full object-cover"
              onError={() => setImgFailed(true)}
            />
            {item.badge && (
              <span className={`absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full shadow-md ${badgeConfig[item.badge].color}`}>
                {badgeConfig[item.badge].label}
              </span>
            )}
          </div>
        )}

        <div className="p-4 flex flex-col gap-2 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-base leading-tight">{displayName}</p>
              {/* Show BG original as subtitle only when not already in BG */}
              {lang !== 'bg' && (
                <p className="text-[#5a7a9a] text-xs mt-0.5 truncate">{item.name}</p>
              )}
            </div>
            {item.badge && !showThumb && (
              <span className={`badge-pulse flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${badgeConfig[item.badge].color}`}>
                {badgeConfig[item.badge].label}
              </span>
            )}
          </div>

          {description && (
            <p className="text-[#6a8aaa] text-xs leading-relaxed border-t border-white/5 pt-2">
              {description}
            </p>
          )}

          <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
            <div className="flex gap-1 flex-wrap">
              {item.allergens?.map((a) => (
                <AllergenIcon key={a} number={a} />
              ))}
            </div>
            {item.price && (
              <span className="text-[#c9a84c] font-bold text-sm ml-2 whitespace-nowrap">
                {item.price} лв.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-[#0d1f3c] border border-[#c9a84c]/40 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl shadow-black/60 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-64 bg-[#071020] flex-shrink-0 flex items-center justify-center border-b border-[#c9a84c]/20">
              {item.image && !imgFailed ? (
                <img
                  src={item.image}
                  alt={item.nameEn}
                  className="w-full h-full object-cover"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-[#4a6a8a]">
                  <span className="text-5xl">🍽️</span>
                  <p className="text-xs">Image coming soon</p>
                </div>
              )}
            </div>

            <div className="p-5 overflow-y-auto flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">{displayName}</h3>
                  <p className="text-[#5a7a9a] text-xs mt-1">{item.name} · {item.nameEn}</p>
                  <p className="text-[#5a7a9a] text-xs">{item.nameRu} · {item.nameGr}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  {item.badge && (
                    <span className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${badgeConfig[item.badge].color}`}>
                      {badgeConfig[item.badge].label}
                    </span>
                  )}
                  {item.price && (
                    <span className="text-[#c9a84c] font-bold text-xl whitespace-nowrap">
                      {item.price} лв.
                    </span>
                  )}
                </div>
              </div>

              {description && (
                <p className="text-[#6a8aaa] text-sm leading-relaxed border-t border-white/5 pt-3">
                  {description}
                </p>
              )}

              {item.allergens && item.allergens.length > 0 && (
                <div className="border-t border-white/5 pt-3">
                  <p className="text-[#8ab4d4] text-[10px] font-semibold uppercase tracking-widest mb-2">
                    Allergens · Алергени
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    {item.allergens.map((a) => (
                      <AllergenIcon key={a} number={a} showLabel />
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setOpen(false)}
                className="w-full py-2 rounded-lg border border-[#c9a84c]/40 text-[#c9a84c] text-sm font-semibold hover:bg-[#c9a84c]/10 transition-all mt-1"
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
