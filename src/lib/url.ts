/** Prefix an absolute site path with the configured base (works whether
 *  Astro reports BASE_URL with or without a trailing slash). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return base + (path.startsWith('/') ? path : '/' + path);
}
