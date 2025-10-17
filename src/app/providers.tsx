'use client'

import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
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
      </Provider>
    </SessionProvider>
  )
}
