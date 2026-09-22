import { Redis } from "@upstash/redis";

/** Presupuesto de una operación de Redis antes de degradar la respuesta a 503. */
export const REDIS_TIMEOUT_MS = 1_500;

let client: Redis | undefined;

/**
 * Cliente perezoso y compartido: no falla al importar el módulo si faltan las
 * variables de entorno, así /api/health puede reportar `missing_env` en lugar
 * de romper en el import.
 */
export function getRedis(): Redis {
  client ??= Redis.fromEnv();
  return client;
}
