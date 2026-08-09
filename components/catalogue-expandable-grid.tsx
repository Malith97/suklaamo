'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag, WebWindowClose } from 'iconoir-react';
import Image from 'next/image';
import { useEffect, useRef, useState, type ComponentType, type SVGProps } from 'react';
import type { Product } from '../data/products';
import Badge from './Badge';
import { useCart } from '../context/CartContext';

const CloseIcon = WebWindowClose as unknown as ComponentType<SVGProps<SVGSVGElement>>;
const ShoppingBagIcon = ShoppingBag as unknown as ComponentType<SVGProps<SVGSVGElement>>;

const cardTransition = { type: 'spring', stiffness: 220, damping: 28, mass: 0.8 };

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.28, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.22, ease: 'easeIn' } },
};

const overlayVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: 'easeOut' } },
  exit: { opacity: 0, y: 28, scale: 0.98, transition: { duration: 0.24, ease: 'easeIn' } },
};

const detailVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
  exit: { opacity: 0, y: 16, transition: { duration: 0.22, ease: 'easeIn' } },
};


export default function CatalogueExpandableGrid({ products }: { products: Product[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [addFeedback, setAddFeedback] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedCardRef = useRef<HTMLButtonElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const { addItem } = useCart();

  const selectedProduct = products.find((product) => product.id === selectedId) ?? null;

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedId(null);
      }
    }

    if (selectedId) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [selectedId]);

  useEffect(() => {
    if (selectedId && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    if (!selectedId && lastFocusedCardRef.current) {
      lastFocusedCardRef.current.focus();
    }
  }, [selectedId]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedId && !selectedProduct) {
      setSelectedId(null);
    }
  }, [selectedId, selectedProduct]);

  function openCard(id: string, button: HTMLButtonElement | null) {
    lastFocusedCardRef.current = button;
    setSelectedId(id);
  }

  function closeCard() {
    setSelectedId(null);
  }

  function handleAddToCart(product: Product) {
    addItem(product);
    setAddFeedback(true);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setAddFeedback(false);
      timeoutRef.current = null;
    }, 1200);
  }

  return (
    <>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <motion.article
            key={product.id}
            layout
            transition={cardTransition}
            className="group relative overflow-hidden rounded-[2.5rem] border border-border bg-[#fff6ed] shadow-soft transition hover:-translate-y-0.5 hover:shadow-medium"
          >
            <button
              type="button"
              onClick={(event) => openCard(product.id, event.currentTarget)}
              aria-expanded={selectedId === product.id}
              className="block w-full text-left"
            >
              <div className="relative h-72 w-full overflow-hidden rounded-[2.5rem]">
                <motion.div layoutId={`image-${product.id}`} className="absolute inset-0">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="max-w-[70%] text-2xl font-black uppercase tracking-[-0.03em] text-white sm:text-3xl">
                        {product.name}
                      </h3>
                      <span className="rounded-full bg-[#3a2414] px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-soft">
                        {product.price}
                      </span>
                    </div>
                    <p className="max-w-xl text-sm leading-6 text-white/85 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
              
            </button>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {selectedProduct ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center overflow-auto bg-black/10 px-4 py-6 backdrop-blur-sm sm:items-center sm:px-6 sm:py-8"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={closeCard}
          >
            <motion.div
              className="absolute inset-0 bg-black/50"
              onClick={closeCard}
              aria-hidden="true"
            />

            <motion.div
              layoutId={`image-${selectedProduct.id}`}
              transition={cardTransition}
              className="relative w-full max-w-5xl max-h-[90dvh] overflow-hidden rounded-[2.5rem] border border-white/70 bg-[#fff5e8] shadow-2xl flex flex-col lg:flex-row"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              onClick={(event) => event.stopPropagation()}
            >
              <motion.button
                ref={closeButtonRef}
                type="button"
                onClick={closeCard}
                className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-text-dark shadow-soft transition hover:bg-white"
                aria-label="Close preview"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <CloseIcon className="h-5 w-5" aria-hidden="true" />
              </motion.button>

              <div className="relative overflow-hidden bg-[#fff5e8] lg:w-[48%] lg:min-h-[38rem]">
                <div className="relative h-[42vh] min-h-[20rem] lg:h-full">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <p className="text-sm uppercase tracking-[0.35em] text-primary">Premium bake</p>
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="text-3xl font-black uppercase tracking-[-0.04em] text-white sm:text-4xl">
                        {selectedProduct.name}
                      </h2>
                      <span className="rounded-full bg-[#3a2414] px-4 py-2 text-xl font-black uppercase tracking-[0.18em] text-white shadow-soft sm:text-2xl">
                        {selectedProduct.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#fff5e8] lg:w-[52%]">
                <motion.div
                  id={`product-details-${selectedProduct.id}`}
                  className="flex-1 min-h-0 overflow-y-auto p-6 sm:p-8"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={detailVariants}
                >
                  <div className="space-y-6">
                    <section className="rounded-[2rem] bg-white p-6 shadow-soft">
                      <p className="text-sm uppercase tracking-[0.35em] text-primary">Product story</p>
                      <p className="mt-4 text-sm leading-7 text-text-muted">{selectedProduct.description}</p>
                    </section>

                    <section className="rounded-[2rem] bg-white p-6 shadow-soft">
                      <p className="text-sm uppercase tracking-[0.35em] text-primary">Ingredients</p>
                      <p className="mt-3 text-sm leading-7 text-text-muted">
                        {selectedProduct.ingredients.join(', ')}
                      </p>
                    </section>

                    <section className="rounded-[2rem] bg-white p-6 shadow-soft">
                      <p className="text-sm uppercase tracking-[0.35em] text-primary">Tags</p>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {selectedProduct.tags.map((tag) => (
                          <Badge key={tag} label={tag} variant={tag === 'Gluten-free' ? 'sage' : 'cocoa'} />
                        ))}
                      </div>
                    </section>
                  </div>
                </motion.div>

                <div className="sticky bottom-0 z-10 border-t border-border bg-[#fff5e8]/95 p-6 shadow-[0_-10px_30px_rgba(255,245,232,0.65)] sm:p-8">
                  <motion.button
                    type="button"
                    onClick={() => selectedProduct && handleAddToCart(selectedProduct)}
                    whileHover={{ y: -1, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    animate={addFeedback ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 28, duration: 0.22 }}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent-gold px-5 py-4 text-sm font-semibold text-white shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <ShoppingBagIcon className="h-5 w-5" aria-hidden="true" />
                    <span>{addFeedback ? 'Added to cart' : 'Add to cart'}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
