"use client";

import { useState } from "react";
import { TbSearch } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Search() {
  const [isExpanded, setIsExpanded] = useState(false);

  const popularTags = [
    { name: "New Arrivals", slug: "new-arrivals" },
    { name: "Featured", slug: "featured-products" },
    { name: "Best Sellers", slug: "best-sellers" },
    { name: "Today's Deals", slug: "todays-deals" },
    // { name: "air force 1", slug: "air-force-1" },
    // { name: "sneakers men", slug: "sneakers-men" },
    // { name: "running shoes", slug: "running-shoes" },
    // { name: "jordan", slug: "jordan" },
  ];

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  return (
    <div className="w-full">
      {/* Compact Search Trigger */}
      {/* <div className="md:hidden flex items-center"  onClick={toggleSearch}> */}
       
          <TbSearch size={20} className="md:hidden flex items-center" onClick={toggleSearch}/>

      {/* </div> */}

      <div
        className="hidden md:flex  items-center  bg-secondary rounded-full h-[38px] gap-2 w-fit cursor-pointer group"
        onClick={toggleSearch}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="p-1 bg-secondary group-hover:bg-foreground/20 transition-colors duration-200 rounded-full h-[38px] w-[38px] flex flex-col items-center justify-center"
        >
          <TbSearch
            size={20}
            className="text-foreground transition-colors duration-200 "
          />
        </motion.div>
        <input
          className="bg-secondary outline-none w-40 placeholder:font-medium placeholder:text-lg font-bold pr-2 text-secondary-foreground text-sm cursor-pointer transition-all duration-200 "
          placeholder="Search"
        />
      </div>

      {/* Expanded Search with Animation */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-0 bg-background z-50 p-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="md:flex items-center gap-8 w-full">
                <h2 className="font-bold italic hidden md:block">ks</h2>
                <motion.div
                  className="relative flex-1 max-w-2xl"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <TbSearch size={20} className="text-gray-500" />
                  </div>
                  <input
                    autoFocus
                    className="w-full bg-secondary rounded-full py-3 pl-10 pr-4 outline-none transition-all duration-200 rounded-full"
                    placeholder="Search"
                    name="q"
                    type="search"
                  />
                </motion.div>
              </div>
              <Button
                variant="ghost"
                onClick={toggleSearch}
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                Cancel
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <h3 className="text-lg font-semibold mb-4">
                Popular Search Terms
              </h3>
              <div className="flex flex-wrap gap-3">
                {popularTags.map((tag, index) => (
                  <motion.div
                    key={tag.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <Link
                      href={`/search?tag=${tag.slug}`}
                      className="px-4 py-2 bg-secondary rounded-full text-sm hover:bg-secondary/70 transition-all duration-200 hover:scale-105"
                      onClick={toggleSearch}
                    >
                      {tag.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
