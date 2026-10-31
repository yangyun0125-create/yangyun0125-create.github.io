import { getConfig } from '@/lib/config';

export function getSiteUrl(): string | undefined {
  const configured = (process.env.SITE_URL || getConfig().site.url || '').trim().replace(/\/$/, '');
  if (!configured) return undefined;
  const parsed = new URL(configured);
  if (!['http:', 'https:'].includes(parsed.protocol) || parsed.search || parsed.hash) {
    throw new Error('SITE_URL / site.url must be an absolute HTTP(S) URL without query or fragment.');
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || '';
  return basePath && !parsed.pathname.replace(/\/$/, '').endsWith(basePath) ? `${configured}${basePath}` : configured;
}

export function getPageUrl(slug = ''): string | undefined {
  const site = getSiteUrl();
  return site ? `${site}/${slug ? `${slug.replace(/^\/|\/$/g, '')}/` : ''}` : undefined;
}
