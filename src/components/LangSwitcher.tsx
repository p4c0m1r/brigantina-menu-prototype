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
          className={`flex items-center gap-1 font-bold transition-all ${
            compact ? 'px-1.5 py-1 text-sm' : 'px-2.5 py-1.5 text-xs'
          } ${lang === o.code ? 'lang-active' : 'lang-inactive'}`}
        >
          <span>{o.flag}</span>
          {!compact && <span>{o.label}</span>}
        </button>
      ))}
    </div>
  );
}
