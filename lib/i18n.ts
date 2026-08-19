import type { Locale } from '../context/LocaleContext';
import type { Product } from '../data/products';

type ProductCopy = {
  description: string;
  tags: string[];
  ingredients: string[];
  servingSize?: string;
  weight?: string;
  leadTime: string;
  allergenInformation: string;
};

const fiProductCopy: Record<string, ProductCopy> = {
  'chocolate-fudge-cupcakes': { description: 'Tiiviit pienet kuppikakut, joiden päällä on paksu ja ylellinen suklaafudge-kuorrute. Näissä suklaan pitää todella maistua.', tags: ['Suklaa', 'Kuppikakut', 'Fudge'], ingredients: ['tumma suklaa', 'suolaamaton voi', 'ulkokanamunat', 'sokeri', 'kaakaojauhe', 'vehnäjauho', 'kerma'], servingSize: '8 kuppikakkua', leadTime: 'Tilaa 48 tuntia etukäteen', allergenInformation: 'Kysy allergeeneista ja ruokavaliovaatimuksista ennen tilaamista.' },
  'strawberry-chocolate-cake': { description: 'Kaksi pehmeää suklaakakkupohjaa silkkisen suklaaganachen välissä ja päällä tuoreita mansikoita. Marjat tasapainottavat täyteläisyyttä jokaisella viipaleella.', tags: ['Suklaa', 'Mansikka', 'Juhlakakku'], ingredients: ['tumma suklaa', 'vehnäjauho', 'ulkokanamunat', 'suolaamaton voi', 'kaakaojauhe', 'sokeri', 'kerma', 'tuoreet mansikat'], leadTime: 'Tilaa 48 tuntia etukäteen', allergenInformation: 'Kysy allergeeneista ja ruokavaliovaatimuksista ennen tilaamista.' },
  'death-by-chocolate': { description: 'Tiiviitä tummia suklaakakkukerroksia, täyteläistä ganachea kerrosten välissä, kiiltävä suklaapinta ja suklaamurua päällä. Täydellinen sinulle, jolle suklaata ei ole koskaan liikaa.', tags: ['Suklaa', 'Tryffeli', 'Kerroskakku'], ingredients: ['tumma suklaa', 'vehnäjauho', 'ulkokanamunat', 'suolaamaton voi', 'kaakaojauhe', 'sokeri', 'kuohukerma'], leadTime: 'Tilaa 48 tuntia etukäteen', allergenInformation: 'Kysy allergeeneista ja ruokavaliovaatimuksista ennen tilaamista.' },
  'classic-fudgy-chocolate-brownies': { description: 'Talon oma brownie, jonka vuoksi moni palaa uudelleen. Rapea pinta, tiivis, mehevä keskusta ja oikeita suklaapaloja paksuina neliöinä.', tags: ['Suklaa', 'Browniet', 'Fudgy'], ingredients: ['tumma suklaa', 'suolaamaton voi', 'ulkokanamunat', 'fariinisokeri', 'kaakaojauhe', 'vehnäjauho', 'suklaapalat'], servingSize: 'Koko kakku (6 hengelle)', leadTime: 'Tilaa 48 tuntia etukäteen', allergenInformation: 'Kysy allergeeneista ja ruokavaliovaatimuksista ennen tilaamista.' },
  'chocolate-mousse-cake': { description: 'Kevyt suklaakakkupohja, kaksi kerrosta ilmavaa tummaa suklaamoussea ja ohut suklaakuorrute. Pehmeämpi ja vähemmän makea kuin kerroskakkumme.', tags: ['Suklaa', 'Mousse', 'Ganache'], ingredients: ['tumma suklaa', 'vehnäjauho', 'ulkokanamunat', 'suolaamaton voi', 'kaakaojauhe', 'liivate', 'kuohukerma', 'sokeri'], leadTime: 'Tilaa 48 tuntia etukäteen', allergenInformation: 'Kysy allergeeneista ja ruokavaliovaatimuksista ennen tilaamista.' },
  'coffee-cake-with-roasted-cashews': { description: 'Pehmeä espressolla kostutettu pohja, kahvivoikreemiä ja päällä paahdettuja cashewpähkinöitä. Ei liian makea, vaan kuin lämmin kahvinmakuinen halaus.', tags: ['Kahvi', 'Cashew', 'Kerma'], ingredients: ['vehnäjauho', 'ulkokanamunat', 'suolaamaton voi', 'espresso', 'kerma', 'paahdetut cashewpähkinät', 'sokeri'], leadTime: 'Tilaa 48 tuntia etukäteen', allergenInformation: 'Kysy allergeeneista ja ruokavaliovaatimuksista ennen tilaamista.' },
  'black-forest-cake': { description: 'Tummaa suklaakakkua, kuohukermaa, kirsikkalikööriä ja kirsikkatäytettä, päällä suklaalastuja ja kokonaisia kirsikoita. Klassikko uudella tavalla.', tags: ['Suklaa', 'Kirsikka', 'Kerma'], ingredients: ['tumma suklaa', 'vehnäjauho', 'ulkokanamunat', 'suolaamaton voi', 'kaakaojauhe', 'kuohukerma', 'tummat kirsikat', 'sokeri'], leadTime: 'Tilaa 48 tuntia etukäteen', allergenInformation: 'Kysy allergeeneista ja ruokavaliovaatimuksista ennen tilaamista.' },
  'berry-chantilly-cake': { description: 'Makea vaniljapohja, kevyesti makeutettua chantilly-kermaa ja tuoreita marjoja. Menun kevyin kakku, josta et ehkä malta lopettaa ensimmäiseen viipaleeseen.', tags: ['Marja', 'Chantilly', 'Kerma'], ingredients: ['vehnäjauho', 'ulkokanamunat', 'suolaamaton voi', 'sokeri', 'kuohukerma', 'vanilja', 'metsämarjat'], leadTime: 'Tilaa 48 tuntia etukäteen', allergenInformation: 'Kysy allergeeneista ja ruokavaliovaatimuksista ennen tilaamista.' },
  'coconut-truffles': { description: 'Pieniä käsin pyöriteltyjä tryffeleitä, joissa on pehmeä kondensoidun maidon täyte ja hienoa kookosta. Parhaimmillaan kahvin kanssa kaksittain.', tags: ['Kookos', 'Tryffelit'], ingredients: ['kondensoitu maito', 'kookoshiutaleet', 'suolaamaton voi', 'sokeri'], leadTime: 'Tilaa 48 tuntia etukäteen', allergenInformation: 'Kysy allergeeneista ja ruokavaliovaatimuksista ennen tilaamista.' },
  'strawberry-cheesecake': { description: 'Tiivis paistettu basque-tyylinen vaniljajuustokakku, päällä tuoreista mansikoista tehty kiiltävä kompotti. Illalliskutsujen suosikki.', tags: ['Juustokakku', 'Mansikka', 'Hedelmä'], ingredients: ['tuorejuusto', 'suolaamaton voi', 'sokeri', 'ulkokanamunat', 'kerma', 'tuoreet mansikat'], servingSize: 'Koko kakku (8 hengelle)', weight: 'Noin 1 kg', leadTime: 'Tilaa 48 tuntia etukäteen', allergenInformation: 'Kysy allergeeneista ja ruokavaliovaatimuksista ennen tilaamista.' },
  'blueberry-cheesecake': { description: 'Mansikkajuustokakun serkku: voinen murupohja ja päällä hitaasti keitetty, kirpeän makea mustikkakastike. Keittiön suosikki kesällä ja syksyllä.', tags: ['Juustokakku', 'Mustikka', 'Hedelmä'], ingredients: ['tuorejuusto', 'digestive-keksit', 'suolaamaton voi', 'sokeri', 'ulkokanamunat', 'kerma', 'mustikat'], leadTime: 'Tilaa 48 tuntia etukäteen', allergenInformation: 'Kysy allergeeneista ja ruokavaliovaatimuksista ennen tilaamista.' },
  'chocolate-and-coffee-swiss-roll': { description: 'Ohut suklaakakkupohja kahvinmakuisen kerman ympärillä, päällä unelmainen suklaaganache. Täydellinen kahvikupin kanssa talvisena iltapäivänä.', tags: ['Suklaa', 'Kahvi', 'Kääretorttu'], ingredients: ['vehnäjauho', 'ulkokanamunat', 'sokeri', 'kaakaojauhe', 'espresso', 'kerma', 'tumma suklaa'], servingSize: 'Koko kakku (8 hengelle)', weight: 'Noin 1 kg', leadTime: 'Tilaa 48 tuntia etukäteen', allergenInformation: 'Kysy allergeeneista ja ruokavaliovaatimuksista ennen tilaamista.' },
};

const translations = {
  en: {
    nav: { home: 'Home', catalogue: 'Catalogue', about: 'About', contact: 'Contact', order: 'Order', closeMenu: 'Close menu', openMenu: 'Open menu', chocolateBakery: 'Chocolate bakery', cart: 'Cart' },
    common: { browseCatalogue: 'Browse catalogue', continueShopping: 'Continue shopping', backHome: 'Back home', backToCatalogue: 'Back to catalogue', order: 'Order', pickupDetails: 'Pickup details', productDetails: 'Product details', ingredients: 'Ingredients', freshBatch: 'Fresh batch', madeToOrder: 'Made to order', each: 'each', items: 'items', item: 'item', total: 'Total', subtotal: 'Subtotal', delivery: 'Delivery', vat: 'VAT', remove: 'Remove', clearCart: 'Clear Cart', continueToCheckout: 'Continue to Checkout', addToCart: 'Add to cart', orderLimitReached: 'Order limit reached', clickToViewMore: 'Click to View More', close: 'Close', viewPolicies: 'View Policies', submitting: 'Submitting...', sendRequest: 'Send request', sending: 'Sending...' },
    ticker: ['Baked fresh for weekend pickup', 'Deliveries around Oulu starting in September', 'Place your order before Thursday at 18:00', 'Baked in Oulu in small batches'],
    product: { leadTime: 'Order 48 hours in advance', allergenInformation: 'Contact us before ordering regarding allergens and dietary requirements.' },
  },
  fi: {
    nav: { home: 'Etusivu', catalogue: 'Valikoima', about: 'Meistä', contact: 'Yhteystiedot', order: 'Tilaa', closeMenu: 'Sulje valikko', openMenu: 'Avaa valikko', chocolateBakery: 'Suklaaleipomo', cart: 'Ostoskori' },
    common: { browseCatalogue: 'Tutustu valikoimaan', continueShopping: 'Jatka ostoksia', backHome: 'Takaisin etusivulle', backToCatalogue: 'Takaisin valikoimaan', order: 'Tilaa', pickupDetails: 'Noutotiedot', productDetails: 'Tuotetiedot', ingredients: 'Ainesosat', freshBatch: 'Tuore erä', madeToOrder: 'Tilauksesta valmistettava', each: 'kpl', items: 'tuotetta', item: 'tuote', total: 'Yhteensä', subtotal: 'Välisumma', delivery: 'Toimitus', vat: 'ALV', remove: 'Poista', clearCart: 'Tyhjennä ostoskori', continueToCheckout: 'Jatka kassalle', addToCart: 'Lisää ostoskoriin', orderLimitReached: 'Tilausraja saavutettu', clickToViewMore: 'Katso lisää', close: 'Sulje', viewPolicies: 'Näytä ehdot', submitting: 'Lähetetään...', sendRequest: 'Lähetä pyyntö', sending: 'Lähetetään...' },
    ticker: ['Tuoreena viikonlopun noutoon', 'Toimitukset Oulun alueella alkavat syyskuussa', 'Tee tilaus ennen torstaita klo 18.00', 'Leivottu Oulussa pienissä erissä'],
    product: { leadTime: 'Tilaa 48 tuntia etukäteen', allergenInformation: 'Kysy allergeeneista ja ruokavaliovaatimuksista ennen tilaamista.' },
  },
} as const;

export type NavKey = keyof typeof translations.en.nav;
export type Translations = {
  nav: Record<NavKey, string>;
  common: typeof translations.en.common;
  ticker: readonly string[];
  product: typeof translations.en.product;
};

export function getTranslations(locale: Locale): Translations {
  return translations[locale] as Translations;
}

export function getLocalizedProduct(product: Product, locale: Locale): Product {
  if (locale === 'en') return product;
  const copy = fiProductCopy[product.slug];
  return copy ? { ...product, ...copy } : product;
}

export function getLocalizedProducts(products: Product[], locale: Locale): Product[] {
  return products.map((product) => getLocalizedProduct(product, locale));
}
