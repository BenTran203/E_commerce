'use client'

import React from 'react'
import { useTranslation as useR18n } from 'react-i18next'
import { TranslationKey } from './types'

export interface WithTranslationProps {
    t: (key: TranslationKey, params?: Record<string, string | number>) => string
}

export function withTranslation<P extends WithTranslationProps>(
    WrappedComponent: React.ComponentType<P>
) {
    return function TranslatedComponent(props: Omit<P, keyof WithTranslationProps>) {
        const { t } = useR18n()
        
        return <WrappedComponent {...(props as P)} t={t} />
    }
}

// Helper hook for components that don't need the HOC
export function useTranslation() {
    const { t, i18n } = useR18n()
    return { t, language: i18n.language as string }
}
