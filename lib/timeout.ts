/**
 * Rechaza si `work` no resuelve dentro de `ms`.
 *
 * Cualquier fallo (timeout o error propio de `work`) se reetiqueta como
 * `${label} failed: ...` para que quien llama pueda distinguir el origen
 * —por ejemplo `error.message.startsWith("redis.")`— sin inspeccionar la causa.
 */
export async function withTimeout<T>(
  work: Promise<T>,
  label: string,
  ms: number,
): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeout = setTimeout(
      () => reject(new Error(`timed out after ${ms}ms`)),
      ms,
    );
  });

  try {
    return await Promise.race([work, timeoutPromise]);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${label} failed: ${message}`);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}
