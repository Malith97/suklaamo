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
const FINNISH_PHONE_LOCAL_REGEX = /^0[45]\d{8}$/;
const FINNISH_PHONE_INTL_REGEX = /^\+358[45]\d{8}$/;

export function sanitizeInput(value: string) {
  return value.trim().replace(/<[^>]*>/g, '');
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
  const name = sanitizeInput(values.name);
  const phone = sanitizeInput(values.phone);
  const email = sanitizeInput(values.email);
  const pickupDate = sanitizeInput(values.pickupDate);
  const notes = sanitizeInput(values.notes);
  const errors: Record<string, string> = {};

  if (!name) errors.name = 'Name is required.';
  if (!phone) errors.phone = 'Phone is required.';
  else if (!validateFinnishPhone(phone)) errors.phone = 'Please enter a valid Finnish phone number.';
  if (!email) errors.email = 'Email is required.';
  else if (!validateEmail(email)) errors.email = 'Please enter a valid email address.';
  if (!pickupDate) errors.pickupDate = 'Pickup date is required.';
  else if (!validatePickupDate(pickupDate)) errors.pickupDate = 'Pickup date must be in the future.';

  return { values: { name, phone, email, pickupDate, notes }, errors };
}
