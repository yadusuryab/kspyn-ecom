import * as React from 'react'
import Link from 'next/link'
import { X, ChevronRight, UserCircle, MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SignOut } from '@/lib/actions/user.actions'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { auth } from '@/auth'
import { getLocale, getTranslations } from 'next-intl/server'
import { getDirection } from '@/i18n-config'

type SidebarProps = {
  categories: string[]
}

export default async function Sidebar({ categories }: SidebarProps) {
  const session = await auth()
  const locale = await getLocale()
  const t = await getTranslations()
  const direction = getDirection(locale)

  const renderUserSection = () => (
    <div className="flex items-center justify-between text-foreground">
      <DrawerHeader>
        <DrawerTitle className="flex items-center">
          <UserCircle className="h-6 w-6 mr-2" />
          {session ? (
            <DrawerClose asChild>
              <Link href="/account">
                <span className="text-lg font-semibold">
                  {t('Header.Hello')}, {session.user.name}
                </span>
              </Link>
            </DrawerClose>
          ) : (
            <DrawerClose asChild>
              <Link href="/sign-in">
                <span className="text-lg font-semibold">
                  {t('Header.Hello')}, {t('Header.sign in')}
                </span>
              </Link>
            </DrawerClose>
          )}
        </DrawerTitle>
        <DrawerDescription></DrawerDescription>
      </DrawerHeader>
      <DrawerClose asChild>
        <Button variant="ghost" size="icon" className="mr-2">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </DrawerClose>
    </div>
  )

  const renderCategorySection = () => (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">
          {t('Header.Shop By Department')}
        </h2>
      </div>
      <nav className="flex flex-col">
        {categories?.map((category) => (
          <DrawerClose asChild key={category}>
            <Link
              href={`/search?category=${category}`}
              className="flex items-center justify-between py-3 px-4 hover:bg-secondary transition-colors"
            >
              <span>{category}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </DrawerClose>
        ))}
      </nav>
    </div>
  )

  const renderHelpSection = () => (
    <div className="border-t flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-semibold">
          {t('Header.Help & Settings')}
        </h2>
      </div>
      <DrawerClose asChild>
        <Link 
          href="/account" 
          className="py-3 px-4 hover:bg-secondary transition-colors"
        >
          {t('Header.Your account')}
        </Link>
      </DrawerClose>
      <DrawerClose asChild>
        <Link 
          href="/page/customer-service" 
          className="py-3 px-4 hover:bg-secondary transition-colors"
        >
          {t('Header.Customer Service')}
        </Link>
      </DrawerClose>
      {session ? (
        <form action={SignOut} className="w-full">
          <Button
            className="w-full justify-start py-3 px-4 hover:bg-secondary transition-colors text-base"
            variant="ghost"
          >
            {t('Header.Sign out')}
          </Button>
        </form>
      ) : (
        <Link 
          href="/sign-in" 
          className="py-3 px-4 hover:bg-secondary transition-colors"
        >
          {t('Header.Sign in')}
        </Link>
      )}
    </div>
  )

  return (
    <Drawer direction={direction === 'rtl' ? 'right' : 'left'}>
      <DrawerTrigger>
        <Button variant="ghost">
          <MenuIcon />
          {t('Header.All')}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[350px] mt-0 top-0">
        <div className="flex flex-col h-full">
          {renderUserSection()}
          {renderCategorySection()}
          {renderHelpSection()}
        </div>
      </DrawerContent>
    </Drawer>
  )
}