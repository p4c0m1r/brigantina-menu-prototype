import { useEffect, useRef } from 'react';
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
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Keep the active chip centered in the mobile scroll row
  useEffect(() => {
    chipRefs.current[active]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [active]);

  return (
    <nav className="nav-glass sticky top-0 z-20">
      <div className="flex items-stretch">

        {/* Mobile: horizontally scrollable chips */}
        <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar md:hidden">
          <div className="flex gap-1.5 px-2 py-2">
            {sections.map((s) => (
              <button
                key={s.id}
                ref={(el) => { chipRefs.current[s.id] = el; }}
                onClick={() => onSelect(s.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 text-xs font-medium ${
                  active === s.id ? 'nav-chip-active' : 'nav-chip'
                }`}
              >
                <span className="text-base leading-none">{s.emoji}</span>
                <span className="whitespace-nowrap">{getSectionTitle(s, lang)}</span>
              </button>
            ))}
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
            className="px-2 py-2 rounded-lg text-base transition-all text-text-secondary hover:bg-surface-hover"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <LangSwitcher compact />
        </div>
      </div>
    </nav>
  );
}
