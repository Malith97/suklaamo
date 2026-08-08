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
    slug: 'triple-chocolate-brownie-bar',
    name: 'Triple Chocolate Brownie Bar',
    category: 'brownies',
    price: '€6.50',
    description: 'Dense, fudgy brownie made with dark, milk, and white chocolate.',
    image: '/products/brownie-01.svg',
    tags: ['Rich', 'Small-batch'],
    inStock: true,
  },
  {
    id: '2',
    slug: 'hazelnut-cookie-stack',
    name: 'Hazelnut Cookie Stack',
    category: 'cookies',
    price: '€5.20',
    description: 'Crunchy edge cookies with toasted hazelnuts and cocoa nibs.',
    image: '/products/cookie-01.svg',
    tags: ['Nuts', 'Crunchy'],
    inStock: true,
  },
  {
    id: '3',
    slug: 'dark-ganache-mini-cake',
    name: 'Dark Ganache Mini Cake',
    category: 'cakes',
    price: '€28.00',
    description: 'Intense chocolate cake layered with whipped ganache and berries.',
    image: '/products/cake-01.svg',
    tags: ['Gift-ready', 'Shareable'],
    inStock: false,
  },
  {
    id: '4',
    slug: 'cinnamon-spice-cookie',
    name: 'Cinnamon Spice Cookie',
    category: 'cookies',
    price: '€4.80',
    description: 'Soft cookie with warm spice notes and dark chocolate chips.',
    image: '/products/cookie-02.svg',
    tags: ['Cozy', 'Vegetarian'],
    inStock: true,
  },
  {
    id: '5',
    slug: 'sea-salt-brownie-squares',
    name: 'Sea Salt Brownie Squares',
    category: 'brownies',
    price: '€6.80',
    description: 'Salted caramel swirl inside chewy chocolate squares.',
    image: '/products/brownie-02.svg',
    tags: ['Salted', 'Handmade'],
    inStock: true,
  },
  {
    id: '6',
    slug: 'raspberry-chocolate-cake',
    name: 'Raspberry Chocolate Cake',
    category: 'cakes',
    price: '€30.00',
    description: 'Moist chocolate sponge with raspberry compote and cream.',
    image: '/products/cake-02.svg',
    tags: ['Berry', 'Celebration'],
    inStock: false,
  },
  {
    id: '7',
    slug: 'espresso-brownie-bites',
    name: 'Espresso Brownie Bites',
    category: 'brownies',
    price: '€6.00',
    description: 'Mini brownie bites infused with espresso and chopped almonds.',
    image: '/products/brownie-01.svg',
    tags: ['Coffee', 'Snack'],
    inStock: true,
  },
  {
    id: '8',
    slug: 'salted-caramel-cookie',
    name: 'Salted Caramel Cookie',
    category: 'cookies',
    price: '€5.50',
    description: 'Salted caramel folded into a buttery chocolate cookie dough.',
    image: '/products/cookie-01.svg',
    tags: ['Sweet', 'Sticky'],
    inStock: true,
  },
];
