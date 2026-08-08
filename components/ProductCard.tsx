import Image from 'next/image';
import Link from 'next/link';
import Badge from './Badge';
import type { Product } from '../data/products';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/catalogue/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-surface shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-elevated"
      aria-label={`View details for ${product.name}`}
    >
      <div className="relative h-72 overflow-hidden bg-[#fbf4ed]">
        <Image src={product.image} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" priority={false} />
      </div>
      <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {product.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} label={tag} variant={tag === 'Gluten-free' ? 'sage' : 'cocoa'} />
            ))}
          </div>
          <h3 className="text-xl font-bold text-primary">{product.name}</h3>
          <p className="text-sm leading-6 text-text-muted">{product.description}</p>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm font-semibold text-primary">
          <span>{product.price}</span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-text-muted shadow-soft">
            {product.inStock ? 'Fresh batch' : 'Made to order'}
          </span>
        </div>
      </div>
    </Link>
  );
}
