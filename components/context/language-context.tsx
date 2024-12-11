"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'selectedLanguage';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>('en'); // Default to English

  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem(LOCAL_STORAGE_KEY);
      console.log('[LanguageProvider] Initialized language:', storedLanguage || 'en');
      setLanguage(storedLanguage || 'en'); // Fallback to English
    }
  }, []);

  useEffect(() => {
    // Persist language to localStorage whenever it changes
    if (typeof window !== 'undefined') {
      console.log('[LanguageProvider] Language updated:', language);
      localStorage.setItem(LOCAL_STORAGE_KEY, language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};