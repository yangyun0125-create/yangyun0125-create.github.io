// Next Link prefixes routes automatically; images and ordinary anchors need this.
export function withBasePath(value: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (!base || !value.startsWith('/') || value.startsWith('//') || value === base || value.startsWith(`${base}/`)) return value;
  return `${base}${value}`;
}
