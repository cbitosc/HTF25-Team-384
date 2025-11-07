
"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import en from '@/lib/i18n/en.json';
import hi from '@/lib/i18n/hi.json';
import bn from '@/lib/i18n/bn.json';
import pa from '@/lib/i18n/pa.json';
import ta from '@/lib/i18n/ta.json';
import te from '@/lib/i18n/te.json';

type Language = 'en' | 'hi' | 'bn' | 'pa' | 'ta' | 'te';

type Translations = { [key: string]: string };

interface LanguageContextType {
  language: Language;
  translations: Translations;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: { [key in Language]: Translations } = { en, hi, bn, pa, ta, te };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'hi', 'bn', 'pa', 'ta', 'te'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
    setLoaded(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  if (!loaded) {
    return null; // Or a loading spinner
  }

  return (
    <LanguageContext.Provider value={{ language, translations: translations[language], setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
