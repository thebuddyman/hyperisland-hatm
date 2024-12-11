export const translations = {
    en: {
        overview: {
            greeting: "Hello there! Sammie is here.",
            helpText: "How can I help you today?",
        },
        suggestedActions: {
            seeMore: "See more options"
        }
    },
    sv: {
        overview: {
            greeting: "Hej där! Sammie är här.",
            helpText: "Hur kan jag hjälpa dig idag?",
        },
        suggestedActions: {
            seeMore: "Se fler alternativ"
        }
    },
};

export const getTranslation = (language: string, key: string): string => {
    const keys = key.split('.');
    const languageTranslations = translations[language as keyof typeof translations];
    const defaultTranslations = translations.en;

    let translation: any = languageTranslations || defaultTranslations; // Use the language or default (English)

    for (const k of keys) {
        if (translation && k in translation) {
            translation = translation[k];
        } else {
            // Fallback to English if a key is missing in the requested language
            translation = defaultTranslations;
            for (const fallbackKey of keys) {
                if (translation && fallbackKey in translation) {
                    translation = translation[fallbackKey];
                } else {
                    return `Translation missing for ${key}`; // Return a clear message for missing keys
                }
            }
            break;
        }
    }

    return translation;
};