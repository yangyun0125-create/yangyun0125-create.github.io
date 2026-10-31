'use client';

import { useLocaleStore } from '@/lib/stores/localeStore';

export default function SkipLink() {
  const locale = useLocaleStore(state => state.locale);
  return <a href="#main-content" className="skip-link sr-only focus:not-sr-only fixed top-2 left-2 z-[100] bg-background text-accent p-3 rounded-md">{locale === 'zh' ? '跳转正文' : 'Skip to content'}</a>;
}
