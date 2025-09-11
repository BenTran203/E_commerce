'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' }
]

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-primary-200 hover:border-primary-300 transition-colors bg-white"
        aria-label={t('language.switch')}
      >
        <Globe size={16} className="text-primary-600" />
        <span className="text-sm font-medium text-primary-700">
          {currentLanguage?.flag} {currentLanguage?.name}
        </span>
        <ChevronDown 
          size={14} 
          className={`text-primary-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-primary-100 overflow-hidden z-50"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as 'en' | 'vi')
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-primary-50 transition-colors ${
                    language === lang.code ? 'bg-primary-50 text-primary-900' : 'text-primary-700'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                  {language === lang.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-2 h-2 bg-primary-600 rounded-full"
                    />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}