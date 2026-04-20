import type { MenuSection as MenuSectionType } from '../types/menu';
import { useLang } from '../context/LanguageContext';
import { getSectionTitle } from '../utils/lang';
import MenuCard from './MenuCard';
import { getSectionNote } from '../utils/lang';

interface Props {
  section: MenuSectionType;
}

const NON_CLICKABLE = new Set(['drinks', 'addons', 'sauces', 'focaccia', 'nuts']);

function isClickable(sectionId: string, itemNameEn: string): boolean {
  if (NON_CLICKABLE.has(sectionId)) return false;
  if (sectionId === 'toasts') return itemNameEn === 'Club Sandwich';
  return true;
}

export default function MenuSection({ section }: Props) {
  const { lang } = useLang();

  // Group drink items by subCategory
  const subCategories = section.id === 'drinks'
    ? [...new Set(section.items.map((i) => i.subCategory).filter(Boolean))] as string[]
    : [];

  return (
    <section id={section.id} className="scroll-mt-20 py-8 px-4">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a84c]/40" />
        <div className="text-center">
          <span className="text-3xl">{section.emoji}</span>
          <h2 className="text-[#c9a84c] font-bold text-xl tracking-widest uppercase">
            {getSectionTitle(section, lang)}
          </h2>
          <p className="text-[#8ab4d4] text-xs tracking-widest uppercase">
            {section.titleEn} · {section.titleRu} · {section.titleGr}
          </p>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a84c]/40" />
      </div>

      {getSectionNote(section, lang) && (
        <p className="text-center text-[#8ab4d4] text-xs italic mb-5 border border-[#c9a84c]/20 rounded-lg py-2 px-4 bg-[#c9a84c]/5">
          {getSectionNote(section, lang)}
        </p>
      )}

      {/* Drinks: grouped by subcategory */}
      {section.id === 'drinks' ? (
        <div className="flex flex-col gap-8">
          {subCategories.map((sub) => (
            <div key={sub}>
              <h3 className="text-[#c9a84c]/80 text-xs font-bold tracking-widest uppercase mb-3 pb-1 border-b border-[#c9a84c]/20">
                {sub}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {section.items
                  .filter((i) => i.subCategory === sub)
                  .map((item) => (
                    <MenuCard key={item.name} item={item} clickable={false} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {section.items.map((item) => (
            <MenuCard
              key={item.name}
              item={item}
              clickable={isClickable(section.id, item.nameEn)}
            />
          ))}
        </div>
      )}
    </section>
  );
}