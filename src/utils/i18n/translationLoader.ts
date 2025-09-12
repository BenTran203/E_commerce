import { Language } from './types'
import { TranslationKey, TranslationLoader } from './types'

export const loadTranslations: TranslationLoader = async (language: Language) => {
    try {
        // Dynamic import based on language
        const module = await import(`@/translations/${language}.json`)
        return module.default
    } catch (error) {
        console.error(`Failed to load translations for language: ${language}`, error)
        // Fallback to English
        const fallback = await import('./translation/en.json')
        return fallback.default
    }
}

// Cache translations in memory
const translationCache: Record<Language, Record<TranslationKey, string>> = {} as any

export async function getTranslations(language: Language) {
    if (translationCache[language]) {
        return translationCache[language]
    }

    const translations = await loadTranslations(language)
    translationCache[language] = translations
    return translations
}
