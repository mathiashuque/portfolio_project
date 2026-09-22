/** Límite compartido entre la UI del chat y la ruta /api/chatbot. */
export const MAX_MESSAGE_CHARS = 100;

/** Límites del chatbot, todos sobre una ventana de una hora. */
export const CHAT_SESSION_MESSAGE_LIMIT = 10;
export const CHAT_IP_MESSAGE_LIMIT = 30;
export const CHAT_RATE_LIMIT_WINDOW_SECONDS = 60 * 60;
