'use client';

import { AnimatePresence, motion } from 'framer-motion';
import SmartImage from '../../components/SmartImage';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { useCart } from '../../context/CartContext';
import { getLocalizedProduct } from '../../lib/i18n';
import { useLocale } from '../../context/LocaleContext';

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: 14, transition: { duration: 0.2, ease: 'easeIn' } },
};

const parsePrice = (price: string) => Number(price.replace(/[^\d]/g, ''));
const formatPrice = (value: number) => `€${value}`;

export default function CartPage() {
  const { items, itemCount, removeItem, updateQuantity, clearCart } = useCart();
  const { locale, t } = useLocale();

  const subtotal = items.reduce((sum, item) => sum + parsePrice(item.product.price) * item.quantity, 0);
  const continueShoppingHref = '/catalogue';

  return (
    <main className="min-h-screen flex flex-col bg-background text-text-dark">
      <Navbar />

      <section className="flex-1 container mx-auto py-16">
        <div className="grid gap-10 lg:grid-cols-[1.45fr_0.85fr]">
          <div className="space-y-6">
            <div className="rounded-[2.5rem] bg-white p-8 shadow-soft">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-primary">{locale === 'fi' ? 'Ostoskori' : 'Your cart'}</p>
                  <h1 className="mt-3 text-3xl font-black text-text-dark sm:text-4xl">{locale === 'fi' ? 'Valmiina noutoon' : 'Ready for pickup'}</h1>
                </div>
                <p className="text-sm font-semibold text-text-muted">{itemCount} {itemCount === 1 ? t.common.item : t.common.items}</p>
              </div>
            </div>

            {items.length === 0 ? (
              <div className="rounded-[2.5rem] bg-[#fff4df] p-10 text-center shadow-soft">
                <p className="text-xl font-semibold text-primary">{locale === 'fi' ? 'Ostoskori on tyhjä' : 'Your cart is empty'}</p>
                <p className="mt-3 text-sm leading-7 text-text-muted">{locale === 'fi' ? 'Selaa valikoimaa ja valitse seuraava suklaaherkkusi.' : 'Browse the catalogue to select your next chocolate treat.'}</p>
                <Link href="/catalogue" className="mt-6 inline-flex rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-[#d38a24]">
                  {t.common.browseCatalogue}
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-[2.5rem] bg-white p-6 shadow-soft">
                  <div className="flex flex-col gap-4">
                    <div className="grid gap-6">
                      <AnimatePresence initial={false} mode="popLayout">
                        {items.map((item) => {
                          const itemTotal = parsePrice(item.product.price) * item.quantity;
                          const localizedProduct = getLocalizedProduct(item.product, locale);
                          return (
                            <motion.article key={item.product.id} variants={rowVariants} initial="hidden" animate="visible" exit="exit" className="grid gap-4 rounded-[2rem] border border-border p-4 sm:grid-cols-[120px_1fr]">
                              <div className="relative overflow-hidden rounded-[2rem] bg-[#f8efe0]">
                                <SmartImage
                                  src={item.product.image}
                                  alt={`${item.product.name} — Suklaamo chocolate treat`}
                                  width={320}
                                  height={240}
                                  imgClassName="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex flex-col justify-between gap-4">
                                <div>
                                  <h2 className="text-xl font-black text-text-dark">{item.product.name}</h2>
                                  <p className="mt-2 text-sm leading-6 text-text-muted">{localizedProduct.description}</p>
                                </div>
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                  <div className="flex items-center gap-3">
                                        <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-xl text-primary transition hover:bg-[#f4e0c3]">
                                      −
                                    </button>
                                    <span className="min-w-[2rem] text-center text-sm font-semibold">{item.quantity}</span>
                                        <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-xl text-primary transition hover:bg-[#f4e0c3]">
                                      +
                                    </button>
                                  </div>
                                  <div className="space-y-2 text-right">
                                    <p className="text-sm font-semibold text-primary">{item.product.price} {t.common.each}</p>
                                    <p className="text-lg font-black text-text-dark">{formatPrice(itemTotal)}</p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between gap-4 text-sm text-text-muted">
                                  <button type="button" onClick={() => removeItem(item.product.id)} className="font-semibold text-primary transition hover:text-[#5b3a1e]">
                                    {t.common.remove}
                                  </button>
                                </div>
                              </div>
                            </motion.article>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                {/* <div className="flex flex-wrap items-center gap-3">
                  <Button variant="secondary" type="button" onClick={clearCart} className="rounded-full px-5 py-3">
                    Clear Cart
                  </Button>
                  <Link href="/checkout" className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-soft hover:bg-[#4e2b15]">
                    Continue to Checkout
                  </Link>
                </div> */}
              </div>
            )}
          </div>

          <aside className="space-y-6 rounded-[2.5rem] bg-surface p-8 shadow-soft">
            <div className="rounded-[2rem] bg-white p-6 shadow-soft">
              <p className="text-sm uppercase tracking-[0.35em] text-primary">{locale === 'fi' ? 'Tilauksen yhteenveto' : 'Order summary'}</p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-text-muted">
                  <span>{locale === 'fi' ? 'Tuotteet' : 'Items'}</span>
                  <span>{itemCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-text-muted">
                  <span>{t.common.subtotal}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-text-muted">
                  <span>{t.common.vat}</span>
                  <span>€0</span>
                </div>
                <div className="flex items-center justify-between text-sm text-text-muted">
                  <span>{t.common.delivery}</span>
                  <span>€0</span>
                </div>
                <div className="border-t border-border pt-4 text-xl font-black text-text-dark">
                  <span>{t.common.total}</span>
                  <span className="float-right">{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] bg-white p-6 shadow-soft">
              <p className="text-sm uppercase tracking-[0.35em] text-primary">{t.common.pickupDetails}</p>
              <p className="mt-4 text-sm leading-7 text-text-muted">{locale === 'fi' ? 'Noutotilaukset valmistellaan noudettaviksi Oulussa. Vahvistamme tarkan noutoajan kassalla.' : 'Pickup orders are prepared for local collection from Oulu. We will confirm your exact pickup time on checkout.'}</p>
            </div>
            <div className="rounded-[2rem] bg-white p-6 shadow-soft">
              <p className="text-sm uppercase tracking-[0.35em] text-primary">{locale === 'fi' ? 'Viikonlopun tilaukset' : 'Weekend ordering'}</p>
              <p className="mt-4 text-sm leading-7 text-text-muted">{locale === 'fi' ? 'Varaa tilauksesi ennen torstaita klo 18.00.' : 'Reserve your order before Thursday 18:00.'}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href={continueShoppingHref} className="inline-flex rounded-full border border-[#d9c8b1] bg-white px-5 py-3 text-sm font-semibold text-primary shadow-soft hover:bg-[#fff5df]">
                {t.common.continueShopping}
              </Link>
              <Button variant="secondary" type="button" onClick={clearCart} className="rounded-full px-5 py-3">
                {t.common.clearCart}
              </Button>
              <Link href="/checkout" className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-soft hover:bg-[#4e2b15]">
                {t.common.continueToCheckout}
              </Link>
              </div>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}
