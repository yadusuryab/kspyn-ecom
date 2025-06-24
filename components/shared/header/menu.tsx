import CartButton from './cart-button'
import UserButton from './user-button'
// import ThemeSwitcher from './theme-switcher'
import LanguageSwitcher from './language-switcher'

const Menu = ({ forAdmin = false }: { forAdmin?: boolean }) => {

  return (
    <div className='flex justify-end'>
      <nav className='md:flex gap-3 hidden w-full'>
        <LanguageSwitcher />
        {/* <ThemeSwitcher /> */}
        <UserButton />
        {forAdmin ? null : <CartButton />}
      </nav>
      <nav className='md:hidden flex items-center'>
        {/* <Sheet>
          <SheetTrigger className='align-middle header-button'>
            <EllipsisVertical className='h-6 w-6' />
          </SheetTrigger>
          <SheetContent className='bg-black text-white  flex flex-col items-start  '>
            <SheetHeader className='w-full'>
              <div className='flex items-center justify-between '>
                <SheetTitle className='  '>{t('Header.Site Menu')}</SheetTitle>
                <SheetDescription></SheetDescription>
              </div>
            </SheetHeader>
            <LanguageSwitcher />
            <ThemeSwitcher />
            <UserButton />
            <CartButton />
          </SheetContent>
        </Sheet> */}
        {/* <CartButton /> */}
        <UserButton />
      </nav>
    </div>
  )
}

export default Menu
