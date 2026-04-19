import type { MenuSection } from '../types/menu';

interface Props {
  sections: MenuSection[];
  active: string;
  onSelect: (id: string) => void;
}

export default function NavBar({ sections, active, onSelect }: Props) {
  return (
    <nav className="sticky top-0 z-20 bg-[#0a1628] border-b border-[#c9a84c]/30 shadow-lg">
      <div className="flex overflow-x-auto gap-1 px-2 py-2">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              active === s.id
                ? 'bg-[#c9a84c] text-[#0a1628]'
                : 'text-[#8ab4d4] hover:bg-white/10'
            }`}
          >
            <span className="text-lg">{s.emoji}</span>
            <span className="whitespace-nowrap">{s.titleEn}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}