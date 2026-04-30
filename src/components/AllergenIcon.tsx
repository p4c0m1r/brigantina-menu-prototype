import { useState, useEffect, useRef } from 'react';
import type { Language } from '../types/menu';
import { useLang } from '../context/LanguageContext';

type AllergenTranslations = { bg: string; en: string; ru: string; de: string };

export const allergenInfo: Record<number, {
  emoji: string;
  label: AllergenTranslations;
  name: AllergenTranslations;
  bg: string; border: string; color: string;
}> = {
  1:  { emoji: '🌾', label: { bg: 'Глутен',    en: 'Gluten',    ru: 'Глютен',     de: 'Gluten'    }, name: { bg: 'Зърнени с глутен',          en: 'Cereals containing gluten',   ru: 'Зерновые с глютеном',          de: 'Glutenhaltiges Getreide'    }, bg: 'var(--allergen-1-bg)',  border: 'var(--allergen-1-border)',  color: 'var(--allergen-1-fg)'  },
  2:  { emoji: '🌰', label: { bg: 'Ядки',       en: 'Nuts',      ru: 'Орехи',      de: 'Nüsse'     }, name: { bg: 'Черупкови ядки',            en: 'Tree nuts',                   ru: 'Орехи',                        de: 'Schalenfrüchte'             }, bg: 'var(--allergen-2-bg)',  border: 'var(--allergen-2-border)',  color: 'var(--allergen-2-fg)'  },
  3:  { emoji: '🥜', label: { bg: 'Фъстъци',    en: 'Peanuts',   ru: 'Арахис',     de: 'Erdnüsse'  }, name: { bg: 'Фъстъци',                   en: 'Peanuts',                     ru: 'Арахис',                       de: 'Erdnüsse'                   }, bg: 'var(--allergen-3-bg)',  border: 'var(--allergen-3-border)',  color: 'var(--allergen-3-fg)'  },
  4:  { emoji: '🥚', label: { bg: 'Яйца',       en: 'Eggs',      ru: 'Яйца',       de: 'Eier'      }, name: { bg: 'Яйца',                      en: 'Eggs',                        ru: 'Яйца',                         de: 'Eier'                       }, bg: 'var(--allergen-4-bg)',  border: 'var(--allergen-4-border)',  color: 'var(--allergen-4-fg)'  },
  5:  { emoji: '🥛', label: { bg: 'Мляко',      en: 'Milk',      ru: 'Молоко',     de: 'Milch'     }, name: { bg: 'Мляко и млечни продукти',   en: 'Milk & dairy products',       ru: 'Молоко и молочные продукты',   de: 'Milch und Milcherzeugnisse' }, bg: 'var(--allergen-5-bg)',  border: 'var(--allergen-5-border)',  color: 'var(--allergen-5-fg)'  },
  6:  { emoji: '🐟', label: { bg: 'Риба',       en: 'Fish',      ru: 'Рыба',       de: 'Fisch'     }, name: { bg: 'Риба',                      en: 'Fish',                        ru: 'Рыба',                         de: 'Fisch'                      }, bg: 'var(--allergen-6-bg)',  border: 'var(--allergen-6-border)',  color: 'var(--allergen-6-fg)'  },
  7:  { emoji: '🦐', label: { bg: 'Ракообр.',   en: 'Crust.',    ru: 'Ракообр.',   de: 'Krebst.'   }, name: { bg: 'Ракообразни',               en: 'Crustaceans',                 ru: 'Ракообразные',                 de: 'Krebstiere'                 }, bg: 'var(--allergen-7-bg)',  border: 'var(--allergen-7-border)',  color: 'var(--allergen-7-fg)'  },
  8:  { emoji: '🦑', label: { bg: 'Мекотели',   en: 'Molluscs',  ru: 'Моллюски',   de: 'Weicht.'   }, name: { bg: 'Мекотели',                  en: 'Molluscs',                    ru: 'Моллюски',                     de: 'Weichtiere'                 }, bg: 'var(--allergen-8-bg)',  border: 'var(--allergen-8-border)',  color: 'var(--allergen-8-fg)'  },
  9:  { emoji: '🫘', label: { bg: 'Соя',        en: 'Soy',       ru: 'Соя',        de: 'Soja'      }, name: { bg: 'Соеви зърна',               en: 'Soybeans',                    ru: 'Соевые бобы',                  de: 'Sojabohnen'                 }, bg: 'var(--allergen-9-bg)',  border: 'var(--allergen-9-border)',  color: 'var(--allergen-9-fg)'  },
  10: { emoji: '🌻', label: { bg: 'Сусам',      en: 'Sesame',    ru: 'Кунжут',     de: 'Sesam'     }, name: { bg: 'Сусамови семена',           en: 'Sesame seeds',                ru: 'Семена кунжута',               de: 'Sesamsamen'                 }, bg: 'var(--allergen-10-bg)', border: 'var(--allergen-10-border)', color: 'var(--allergen-10-fg)' },
  11: { emoji: '🌿', label: { bg: 'Целина',     en: 'Celery',    ru: 'Сельдерей',  de: 'Sellerie'  }, name: { bg: 'Целина',                    en: 'Celery',                      ru: 'Сельдерей',                    de: 'Sellerie'                   }, bg: 'var(--allergen-11-bg)', border: 'var(--allergen-11-border)', color: 'var(--allergen-11-fg)' },
  12: { emoji: '🟡', label: { bg: 'Горчица',    en: 'Mustard',   ru: 'Горчица',    de: 'Senf'      }, name: { bg: 'Горчица',                   en: 'Mustard',                     ru: 'Горчица',                      de: 'Senf'                       }, bg: 'var(--allergen-12-bg)', border: 'var(--allergen-12-border)', color: 'var(--allergen-12-fg)' },
  13: { emoji: '🌸', label: { bg: 'Лупина',     en: 'Lupin',     ru: 'Люпин',      de: 'Lupinen'   }, name: { bg: 'Лупина',                    en: 'Lupin',                       ru: 'Люпин',                        de: 'Lupinen'                    }, bg: 'var(--allergen-13-bg)', border: 'var(--allergen-13-border)', color: 'var(--allergen-13-fg)' },
  14: { emoji: '⚗️', label: { bg: 'SO₂',       en: 'SO₂',       ru: 'SO₂',        de: 'SO₂'       }, name: { bg: 'Серен диоксид и сулфити',   en: 'Sulphur dioxide & sulphites', ru: 'Диоксид серы и сульфиты',      de: 'Schwefeldioxid und Sulfite' }, bg: 'var(--allergen-14-bg)', border: 'var(--allergen-14-border)', color: 'var(--allergen-14-fg)' },
};

function t(translations: AllergenTranslations, lang: Language): string {
  return translations[lang] ?? translations.en;
}

interface Props {
  number: number;
  showLabel?: boolean;
}

export default function AllergenIcon({ number, showLabel = false }: Props) {
  const { lang } = useLang();
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [side, setSide] = useState<'center' | 'left' | 'right'>('center');
  const ref = useRef<HTMLDivElement>(null);
  const info = allergenInfo[number];
  if (!info) return null;

  const showTooltip = !showLabel && (hovered || pinned);

  const computeSide = () => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const vw = window.innerWidth;
    if (rect.left < 96) setSide('left');
    else if (rect.right > vw - 96) setSide('right');
    else setSide('center');
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    computeSide();
    setPinned((prev) => !prev);
  };

  useEffect(() => {
    if (hovered) computeSide();
  }, [hovered]);

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

  const tooltipPos =
    side === 'left'  ? 'left-0' :
    side === 'right' ? 'right-0' :
    'left-1/2 -translate-x-1/2';

  const caretPos =
    side === 'left'  ? 'left-2' :
    side === 'right' ? 'right-2' :
    'left-1/2 -translate-x-1/2';

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
        {showLabel && <span className="ml-0.5 font-medium tracking-wide">{t(info.label, lang)}</span>}
      </span>

      {showTooltip && (
        <div className={`allergen-tooltip absolute bottom-full mb-1.5 z-30 ${tooltipPos}`}>
          <span className="font-semibold">{number}.</span> {t(info.name, lang)}
          <div className={`absolute top-full border-4 border-transparent ${caretPos}`}
            style={{ borderTopColor: 'var(--color-tooltip-bg)' }} />
        </div>
      )}
    </div>
  );
}
