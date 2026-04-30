export type Language = 'bg' | 'en' | 'ru' | 'de';

export interface MenuItem {
  name: string;         // BG
  nameEn: string;
  nameRu: string;
  nameGr: string;       // DE — field name kept for data compatibility
  description?: string;       // EN / default fallback
  descriptionBg?: string;
  descriptionRu?: string;
  descriptionGr?: string;     // DE
  price?: string;
  weight?: string;
  ml?: string;
  image?: string;
  badge?: 'best' | 'chef' | 'favorite';
  allergens?: number[];
  subCategory?: string;
}

export interface MenuSection {
  id: string;
  title: string;        // BG
  titleEn: string;
  titleRu: string;
  titleGr: string;      // DE
  emoji: string;
  items: MenuItem[];
  note?: string;        // EN / default fallback
  noteBg?: string;
  noteRu?: string;
  noteDe?: string;
}
