'use client'


import Link from 'next/link'
import useIsMounted from '@/hooks/use-is-mounted'
// import useShowSidebar from '@/hooks/use-cart-sidebar'
// import { cn } from '@/lib/utils'
import useCartStore from '@/hooks/use-cart-store'
// import { useLocale } from 'next-intl'
// import { getDirection } from '@/i18n-config'
// import { Button } from '@/components/ui/button'
import { IconShoppingBag } from '@tabler/icons-react'

export default function CartButton() {
  const isMounted = useIsMounted()
  const {
    cart: { },
  } = useCartStore()
  // const cartItemsCount = items.reduce((a, c) => a + c.quantity, 0)
  // const showSidebar = useShowSidebar()
  // const t = useTranslations()

  // const locale = useLocale()
  return (
    <Link href='/cart' className='flex items-center  '>
      
      {/* <Button className='relative' variant={'ghost'} size={'icon'}> */}
        <IconShoppingBag size={20}/>
        {isMounted && (
          <span
            // className={cn(
            //   ` px-2  text-primary text-base font-bold absolute ${
            //     getDirection(locale) === 'rtl' ? 'right-[5px]' : '-right-[2px]'
            //   } top-[-4px] z-10`,
            //   cartItemsCount >= 10 && 'text-sm px-0 p-[1px]',
            //   cartItemsCount == 0 &&'hidden'
            // )}
          >
            {/* {cartItemsCount} */}
          </span>
        )}
        
        {/* {t('Header.Cart')} */}

        {/* {showSidebar && (
          <div
            className={`absolute top-[20px] ${
              getDirection(locale) === 'rtl'
                ? 'left-[-16px] rotate-[-270deg]'
                : 'right-[-16px] rotate-[-90deg]'
            }  z-10   w-0 h-0 border-l-[7px] border-r-[7px] border-b-[8px] border-transparent border-b-background`}
          ></div>
        )} */}
      {/* </Button> */}
    </Link>
  )
}
