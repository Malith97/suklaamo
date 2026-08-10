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

type RawProduct = Omit<ProductBase, 'category'> & { category: RawCategory };

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
        name: 'Chocolate Fudge Cupcakes',
        category: 'cakes',
        price: '€24',
        description:
            'Dark, dense little cakes with a molten fudge centre that stays soft even after baking. Finished with a thick swirl of chocolate frosting and a light dusting of cocoa, these are for people who want their chocolate to actually taste like chocolate.',
        image: '/products/img-01.webp',
        tags: ['Chocolate', 'Cupcakes', 'Fudge'],
        inStock: false,
        ingredients: [
            'dark chocolate',
            'unsalted butter',
            'free-range eggs',
            'brown sugar',
            'cocoa powder',
            'wheat flour',
            'cream',
        ],
    },
    {
        id: '2',
        slug: 'strawberry-chocolate-cake',
        name: 'Strawberry Chocolate Cake',
        category: 'cakes',
        price: '€45',
        description:
            'Two soft chocolate sponges layered with silky chocolate buttercream, topped with fresh strawberries halved and arranged by hand. The berries cut through the richness so every slice stays balanced instead of heavy.',
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
            'Three layers of dark chocolate sponge, soaked lightly and stacked with truffle ganache between each one, then wrapped in a glossy chocolate coating and finished with a scatter of chocolate crumb. Built for people who never think a cake is too chocolatey.',
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
        name: 'Classic Fudgy Chocolate Brownies',
        category: 'brownies',
        price: '€35',
        description:
            'Our house brownie, and the one most people come back for. Crackly top, dense fudgy middle, chunks of real chocolate that don\'t fully melt in the bake. Cut into thick squares, no shortcuts taken.',
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
    },
    {
        id: '6',
        slug: 'chocolate-mousse-cake',
        name: 'Chocolate Mousse Cake',
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
        name: 'Coffee Cake with Roasted Cashews',
        category: 'cakes',
        price: '€45',
        description:
            'A soft espresso-soaked sponge layered with coffee buttercream and topped with roasted, roughly chopped cashews for crunch. Not too sweet, made for the coffee-and-cake crowd rather than the dessert crowd.',
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
        name: 'Black Forest Cake',
        category: 'cakes',
        price: '€45',
        description:
            'Dark chocolate sponge layered with whipped cream and dark cherries, finished with chocolate shavings and a few whole cherries on top. The classic done properly, tart fruit against soft cream, nothing overly sweet.',
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
        name: 'Berry Chantilly Cake',
        category: 'cakes',
        price: '€50',
        description:
            'A pale, delicate sponge folded with lightly sweetened chantilly cream and layered with fresh mixed berries, finished in more cream and a final scatter of berries on top. The lightest cake on the menu, closer to a dessert than a cake.',
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
        name: 'Coconut Truffles',
        category: 'cookies',
        price: '€28',
        description:
            'Small hand-rolled truffles with a soft dark chocolate ganache centre, rolled in fine desiccated coconut. Rich for their size, best eaten in twos with coffee.',
        image: '/products/img-10.webp',
        tags: ['Chocolate', 'Coconut', 'Truffles'],
        inStock: true,
        ingredients: [
            'dark chocolate',
            'cream',
            'desiccated coconut',
            'unsalted butter',
            'cocoa powder',
            'sugar',
        ],
    },
    {
        id: '11',
        slug: 'strawberry-cheesecake',
        name: 'Strawberry Cheesecake',
        category: 'cakes',
        price: '€35',
        description:
            'A dense, baked vanilla cheesecake on a buttery biscuit base, topped with a glossy strawberry compote made fresh each batch. Sets firm enough to slice clean, tastes properly of strawberry rather than syrup.',
        image: '/products/img-11.webp',
        tags: ['Cheesecake', 'Strawberry', 'Fruit'],
        inStock: true,
        ingredients: [
            'cream cheese',
            'digestive biscuits',
            'unsalted butter',
            'sugar',
            'free-range eggs',
            'cream',
            'fresh strawberries',
        ],
    },
    {
        id: '12',
        slug: 'blueberry-cheesecake',
        name: 'Blueberry Cheesecake',
        category: 'cakes',
        price: '€40',
        description:
            'Same buttery biscuit base as our strawberry version, topped with a slow-cooked blueberry sauce that\'s tart rather than sugary. A house favourite through the summer months.',
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
        name: 'Chocolate and Coffee Swiss Roll',
        category: 'cakes',
        price: '€35',
        description:
            'A thin chocolate sponge rolled around coffee-flavoured cream while still warm, so it holds its shape without cracking. Sliced to order, dusted with cocoa. Good with an afternoon coffee, better as one.',
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
