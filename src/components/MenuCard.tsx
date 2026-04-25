import { useState } from 'react';
import type { MenuItem } from '../types/menu';
import { useLang } from '../context/LanguageContext';
import { getItemName, getItemDescription } from '../utils/lang';
import AllergenIcon from './AllergenIcon';

const badgeConfig = {
  best:     { label: '★ Best Choice', cls: 'badge-best' },
  chef:     { label: '★ Chef Pick',   cls: 'badge-chef' },
  favorite: { label: '♥ Favorite',    cls: 'badge-favorite' },
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
        className={`card-glass flex flex-col ${clickable ? 'cursor-pointer' : ''}`}
      >
        {/* Thumbnail */}
        {showThumb && (
          <div className="relative w-full h-44 overflow-hidden flex-shrink-0 rounded-t-[1rem]">
            <img
              src={item.image}
              alt={item.nameEn}
              className="w-full h-full object-cover"
              onError={() => setImgFailed(true)}
            />
            {item.badge && (
              <span className={`absolute top-2 right-2 ${badgeConfig[item.badge].cls}`}>
                {badgeConfig[item.badge].label}
              </span>
            )}
          </div>
        )}

        <div className="p-4 flex flex-col gap-2 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-text-primary font-semibold text-base leading-tight">{displayName}</p>
              {lang !== 'bg' && (
                <p className="text-text-dim text-xs mt-0.5 truncate">{item.name}</p>
              )}
            </div>
            {item.badge && !showThumb && (
              <span className={`flex-shrink-0 ${badgeConfig[item.badge].cls}`}>
                {badgeConfig[item.badge].label}
              </span>
            )}
          </div>

          {description && (
            <p className="text-text-muted text-xs leading-relaxed border-t border-border-subtle pt-2">
              {description}
            </p>
          )}

          <div className="flex items-center justify-between mt-auto pt-2 border-t border-border-subtle">
            <div className="flex gap-1 flex-wrap">
              {item.allergens?.map((a) => (
                <AllergenIcon key={a} number={a} />
              ))}
            </div>
            <div className="flex items-center gap-2 ml-2">
              {item.ml && (
                <span className="text-text-dim text-xs whitespace-nowrap">{item.ml} ml</span>
              )}
              {item.price && (
                <span className="font-display text-text-accent font-bold text-sm whitespace-nowrap">
                  {item.price} лв.
                </span>
              )}
            </div>
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
            className="card-glass relative max-w-lg w-full overflow-hidden max-h-[90vh] flex flex-col"
            style={{ borderRadius: '1.25rem', boxShadow: 'var(--shadow-modal)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-64 bg-surface-modal flex-shrink-0 flex items-center justify-center border-b border-border-accent-20">
              {item.image && !imgFailed ? (
                <img
                  src={item.image}
                  alt={item.nameEn}
                  className="w-full h-full object-cover"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-text-dimmer">
                  <span className="text-5xl">🍽️</span>
                  <p className="text-xs">Image coming soon</p>
                </div>
              )}
            </div>

            <div className="p-5 overflow-y-auto flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-text-primary font-bold text-lg leading-tight">{displayName}</h3>
                  <p className="text-text-dim text-xs mt-1">{item.name} · {item.nameEn}</p>
                  <p className="text-text-dim text-xs">{item.nameRu} · {item.nameGr}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  {item.badge && (
                    <span className={`flex-shrink-0 ${badgeConfig[item.badge].cls}`}>
                      {badgeConfig[item.badge].label}
                    </span>
                  )}
                  {item.price && (
                    <span className="font-display text-text-accent font-bold text-xl whitespace-nowrap">
                      {item.price} лв.
                    </span>
                  )}
                </div>
              </div>

              {description && (
                <p className="text-text-muted text-sm leading-relaxed border-t border-border-subtle pt-3">
                  {description}
                </p>
              )}

              {item.allergens && item.allergens.length > 0 && (
                <div className="border-t border-border-subtle pt-3">
                  <p className="text-text-secondary text-[10px] font-semibold uppercase tracking-widest mb-2">
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
                className="w-full py-2 rounded-lg border border-border-accent-40 text-text-accent text-sm font-semibold hover:bg-fill-accent-5 transition-all mt-1"
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
