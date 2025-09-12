'use client'

import { ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import { store } from '@/store'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n/client'
import { useTranslation } from 'react-i18next'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
})

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <HtmlLangSync />
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#faf9f6',
                color: '#202124',
                border: '1px solid #e8eaed',
                borderRadius: '0px',
                fontFamily: 'Inter, sans-serif',
              },
            }}
          />
        </QueryClientProvider>
      </Provider>
    </I18nextProvider>
  )
} 

function HtmlLangSync() {
  const { i18n } = useTranslation()
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Prefer saved language, then navigator, else 'en'
      const saved = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null
      const preferred = (saved || navigator.language || 'en').split('-')[0]
      if (i18n.language !== preferred) {
        i18n.changeLanguage(preferred)
      }
      document.documentElement.lang = (i18n.language || preferred).split('-')[0]
    }
  }, [i18n.language])
  return null
}