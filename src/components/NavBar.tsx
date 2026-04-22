import type { MenuSection } from '../types/menu';
import { useLang } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { getSectionTitle } from '../utils/lang';
import LangSwitcher from './LangSwitcher';

interface Props {
  sections: MenuSection[];
  active: string;
  onSelect: (id: string) => void;
}

export default function NavBar({ sections, active, onSelect }: Props) {
  const { lang } = useLang();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="nav-glass sticky top-0 z-20">
      <div className="flex items-stretch">

        {/* Mobile: styled dropdown */}
        <div className="flex-1 min-w-0 flex items-center px-2 py-2 md:hidden">
          <div className="relative flex-1">
            <select
              value={active}
              onChange={(e) => onSelect(e.target.value)}
              className="nav-dropdown w-full pl-3 pr-8 py-2 text-sm font-medium appearance-none cursor-pointer"
            >
              {sections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.emoji} {getSectionTitle(s, lang)}
                </option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-accent text-xs">
              ▾
            </span>
          </div>
        </div>

        {/* Desktop: scrollable section tabs */}
        <div className="hidden md:flex flex-1 min-w-0 overflow-x-auto">
          <div className="flex gap-1 px-2 py-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelect(s.id)}
                className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 text-xs font-medium ${
                  active === s.id ? 'nav-tab-active' : 'nav-tab'
                }`}
              >
                <span className="text-lg">{s.emoji}</span>
                <span className="whitespace-nowrap">{getSectionTitle(s, lang)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Theme toggle + language switcher */}
        <div className="flex-shrink-0 flex items-center gap-1 px-2 border-l border-border-accent-20">
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="px-1.5 py-1 rounded-lg text-base transition-all text-text-secondary hover:bg-surface-hover"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <LangSwitcher compact />
        </div>
      </div>
    </nav>
  );
}
