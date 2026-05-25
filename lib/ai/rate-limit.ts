// Simple in-memory token bucket rate limiter, per identifier.
// Suitable for a single-student, single-instance deployment.

interface Bucket {
  tokens: number;
  updatedAt: number;
}

const buckets = new Map<string, Bucket>();

interface LimiterOptions {
  capacity: number;
  refillPerMinute: number;
}

export function rateLimit(key: string, opts: LimiterOptions = { capacity: 30, refillPerMinute: 30 }) {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { tokens: opts.capacity, updatedAt: now };
  const elapsedMs = now - bucket.updatedAt;
  const refill = (elapsedMs / 60_000) * opts.refillPerMinute;
  bucket.tokens = Math.min(opts.capacity, bucket.tokens + refill);
  bucket.updatedAt = now;
  if (bucket.tokens < 1) {
    buckets.set(key, bucket);
    const retryMs = Math.ceil((1 - bucket.tokens) * (60_000 / opts.refillPerMinute));
    return { allowed: false as const, retryAfterMs: retryMs };
  }
  bucket.tokens -= 1;
  buckets.set(key, bucket);
  return { allowed: true as const, remaining: Math.floor(bucket.tokens) };
}

export function rateLimitResponse(retryAfterMs: number) {
  return new Response(
    JSON.stringify({ error: "Rate limit exceeded", retryAfterMs }),
    { status: 429, headers: { "Content-Type": "application/json", "Retry-After": Math.ceil(retryAfterMs / 1000).toString() } },
  );
}
