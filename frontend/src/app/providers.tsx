"use client";

import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { store, persistor } from '@/store'
import { ReactNode, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistGate } from 'redux-persist/integration/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n/client'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

export function Providers({ children }: { children: ReactNode }) {
  const [i18nReady, setI18nReady] = useState(false)

  useEffect(() => {
    // Ensure i18n is initialized
    if (i18n.isInitialized) {
      setI18nReady(true)
    } else {
      // Wait for initialization
      i18n.on('initialized', () => {
        setI18nReady(true)
      })
    }
  }, [])

  // Show nothing until i18n is ready to prevent flash of untranslated content
  if (!i18nReady) {
    return null
  }

  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <QueryClientProvider client={queryClient}>
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    duration: 4000,
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#fff',
                    },
                  },
                }}
              />
              {children}
            </QueryClientProvider>
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
