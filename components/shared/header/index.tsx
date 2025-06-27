import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/lib/actions/product.actions";
import Menu from "./menu";
import Search from "./search";
import data from "@/lib/data";
import Sidebar from "./sidebar";
import { getSetting } from "@/lib/actions/setting.actions";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import LanguageSwitcher from "./language-switcher";
// import UserButton from "./user-button";

export default async function Header() {
  const categories = await getAllCategories();
  const { site } = await getSetting();
  const t = await getTranslations();
  return (
    <header className="">
        <div className="px-2 py-[14px] relative">
        <div className="flex items-center justify-between">
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

          <div className="hidden md:block flex-1 max-w-xl">
            <Search />
          </div>
          <Menu />
        </div>
        <div className="md:hidden block py-2">
          <Search />
        </div>
      </div>
      <div className="flex  items-center overflow-hidden bg-secondary px-3 mb-[1px] py-1">
        <Sidebar categories={categories} />
        <div className="relative w-full">
          {/* Scrollable menu container */}
          <div className="flex items-center gap-2 overflow-x-auto  hide-scrollbar w-full">
            {data.headerMenus?.map((menu) => (
              <Link
                href={menu.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "header-button whitespace-nowrap text-md tracking-tighter",
                  "text-accent-foreground px-3 py-1 shrink-0",
                  "hover:bg-accent/50 transition-colors"
                )}
                key={menu.href}
              >
                {t("Header." + menu.name)}
              </Link>
            ))}
           
          </div>

          {/* Fade effect for scroll indication */}
        </div>
      </div>
    
    </header>
  );
}
