import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

type CardItem = {
  title: string
  link?: { text: string; href: string }
  items: {
    name: string
    image: string
    href: string
  }[]
}

export function HomeCard({ cards }: { cards: CardItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards?.map((card) => (
        <Card key={card.title} className="flex flex-col h-full">
          <CardContent className="p-4 flex-1 flex flex-col">
            <h3 className="text-lg font-bold mb-4 text-center tracking-tight">
              {card.title}
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {card.items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex flex-col items-center space-y-2"
                >
                  <div className="relative w-full aspect-square bg-muted rounded-sm overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  </div>
                  <p className="w-full text-center text-sm font-medium tracking-tight truncate">
                    {item.name}
                  </p>
                </Link>
              ))}
            </div>
          </CardContent>

          {card.link && (
            <CardFooter className="p-4 border-t">
              <Link
                href={card.link.href}
                className="w-full text-center text-sm font-medium hover:underline"
              >
                {card.link.text}
              </Link>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  )
}