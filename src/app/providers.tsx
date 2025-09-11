'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import { store } from '@/store'
import { LanguageProvider } from '@/contexts/LanguageContext'

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
    <LanguageProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
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
    </LanguageProvider>
  )
} 