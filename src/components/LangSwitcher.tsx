import type { Language } from '../types/menu';
import { useLang } from '../context/LanguageContext';

const options: { code: Language; label: string; flag: string }[] = [
  { code: 'bg', label: 'БГ', flag: '🇧🇬' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'ru', label: 'РУ', flag: '🇷🇺' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
];

interface Props {
  compact?: boolean;
}

export default function LangSwitcher({ compact = false }: Props) {
  const { lang, setLang } = useLang();

  return (
    <div className={`flex ${compact ? 'gap-0.5' : 'gap-1'}`}>
      {options.map((o) => (
        <button
          key={o.code}
          onClick={() => setLang(o.code)}
          title={o.label}
          className={`flex items-center gap-1 rounded-lg font-bold transition-all ${
            compact ? 'px-1.5 py-1 text-sm' : 'px-2.5 py-1.5 text-xs'
          } ${
            lang === o.code
              ? 'bg-[#c9a84c] text-[#0a1628]'
              : 'text-[#8ab4d4] hover:bg-white/10'
          }`}
        >
          <span>{o.flag}</span>
          {!compact && <span>{o.label}</span>}
        </button>
      ))}
    </div>
  );
}
