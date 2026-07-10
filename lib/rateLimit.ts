// Fixed-window rate limiter, in-memory per server instance. Good enough to
// stop casual contact-form spam; a distributed limiter (or a Cloudflare WAF
// rule) is the next step if it ever matters.
const WINDOW_MS = 60 * 1000;
const MAX_PER_WINDOW = 3;

const hits = new Map<string, { count: number; windowStart: number }>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    hits.set(key, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}
