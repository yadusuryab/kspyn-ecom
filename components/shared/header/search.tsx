import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { getAllCategories } from "@/lib/actions/product.actions";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { getSetting } from "@/lib/actions/setting.actions";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export default async function Search() {
  const {
    site: { name },
  } = await getSetting();
  const categories = await getAllCategories();

  const t = await getTranslations();
  return (
    <form
      action="/search"
      method="GET"
      className="flex bg-secondary rounded-full items-center shadow-sm h-10 px-1 py-2"
    >
      <Select name="category">
        <SelectTrigger className="w-auto  bg-background   rounded-full  ">
          <SelectValue placeholder={t("Header.All")} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="all">{t("Header.All")}</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        className="flex-1 rounded-none  text-base h-full"
        placeholder={t("Header.Search Site", { name })}
        name="q"
        type="search"
      />
      <Button type="submit" size={"icon"} className="rounded-full">
        <SearchIcon />
      </Button>
    </form>
  );
}
