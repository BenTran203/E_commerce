import { TranslationKey } from './types'

export function interpolateParams(
    text: string,
    params?: Record<string, string | number>
): string {
    if (!params) return text
    
    return Object.entries(params).reduce(
        (result, [key, value]) => result.replace(new RegExp(`{${key}}`, 'g'), String(value)),
        text
    )
}

export function createTranslator(translations: Record<TranslationKey, string>) {
    return function translate(key: TranslationKey, params?: Record<string, string | number>): string {
        const translation = translations[key]
        if (!translation) {
            console.warn(`Translation missing for key: ${key}`)
            return key
        }
        
        return interpolateParams(translation, params)
    }
}

// Example usage:
// const t = createTranslator(translations)
// t('footer.bottom.rights', { year: 2025 })
// t('shop.items', { count: 5 })
