import type { MetadataRoute } from 'next';
import { getConfig } from '@/lib/config';
import { getPageUrl } from '@/lib/site-url';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!getPageUrl()) return [];
  return getConfig().navigation.filter(item => item.type === 'page').map(item => ({
    url: getPageUrl(item.target === 'about' ? '' : item.target)!,
  }));
}
