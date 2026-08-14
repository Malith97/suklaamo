// ---------------------------------------------------------------------------
// Centralized site configuration for Suklaamo
// ---------------------------------------------------------------------------
// Single source of truth for NAP (Name, Address, Phone), business hours,
// geo coordinates, social links, and metadata helpers used across pages.
// Updating a value here propagates to structured data, visible NAP, sitemap,
// robots, and every page's metadata.
// ---------------------------------------------------------------------------

export const SITE_NAME = 'Suklaamo';
export const SITE_URL = 'https://suklaamo.fi';
export const SITE_TITLE_TEMPLATE = '%s | Suklaamo — Chocolate Bakery in Oulu';
export const SITE_DEFAULT_TITLE = 'Suklaamo – Premium Chocolate Treats';
export const SITE_DESCRIPTION =
  'Handmade chocolate brownies, cookies and small cakes from a Finnish home bakery in Oulu, Finland. Made for local pickup and pre-order.';

export type OpeningHours = {
  dayOfWeek: string[];
  opens: string;
  closes: string;
};

export const BUSINESS_ADDRESS = {
  streetAddress: 'Peltolankaari 20',
  addressLocality: 'Oulu',
  postalCode: '90230',
  addressCountry: 'FI',
};

// Telephone is null until the real number is provided. Structured data and
// the contact page omit it when null to avoid publishing placeholder data.
// Ask the owner to add their actual Finnish phone number here.
export const BUSINESS_TELEPHONE: string | null = null;

export const BUSINESS_GEO = {
  latitude: 65.0457456,
  longitude: 25.4319582,
};

export const BUSINESS_PRICE_RANGE = '€€';

export const BUSINESS_DESCRIPTION =
  'Suklaamo is a Finnish home bakery in Oulu making chocolate brownies, cookies and small cakes for local pickup and pre-order.';

export const OPENING_HOURS: OpeningHours[] = [
  {
    dayOfWeek: ['Friday'],
    opens: '17:00',
    closes: '21:00',
  },
  {
    dayOfWeek: ['Saturday', 'Sunday'],
    opens: '16:00',
    closes: '20:00',
  },
];

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/suklaamoo',
};

export const SAME_AS = [SOCIAL_LINKS.instagram];

export const PICKUP_INSTRUCTIONS = 'Peltolankaari 20, 90230 Oulu, Finland';

// ---------------------------------------------------------------------------
// Structured data helpers
// ---------------------------------------------------------------------------

export function buildLocalBusinessSchema() {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: SITE_NAME,
    description: BUSINESS_DESCRIPTION,
    url: SITE_URL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_ADDRESS.streetAddress,
      addressLocality: BUSINESS_ADDRESS.addressLocality,
      postalCode: BUSINESS_ADDRESS.postalCode,
      addressCountry: BUSINESS_ADDRESS.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_GEO.latitude,
      longitude: BUSINESS_GEO.longitude,
    },
    priceRange: BUSINESS_PRICE_RANGE,
    openingHoursSpecification: OPENING_HOURS,
    sameAs: SAME_AS,
  };

  if (BUSINESS_TELEPHONE) {
    schema.telephone = BUSINESS_TELEPHONE;
  }

  return schema;
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: 'Suklaamo.fi',
    url: `${SITE_URL}/`,
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export type { Metadata } from 'next';
