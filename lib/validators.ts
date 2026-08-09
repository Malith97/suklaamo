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
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\s\-()]{6,25}$/;

export function sanitizeInput(value: string) {
  return value.trim().replace(/<[^>]*>/g, '');
}

export function isValidEmail(email: string) {
  return EMAIL_REGEX.test(email);
}

export function isValidPhone(phone: string) {
  return PHONE_REGEX.test(phone);
}

export function validateContactForm(values: ContactFormValues) {
  const name = sanitizeInput(values.name);
  const email = sanitizeInput(values.email);
  const message = sanitizeInput(values.message);
  const errors: Record<string, string> = {};

  if (!name) errors.name = 'Name is required.';
  if (!email) errors.email = 'Email is required.';
  else if (!isValidEmail(email)) errors.email = 'Please enter a valid email address.';
  if (!message) errors.message = 'Message is required.';

  return { values: { name, email, message }, errors };
}

export function validateOrderForm(values: OrderFormValues) {
  const name = sanitizeInput(values.name);
  const phone = sanitizeInput(values.phone);
  const email = sanitizeInput(values.email);
  const pickupDate = sanitizeInput(values.pickupDate);
  const notes = sanitizeInput(values.notes);
  const errors: Record<string, string> = {};

  if (!name) errors.name = 'Name is required.';
  if (!phone) errors.phone = 'Phone is required.';
  else if (!isValidPhone(phone)) errors.phone = 'Please enter a valid phone number.';
  if (!email) errors.email = 'Email is required.';
  else if (!isValidEmail(email)) errors.email = 'Please enter a valid email address.';
  if (!pickupDate) errors.pickupDate = 'Pickup date is required.';

  return { values: { name, phone, email, pickupDate, notes }, errors };
}
