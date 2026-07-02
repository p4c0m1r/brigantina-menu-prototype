import type { MenuSection as MenuSectionType } from '../types/menu';
import { useLang } from '../context/LanguageContext';
import { getSectionTitle } from '../utils/lang';
import MenuCard from './MenuCard';
import { getSectionNote } from '../utils/lang';
import { useInView } from '../utils/useInView';

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
  const { ref, inView } = useInView<HTMLElement>();

  // Group drink items by subCategory
  const subCategories = section.id === 'drinks'
    ? [...new Set(section.items.map((i) => i.subCategory).filter(Boolean))] as string[]
    : [];

  return (
    <section
      id={section.id}
      ref={ref}
      className={`scroll-mt-20 py-8 px-4 section-reveal ${inView ? 'revealed' : ''}`}
    >
      {/* Section header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="section-divider-line" />
        <div className="text-center">
          <span className="text-3xl block mb-1">{section.emoji}</span>
          <h2 className="font-display text-text-accent font-bold text-2xl tracking-widest uppercase">
            {getSectionTitle(section, lang)}
          </h2>
          <p className="text-text-muted text-xs tracking-widest uppercase mt-1">
            {section.titleEn} · {section.titleRu} · {section.titleGr}
          </p>
        </div>
        <div className="section-divider-line-reverse" />
      </div>

      {getSectionNote(section, lang) && (
        <p className="section-note mb-5">
          {getSectionNote(section, lang)}
        </p>
      )}

      {/* Drinks: grouped by subcategory */}
      {section.id === 'drinks' ? (
        <div className="flex flex-col gap-8">
          {subCategories.map((sub) => (
            <div key={sub}>
              <h3 className="subcategory-label">{sub}</h3>
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
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4${section.id === 'toasts' ? ' lg:items-start' : ''}`}>
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