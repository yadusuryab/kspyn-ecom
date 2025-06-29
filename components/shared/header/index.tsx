import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/lib/actions/product.actions";
// import Menu from "./menu";
import Search from "./search";
import data from "@/lib/data";
import Sidebar from "./sidebar";
import { getSetting } from "@/lib/actions/setting.actions";
import { getTranslations } from "next-intl/server";
// import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./language-switcher";
// import UserButton from "./user-button";
import CartButton from './cart-button'
//import LanguageSwitcher from './language-switcher'
import UserButton from './user-button'

export default async function Header() {
  const categories = await getAllCategories();
  const { site } = await getSetting();
  const t = await getTranslations();
  return (
    <header className="">
      <div
        className={`md:flex justify-between w-full md:px-[52px] px-[24px] items-center bg-secondary hidden font-semibold text-base h-[34px] text-foreground`}
      >
        <div>
          <h2 className="font-bold italic">ks</h2>
        </div>
        <div className="flex divide-x divide-foreground whitespace-nowrap items-center">
          <LanguageSwitcher className="px-[12px]" />
          {data.helpMenus?.map((menu) => (
            <Link
              href={menu.href}
              className={cn(
                "whitespace-nowrap text-xs  font-semibold px-[12px] first:pl-0 last:pr-0"
              )}
              key={menu.href}
            >
              {t("Header." + menu.name)}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between md:px-[52px] px-[24px] h-[60px] ">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center header-button font-bold tracking-tight text-2xl m-1 "
          >
            <Image
              src={site.logo}
              width={40}
              height={40}
              alt={`${site.name} logo`}
            />
            {site.name}
          </Link>
        </div>

        <div className="flex items-center gap-3 overflow-hidden">
         <Search/>
         <CartButton />
         <UserButton />
          <Sidebar categories={categories} />
        </div>
      </div>
     

      
      
        {/*<div className="flex  items-center overflow-hidden bg-secondary px-[52px] mb-[1px] py-1"><div className="relative w-full">
         
          <div className="flex items-center gap-2 overflow-x-auto  hide-scrollbar w-full">
            {data.headerMenus?.map((menu) => (
              <Link
                href={menu.href}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "header-button whitespace-nowrap text-sm tracking-tighter"
                )}
                key={menu.href}
              >
                {t("Header." + menu.name)}
              </Link>
            ))}
          </div>

         
        </div>   </div>*/}
    
    </header>
  );
}
