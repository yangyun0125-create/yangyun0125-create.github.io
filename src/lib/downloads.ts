import fs from 'node:fs';
import path from 'node:path';

// Checked at build time: never render a download button for a missing PDF.
export function availableDownload(value?: string): string | undefined {
  if (!value || !value.startsWith('/') || !value.endsWith('.pdf')) return undefined;
  const publicDir = path.resolve(process.cwd(), 'public');
  const file = path.resolve(publicDir, `.${value}`);
  if (!file.startsWith(`${publicDir}${path.sep}`)) return undefined;
  return fs.existsSync(file) && fs.statSync(file).isFile() ? value : undefined;
}
