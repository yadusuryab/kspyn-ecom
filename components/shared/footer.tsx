'use client'
import { ChevronUp } from 'lucide-react'
import Link from 'next/link'
// import Image from 'next/image'
import { useEffect, useState } from 'react' // Add these imports

import { Button } from '@/components/ui/button'
import useSettingStore from '@/hooks/use-setting-store'
// import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'

// import { SelectValue } from '@radix-ui/react-select'
import {  useTranslations } from 'next-intl'
// import { usePathname, useRouter } from '@/i18n/routing'
// import { i18n } from '@/i18n-config'
import LanguageSwitcher from './header/language-switcher'
import { IconArrowUp } from '@tabler/icons-react'

export default function Footer() {
  // const router = useRouter()
  // const pathname = usePathname()
  const {
    setting: { site}
  } = useSettingStore()
  // const { locales } = i18n

  // const locale = useLocale()
  const t = useTranslations()
  
  // Add scroll state management
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    
    window.addEventListener('scroll', toggleVisibility)
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <footer className='border-t-4 underline-link relative '>
      <div className='w-full h-[530px] flex flex-col justify-center'>
        {/* Floating Back to Top Button */}
        {isVisible && (
          <Button
            className='fixed bottom-6 right-6 z-50 rounded-full shadow-md bg-background text-foreground'
            size={'icon'}
            variant={'secondary'}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <IconArrowUp className='h-4 w-4' />
          </Button>
        )}
        
        {/* Rest of your footer content remains the same */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-6 md:px-[52px] px-[24px] w-full mx-auto'>
          <div>
            <h3 className='font-bold mb-2 tracking-tighter'>{t('Footer.Let Us Help You')}</h3>
            <ul className='space-y-2 font-semibold text-muted-foreground'>
              <li>
                <Link href='/page/shipping'>
                  {t('Footer.Shipping Rates & Policies')}
                </Link>
              </li>
              <li>
                <Link href='/page/returns-policy'>
                  {t('Footer.Returns & Replacements')}
                </Link>
              </li>
              <li>
                <Link href='/page/help'>{t('Footer.Help')}</Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2 col-span-1 flex justify-end">
           <div> <h3 className="font-bold italic tracking-tighter">kspyn</h3>
           <LanguageSwitcher/>
            </div>
          </div>
        </div>
        <div className='md:px-[52px] px-[24px] mt-[90px]'>
        <div className='md:flex font-semibold text-muted-foreground  grid gap-3 text-sm'>
        <p> © {site.copyright}</p>
        {site.address} | {site.phone}
          <Link href='/page/conditions-of-use'>
            {t('Footer.Conditions of Use')}
          </Link>
          <Link href='/page/privacy-policy'>{t('Footer.Privacy Notice')}</Link>
          <Link href='/page/help'>{t('Footer.Help')}</Link>
        </div>
        
        
      
        
       
      </div>
       
      </div>
     
    </footer>
  )
}