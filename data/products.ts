export type Category = 'brownies' | 'cookies' | 'cakes';

type RawCategory = Category | 'pizzas';

type ProductBase = {
    id: string;
    slug: string;
    name: string;
    category: Category;
    price: string;
    description: string;
    image: string;
    tags: string[];
    inStock: boolean;
    ingredients: string[];
};

export type ProductDetails = {
    servingSize: string;
    weight: string;
    leadTime: string;
    allergenInformation: string;
};

type RawProduct = Omit<ProductBase, 'category'> & {
    category: RawCategory;
    servingSize?: string;
    weight?: string;
};

export type Product = ProductBase & ProductDetails;

export const productDetails: ProductDetails = {
    servingSize: 'Whole cake (serves 8 people)',
    weight: 'Approx. 1.5kg',
    leadTime: 'Order 48 hours in advance',
    allergenInformation: 'Contact us before ordering regarding allergens and dietary requirements.',
};

const rawProducts: RawProduct[] = [
    {
        id: '1',
        slug: 'chocolate-fudge-cupcakes',
        name: 'Cocoa Kisses',
        category: 'cakes',
        price: '€24',
        description:
            'Dense little cupcakes topped with a thick luscious chocolate fudge frosting. These are for people who want their cupcakes to actually taste like chocolate.',
        image: '/products/img-01.webp',
        tags: ['Chocolate', 'Cupcakes', 'Fudge'],
        inStock: false,
        ingredients: [
            'dark chocolate',
            'unsalted butter',
            'free-range eggs',
            'sugar',
            'cocoa powder',
            'wheat flour',
            'cream',
        ],
        servingSize: '8 cupcakes',
    },
    {
        id: '2',
        slug: 'strawberry-chocolate-cake',
        name: 'The Chocolate Duchess',
        category: 'cakes',
        price: '€45',
        description:
            'Two soft chocolate sponges layered with silky chocolate ganache, topped with fresh strawberries. The berries cut through the richness so every slice stays balanced instead of heavy.',
        image: '/products/img-02.webp',
        tags: ['Chocolate', 'Strawberry', 'Celebration'],
        inStock: true,
        ingredients: [
            'dark chocolate',
            'wheat flour',
            'free-range eggs',
            'unsalted butter',
            'cocoa powder',
            'sugar',
            'cream',
            'fresh strawberries',
        ],
    },
    {
        id: '3',
        slug: 'death-by-chocolate',
        name: 'Death by Chocolate',
        category: 'cakes',
        price: '€50',
        description:
            'Layers of dense dark chocolate cake, soaked lightly and stacked with fudgy ganache between each one, then wrapped in a glossy chocolate coating and finished with a scatter of chocolate crumb. Built for people who never think a cake is too chocolatey.',
        image: '/products/img-03.webp',
        tags: ['Chocolate', 'Truffle', 'Layer Cake'],
        inStock: true,
        ingredients: [
            'dark chocolate',
            'wheat flour',
            'free-range eggs',
            'unsalted butter',
            'cocoa powder',
            'sugar',
            'double cream',
        ],
    },
    {
        id: '4',
        slug: 'classic-fudgy-chocolate-brownies',
        name: 'Brownie Baby',
        category: 'brownies',
        price: '€35',
        description:
            'The in-house brownie that most people come back for. Crackly top, dense fudgy middle, chunks of real chocolate that don\'t fully melt in the bake. Cut into thick squares, no shortcuts taken.',
        image: '/products/img-04.webp',
        tags: ['Chocolate', 'Brownies', 'Fudgy'],
        inStock: true,
        ingredients: [
            'dark chocolate',
            'unsalted butter',
            'free-range eggs',
            'brown sugar',
            'cocoa powder',
            'wheat flour',
            'chocolate chunks',
        ],
        servingSize: 'Whole cake (serves 6 people)',
    },
    {
        id: '6',
        slug: 'chocolate-mousse-cake',
        name: 'Midnight Mousse',
        category: 'cakes',
        price: '€40',
        description:
            'A light chocolate sponge base carrying two rounds of airy dark chocolate mousse, chilled until set and finished with a thin chocolate glaze. Softer and less sweet than our layer cakes, closer to eating chocolate air.',
        image: '/products/img-06.webp',
        tags: ['Chocolate', 'Mousse', 'Ganache'],
        inStock: true,
        ingredients: [
            'dark chocolate',
            'wheat flour',
            'free-range eggs',
            'unsalted butter',
            'cocoa powder',
            'gelatine',
            'double cream',
            'sugar',
        ],
    },
    {
        id: '7',
        slug: 'coffee-cake-with-roasted-cashews',
        name: 'Espresso Hugs',
        category: 'cakes',
        price: '€45',
        description:
            'A soft espresso-soaked sponge layered with coffee buttercream and topped with roasted, roughly chopped cashews for crunch. Not too sweet. Each slice feels like a warm coffee-flavored hug.',
        image: '/products/img-07.webp',
        tags: ['Coffee', 'Cashew', 'Cream'],
        inStock: true,
        ingredients: [
            'wheat flour',
            'free-range eggs',
            'unsalted butter',
            'espresso',
            'cream',
            'roasted cashews',
            'sugar',
        ],
    },
    {
        id: '8',
        slug: 'black-forest-cake',
        name: 'Cherry Cherry Lady',
        category: 'cakes',
        price: '€45',
        description:
            'Dark chocolate sponge layered with luscious whipped cream, soaked with cherry liqueur and a cherry filling, finished with chocolate shavings and whole cherries on top. The classic black forest re-invented, tart fruit against soft cream, nothing overly sweet.',
        image: '/products/img-08.webp',
        tags: ['Chocolate', 'Cherry', 'Cream'],
        inStock: true,
        ingredients: [
            'dark chocolate',
            'wheat flour',
            'free-range eggs',
            'unsalted butter',
            'cocoa powder',
            'whipping cream',
            'dark cherries',
            'sugar',
        ],
    },
    {
        id: '9',
        slug: 'berry-chantilly-cake',
        name: 'Berries and Clouds',
        category: 'cakes',
        price: '€50',
        description:
            'A sweet vanilla sponge folded with lightly sweetened chantilly cream and layered with fresh mixed berries, finished in more cream and a final scatter of berries on top. The lightest cake on the menu, and we can guarantee that you won\'t stop after one slice.',
        image: '/products/img-09.webp',
        tags: ['Berry', 'Chantilly', 'Cream'],
        inStock: true,
        ingredients: [
            'wheat flour',
            'free-range eggs',
            'unsalted butter',
            'sugar',
            'whipping cream',
            'vanilla',
            'mixed berries',
        ],
    },
    {
        id: '10',
        slug: 'coconut-truffles',
        name: 'Not Coco Chanel',
        category: 'cookies',
        price: '€28',
        description:
            'Small hand-rolled truffles with a soft condensed milk center, smothered in fine desiccated coconut. Rich for their size, best eaten in twos with coffee.',
        image: '/products/img-10.webp',
        tags: ['Chocolate', 'Coconut', 'Truffles'],
        inStock: true,
        ingredients: [
            'condensed milk',
            'desiccated coconut',
            'unsalted butter',
            'sugar',
        ],
    },
    {
        id: '11',
        slug: 'strawberry-cheesecake',
        name: 'A Very Berry Strawberry Cheesecake',
        category: 'cakes',
        price: '€35',
        description:
            'A dense, baked basque vanilla cheesecake, topped with a glossy strawberry compote made fresh. A dinner-party favourite that would make the crowd go wild.',
        image: '/products/img-11.webp',
        tags: ['Cheesecake', 'Strawberry', 'Fruit'],
        inStock: true,
        ingredients: [
            'cream cheese',
            'unsalted butter',
            'sugar',
            'free-range eggs',
            'cream',
            'fresh strawberries',
        ],
        servingSize: 'Whole cake (serves 8 people)',
        weight: 'Approx. 1kg',
    },
    {
        id: '12',
        slug: 'blueberry-cheesecake',
        name: 'A Very Berry Blueberry Cheesecake',
        category: 'cakes',
        price: '€40',
        description:
            'A cousin of our strawberry cheesecake. This one sits on a crumbly, buttery base and is topped with a slow-cooked blueberry sauce that\'s tangy and sweet. A house favourite through the summer and fall.',
        image: '/products/img-12.webp',
        tags: ['Cheesecake', 'Blueberry', 'Fruit'],
        inStock: true,
        ingredients: [
            'cream cheese',
            'digestive biscuits',
            'unsalted butter',
            'sugar',
            'free-range eggs',
            'cream',
            'blueberries',
        ],
    },
    {
        id: '13',
        slug: 'chocolate-and-coffee-swiss-roll',
        name: 'Coco-Coffee Roly Poly',
        category: 'cakes',
        price: '€35',
        description:
            'A thin chocolate sponge rolled around coffee-flavoured cream, topped with a dreamy chocolate ganache. Perfect with a cup of coffee on a chilly winter afternoon.',
        image: '/products/img-13.webp',
        tags: ['Chocolate', 'Coffee', 'Swiss Roll'],
        inStock: true,
        ingredients: [
            'wheat flour',
            'free-range eggs',
            'sugar',
            'cocoa powder',
            'espresso',
            'cream',
            'dark chocolate',
        ],
        servingSize: 'Whole cake (serves 8 people)',
        weight: 'Approx. 1kg',
    },
    {
        id: '14',
        slug: 'prawn-pizza',
        name: 'Prawn Pizza',
        category: 'pizzas',
        price: '€16',
        description:
            'Thin, hand-stretched base baked hot and fast, topped with a light tomato sauce, mozzarella and prawns seasoned simply so the seafood does the talking.',
        image: '/products/pizza-01.webp',
        tags: ['Pizza', 'Cheese', 'Prawn'],
        inStock: true,
        ingredients: [
            'pizza dough',
            'tomato sauce',
            'mozzarella',
            'prawns',
            'oregano',
            'olive oil',
        ],
    },
    {
        id: '15',
        slug: 'sausage-cheese-pizza',
        name: 'Sausage Cheese Pizza',
        category: 'pizzas',
        price: '€13',
        description:
            'A well-loaded pizza with sliced sausage, plenty of melted cheese, peppers and onion over a crisp base. Straightforward and reliable.',
        image: '/products/pizza-02.webp',
        tags: ['Pizza', 'Sausage', 'Cheese', 'Vegetables'],
        inStock: true,
        ingredients: [
            'pizza dough',
            'tomato sauce',
            'mozzarella',
            'sausage',
            'bell peppers',
            'onion',
            'herbs',
            'olive oil',
        ],
    },
    {
        id: '16',
        slug: 'loaded-chicken-pizza',
        name: 'Loaded Chicken Pizza',
        category: 'pizzas',
        price: '€10',
        description:
            'Grilled chicken, peppers, onion and sweetcorn over melted cheese on a crisp golden base. A full plate on its own, no sides needed.',
        image: '/products/pizza-03.webp',
        tags: ['Pizza', 'Chicken', 'Loaded', 'Cheese'],
        inStock: true,
        ingredients: [
            'pizza dough',
            'tomato sauce',
            'mozzarella',
            'grilled chicken',
            'bell peppers',
            'onion',
            'sweet corn',
            'herbs',
            'olive oil',
        ],
    },
];

export const products: Product[] = rawProducts
    .filter((product): product is Omit<RawProduct, 'category'> & { category: Category } => product.category !== 'pizzas')
    .map((product) => ({
        ...productDetails,
        ...product,
    }));
