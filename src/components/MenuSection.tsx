import type { MenuSection as MenuSectionType } from '../types/menu';
import MenuCard from './MenuCard';

interface Props {
  section: MenuSectionType;
}

function isClickable(sectionId: string, itemNameEn: string): boolean {
  if (sectionId === 'drinks') return false;
  if (sectionId === 'toasts' && itemNameEn !== 'Club Sandwich') return false;
  return true;
}

export default function MenuSection({ section }: Props) {
  return (
    <section id={section.id} className="scroll-mt-20 py-8 px-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a84c]/40" />
        <div className="text-center">
          <span className="text-3xl">{section.emoji}</span>
          <h2 className="text-[#c9a84c] font-bold text-xl tracking-widest uppercase">
            {section.title}
          </h2>
          <p className="text-[#8ab4d4] text-xs tracking-widest uppercase">
            {section.titleEn} · {section.titleRu} · {section.titleGr}
          </p>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a84c]/40" />
      </div>

      {section.note && (
        <p className="text-center text-[#8ab4d4] text-xs italic mb-5 border border-[#c9a84c]/20 rounded-lg py-2 px-4 bg-[#c9a84c]/5">
          {section.note}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {section.items.map((item) => (
          <MenuCard
            key={item.name}
            item={item}
            clickable={isClickable(section.id, item.nameEn)}
          />
        ))}
      </div>
    </section>
  );
}