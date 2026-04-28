export const ENV = {
  contactToEmail: "CONTACT_TO_EMAIL",
  contactFromEmail: "CONTACT_FROM_EMAIL",
  healthcheckToken: "HEALTHCHECK_TOKEN",
  openaiApiKey: "OPENAI_API_KEY",
  resendApiKey: "RESEND_API_KEY",
  upstashRedisRestToken: "UPSTASH_REDIS_REST_TOKEN",
  upstashRedisRestUrl: "UPSTASH_REDIS_REST_URL",
} as const;

export type EnvName = (typeof ENV)[keyof typeof ENV];

export function readEnv(name: EnvName) {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

export function missingEnvMessage(names: EnvName[]) {
  return `Set ${names.join(" and ")}.`;
}
