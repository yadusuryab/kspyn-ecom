'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type CardItem = {
  title: string
  variant?: 'hero' | 'grid' | 'banner' | string
  link?: { text: string; href: string }
  items: {
    name: string
    image: string
    href: string
    description?: string
  }[]
}

export function HomeCard({ cards }: { cards: CardItem[] }) {
  return (
    <div className="space-y-8">
      {cards.map((card) => {
        const variant = card.variant || 'grid'

        if (variant === 'hero') {
          return (
            <div key={card.title} className="space-y-4">
              <h3 className="text-xl font-medium px-4 text-left tracking-tight">
                {card.title}
              </h3>
              <div className="relative">
                <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide">
                  {card.items.map((item) => (
                    <Card key={item.name} className="flex-shrink-0 w-[300px] h-[400px] relative rounded-xl overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white z-10 space-y-1">
                        <p className="text-sm">{card.title}</p>
                        <h3 className="text-2xl font-bold">{item.name}</h3>
                        {item.description && (
                          <p className="text-sm">{item.description}</p>
                        )}
                        <Button asChild variant="secondary" className="mt-2">
                          <Link href={item.href}>Shop</Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )
        }

        if (variant === 'banner') {
          return (
            <div key={card.title} className="space-y-4">
              <h3 className="text-xl font-medium px-4 text-left tracking-tight">
                {card.title}
              </h3>
              <div className="relative">
                <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide">
                  {card.items.map((item) => (
                    <Card key={item.name} className="flex-shrink-0 w-[250px] h-[300px] relative rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white space-y-1">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <Button asChild variant="secondary" size="sm" className="mt-1">
                          <Link href={item.href}>Shop</Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )
        }

        // Default grid variant
        return (
          <Card key={card.title} className="border-none shadow-none">
            <CardContent className="p-4">
              <h3 className="text-xl font-medium mb-4 text-left tracking-tight">
                {card.title}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {card.items.map((item) => (
                  <div key={item.name} className="group flex flex-col items-center space-y-2">
                    <Link href={item.href} className="relative w-full aspect-square bg-muted rounded-sm overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      />
                    </Link>
                    <Button asChild variant="link" className="h-auto p-0">
                      <Link href={item.href}>
                        <p className="text-sm font-medium tracking-tight">
                          {item.name}
                        </p>
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}