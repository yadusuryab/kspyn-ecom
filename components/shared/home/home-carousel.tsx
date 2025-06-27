'use client'

import * as React from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from '@/components/ui/carousel'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { ICarousel } from '@/types'

export function HomeCarousel({ items }: { items: ICarousel[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  const t = useTranslations('Home')

  return (
    <Carousel
      dir="ltr"
      plugins={[plugin.current]}
      className="w-full mx-auto relative group"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {items?.map((item) => (
          <CarouselItem key={item.title}>
            {/* <Link href={item.url} className="block relative"> */}
              {/* Mobile Portrait Layout */}
              <div className="md:hidden mx-[24px] flex flex-col aspect-[9/12] items-center justify-end pb-8 relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" /> */}
                
                <div className="relative z-10 w-full px-[24px] text-bottom space-y-4">
                  <h2 className={cn(
                    "text-3xl font-bold text-primary leading-tight"
                  )}>
                    {item.title}
                  </h2>
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {t(item.buttonCaption)}
                  </Button>
                </div>
              </div>

              {/* Desktop Landscape Layout */}
              <div className="hidden md:flex aspect-[16/6] items-center justify-center relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent" /> */}
                
                <div className="container relative z-10 h-full flex flex-col justify-end px-[52px] pb-[48px]">
                  <div className="max-w-md space-y-4">
                    <h2 className={cn(
                      "text-6xl lg:text-7xl font-bold leading-tight",
                      "text-primary"
                    )}>
                      {item.title}
                    </h2>
                    <Link href={item.url} className="block relative">   <Button 
                      className={'text-lg '}
                    >
                      {t(item.buttonCaption)}
                    </Button></Link>
                  </div>
                </div>
              </div>
            {/* </Link> */}
          </CarouselItem>
        ))}
      </CarouselContent>
      
      {/* Navigation Arrows - Hidden on mobile */}
      {/* <CarouselPrevious 
        className="hidden md:flex left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        variant="secondary"
        size="lg"
      />
      <CarouselNext 
        className="hidden md:flex right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        variant="secondary"
        size="lg"
      /> */}
    </Carousel>
  )
}