'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LocizeBackend from 'i18next-locize-backend'
import en from '@/utils/i18n/translation/en.json'
import vi from '@/utils/i18n/translation/vi.json'

const isProd = process.env.NODE_ENV === 'production'

// Initialize i18next once (client-side)
if (!i18n.isInitialized) {
  i18n
    .use(LocizeBackend)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      supportedLngs: ['en', 'vi'],
      ns: ['translation'],
      defaultNS: 'translation',
      // Render server and first client paint in English to avoid hydration mismatch,
      // then change language on mount (HtmlLangSync).
      lng: 'en',
      // Auto-create missing keys in Locize during development
      saveMissing: !isProd,
      resources: {
        en: { translation: en as any },
        vi: { translation: vi as any },
      },
      interpolation: { escapeValue: false },
      backend: {
        projectId: process.env.NEXT_PUBLIC_LOCIZE_PROJECT_ID,
        apiKey: process.env.NEXT_PUBLIC_LOCIZE_API_KEY, // only used in dev for saveMissing
        referenceLng: 'en',
        version: process.env.NEXT_PUBLIC_LOCIZE_VERSION || 'latest',
        // optional: specify namespaces automatically created when missing
        private: false,
      },
      // Avoid async suspense for simple client usage
      react: { useSuspense: false },
    })
}

export default i18n


