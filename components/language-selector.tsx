import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/components/context/language-context';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  console.log('[LanguageSelector] Current language:', language);

  return (
    <Select value={language} onValueChange={(lang) => {
      console.log('[LanguageSelector] Selected language:', lang);
      setLanguage(lang);
    }}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <span className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}