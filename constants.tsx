
import { Plant } from './types';

export const PLANTS: Plant[] = [
  {
    id: '1',
    name: 'Anubias Nana',
    category: 'Anubias',
    description: 'A miniature version of Anubias Nana, perfect for nano tanks and foreground detail. Extremely hardy.',
    price: 120,
    images: [
      'https://buceplant.com/cdn/shop/products/anubias-nana-30660796612808_800x533.jpg?v=1628343226&auto=format&fit=crop',
      'https://i.postimg.cc/fTCmR9nL/Whats-App-Image-2026-01-05-at-16-37-57.jpg&auto=format&fit=extend'
   
    ],
    careLevel: 'Easy',
    lightRequirement: 'Low'
  },
  {
    id: '2',
    name: 'Java Fern',
    category: 'Fern',
    description: 'Elegant, multi-lobed leaves that create a lush, textured background. Great for low-tech setups.',
    price: 50,
    images: [
      'https://images.unsplash.com/photo-1599423230689-d12df718e24c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=800&auto=format&fit=crop'
    ],
    careLevel: 'Easy',
    lightRequirement: 'Low'
  },
  {
    id: '3',
    name: 'Cryptocoryne Wendtii Brown',
    category: 'Crypt',
    description: 'A classic foreground or midground plant with beautiful bronzed-brown foliage.',
    price: 40,
    images: [
      'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1416870230247-3b4a33c47353?q=80&w=800&auto=format&fit=crop'
    ],
    careLevel: 'Moderate',
    lightRequirement: 'Medium'
  },
  {
    id: '4',
    name: 'Bucephalandra Brownie Ghost',
    category: 'Decorative',
    description: 'Rare and sought after for its metallic purple and green hues. Slow growing but stunning.',
    price: 24.00,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&auto=format&fit=crop'
    ],
    careLevel: 'Moderate',
    lightRequirement: 'Medium'
  },
  {
    id: '5',
    name: 'Amazon Sword',
    category: 'Stem',
    description: 'A centerpiece plant that grows large, providing ample cover for fish. Needs nutritious substrate.',
    price: 18.00,
    images: [
      'https://images.unsplash.com/photo-1416870230247-3b4a33c47353?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=800&auto=format&fit=crop'
    ],
    careLevel: 'Moderate',
    lightRequirement: 'Medium'
  },
  {
    id: '6',
    name: 'Silver Pothos',
    category: 'Decorative',
    description: 'Excellent for riparian growth (roots in water, leaves out). Natural nitrate filter.',
    price: 40,
    images: [
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop'
    ],
    careLevel: 'Easy',
    lightRequirement: 'Low'
  }
];

export const CATEGORIES = ['All', 'Anubias', 'Fern', 'Crypt', 'Stem', 'Decorative'];
