"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type CardItem = {
  title: string;
  variant?: "hero" | "grid" | "banner" | string;
  link?: { text: string; href: string };
  items: {
    name: string;
    image: string;
    href: string;
    description?: string;
  }[];
};

export function HomeCard({ cards }: { cards: CardItem[] }) {
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scroll = (direction: 'left' | 'right', index: number) => {
    const container = scrollRefs.current[index];
    if (!container) return;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="space-y-8">
      {cards.map((card, index) => (
        <div key={card.title} className="space-y-4 mt-[90px]">
          <div className="mb-6 flex items-center justify-between px-4 sm:px-8">
            <h2 className="text-2xl font-medium tracking-tighter">{card.title}</h2>
            <div className="flex gap-2">
              <Button
                onClick={() => scroll('left', index)}
                className="rounded-full p-2 hover:bg-gray-100"
                variant={'secondary'}
                size={'icon'}
              >
                <IconChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                onClick={() => scroll('right', index)}
                className="rounded-full"
                variant={'secondary'}
                size={'icon'}
              >
                <IconChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div
              className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ref={(el:any) => (scrollRefs.current[index] = el)}
            >
              {card.items.map((item) => (
                <Card
                  key={item.name}
                  className="flex-shrink-0 w-[300px] h-[400px] relative border-none overflow-hidden"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white z-10 space-y-1">
                    <p className="text-sm">{card.title}</p>
                    <h3 className="text-xl tracking-tighter font-medium truncate">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-sm">{item.description}</p>
                    )}
                    <Button
                      asChild
                      variant="secondary"
                      className="mt-2 rounded-full"
                      size={"sm"}
                    >
                      <Link href={item.href}>Shop</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
