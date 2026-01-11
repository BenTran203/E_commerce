"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import LocizeBackend from "i18next-locize-backend";
import en from "@/utils/i18n/translation/en.json";
import vi from "@/utils/i18n/translation/vi.json";

const isProd = process.env.NODE_ENV === "production";

// Initialize i18next once (client-side)
if (typeof window !== 'undefined' && !i18n.isInitialized) {
  i18n
    .use(LanguageDetector) // Add language detector to automatically persist language
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      supportedLngs: ["en", "vi"],
      ns: ["translation"],
      defaultNS: "translation",
      debug: !isProd,
      resources: {
        en: { translation: en },
        vi: { translation: vi },
      },
      interpolation: { 
        escapeValue: false 
      },
      // Language detection configuration
      detection: {
        // Order of detection methods
        order: ["localStorage", "navigator"],
        // Keys to look for in localStorage
        lookupLocalStorage: "i18nextLng",
        // Cache user language
        caches: ["localStorage"],
        // Exclude certain keys from cache
        excludeCacheFor: ["cimode"],
      },
      backend: {
        projectId: process.env.NEXT_PUBLIC_LOCIZE_PROJECT_ID,
        apiKey: process.env.NEXT_PUBLIC_LOCIZE_API_KEY, // only used in dev for saveMissing
        referenceLng: "en",
        version: process.env.NEXT_PUBLIC_LOCIZE_VERSION || "latest",
        // optional: specify namespaces automatically created when missing
        private: false,
      },
      // Avoid async suspense for simple client usage
      react: { 
        useSuspense: false 
      },
    })
}

export default i18n;
