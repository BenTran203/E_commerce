'use client'

import React from 'react'
import { withTranslation } from '@/utils/i18n/withTranslation'
import type { WithTranslationProps } from '@/utils/i18n/types'

interface ExampleProps extends WithTranslationProps {
    year: number
}

function Example({ t, year }: ExampleProps) {
    return (
        <div>
            <h1>{t('hero.title')}</h1>
            <p>{t('hero.description')}</p>
            <footer>
                {t('footer.bottom.rights', { year })}
            </footer>
        </div>
    )
}

// Wrap component with translation HOC
export default withTranslation(Example)

// Alternative using hook:
/*
import { useTranslation } from '@/utils/i18n/withTranslation'

export default function Example({ year }: { year: number }) {
    const { t } = useTranslation()
    
    return (
        <div>
            <h1>{t('hero.title')}</h1>
            <p>{t('hero.description')}</p>
            <footer>
                {t('footer.bottom.rights', { year })}
            </footer>
        </div>
    )
}
*/
