export interface MenuItem {
  name: string;
  nameEn: string;
  nameRu: string;
  nameGr: string;
  description?: string;
  price?: string;
  image?: string;
  badge?: 'best' | 'chef' | 'favorite';
  allergens?: number[];
}

export interface MenuSection {
  id: string;
  title: string;
  titleEn: string;
  titleRu: string;
  titleGr: string;
  emoji: string;
  items: MenuItem[];
  note?: string;
}