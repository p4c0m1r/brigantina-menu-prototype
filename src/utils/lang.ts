import type { Language, MenuItem, MenuSection } from '../types/menu';

export function getItemName(item: MenuItem, lang: Language): string {
  switch (lang) {
    case 'en': return item.nameEn;
    case 'ru': return item.nameRu;
    case 'de': return item.nameGr;
    default:   return item.name;
  }
}

export function getItemDescription(item: MenuItem, lang: Language): string | undefined {
  switch (lang) {
    case 'bg': return item.descriptionBg ?? item.description;
    case 'ru': return item.descriptionRu ?? item.description;
    case 'de': return item.descriptionGr ?? item.description;
    default:   return item.description;
  }
}

export function getSectionTitle(section: MenuSection, lang: Language): string {
  switch (lang) {
    case 'en': return section.titleEn;
    case 'ru': return section.titleRu;
    case 'de': return section.titleGr;
    default:   return section.title;
  }
}

export function getSectionNote(section: MenuSection, lang: Language): string | undefined {
  switch (lang) {
    case 'bg': return section.noteBg ?? section.note;
    case 'ru': return section.noteRu ?? section.note;
    case 'de': return section.noteDe ?? section.note;
    default:   return section.note;
  }
}
