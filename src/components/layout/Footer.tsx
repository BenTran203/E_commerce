import React from 'react'
import Link from 'next/link'
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'New Arrivals', href: '/shop/new-arrivals' },
        { name: 'Best Sellers', href: '/shop/best-sellers' },
        { name: 'Sale', href: '/shop/sale' },
        { name: 'Gift Cards', href: '/gift-cards' },
      ],
    },
    {
      title: 'Customer Care',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Size Guide', href: '/size-guide' },
        { name: 'Shipping & Returns', href: '/shipping-returns' },
        { name: 'FAQ', href: '/faq' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Sustainability', href: '/sustainability' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Accessibility', href: '/accessibility' },
      ],
    },
  ]

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  ]

  return (
    <footer className="bg-primary-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-primary-700">
        <div className="container-luxury py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-serif font-semibold mb-4">
              Stay in the Know
            </h3>
            <p className="text-primary-300 mb-8">
              Subscribe to our newsletter for exclusive offers, style tips, and early access to new collections.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-transparent border border-primary-600 rounded-none text-white placeholder-primary-400 focus:outline-none focus:border-primary-400 transition-colors"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-primary-900 font-medium hover:bg-primary-100 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-serif font-bold">Timeless</span>
            </Link>
            <p className="text-primary-300 mb-6 leading-relaxed">
              Crafting timeless pieces that define modern elegance. Premium clothing for the discerning individual.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-primary-600 hover:border-primary-400 transition-colors duration-300"
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-6 text-lg">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-primary-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-700">
        <div className="container-luxury py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-400 text-sm">
              © {currentYear} Timeless. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-primary-400">
              <span>Secure Payments</span>
              <span>•</span>
              <span>Free Shipping Over $100</span>
              <span>•</span>
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 