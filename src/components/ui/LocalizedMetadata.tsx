'use client';

import { useEffect } from 'react';

// Static HTML remains English for indexing; browser titles follow the selected locale.
export default function LocalizedMetadata({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    document.title = title;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
  return null;
}
