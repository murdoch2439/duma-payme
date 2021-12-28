import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import englishTranslation from "./locales/en/englishTranslation.json"
import frenchTranslation from "./locales/fr/frenchTranslation.json"


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // we init with resources
        resources: {
            en: {
                translations: englishTranslation
            },
            fr: {
                translations: frenchTranslation
            }
        },
        fallbackLng: "en",
        debug: true,
        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false
        }
    }).then();

export default i18n;
