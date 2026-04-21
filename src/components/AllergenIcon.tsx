import { useState } from 'react';

export const allergenInfo: Record<number, { emoji: string; label: string; name: string; bg: string; border: string; color: string }> = {
  1:  { emoji: '🌾', label: 'Gluten',    name: 'Cereals containing gluten',       bg: 'rgba(212,160,23,0.12)',  border: 'rgba(212,160,23,0.45)',  color: '#c9921a' },
  2:  { emoji: '🌰', label: 'Nuts',      name: 'Tree nuts',                       bg: 'rgba(160,82,45,0.15)',   border: 'rgba(160,82,45,0.45)',   color: '#b07040' },
  3:  { emoji: '🥜', label: 'Peanuts',   name: 'Peanuts',                         bg: 'rgba(193,127,62,0.12)', border: 'rgba(193,127,62,0.45)', color: '#b07030' },
  4:  { emoji: '🥚', label: 'Eggs',      name: 'Eggs',                            bg: 'rgba(220,190,50,0.12)', border: 'rgba(220,190,50,0.45)', color: '#b09020' },
  5:  { emoji: '🥛', label: 'Milk',      name: 'Milk & dairy products',           bg: 'rgba(150,180,220,0.12)', border: 'rgba(150,180,220,0.45)', color: '#7aA0c8' },
  6:  { emoji: '🐟', label: 'Fish',      name: 'Fish',                            bg: 'rgba(60,120,180,0.12)', border: 'rgba(60,120,180,0.45)', color: '#4a90d0' },
  7:  { emoji: '🦐', label: 'Crust.',    name: 'Crustaceans',                     bg: 'rgba(220,100,70,0.12)', border: 'rgba(220,100,70,0.45)', color: '#d06040' },
  8:  { emoji: '🦑', label: 'Molluscs',  name: 'Molluscs',                        bg: 'rgba(140,100,210,0.12)',border: 'rgba(140,100,210,0.45)',color: '#9060c8' },
  9:  { emoji: '🫘', label: 'Soy',       name: 'Soybeans',                        bg: 'rgba(90,130,30,0.12)',  border: 'rgba(90,130,30,0.45)',  color: '#60901a' },
  10: { emoji: '🌻', label: 'Sesame',    name: 'Sesame seeds',                    bg: 'rgba(210,160,20,0.12)', border: 'rgba(210,160,20,0.45)', color: '#c09010' },
  11: { emoji: '🌿', label: 'Celery',    name: 'Celery',                          bg: 'rgba(30,130,80,0.12)',  border: 'rgba(30,130,80,0.45)',  color: '#208050' },
  12: { emoji: '🟡', label: 'Mustard',   name: 'Mustard',                         bg: 'rgba(240,190,40,0.12)', border: 'rgba(240,190,40,0.45)', color: '#c09808' },
  13: { emoji: '🌸', label: 'Lupin',     name: 'Lupin',                           bg: 'rgba(210,100,200,0.12)',border: 'rgba(210,100,200,0.45)',color: '#c060b8' },
  14: { emoji: '⚗️', label: 'SO₂',      name: 'Sulphur dioxide & sulphites',     bg: 'rgba(120,120,120,0.12)',border: 'rgba(120,120,120,0.45)',color: '#909090' },
};

interface Props {
  number: number;
  showLabel?: boolean;
}

export default function AllergenIcon({ number, showLabel = false }: Props) {
  const [tooltip, setTooltip] = useState(false);
  const info = allergenInfo[number];
  if (!info) return null;

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
    >
      <span
        className="inline-flex items-center gap-0.5 text-[10px] rounded px-1.5 py-0.5 border select-none cursor-help font-semibold leading-none"
        style={{ background: info.bg, borderColor: info.border, color: info.color }}
      >
        <span className="text-[11px] leading-none">{info.emoji}</span>
        <span>{number}</span>
        {showLabel && <span className="ml-0.5 font-medium tracking-wide">{info.label}</span>}
      </span>

      {!showLabel && tooltip && (
        <div className="allergen-tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-30">
          <span className="font-semibold">{number}.</span> {info.name}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
            style={{ borderTopColor: 'var(--color-tooltip-bg)' }} />
        </div>
      )}
    </div>
  );
}
