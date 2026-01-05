
export interface Plant {
  id: string;
  name: string;
  category: 'Anubias' | 'Fern' | 'Crypt' | 'Stem' | 'Decorative';
  description: string;
  price: number;
  images: string[];
  careLevel: 'Easy' | 'Moderate' | 'Advanced';
  lightRequirement: 'Low' | 'Medium' | 'High';
}

export interface CartItem extends Plant {
  quantity: number;
}

export type View = 'home' | 'shop' | 'about';
