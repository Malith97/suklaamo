export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export type OrderFormValues = {
  name: string;
  phone: string;
  email: string;
  pickupDate: string;
  notes: string;
  items: OrderLineItem[];
  policyAccepted: boolean;
};

export type OrderLineItem = {
  id: string;
  name: string;
  price: string;
  quantity: number;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FINNISH_PHONE_LOCAL_REGEX = /^0[45]\d{8}$/;
const FINNISH_PHONE_INTL_REGEX = /^\+358[45]\d{8}$/;

export function sanitizeInput(value: string) {
  return value.trim().replace(/<[^>]*>/g, '');
}

function sanitizeUnknownString(value: unknown) {
  return typeof value === 'string' ? sanitizeInput(value) : '';
}

function parseQuantity(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) return Math.trunc(value);
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return Math.trunc(parsed);
  }
  return 0;
}

function parseBoolean(value: unknown) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'true') return true;
    if (normalized === 'false') return false;
  }
  return false;
}

function sanitizeOrderItems(items: unknown): OrderLineItem[] {
  if (!Array.isArray(items)) return [];

  return items.map((item) => {
    const candidate = (item ?? {}) as Record<string, unknown>;
    return {
      id: sanitizeUnknownString(candidate.id),
      name: sanitizeUnknownString(candidate.name),
      price: sanitizeUnknownString(candidate.price),
      quantity: parseQuantity(candidate.quantity),
    };
  });
}

function normalizePhone(phone: string) {
  return phone.replace(/[\s\-()]/g, '');
}

export function validateEmail(email: string) {
  return EMAIL_REGEX.test(email);
}

export function validateFinnishPhone(phone: string) {
  const normalizedPhone = normalizePhone(phone);
  return FINNISH_PHONE_LOCAL_REGEX.test(normalizedPhone) || FINNISH_PHONE_INTL_REGEX.test(normalizedPhone);
}

export function validatePickupDate(pickupDate: string) {
  if (!pickupDate) return false;

  const selectedDate = new Date(`${pickupDate}T00:00:00`);
  if (Number.isNaN(selectedDate.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return selectedDate.getTime() > today.getTime();
}

export function validateContactForm(values: ContactFormValues) {
  const name = sanitizeInput(values.name);
  const email = sanitizeInput(values.email);
  const message = sanitizeInput(values.message);
  const errors: Record<string, string> = {};

  if (!name) errors.name = 'Name is required.';
  if (!email) errors.email = 'Email is required.';
  else if (!validateEmail(email)) errors.email = 'Please enter a valid email address.';
  if (!message) errors.message = 'Message is required.';

  return { values: { name, email, message }, errors };
}

export function validateOrderForm(values: OrderFormValues) {
  const candidate = values as unknown as Record<string, unknown>;
  const name = sanitizeUnknownString(candidate.name);
  const phone = sanitizeUnknownString(candidate.phone);
  const email = sanitizeUnknownString(candidate.email);
  const pickupDate = sanitizeUnknownString(candidate.pickupDate);
  const notes = sanitizeUnknownString(candidate.notes);
  const items = sanitizeOrderItems(candidate.items);
  const policyAccepted = parseBoolean(candidate.policyAccepted);
  const errors: Record<string, string> = {};

  if (!name) errors.name = 'Name is required.';
  if (!phone) errors.phone = 'Phone is required.';
  else if (!validateFinnishPhone(phone)) errors.phone = 'Please enter a valid Finnish phone number.';
  if (!email) errors.email = 'Email is required.';
  else if (!validateEmail(email)) errors.email = 'Please enter a valid email address.';
  if (!pickupDate) errors.pickupDate = 'Pickup date is required.';
  else if (!validatePickupDate(pickupDate)) errors.pickupDate = 'Pickup date must be in the future.';
  if (!items.length) {
    errors.items = 'At least one product is required.';
  } else if (items.some((item) => !item.name || !item.price || item.quantity < 1)) {
    errors.items = 'Order contains invalid product information.';
  }
  if (!policyAccepted) {
    errors.policyAccepted = 'Policy acceptance is required before placing an order.';
  }

  return { values: { name, phone, email, pickupDate, notes, items, policyAccepted }, errors };
}
