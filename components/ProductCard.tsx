import Image from 'next/image';
import Link from 'next/link';
import Badge from './Badge';
import type { Product } from '../data/products';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/catalogue/${product.slug}`} className="group overflow-hidden rounded-[2rem] bg-white shadow-soft transition-transform hover:-translate-y-1">
      <div className="relative h-72 overflow-hidden bg-[#f2e5d4]">
        <Image src={product.image} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" priority={false} />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          {product.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} label={tag} variant={tag === 'Gluten-free' ? 'sage' : 'cocoa'} />
          ))}
        </div>
        <h3 className="text-xl font-bold text-primary">{product.name}</h3>
        <p className="text-sm leading-6 text-[#5a4030]">{product.description}</p>
        <div className="mt-4 flex items-center justify-between text-sm font-semibold text-primary">
          <span>{product.price}</span>
          <span>{product.inStock ? 'In stock' : 'Made to order'}</span>
        </div>
      </div>
    </Link>
  );
}
