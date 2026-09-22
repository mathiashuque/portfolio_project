import { OpenAI } from "openai";
import { ENV, missingEnvMessage, readEnv } from "@/lib/env";

let client: OpenAI | undefined;

/**
 * Cliente perezoso: importar el módulo no exige credenciales, así que el error
 * aparece recién en la request (no al cargar el bundle de la API).
 */
export function getOpenAIClient(): OpenAI {
  if (client) return client;

  const apiKey = readEnv(ENV.openaiApiKey);
  if (!apiKey) {
    throw new Error(missingEnvMessage([ENV.openaiApiKey]));
  }

  client = new OpenAI({ apiKey });
  return client;
}
