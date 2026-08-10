'use client';

import { useState, type FormEvent, type ComponentType, type SVGProps } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag as ShoppingBagRaw } from 'iconoir-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { useCart } from '../../context/CartContext';
import { validateEmail, validateFinnishPhone, validatePickupDate } from '../../lib/validators';

const ShoppingBag = ShoppingBagRaw as unknown as ComponentType<SVGProps<SVGSVGElement>>;

const fieldVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
};

const parsePrice = (price: string) => Number(price.replace(/[^\d]/g, ''));
const formatPrice = (value: number) => `€${value}`;

type CheckoutField = 'name' | 'phone' | 'email' | 'pickupDate';

const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<CheckoutField, boolean>>({
    name: false,
    phone: false,
    email: false,
    pickupDate: false,
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const minPickupDate = getTomorrowDate();

  const totalAmount = items.reduce((sum, item) => sum + parsePrice(item.product.price) * item.quantity, 0);

  const getFieldError = (field: CheckoutField, value: string) => {
    const sanitizedValue = value.trim();

    if (field === 'name') {
      if (!sanitizedValue) return 'Name is required.';
      return '';
    }

    if (field === 'phone') {
      if (!sanitizedValue) return 'Phone is required.';
      if (!validateFinnishPhone(sanitizedValue)) return 'Please enter a valid Finnish phone number.';
      return '';
    }

    if (field === 'email') {
      if (!sanitizedValue) return 'Email is required.';
      if (!validateEmail(sanitizedValue)) return 'Please enter a valid email address.';
      return '';
    }

    if (!sanitizedValue) return 'Pickup date is required.';
    if (!validatePickupDate(sanitizedValue)) return 'Pickup date must be in the future.';
    return '';
  };

  const setFieldError = (field: CheckoutField, value: string) => {
    const error = getFieldError(field, value);
    setErrors((current) => {
      if (!error && !current[field]) return current;
      const nextErrors = { ...current };
      if (error) nextErrors[field] = error;
      else delete nextErrors[field];
      return nextErrors;
    });
  };

  const validateAllFields = () => {
    const fieldErrors: Record<string, string> = {};
    const nameError = getFieldError('name', name);
    const phoneError = getFieldError('phone', phone);
    const emailError = getFieldError('email', email);
    const pickupDateError = getFieldError('pickupDate', pickupDate);

    if (nameError) fieldErrors.name = nameError;
    if (phoneError) fieldErrors.phone = phoneError;
    if (emailError) fieldErrors.email = emailError;
    if (pickupDateError) fieldErrors.pickupDate = pickupDateError;

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const hasRequiredValues = Boolean(name.trim() && phone.trim() && email.trim() && pickupDate.trim());
  const hasClientErrors = Boolean(
    getFieldError('name', name) ||
    getFieldError('phone', phone) ||
    getFieldError('email', email) ||
    getFieldError('pickupDate', pickupDate)
  );
  const isSubmitDisabled = status === 'submitting' || !items.length || !hasRequiredValues || hasClientErrors;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!items.length) return;

    setTouched({ name: true, phone: true, email: true, pickupDate: true });
    if (!validateAllFields()) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setServerError(null);

    const response = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone,
        email,
        pickupDate,
        notes,
        items: items.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      if (result.errors) {
        setErrors(result.errors);
      } else {
        setServerError(result.error || 'Unable to submit your order request. Please try again later.');
      }
      setStatus('error');
      return;
    }

    setOrderNumber(typeof result.orderNumber === 'string' ? result.orderNumber : null);
    clearCart();
    setSubmitted(true);
    setStatus('success');
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex flex-col bg-background text-text-dark">
        <Navbar />
        <section className="flex-1 container mx-auto py-16">
          <div className="rounded-[3rem] bg-white p-10 text-center shadow-soft">
            <p className="text-sm uppercase tracking-[0.35em] text-primary">Order placed</p>
            <h1 className="mt-4 text-4xl font-black text-text-dark">Thank you</h1>
            {orderNumber ? (
              <div className="mt-6 rounded-[1.5rem] border border-border bg-[#fbf7f0] p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-text-muted">Order Number</p>
                <p className="mt-2 text-2xl font-black text-primary">{orderNumber}</p>
              </div>
            ) : null}
            <p className="mt-4 text-sm leading-7 text-text-muted">
              Your order request has been received. A confirmation email has been sent to {email}. Keep your order number for reference. We will contact you shortly to confirm availability and pickup details.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/catalogue" className="inline-flex rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-[#d38a24]">
                Continue shopping
              </Link>
              <Link href="/" className="inline-flex rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-primary shadow-soft hover:bg-[#fff5df]">
                Back home
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-background text-text-dark">
      <Navbar />
      <section className="flex-1 container mx-auto py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_0.9fr]">
          <motion.div variants={fieldVariants} initial="hidden" animate="visible" className="space-y-8 rounded-[3rem] bg-white p-8 shadow-soft">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-primary">Checkout</p>
              <h1 className="mt-3 text-3xl font-black text-text-dark sm:text-4xl">Place your order request</h1>
            </div>

            {!items.length ? (
              <div className="rounded-[2.5rem] bg-[#fff4df] p-10 text-center">
                <p className="text-lg font-semibold text-primary">No items in cart</p>
                <p className="mt-3 text-sm leading-7 text-text-muted">Add something from the catalogue before checking out.</p>
                <Link href="/catalogue" className="mt-6 inline-flex rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-[#d38a24]">
                  Browse catalogue
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className={`group relative block overflow-hidden rounded-[1.75rem] border bg-[#fbf7f0] px-4 pb-3 pt-6 text-sm text-text-dark transition focus-within:ring-2 ${errors.name ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-200' : 'border-border focus-within:border-primary/70 focus-within:ring-primary/20'}`}>
                    <span className="absolute left-4 top-3 text-xs uppercase tracking-[0.28em] text-text-muted transition-all group-focus-within:text-primary">
                      Name
                    </span>
                    <input
                      value={name}
                      onChange={(event) => {
                        const value = event.target.value;
                        setName(value);
                        setTouched((current) => ({ ...current, name: true }));
                        setServerError(null);
                        setFieldError('name', value);
                      }}
                      onBlur={() => {
                        setTouched((current) => ({ ...current, name: true }));
                        setFieldError('name', name);
                      }}
                      required
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'checkout-name-error' : undefined}
                      className="mt-2 w-full border-0 bg-transparent p-0 text-sm outline-none focus:ring-0"
                    />
                    {errors.name && touched.name ? <p id="checkout-name-error" role="alert" className="mt-2 text-xs text-red-600">{errors.name}</p> : null}
                  </label>
                  <label className={`group relative block overflow-hidden rounded-[1.75rem] border bg-[#fbf7f0] px-4 pb-3 pt-6 text-sm text-text-dark transition focus-within:ring-2 ${errors.phone ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-200' : 'border-border focus-within:border-primary/70 focus-within:ring-primary/20'}`}>
                    <span className="absolute left-4 top-3 text-xs uppercase tracking-[0.28em] text-text-muted transition-all group-focus-within:text-primary">
                      Phone
                    </span>
                    <input
                      value={phone}
                      onChange={(event) => {
                        const value = event.target.value;
                        setPhone(value);
                        setTouched((current) => ({ ...current, phone: true }));
                        setServerError(null);
                        setFieldError('phone', value);
                      }}
                      onBlur={() => {
                        setTouched((current) => ({ ...current, phone: true }));
                        setFieldError('phone', phone);
                      }}
                      required
                      inputMode="tel"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'checkout-phone-error' : undefined}
                      className="mt-2 w-full border-0 bg-transparent p-0 text-sm outline-none focus:ring-0"
                    />
                    {errors.phone && touched.phone ? <p id="checkout-phone-error" role="alert" className="mt-2 text-xs text-red-600">{errors.phone}</p> : null}
                  </label>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className={`group relative block overflow-hidden rounded-[1.75rem] border bg-[#fbf7f0] px-4 pb-3 pt-6 text-sm text-text-dark transition focus-within:ring-2 ${errors.email ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-200' : 'border-border focus-within:border-primary/70 focus-within:ring-primary/20'}`}>
                    <span className="absolute left-4 top-3 text-xs uppercase tracking-[0.28em] text-text-muted transition-all group-focus-within:text-primary">
                      Email
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => {
                        const value = event.target.value;
                        setEmail(value);
                        setTouched((current) => ({ ...current, email: true }));
                        setServerError(null);
                        setFieldError('email', value);
                      }}
                      onBlur={() => {
                        setTouched((current) => ({ ...current, email: true }));
                        setFieldError('email', email);
                      }}
                      required
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'checkout-email-error' : undefined}
                      className="mt-2 w-full border-0 bg-transparent p-0 text-sm outline-none focus:ring-0"
                    />
                    {errors.email && touched.email ? <p id="checkout-email-error" role="alert" className="mt-2 text-xs text-red-600">{errors.email}</p> : null}
                  </label>
                  <label className={`group relative block overflow-hidden rounded-[1.75rem] border bg-[#fbf7f0] px-4 pb-3 pt-6 text-sm text-text-dark transition focus-within:ring-2 ${errors.pickupDate ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-200' : 'border-border focus-within:border-primary/70 focus-within:ring-primary/20'}`}>
                    <span className="absolute left-4 top-3 text-xs uppercase tracking-[0.28em] text-text-muted transition-all group-focus-within:text-primary">
                      Pickup date
                    </span>
                    <input
                      type="date"
                      value={pickupDate}
                      min={minPickupDate}
                      onChange={(event) => {
                        const value = event.target.value;
                        setPickupDate(value);
                        setTouched((current) => ({ ...current, pickupDate: true }));
                        setServerError(null);
                        setFieldError('pickupDate', value);
                      }}
                      onBlur={() => {
                        setTouched((current) => ({ ...current, pickupDate: true }));
                        setFieldError('pickupDate', pickupDate);
                      }}
                      required
                      aria-invalid={Boolean(errors.pickupDate)}
                      aria-describedby={errors.pickupDate ? 'checkout-pickup-error' : undefined}
                      className="mt-2 w-full border-0 bg-transparent p-0 text-sm outline-none focus:ring-0"
                    />
                    {errors.pickupDate && touched.pickupDate ? <p id="checkout-pickup-error" role="alert" className="mt-2 text-xs text-red-600">{errors.pickupDate}</p> : null}
                  </label>
                </div>
                <label className="group relative block overflow-hidden rounded-[1.75rem] border border-border bg-[#fbf7f0] px-4 pb-3 pt-3 text-sm text-text-dark transition focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/20">
                  <span className="pointer-events-none absolute left-4 top-3 z-10 text-xs uppercase tracking-[0.28em] text-text-muted transition-all group-focus-within:text-primary">
                    Notes
                  </span>
                  <div className="pt-6">
                    <textarea
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      rows={5}
                      className="block w-full min-h-[7.5rem] border-0 bg-transparent p-0 text-sm leading-6 outline-none focus:ring-0"
                    />
                  </div>
                </label>
                {serverError ? <p className="text-sm text-red-600">{serverError}</p> : null}
                <Button type="submit" className="w-full inline-flex items-center justify-center gap-2" disabled={isSubmitDisabled}>
                  <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                  {status === 'submitting' ? 'Submitting...' : 'Place Order Request'}
                </Button>
              </form>
            )}
          </motion.div>

          <motion.aside variants={fieldVariants} initial="hidden" animate="visible" className="space-y-6 rounded-[3rem] bg-surface p-8 shadow-soft">
            <div className="rounded-[2rem] bg-white p-6 shadow-soft">
              <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">Order summary</p>
              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="font-semibold text-text-dark">{item.product.name}</p>
                      <p className="text-sm text-text-muted">{item.quantity} × {item.product.price}</p>
                    </div>
                    <p className="font-black text-text-dark">{formatPrice(parsePrice(item.product.price) * item.quantity)}</p>
                  </div>
                ))}
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between text-sm text-text-muted">
                    <span>Total</span>
                    <span className="font-black text-text-dark">{formatPrice(totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] bg-white p-6 shadow-soft">
              <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">How it works</p>
              <ol className="mt-4 space-y-4 text-sm leading-7 text-text-muted">
                <li>
                  <span className="font-semibold text-text-dark">1.</span> Submit your order request.
                </li>
                <li>
                  <span className="font-semibold text-text-dark">2.</span> We will contact you on WhatsApp to confirm availability and pickup details.
                </li>
                <li>
                  <span className="font-semibold text-text-dark">3.</span> Once confirmed, payment instructions will be shared.
                </li>
                <li>
                  <span className="font-semibold text-text-dark">4.</span> Your order will be prepared for the agreed pickup date.
                </li>
              </ol>
            </div>
          </motion.aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}
