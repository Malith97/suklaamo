export type Category = 'brownies' | 'cookies' | 'cakes';

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: string;
  description: string;
  image: string;
  tags: string[];
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: '1',
    slug: 'chocolate-strawberry-celebration-cake',
    name: 'Chocolate Strawberry Celebration Cake',
    category: 'cakes',
    price: '€45',
    description: 'Moist chocolate layers with strawberry cream and fresh berries.',
    image: '/products/img-01.webp',
    tags: ['Celebration', 'Strawberry'],
    inStock: false,
  },
  {
    id: '2',
    slug: 'rich-chocolate-brownie-tray',
    name: 'Rich Chocolate Brownie Tray',
    category: 'brownies',
    price: '€38',
    description: 'Fudgy tray of brownies with a crackly top and deep dark chocolate flavour.',
    image: '/products/img-02.webp',
    tags: ['Rich', 'Brownie'],
    inStock: true,
  },
  {
    id: '3',
    slug: 'blueberry-chocolate-layer-cake',
    name: 'Blueberry Chocolate Layer Cake',
    category: 'cakes',
    price: '€48',
    description: 'Chocolate sponge with blueberry jam and a soft cream finish.',
    image: '/products/img-03.webp',
    tags: ['Blueberry', 'Layer cake'],
    inStock: false,
  },
  {
    id: '4',
    slug: 'chocolate-cookie-box',
    name: 'Chocolate Cookie Box',
    category: 'cookies',
    price: '€35',
    description: 'A box of soft cookies loaded with chocolate and baked until golden.',
    image: '/products/img-04.webp',
    tags: ['Cookie', 'Shareable'],
    inStock: true,
  },
  {
    id: '5',
    slug: 'maple-espresso-brownie-tray',
    name: 'Maple Espresso Brownie Tray',
    category: 'brownies',
    price: '€26',
    description: 'Brownie tray with espresso notes and a touch of maple sweetness.',
    image: '/products/img-05.webp',
    tags: ['Coffee', 'Brownie'],
    inStock: true,
  },
  {
    id: '6',
    slug: 'hazelnut-chocolate-celebration-cake',
    name: 'Hazelnut Chocolate Celebration Cake',
    category: 'cakes',
    price: '€42',
    description: 'Chocolate cake with hazelnut cream and glossy ganache.',
    image: '/products/img-06.webp',
    tags: ['Hazelnut', 'Celebration'],
    inStock: false,
  },
  {
    id: '7',
    slug: 'double-chocolate-chunk-brownie',
    name: 'Double Chocolate Chunk Brownie',
    category: 'brownies',
    price: '€22',
    description: 'Dense brownie studded with chocolate chunks and a tender centre.',
    image: '/products/img-07.webp',
    tags: ['Double chocolate', 'Chunky'],
    inStock: true,
  },
  {
    id: '8',
    slug: 'salted-caramel-cookie-box',
    name: 'Salted Caramel Cookie Box',
    category: 'cookies',
    price: '€28',
    description: 'Buttery cookies with dark chocolate and ribbons of salted caramel.',
    image: '/products/img-08.webp',
    tags: ['Salted', 'Caramel'],
    inStock: true,
  },
];
