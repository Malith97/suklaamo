import SmartImage from './SmartImage';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Badge from './Badge';
import type { Product } from '../data/products';

const cardHover = {
  rest: { y: 0 },
  hover: { y: -5, transition: { type: 'spring', stiffness: 260, damping: 24, duration: 0.22 } },
};

type ProductCardProps = {
  product: Product;
  href?: string;
  onClick?: () => void;
};

export default function ProductCard({ product, href, onClick }: ProductCardProps) {
  const content = (
    <div className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-surface shadow-card transition duration-300 hover:-translate-y-0.5">
      <motion.div className="relative h-72 overflow-hidden bg-[#fbf4ed]" variants={cardHover}>
          <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.22, ease: 'easeOut' }} className="absolute inset-0">
          <SmartImage src={product.image} alt={product.name} fill wrapperClassName="h-full w-full" imgClassName="object-cover" />
        </motion.div>
      </motion.div>

      <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {product.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} label={tag} variant={tag === 'Gluten-free' ? 'sage' : 'cocoa'} />
            ))}
          </div>
          <h3 className="text-xl font-bold text-primary">{product.name}</h3>
          <p className="text-sm leading-6 text-text-muted line-clamp-3">{product.description}</p>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm font-semibold text-primary">
          <span>{product.price}</span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-text-muted shadow-soft">
            {product.inStock ? 'Fresh batch' : 'Made to order'}
          </span>
        </div>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <motion.button type="button" onClick={onClick} initial="rest" whileHover="hover" animate="rest" className="h-full w-full text-left">
        {content}
      </motion.button>
    );
  }

  if (href) {
    return (
      <motion.div initial="rest" whileHover="hover" animate="rest" className="h-full">
        <Link href={href} className="block h-full text-current no-underline">
          {content}
        </Link>
      </motion.div>
    );
  }

  return <motion.div initial="rest" whileHover="hover" animate="rest" className="h-full">{content}</motion.div>;
}
