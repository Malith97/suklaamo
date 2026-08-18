'use client';

import { useEffect, useState, type FormEvent, type ComponentType, type SVGProps } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag as ShoppingBagRaw } from 'iconoir-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import JsonLd from '../../components/JsonLd';
import { useCart } from '../../context/CartContext';
import { validateEmail, validateFinnishPhone, validatePickupDate } from '../../lib/validators';
import { useLocale } from '../../context/LocaleContext';

const ShoppingBag = ShoppingBagRaw as unknown as ComponentType<SVGProps<SVGSVGElement>>;

const fieldVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
};

const parsePrice = (price: string) => Number(price.replace(/[^\d]/g, ''));
const formatPrice = (value: number) => `€${value}`;

type CheckoutField = 'name' | 'phone' | 'email' | 'pickupDate';
type PolicyKey = 'privacy' | 'allergen' | 'cancellation';

const policyTabs: Array<{ key: PolicyKey; label: string }> = [
  { key: 'privacy', label: 'Privacy Policy' },
  { key: 'allergen', label: 'Allergen Information Policy' },
  { key: 'cancellation', label: 'Cancellation & Refund Policy' },
];

const policyContent: Record<PolicyKey, { title: string; sections: Array<{ heading: string; body: string }> }> = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: '1. Who We Are (Data Controller)',
        body: 'Suklaamo is a home bakery based in Oulu, Finland, operated by a small home baker, operating as a private individual if not yet registered]. Contact: Email info@suklaamo.fi, Address Peltolankaari 20, 90230 Oulu, Finland.',
      },
      {
        heading: '2. What Personal Data We Collect',
        body: 'When you place an order request or contact us, we collect: name, phone number, email address, pickup date, order details (items, quantities, prices), payment status, and any notes or dietary/allergen information you choose to share. We do not knowingly collect data beyond what is needed to process and fulfil your order.',
      },
      {
        heading: '3. Why We Process Your Data and Legal Basis',
        body: 'Order review, confirmation, pickup coordination, payment instructions, and payment processing are handled under GDPR Article 6(1)(b) (performance of a contract). Accounting records are handled under Article 6(1)(c) (legal obligation under the Finnish Accounting Act). Allergen and dietary responses you request are handled under Article 6(1)(b). Fraud or abuse prevention is handled under Article 6(1)(f) (legitimate interest).',
      },
      {
        heading: '4. Who Sees Your Data',
        body: 'We do not sell, rent, or trade your personal data. Data may be visible to Suklaamo owner(s), service providers used to run the business (order-management and email providers), and Finnish tax authorities when required by law. If a provider stores data outside the EU/EEA, an appropriate GDPR safeguard such as Standard Contractual Clauses is used.',
      },
      {
        heading: '5. How Long We Keep Your Data',
        body: 'Order and payment records are kept for 1 years from the end of the relevant accounting year (Finnish Accounting Act, Kirjanpitolaki 2 luku 10 §). Contact details and notes not required for accounting (for example enquiries that do not become orders) are kept up to 12 months, then deleted. Marketing communication data (if opted in) is kept until unsubscribe or objection.',
      },
      {
        heading: '6. Your Rights',
        body: 'Under GDPR, you have rights to access, correct, request deletion where retention is not legally required, restrict or object to certain processing, data portability where applicable, and to lodge a complaint with the Finnish Data Protection Ombudsman: https://tietosuoja.fi. Contact us and we will respond within one month.',
      },
      {
        heading: '7. Accuracy of Information You Provide',
        body: 'Please provide accurate contact details. If we cannot reach you to confirm your order, we may be unable to proceed.',
      },
      {
        heading: '8. Cookies and Website Data',
        body: 'If analytics, cookies, or embedded content are used, they should be disclosed clearly before publishing. If none are used beyond technically necessary operation, this should be stated explicitly.',
      },
    ],
  },
  allergen: {
    title: 'Allergen Information Policy',
    sections: [
      {
        heading: '1. Kitchen Environment',
        body: 'Suklaamo products are handmade in a home bakery (kotivalmistus) in Oulu. This is not a certified allergen-free facility, and multiple products are prepared using shared equipment, surfaces, and utensils.',
      },
      {
        heading: '2. The 14 Legally Recognised Allergens',
        body: 'Under EU Regulation 1169/2011, the following must be disclosed when used as ingredients: cereals containing gluten, crustaceans, eggs, fish, peanuts, soybeans, milk (including lactose), tree nuts, celery, mustard, sesame seeds, sulphur dioxide and sulphites above legal thresholds, lupin, and molluscs. Full ingredient information for specific products is available on request before ordering.',
      },
      {
        heading: '3. Before You Order',
        body: 'If you or anyone you order for has a food allergy, intolerance, or dietary restriction, contact us before placing your order. We will share the full ingredient list for the specific product(s) you are considering.',
      },
      {
        heading: '4. Cross-Contact Notice',
        body: 'Because Suklaamo operates from a home kitchen using shared equipment, we cannot guarantee the complete absence of allergen cross-contact between products, even with careful preparation and cleaning. If you or your guests have a severe allergy, including risk of anaphylaxis, contact us directly before ordering.',
      },
      {
        heading: '5. Customer Responsibility',
        body: 'By placing an order, you confirm that you have reviewed this allergen policy, asked any necessary questions before ordering, and take responsibility for assessing whether our products are suitable for you or your guests to consume.',
      },
    ],
  },
  cancellation: {
    title: 'Cancellation & Refund Policy',
    sections: [
      {
        heading: '1. A Note on Your Legal Rights',
        body: 'Under the Finnish Consumer Protection Act (Kuluttajansuojalaki, Chapter 6, Section 16), the standard 14-day distance-selling withdrawal right does not apply to made-to-order or quickly perishable goods such as freshly baked food. These terms explain Suklaamo cancellation and refund handling transparently before ordering.',
      },
      {
        heading: '2. Order Requests and Confirmation',
        body: 'Submitting an order through the website is an order request, not a confirmed order. We review availability and contact you to confirm. Your order is guaranteed only after confirmation is sent by us.',
      },
      {
        heading: '3. Payment Timing',
        body: 'After confirmation, payment must be completed in full no later than 24 hours before the scheduled pickup time. If payment is not received by that deadline, we may cancel the order and release the pickup slot.',
      },
      {
        heading: '4. Cancellations and Refunds',
        body: 'If you cancel 24 hours or more before pickup: full refund (100%). If you cancel less than 24 hours before pickup: partial refund (50%) to reflect ingredients and preparation time already committed. No-show or uncollected orders without prior cancellation: no refund. Contact us as soon as possible if you need to cancel.',
      },
      {
        heading: '5. If We Cancel Your Order',
        body: 'If we are unable to fulfil your order for reasons on our side (for example ingredient unavailability), we will contact you quickly and offer either an alternative or a full refund regardless of timing.',
      },
      {
        heading: '6. Refund Method and Timing',
        body: 'Approved refunds are returned to the same payment method used for the original order, within [insert your realistic timeframe, for example 5 business days] after cancellation confirmation.',
      },
      {
        heading: '7. Pickup Responsibility',
        body: 'You are responsible for collecting your order during the confirmed pickup window (Fri 17:00-21:00, Sat-Sun 16:00-20:00, or as otherwise agreed). Late collection may affect product quality. Missed pickups are handled under Section 4.',
      },
      {
        heading: '8. Complaints',
        body: 'If you are unhappy with an order or believe the policy was not followed fairly, contact us first so we can resolve it directly. If unresolved, Finnish consumers may refer disputes to Kuluttajariitalautakunta: https://www.kuluttajariita.fi.',
      },
      {
        heading: 'Policy Updates',
        body: 'These policies should show a last-reviewed date. Suklaamo may update them from time to time, and the version shown at the time of the order applies.',
      },
    ],
  },
};

const policyContentFi: Record<PolicyKey, { title: string; sections: Array<{ heading: string; body: string }> }> = {
  privacy: {
    title: 'Tietosuojakäytäntö',
    sections: [
      { heading: '1. Rekisterinpitäjä', body: 'Suklaamo on Oulussa toimiva kotileipomo. Yhteys: info@suklaamo.fi, Peltolankaari 20, 90230 Oulu.' },
      { heading: '2. Keräämämme henkilötiedot', body: 'Tilauksen tai yhteydenoton yhteydessä keräämme nimen, puhelinnumeron, sähköpostiosoitteen, noutopäivän, tilaustiedot sekä mahdolliset vapaaehtoisesti antamasi lisätiedot ja allergiatiedot.' },
      { heading: '3. Käyttötarkoitus ja oikeusperuste', body: 'Tietoja käytetään tilauksen käsittelyyn, vahvistamiseen, noudon järjestämiseen, maksuohjeisiin, kirjanpitoon sekä väärinkäytösten ehkäisyyn GDPR:n mukaisesti.' },
      { heading: '4. Tietojen säilytys ja luovutus', body: 'Emme myy henkilötietojasi. Tietoja käsittelevät vain Suklaamon toiminta ja sen palveluntarjoajat, ja niitä säilytetään vain tarpeellisen ajan tai lain edellyttämän ajan.' },
      { heading: '5. Oikeutesi', body: 'Voit pyytää tietojesi tarkastamista, korjaamista, poistamista tai käsittelyn rajoittamista sovellettavan lain mukaisesti. Ota yhteyttä sähköpostilla, niin vastaamme kuukauden kuluessa.' },
    ],
  },
  allergen: {
    title: 'Allergeenikäytäntö',
    sections: [
      { heading: '1. Keittiöympäristö', body: 'Suklaamon tuotteet valmistetaan kotileipomossa Oulussa. Keittiö ei ole allergeeniton, ja käytämme samoja välineitä ja pintoja eri tuotteille.' },
      { heading: '2. Allergeenit', body: 'Tuotteissa voi olla esimerkiksi gluteenia sisältäviä viljoja, kananmunaa, maitoa, soijaa ja pähkinöitä. Tuotekohtaiset ainesosat ovat saatavilla ennen tilaamista.' },
      { heading: '3. Ennen tilaamista', body: 'Jos sinulla tai vieraillasi on allergia, intoleranssi tai erityisruokavalio, ota yhteyttä ennen tilaamista. Kerromme kyseisen tuotteen täydet ainesosat.' },
      { heading: '4. Ristikontakti', body: 'Jaettujen välineiden vuoksi emme voi taata, ettei tuotteiden välillä tapahdu allergeenien ristikontaktia. Vakavan allergian yhteydessä ota aina yhteyttä suoraan.' },
      { heading: '5. Asiakkaan vastuu', body: 'Tilaamalla vahvistat, että olet tutustunut allergeenitietoihin ja arvioinut tuotteiden sopivuuden itsellesi ja vieraillesi.' },
    ],
  },
  cancellation: {
    title: 'Peruutus- ja hyvityskäytäntö',
    sections: [
      { heading: '1. Lakisääteiset oikeudet', body: 'Tuoreisiin ja tilauksesta valmistettuihin elintarvikkeisiin ei yleensä sovelleta etämyynnin 14 päivän peruuttamisoikeutta. Nämä ehdot kertovat Suklaamon käytännöistä.' },
      { heading: '2. Tilauspyyntö ja vahvistus', body: 'Verkkosivun kautta lähetetty pyyntö ei vielä ole vahvistettu tilaus. Tarkistamme saatavuuden ja vahvistamme tilauksen erikseen.' },
      { heading: '3. Maksuaikataulu', body: 'Vahvistettu tilaus tulee maksaa kokonaan viimeistään 24 tuntia ennen sovittua noutoaikaa. Maksun puuttuessa voimme perua tilauksen.' },
      { heading: '4. Peruutukset ja hyvitykset', body: 'Vähintään 24 tuntia ennen noutoa perutusta tilauksesta palautetaan koko maksu. Alle 24 tuntia ennen noutoa perutusta tilauksesta palautetaan 50 %. Noutamatta jääneestä tilauksesta ei palauteta maksua.' },
      { heading: '5. Jos me perumme tilauksen', body: 'Jos emme voi toteuttaa tilausta omasta syystämme, tarjoamme vaihtoehdon tai täyden hyvityksen.' },
      { heading: '6. Hyvityksen tapa ja aika', body: 'Hyvitys palautetaan alkuperäiselle maksutavalle peruutuksen vahvistamisen jälkeen.' },
      { heading: '7. Noutovastuu', body: 'Asiakas vastaa tilauksen noutamisesta vahvistetun noutoajan aikana. Myöhästynyt tai väliin jäänyt nouto käsitellään edellä kuvatun peruutuskäytännön mukaan.' },
      { heading: '8. Reklamaatiot', body: 'Jos tilauksessa tai käytännössä on ongelmia, ota ensin yhteyttä Suklaamoon, jotta voimme ratkaista asian suoraan.' },
      { heading: 'Ehtojen päivitykset', body: 'Suklaamo voi päivittää ehtoja. Tilaukseen sovelletaan tilaushetkellä näkyvää versiota.' },
    ],
  },
};

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
  const { locale, t } = useLocale();
  const fi = locale === 'fi';
  const localizedPolicyTabs = fi
    ? [{ key: 'privacy' as PolicyKey, label: 'Tietosuojakäytäntö' }, { key: 'allergen' as PolicyKey, label: 'Allergeenikäytäntö' }, { key: 'cancellation' as PolicyKey, label: 'Peruutus- ja hyvityskäytäntö' }]
    : policyTabs;
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
  const [acceptedPolicies, setAcceptedPolicies] = useState(false);
  const [policyTouched, setPolicyTouched] = useState(false);
  const [isPolicyDialogOpen, setIsPolicyDialogOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyKey>('privacy');
  const [minPickupDate, setMinPickupDate] = useState('');
  const activePolicyContent = (fi ? policyContentFi : policyContent)[activePolicy];

  useEffect(() => {
    setMinPickupDate(getTomorrowDate());
  }, []);

  useEffect(() => {
    if (!isPolicyDialogOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPolicyDialogOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isPolicyDialogOpen]);

  const totalAmount = items.reduce((sum, item) => sum + parsePrice(item.product.price) * item.quantity, 0);

  const getFieldError = (field: CheckoutField, value: string) => {
    const sanitizedValue = value.trim();

    if (field === 'name') {
      if (!sanitizedValue) return fi ? 'Nimi on pakollinen.' : 'Name is required.';
      return '';
    }

    if (field === 'phone') {
      if (!sanitizedValue) return fi ? 'Puhelinnumero on pakollinen.' : 'Phone is required.';
      if (!validateFinnishPhone(sanitizedValue)) return fi ? 'Anna kelvollinen suomalainen puhelinnumero.' : 'Please enter a valid Finnish phone number.';
      return '';
    }

    if (field === 'email') {
      if (!sanitizedValue) return fi ? 'Sähköposti on pakollinen.' : 'Email is required.';
      if (!validateEmail(sanitizedValue)) return fi ? 'Anna kelvollinen sähköpostiosoite.' : 'Please enter a valid email address.';
      return '';
    }

    if (!sanitizedValue) return fi ? 'Noutopäivä on pakollinen.' : 'Pickup date is required.';
    if (!validatePickupDate(sanitizedValue)) return fi ? 'Noutopäivän on oltava tulevaisuudessa.' : 'Pickup date must be in the future.';
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

  const policyValidationError = policyTouched && !acceptedPolicies
    ? (fi ? 'Vahvista, että hyväksyt tietosuojakäytännön, allergeenikäytännön ja peruutus- ja hyvityskäytännön.' : 'Please confirm that you agree to the Privacy Policy, Allergen Information Policy and Cancellation & Refund Policy.')
    : '';
  const policyServerError = errors.policyAccepted ?? '';
  const policyError = policyValidationError || policyServerError;

  const isSubmitDisabled = status === 'submitting' || !items.length || !hasRequiredValues || hasClientErrors || !acceptedPolicies;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!items.length) return;

    setTouched({ name: true, phone: true, email: true, pickupDate: true });
    setPolicyTouched(true);
    if (!validateAllFields()) {
      setStatus('error');
      return;
    }

    if (!acceptedPolicies) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setServerError(null);

    let response: Response;
    let result: Record<string, unknown>;

    try {
      response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          pickupDate,
          notes,
          policyAccepted: acceptedPolicies,
          items: items.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          })),
        }),
      });
      result = await response.json();
    } catch {
      setServerError(fi ? 'Tilauspyynnön lähettäminen ei onnistunut. Tarkista yhteytesi ja yritä uudelleen.' : 'Unable to submit your order request. Please check your connection and try again.');
      setStatus('error');
      return;
    }

    if (!response.ok) {
      if (result.errors && typeof result.errors === 'object' && result.errors !== null) {
        setErrors(result.errors as Record<string, string>);
      } else {
        setServerError(typeof result.error === 'string' ? result.error : (fi ? 'Tilauspyynnön lähettäminen ei onnistunut. Yritä myöhemmin uudelleen.' : 'Unable to submit your order request. Please try again later.'));
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
            <p className="text-sm uppercase tracking-[0.35em] text-primary">{fi ? 'Tilaus lähetetty' : 'Order placed'}</p>
            <h1 className="mt-4 text-4xl font-black text-text-dark">{fi ? 'Kiitos' : 'Thank you'}</h1>
            {orderNumber ? (
              <div className="mt-6 rounded-[1.5rem] border border-border bg-[#fbf7f0] p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-text-muted">{fi ? 'Tilausnumero' : 'Order Number'}</p>
                <p className="mt-2 text-2xl font-black text-primary">{orderNumber}</p>
              </div>
            ) : null}
            <p className="mt-4 text-sm leading-7 text-text-muted">
              {fi ? `Tilauspyyntösi on vastaanotettu. Vahvistusviesti on lähetetty osoitteeseen ${email}. Säilytä tilausnumero myöhempää käyttöä varten. Otamme pian yhteyttä saatavuuden ja noutotietojen vahvistamiseksi.` : `Your order request has been received. A confirmation email has been sent to ${email}. Keep your order number for reference. We will contact you shortly to confirm availability and pickup details.`}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/catalogue" className="inline-flex rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-[#d38a24]">
                {t.common.continueShopping}
              </Link>
              <Link href="/" className="inline-flex rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-primary shadow-soft hover:bg-[#fff5df]">
                {t.common.backHome}
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
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.95fr] lg:items-start">
          <motion.div variants={fieldVariants} initial="hidden" animate="visible" className="space-y-6">
            <div className="rounded-[3rem] bg-white p-8 shadow-soft">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-primary">{fi ? 'Kassa' : 'Checkout'}</p>
                <h1 className="mt-3 text-3xl font-black text-text-dark sm:text-4xl">{fi ? 'Lähetä tilauspyyntösi' : 'Place your order request'}</h1>
              </div>

              {!items.length ? (
                <div className="mt-8 rounded-[2.5rem] bg-[#fff4df] p-10 text-center">
                  <p className="text-lg font-semibold text-primary">{fi ? 'Ostoskorissa ei ole tuotteita' : 'No items in cart'}</p>
                  <p className="mt-3 text-sm leading-7 text-text-muted">{fi ? 'Lisää jotain valikoimasta ennen kassalle siirtymistä.' : 'Add something from the catalogue before checking out.'}</p>
                  <Link href="/catalogue" className="mt-6 inline-flex rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-[#d38a24]">
                    {t.common.browseCatalogue}
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className={`group relative block overflow-hidden rounded-[1.75rem] border bg-[#fbf7f0] px-4 pb-3 pt-6 text-sm text-text-dark transition focus-within:ring-2 ${errors.name ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-200' : 'border-border focus-within:border-primary/70 focus-within:ring-primary/20'}`}>
                    <span className="absolute left-4 top-3 text-xs uppercase tracking-[0.28em] text-text-muted transition-all group-focus-within:text-primary">
                      {fi ? 'Nimi' : 'Name'}
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
                      {fi ? 'Puhelin' : 'Phone'}
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
                      {fi ? 'Sähköposti' : 'Email'}
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
                      {fi ? 'Noutopäivä' : 'Pickup date'}
                    </span>
                    <input
                      type="date"
                      value={pickupDate}
                      min={minPickupDate || undefined}
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
                <label className="group relative block rounded-[1.75rem] border border-border bg-[#fbf7f0] text-sm text-text-dark transition focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/20">
                  <span className="block px-4 pt-3 text-xs uppercase tracking-[0.28em] text-text-muted transition-all group-focus-within:text-primary">
                    {fi ? 'Lisätiedot' : 'Notes'}
                  </span>
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    rows={5}
                    className="block w-full min-h-[7.5rem] resize-y border-0 bg-transparent px-4 pb-3 text-sm leading-6 outline-none focus:ring-0"
                  />
                </label>

                <div className={`rounded-[1.75rem] border bg-[#fbf7f0] p-5 ${policyError ? 'border-red-500' : 'border-border'}`}>
                  <div className="flex items-start gap-3">
                    <input
                      id="checkout-policy-acceptance"
                      type="checkbox"
                      checked={acceptedPolicies}
                      onChange={(event) => {
                        setAcceptedPolicies(event.target.checked);
                        setPolicyTouched(true);
                        setErrors((current) => {
                          if (!current.policyAccepted) return current;
                          const nextErrors = { ...current };
                          delete nextErrors.policyAccepted;
                          return nextErrors;
                        });
                      }}
                      onBlur={() => setPolicyTouched(true)}
                      aria-invalid={Boolean(policyError)}
                      aria-describedby={policyError ? 'checkout-policy-error' : undefined}
                      className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary/30"
                    />
                    <label htmlFor="checkout-policy-acceptance" className="text-sm leading-7 text-text-muted">
                      {fi ? 'Olen lukenut ja hyväksyn tietosuojakäytännön, allergeenikäytännön sekä peruutus- ja hyvityskäytännön.' : 'I have read and agree to the Privacy Policy, Allergen Information Policy and Cancellation & Refund Policy.'}
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPolicyDialogOpen(true)}
                    className="mt-3 text-sm font-semibold text-primary underline underline-offset-4 hover:text-[#5b3a1e]"
                  >
                    {t.common.viewPolicies}
                  </button>

                  {policyError ? (
                    <p id="checkout-policy-error" role="alert" className="mt-3 text-xs text-red-600">
                      {policyError}
                    </p>
                  ) : null}
                </div>

                {serverError ? <p className="text-sm text-red-600">{serverError}</p> : null}
                <Button type="submit" className="w-full inline-flex items-center justify-center gap-2" disabled={isSubmitDisabled}>
                  <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                  {status === 'submitting' ? t.common.submitting : (fi ? 'Lähetä tilauspyyntö' : 'Place Order Request')}
                </Button>
              </form>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[2rem] bg-white p-6 shadow-soft">
                <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">{fi ? 'Noutotiedot' : 'Pickup information'}</p>
                <div className="mt-4 space-y-3 text-sm leading-7 text-text-muted">
                  <p><span className="font-semibold text-text-dark">{fi ? 'Nouto-osoite:' : 'Pickup Address:'}</span><br />Peltolankaari 20<br />90230 Oulu</p>
                  <p><span className="font-semibold text-text-dark">{fi ? 'Noutoajat:' : 'Pickup Hours:'}</span><br />{fi ? 'Perjantai: 17.00–21.00' : 'Friday: 17:00–21:00'}<br />{fi ? 'Lauantai–sunnuntai: 16.00–20.00' : 'Saturday–Sunday: 16:00–20:00'}</p>
                </div>
              </div>

              <div className="rounded-[2rem] bg-white p-6 shadow-soft">
                <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">{fi ? 'Maksutiedot' : 'Payment information'}</p>
                <div className="mt-4 space-y-3 text-sm leading-7 text-text-muted">
                  <p><span className="font-semibold text-text-dark">{fi ? 'Maksutavat:' : 'Payment Methods:'}</span><br />MobilePay<br />{fi ? 'Pankkisiirto' : 'Bank Transfer'}</p>
                  <p>{fi ? 'Korttimaksut eivät ole tällä hetkellä käytössä.' : 'Card payments are currently unavailable.'}</p>
                  <p>{fi ? 'Lähetämme maksuohjeet tilauksen vahvistamisen jälkeen.' : 'We will send payment instructions after confirming your order.'}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-soft">
              <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">{fi ? 'Kassan usein kysytyt kysymykset' : 'Checkout FAQ'}</p>
              <div className="mt-4 space-y-4 text-sm leading-7 text-text-muted">
                <p><span className="font-semibold text-text-dark">{fi ? 'Mitä jos tuotetta ei ole saatavilla?' : 'What if my item isn&apos;t available?'}</span><br />{fi ? 'Otamme yhteyttä ja tarjoamme vaihtoehtoja tai perumme tilauksen.' : 'We will contact you and provide alternatives or cancel the order.'}</p>
                <p><span className="font-semibold text-text-dark">{fi ? 'Voinko perua tilaukseni?' : 'Can I cancel my order?'}</span><br />{fi ? 'Tilauksen voi perua ennen vahvistamista.' : 'Orders may be cancelled before confirmation.'}</p>
                <p><span className="font-semibold text-text-dark">{fi ? 'Mistä noudan tilaukseni?' : 'Where do I pick up my order?'}</span><br />Peltolankaari 20, 90230 Oulu.</p>
                <p><span className="font-semibold text-text-dark">{fi ? 'Milloin saan vastauksen?' : 'When will I hear back?'}</span><br />{fi ? 'Vastaamme yleensä muutaman tunnin kuluessa aukiolopäivinä.' : 'We typically respond within a few hours during operating days.'}</p>
              </div>
            </div>
          </motion.div>

          <motion.aside variants={fieldVariants} initial="hidden" animate="visible" className="space-y-6 rounded-[3rem] bg-surface p-8 shadow-soft lg:sticky lg:top-28">
            <div className="rounded-[2rem] bg-white p-6 shadow-soft">
              <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">{fi ? 'Tilauksen yhteenveto' : 'Order summary'}</p>
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
                    <span>{t.common.total}</span>
                    <span className="font-black text-text-dark">{formatPrice(totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] bg-white p-6 shadow-soft">
              <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">{fi ? 'Näin se toimii' : 'How it works'}</p>
              <ol className="mt-4 space-y-4 text-sm leading-7 text-text-muted">
                <li>
                  <span className="font-semibold text-text-dark">1.</span> {fi ? 'Lähetä tilauspyyntösi.' : 'Submit your order request.'}
                </li>
                <li>
                  <span className="font-semibold text-text-dark">2.</span> {fi ? 'Otamme yhteyttä WhatsAppissa saatavuuden ja noutotietojen vahvistamiseksi.' : 'We will contact you on WhatsApp to confirm availability and pickup details.'}
                </li>
                <li>
                  <span className="font-semibold text-text-dark">3.</span> {fi ? 'Vahvistamisen jälkeen lähetämme maksuohjeet.' : 'Once confirmed, payment instructions will be shared.'}
                </li>
                <li>
                  <span className="font-semibold text-text-dark">4.</span> {fi ? 'Tilauksesi valmistetaan sovituksi noutopäiväksi.' : 'Your order will be prepared for the agreed pickup date.'}
                </li>
              </ol>
            </div>
            <div className="rounded-[2rem] bg-white p-6 shadow-soft">
              <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">{fi ? 'Tilaehdot' : 'Order terms'}</p>
              <p className="mt-4 text-sm leading-7 text-text-muted">
                {fi ? 'Tilaukset vahvistetaan saatavuuden tarkistamisen jälkeen. Varaa tilaus ennen torstaita klo 18.00 viikonlopun noutoa varten.' : 'Orders are confirmed after availability review. Reserve your order before Thursday 18:00 for weekend pickup.'}
              </p>
            </div>
          </motion.aside>
        </div>
      </section>

      <AnimatePresence>
        {isPolicyDialogOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-3 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPolicyDialogOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="checkout-policy-title"
              className="relative w-full max-w-3xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-5 sm:px-8">
                <h2 id="checkout-policy-title" className="text-xl font-black text-primary">{fi ? 'Suklaamon käytännöt' : 'Suklaamo Policies'}</h2>
                <button
                  type="button"
                  onClick={() => setIsPolicyDialogOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary transition hover:bg-[#fff5df]"
                  aria-label={fi ? 'Sulje ehtojen katselu' : 'Close policy viewer'}
                >
                  ×
                </button>
              </div>

              <div className="px-6 pt-5 sm:px-8">
                <div role="tablist" aria-label={fi ? 'Ehtojen navigointi' : 'Policy navigation'} className="flex flex-wrap gap-2">
                  {localizedPolicyTabs.map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      role="tab"
                      aria-selected={activePolicy === tab.key}
                      onClick={() => setActivePolicy(tab.key)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        activePolicy === tab.key
                          ? 'bg-primary text-white'
                          : 'border border-border bg-white text-primary hover:bg-[#fff5df]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="max-h-[62vh] overflow-y-auto px-6 pb-8 pt-5 sm:px-8">
                <div role="tabpanel" className="space-y-5">
                    <h3 className="text-lg font-black text-text-dark">{activePolicyContent.title}</h3>
                  {activePolicyContent.sections.map((section) => (
                    <div key={section.heading} className="rounded-[1.5rem] bg-[#fbf7f0] p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{section.heading}</p>
                      <p className="mt-3 text-sm leading-7 text-text-muted">{section.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: "What if my item isn't available?",
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'We will contact you and provide alternatives or cancel the order.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can I cancel my order?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Orders may be cancelled before confirmation.',
              },
            },
            {
              '@type': 'Question',
              name: 'Where do I pick up my order?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Peltolankaari 20, 90230 Oulu, Finland.',
              },
            },
            {
              '@type': 'Question',
              name: 'When will I hear back?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'We typically respond within a few hours during operating days.',
              },
            },
          ],
        }}
      />
      <Footer />
    </main>
  );
}
