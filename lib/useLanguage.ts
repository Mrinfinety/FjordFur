'use client';
import { useState, useEffect } from 'react';

export type Lang = 'no' | 'en';

export function useLanguage() {
  const [lang, setLangState] = useState<Lang>('no');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('fjordfur-lang') as Lang;
      if (stored === 'en') setLangState('en');
    } catch {}
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    try { localStorage.setItem('fjordfur-lang', l); } catch {}
  }

  return { lang, setLang };
}
