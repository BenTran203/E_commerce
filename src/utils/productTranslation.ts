import { TFunction } from 'i18next'

/**
 * Get translated product name
 * Falls back to original name if translation doesn't exist
 */
export function getProductName(productId: string, originalName: string, t: TFunction): string {
  const translationKey = `products.${productId}.name`
  const translated = t(translationKey)
  
  // If translation key is returned as-is, use original name
  return translated === translationKey ? originalName : translated
}

/**
 * Get translated product description
 * Falls back to original description if translation doesn't exist
 */
export function getProductDescription(productId: string, originalDescription: string, t: TFunction): string {
  const translationKey = `products.${productId}.description`
  const translated = t(translationKey)
  
  return translated === translationKey ? originalDescription : translated
}

/**
 * Get translated collection name
 */
export function getCollectionName(slug: string, originalName: string, t: TFunction): string {
  const translationKey = `productCollections.${slug}.name`
  const translated = t(translationKey)
  
  return translated === translationKey ? originalName : translated
}

/**
 * Get translated collection description
 */
export function getCollectionDescription(slug: string, originalDescription: string, t: TFunction): string {
  const translationKey = `productCollections.${slug}.description`
  const translated = t(translationKey)
  
  return translated === translationKey ? originalDescription : translated
}

/**
 * Get translated category name
 */
export function getCategoryName(slug: string, originalName: string, t: TFunction): string {
  const translationKey = `productCategories.${slug}`
  const translated = t(translationKey)
  
  return translated === translationKey ? originalName : translated
}

/**
 * Get translated brand name
 */
export function getBrandName(slug: string, originalName: string, t: TFunction): string {
  const translationKey = `productBrands.${slug}`
  const translated = t(translationKey)
  
  return translated === translationKey ? originalName : translated
}
