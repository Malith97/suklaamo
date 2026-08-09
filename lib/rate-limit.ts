const REQUEST_LIMIT = 20;
const WINDOW_MS = 60 * 1000;

const rateLimitStore = new Map<string, { count: number; firstRequest: number }>();

export function checkRateLimit(key: string) {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing) {
    rateLimitStore.set(key, { count: 1, firstRequest: now });
    return { allowed: true };
  }

  if (now - existing.firstRequest > WINDOW_MS) {
    rateLimitStore.set(key, { count: 1, firstRequest: now });
    return { allowed: true };
  }

  if (existing.count >= REQUEST_LIMIT) {
    return { allowed: false, retryAfter: WINDOW_MS - (now - existing.firstRequest) };
  }

  existing.count += 1;
  rateLimitStore.set(key, existing);
  return { allowed: true };
}
