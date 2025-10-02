'use client'

import React from 'react'
import Link from 'next/link'
import { Instagram, Twitter, Facebook } from 'lucide-react'
import { withTranslation } from '@/utils/i18n/withTranslation'
import type { WithTranslationProps } from '@/utils/i18n/withTranslation'

interface FooterProps extends WithTranslationProps {}

type TFunction = FooterProps['t']

interface FooterLink { name: string; href: string }
interface FooterSection { title: string; links: FooterLink[] }
interface SocialLink { name: string; href: string; icon: (props: { size?: number }) => JSX.Element }

const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Instagram', icon: Instagram as any, href: 'https://instagram.com' },
  { name: 'Twitter', icon: Twitter as any, href: 'https://twitter.com' },
  { name: 'Facebook', icon: Facebook as any, href: 'https://facebook.com' },
]

function buildFooterSections(t: TFunction): FooterSection[] {
  return [
    {
      title: t('footer.sections.shop.title'),
      links: [
        { name: t('footer.sections.shop.newArrivals'), href: '/shop/new-arrivals' },
        { name: t('footer.sections.shop.bestSellers'), href: '/shop/best-sellers' },
        { name: t('footer.sections.shop.sale'), href: '/shop/sale' },
        { name: t('footer.sections.shop.giftCards'), href: '/gift-cards' },
      ],
    },
    {
      title: t('footer.sections.customerCare.title'),
      links: [
        { name: t('footer.sections.customerCare.contact'), href: '/contact' },
        { name: t('footer.sections.customerCare.sizeGuide'), href: '/size-guide' },
        { name: t('footer.sections.customerCare.shipping'), href: '/shipping-returns' },
        { name: t('footer.sections.customerCare.faq'), href: '/faq' },
      ],
    },
    {
      title: t('footer.sections.company.title'),
      links: [
        { name: t('footer.sections.company.about'), href: '/about' },
        { name: t('footer.sections.company.careers'), href: '/careers' },
        { name: t('footer.sections.company.press'), href: '/press' },
        { name: t('footer.sections.company.sustainability'), href: '/sustainability' },
      ],
    },
    {
      title: t('footer.sections.legal.title'),
      links: [
        { name: t('footer.sections.legal.privacy'), href: '/privacy' },
        { name: t('footer.sections.legal.terms'), href: '/terms' },
        { name: t('footer.sections.legal.cookies'), href: '/cookies' },
        { name: t('footer.sections.legal.accessibility'), href: '/accessibility' },
      ],
    },
  ]
}


function BrandSection({ t, links }: { t: TFunction; links: SocialLink[] }) {
  return (
    <div className="lg:col-span-1">
      <Link href="/" className="inline-block mb-6">
        <span className="text-3xl font-serif font-bold">Timeless</span>
      </Link>
      <p className="text-primary-300 mb-6 leading-relaxed">
        {t('footer.brand.description')}
      </p>
      <div className="flex space-x-4">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-primary-600 hover:border-primary-400 transition-colors duration-300"
              aria-label={link.name}
            >
              <Icon size={20} />
            </a>
          )
        })}
      </div>
    </div>
  )
}

function LinksGrid({ sections }: { sections: FooterSection[] }) {
  return (
    <>
      {sections.map((section) => (
        <div key={section.title}>
          <h4 className="font-semibold mb-6 text-lg">{section.title}</h4>
          <ul className="space-y-3">
            {section.links.map((link) => (
              <li key={`${section.title}-${link.href}`}>
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
    </>
  )
}

function BottomBar({ t, year }: { t: TFunction; year: number }) {
  return (
    <div className="border-t border-primary-700">
      <div className="container-luxury py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-primary-400 text-sm">
            {t('footer.bottom.rights', { year })}
          </p>
          <div className="flex items-center space-x-6 text-sm text-primary-400">
            <span>{t('footer.bottom.secure')}</span>
            <span>•</span>
            <span>{t('footer.bottom.shipping')}</span>
            <span>•</span>
            <span>{t('footer.bottom.returns')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const Footer = ({ t }: FooterProps) => {
  const currentYear = new Date().getFullYear()
  const sections = buildFooterSections(t)

  return (
    <footer className="bg-primary-900 text-white">
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <BrandSection t={t} links={SOCIAL_LINKS} />
          <LinksGrid sections={sections} />
        </div>
      </div>

      <BottomBar t={t} year={currentYear} />
    </footer>
  )
}

// Export with translation HOC
export default withTranslation(Footer)