'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X,
  Heart,
  LogOut,
  Settings,
  Package
} from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from 'react-i18next'
// import { cn } from '@/utils'
import Button from '@/components/ui/Button'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { itemCount, toggle: toggleCart } = useCart()
  const { user, isAuthenticated, signOut } = useAuth()
  const { t } = useTranslation()
  const router = useRouter()

  const navigationItems = [
    { name: t('nav.shop'), href: '/pages/shop' },
    { name: t('nav.collections'), href: '/pages/collections' },
    { name: t('nav.about'), href: '/pages/about' },
    { name: t('nav.contact'), href: '/pages/contact' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    setIsSearchOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-luxury-cream border-b border-primary-200 backdrop-blur-luxury">
      <div className="container-luxury">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl md:text-3xl font-serif font-bold text-primary-900">
              Timeless
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-primary-700 hover:text-primary-900 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-primary-700 hover:text-primary-900 transition-colors duration-200"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            {isAuthenticated && (
              <Link
                href="/wishlist"
                className="p-2 text-primary-700 hover:text-primary-900 transition-colors duration-200"
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </Link>
            )}

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-primary-700 hover:text-primary-900 transition-colors duration-200"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 text-primary-700 hover:text-primary-900 transition-colors duration-200"
                aria-label="User menu"
              >
                <User size={20} />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white shadow-luxury-lg border border-primary-200 z-50"
                  >
                    {isAuthenticated ? (
                      <div className="py-2">
                        <div className="px-4 py-2 border-b border-primary-200">
                          <p className="text-sm font-medium text-primary-900">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-xs text-primary-600">{user?.email}</p>
                        </div>
                        <Link
                          href="/account"
                          className="flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings size={16} className="mr-2" />
                          Account
                        </Link>
                        <Link
                          href="/orders"
                          className="flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Package size={16} className="mr-2" />
                          Orders
                        </Link>
                        <button
                          onClick={() => {
                            signOut()
                            setIsUserMenuOpen(false)
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
                        >
                          <LogOut size={16} className="mr-2" />
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <div className="py-2">
                        <Link
                          href="/auth"
                          className="block px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/auth?register=true"
                          className="block px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Create Account
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-primary-700 hover:text-primary-900 transition-colors duration-200"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-primary-200 py-4"
            >
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-primary-700 hover:text-primary-900 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white w-full max-w-2xl mx-4 p-6 shadow-luxury-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="flex-1 px-4 py-3 border-b-2 border-primary-200 focus:border-primary-500 outline-none text-lg"
                  autoFocus
                />
                <Button type="submit" variant="ghost" className="ml-4">
                  Search
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header 