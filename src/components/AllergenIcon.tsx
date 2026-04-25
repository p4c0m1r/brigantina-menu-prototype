import { useState, useEffect, useRef } from 'react';

export const allergenInfo: Record<number, { emoji: string; label: string; name: string; bg: string; border: string; color: string }> = {
  1:  { emoji: '🌾', label: 'Gluten',    name: 'Cereals containing gluten',       bg: 'var(--allergen-1-bg)',  border: 'var(--allergen-1-border)',  color: 'var(--allergen-1-fg)'  },
  2:  { emoji: '🌰', label: 'Nuts',      name: 'Tree nuts',                       bg: 'var(--allergen-2-bg)',  border: 'var(--allergen-2-border)',  color: 'var(--allergen-2-fg)'  },
  3:  { emoji: '🥜', label: 'Peanuts',   name: 'Peanuts',                         bg: 'var(--allergen-3-bg)',  border: 'var(--allergen-3-border)',  color: 'var(--allergen-3-fg)'  },
  4:  { emoji: '🥚', label: 'Eggs',      name: 'Eggs',                            bg: 'var(--allergen-4-bg)',  border: 'var(--allergen-4-border)',  color: 'var(--allergen-4-fg)'  },
  5:  { emoji: '🥛', label: 'Milk',      name: 'Milk & dairy products',           bg: 'var(--allergen-5-bg)',  border: 'var(--allergen-5-border)',  color: 'var(--allergen-5-fg)'  },
  6:  { emoji: '🐟', label: 'Fish',      name: 'Fish',                            bg: 'var(--allergen-6-bg)',  border: 'var(--allergen-6-border)',  color: 'var(--allergen-6-fg)'  },
  7:  { emoji: '🦐', label: 'Crust.',    name: 'Crustaceans',                     bg: 'var(--allergen-7-bg)',  border: 'var(--allergen-7-border)',  color: 'var(--allergen-7-fg)'  },
  8:  { emoji: '🦑', label: 'Molluscs',  name: 'Molluscs',                        bg: 'var(--allergen-8-bg)',  border: 'var(--allergen-8-border)',  color: 'var(--allergen-8-fg)'  },
  9:  { emoji: '🫘', label: 'Soy',       name: 'Soybeans',                        bg: 'var(--allergen-9-bg)',  border: 'var(--allergen-9-border)',  color: 'var(--allergen-9-fg)'  },
  10: { emoji: '🌻', label: 'Sesame',    name: 'Sesame seeds',                    bg: 'var(--allergen-10-bg)', border: 'var(--allergen-10-border)', color: 'var(--allergen-10-fg)' },
  11: { emoji: '🌿', label: 'Celery',    name: 'Celery',                          bg: 'var(--allergen-11-bg)', border: 'var(--allergen-11-border)', color: 'var(--allergen-11-fg)' },
  12: { emoji: '🟡', label: 'Mustard',   name: 'Mustard',                         bg: 'var(--allergen-12-bg)', border: 'var(--allergen-12-border)', color: 'var(--allergen-12-fg)' },
  13: { emoji: '🌸', label: 'Lupin',     name: 'Lupin',                           bg: 'var(--allergen-13-bg)', border: 'var(--allergen-13-border)',  color: 'var(--allergen-13-fg)' },
  14: { emoji: '⚗️', label: 'SO₂',      name: 'Sulphur dioxide & sulphites',     bg: 'var(--allergen-14-bg)', border: 'var(--allergen-14-border)', color: 'var(--allergen-14-fg)' },
};

interface Props {
  number: number;
  showLabel?: boolean;
}

export default function AllergenIcon({ number, showLabel = false }: Props) {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const info = allergenInfo[number];
  if (!info) return null;

  const showTooltip = !showLabel && (hovered || pinned);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPinned((prev) => !prev);
  };

  useEffect(() => {
    if (!pinned) return;
    const dismiss = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setPinned(false);
      }
    };
    document.addEventListener('click', dismiss);
    document.addEventListener('touchstart', dismiss);
    return () => {
      document.removeEventListener('click', dismiss);
      document.removeEventListener('touchstart', dismiss);
    };
  }, [pinned]);

  return (
    <div
      ref={ref}
      className="relative inline-flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <span
        className="inline-flex items-center gap-0.5 text-[10px] rounded px-1.5 py-0.5 border select-none cursor-help font-semibold leading-none"
        style={{ background: info.bg, borderColor: info.border, color: info.color }}
      >
        <span className="text-[11px] leading-none">{info.emoji}</span>
        <span>{number}</span>
        {showLabel && <span className="ml-0.5 font-medium tracking-wide">{info.label}</span>}
      </span>

      {showTooltip && (
        <div className="allergen-tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-30">
          <span className="font-semibold">{number}.</span> {info.name}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
            style={{ borderTopColor: 'var(--color-tooltip-bg)' }} />
        </div>
      )}
    </div>
  );
}
