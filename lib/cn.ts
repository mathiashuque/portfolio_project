/**
 * Une clases de Tailwind descartando los valores falsy.
 *
 * @example cn("flex", isActive && "text-white")
 */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
