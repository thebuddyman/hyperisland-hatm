import { notifications } from "./data/notifications";

export const translations = {
    en: {
        overview: {
            greeting: "Hello there! Sammi is here.",
            helpText: "How can I help you today?",
        },
        suggestedActions: {
            seeMore: "See more options",
            moreWays: "More ways Sammie can help",
        },
        multiModal: {
            sendMessage: "Send a message..."
        },
        notifications:{
            notificationTitle: "Notifications",
        },
        history:{
            historyToday: "Today",
            historyYesterday: "Yesterday",
        }
    },
    sv: {
        overview: {
            greeting: "Hej där! Sammi är här.",
            helpText: "Hur kan jag hjälpa dig idag?",
        },
        suggestedActions: {
            seeMore: "Se fler alternativ",
            moreWays: "Fler sätt Sammie kan hjälpa till",
        },
        multiModal: {
            sendMessage: "Skriv ett meddelande..."
        },
        notifications:{
            notificationTitle: "Meddelanden",
        },
        history:{
            historyToday: "I dag",
            historyYesterday: "I går",
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