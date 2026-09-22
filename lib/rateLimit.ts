import { getRedis, REDIS_TIMEOUT_MS } from "./redis";
import { withTimeout } from "./timeout";

export type RateLimitResult =
  { allowed: true } | { allowed: false; retryAfter: number };

/**
 * Cuenta la request dentro de una ventana de `windowSeconds` y decide si pasa
 * el límite. El INCR y el EXPIRE viajan en un solo MULTI para que el contador
 * se cree y se expire de forma atómica.
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
  label = "redis.rateLimit",
): Promise<RateLimitResult> {
  const redis = getRedis();

  const [count] = await withTimeout(
    redis.multi().incr(key).expire(key, windowSeconds, "NX").exec(),
    label,
    REDIS_TIMEOUT_MS,
  );

  if (Number(count) <= limit) return { allowed: true };

  const ttl = await withTimeout(redis.ttl(key), "redis.ttl", REDIS_TIMEOUT_MS);

  return {
    allowed: false,
    retryAfter: typeof ttl === "number" && ttl > 0 ? ttl : windowSeconds,
  };
}
