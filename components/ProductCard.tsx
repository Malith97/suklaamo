"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import SmartImage from './SmartImage';
import Badge from './Badge';
import Button from './Button';
import type { Product } from '../data/products';
import { getLocalizedProduct } from '../lib/i18n';
import { useLocale } from '../context/LocaleContext';

const cardHover = {
  rest: { y: 0 },
  hover: { y: -5, transition: { type: 'spring', stiffness: 260, damping: 24, duration: 0.22 } },
};

type ProductCardProps = {
  product: Product;
  href?: string;
  onClick?: () => void;
  onAddToCart?: () => void;
  addToCartDisabled?: boolean;
  addToCartDisabledLabel?: string;
};

export default function ProductCard({
  product,
  href,
  onClick,
  onAddToCart,
  addToCartDisabled = false,
  addToCartDisabledLabel = 'Maximum order quantity is 10 items. Please contact us for larger orders.',
}: ProductCardProps) {
  const { locale, t } = useLocale();
  const localizedProduct = getLocalizedProduct(product, locale);
  const topContent = (
    <>
      <div className="relative h-72 overflow-hidden bg-[#fbf4ed]">
        <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.22, ease: 'easeOut' }} className="absolute inset-0">
          <SmartImage
            src={product.image}
            alt={`${product.name} — Suklaamo chocolate treat, Oulu`}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            wrapperClassName="h-full w-full"
            imgClassName="object-cover"
          />
        </motion.div>
      </div>

      <div className="flex flex-1 min-w-0 flex-col justify-between space-y-4 p-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {localizedProduct.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} label={tag} variant={tag === 'Gluten-free' ? 'sage' : 'cocoa'} />
            ))}
          </div>

          <div className="space-y-2">
            <h2 className="break-words text-xl font-bold text-primary">{product.name}</h2>
            <p className="break-words text-sm leading-6 text-text-muted line-clamp-3">{localizedProduct.description}</p>
          </div>

          {/* <dl className="grid gap-3 rounded-[1.5rem] bg-white/70 p-4 text-[0.68rem] uppercase tracking-[0.22em] text-text-muted shadow-soft sm:grid-cols-3">
            <div>
              <dt className="text-text-muted/80">Serving</dt>
              <dd className="mt-1 text-[0.74rem] font-semibold tracking-[0.08em] text-primary">{product.servingSize}</dd>
            </div>
            <div>
              <dt className="text-text-muted/80">Weight</dt>
              <dd className="mt-1 text-[0.74rem] font-semibold tracking-[0.08em] text-primary">{product.weight}</dd>
            </div>
            <div>
              <dt className="text-text-muted/80">Lead time</dt>
              <dd className="mt-1 text-[0.74rem] font-semibold tracking-[0.08em] text-primary">{product.leadTime}</dd>
            </div>
          </dl> */}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm font-semibold text-primary">
          <span>{product.price}</span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-text-muted shadow-soft">
            {/* {product.inStock ? 'Fresh batch' : 'Made to order'} Click to View More */}
            {t.common.clickToViewMore}
          </span>
        </div>
      </div>
    </>
  );

  const card = (
    <motion.article initial="rest" whileHover="hover" animate="rest" className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[2rem] bg-surface shadow-card transition duration-300 hover:-translate-y-0.5">
      {href ? (
        <Link href={href} className="block h-full min-w-0 text-current no-underline">
          {topContent}
        </Link>
      ) : onClick ? (
        <button type="button" onClick={onClick} className="block h-full min-w-0 text-left">
          {topContent}
        </button>
      ) : (
        topContent
      )}

      {/* {onAddToCart ? (
        <div className="space-y-3 border-t border-border px-6 pb-6 pt-5">
          {addToCartDisabled ? <p className="text-xs leading-6 text-[#8d3b28]">{addToCartDisabledLabel}</p> : null}
          <Button
            type="button"
            onClick={onAddToCart}
            disabled={addToCartDisabled}
            className="w-full"
          >
            Add to cart
          </Button>
        </div>
      ) : null} */}
    </motion.article>
  );

  return card;
}
