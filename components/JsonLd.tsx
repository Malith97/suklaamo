import { type ReactNode } from 'react';

// Renders a JSON-LD structured-data block as a <script type="application/ld+json">
// element. Used for page-specific schemas (Product, BreadcrumbList, FAQPage)
// that need to coexist with the site-wide LocalBusiness schema rendered in
// the root layout.

export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

// Type for a React element returned by JsonLd so callers can compose
// multiple script blocks inside a fragment.
export type JsonLdElement = ReactNode;
