export type Language = 'en' | 'vi'

// Type-safe translation key generator
type Join<K, P> = K extends string | number ?
    P extends string | number ?
    `${K}${'' extends P ? '' : '.'}${P}`
    : never : never;

type Paths<T, D extends number = 10> = [D] extends [never] ? never : T extends object ?
    { [K in keyof T]-?: K extends string | number ?
        `${K}` | Join<K, Paths<T[K], Prev[D]>>
        : never
    }[keyof T] : ''

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

// Define your translation structure
export interface TranslationSchema {
    nav: {
        home: string
        shop: string
        collections: string
        about: string
        contact: string
        cart: string
        account: string
        login: string
        logout: string
    }
    hero: {
        title: string
        subtitle: string
        description: string
        discover: string
        cta: {
            explore: string
            story: string
        }
    }
    footer: {
        newsletter: {
            title: string
            description: string
            placeholder: string
            button: string
            subscribe: string
        }
        brand: {
            description: string
        }
        sections: {
            shop: {
                title: string
                newArrivals: string
                bestSellers: string
                sale: string
                giftCards: string
            }
            customerCare: {
                title: string
                contact: string
                sizeGuide: string
                shipping: string
                faq: string
            }
            company: {
                title: string
                about: string
                careers: string
                press: string
                sustainability: string
            }
            legal: {
                title: string
                privacy: string
                terms: string
                cookies: string
                accessibility: string
            }
        }
        bottom: {
            rights: string
            secure: string
            shipping: string
            returns: string
        }
    }
    // Add other sections as needed
}

// Generate type-safe translation keys
export type TranslationKey = Paths<TranslationSchema>

// Type for translation functions
export type TranslationFunction = (key: TranslationKey, params?: Record<string, string | number>) => string

// Type for loading translations
export type TranslationLoader = (language: Language) => Promise<Record<TranslationKey, string>>
