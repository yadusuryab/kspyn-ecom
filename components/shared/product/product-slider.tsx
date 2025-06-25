'use client'

import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import ProductCard from './product-card'
import { IProduct } from '@/lib/db/models/product.model'

export default function ProductSlider({
  title,
  products,
  hideDetails = false,
}: {
  title?: string
  products: IProduct[]
  hideDetails?: boolean
}) {
  return (
    <div className="w-full bg-background space-y-6 p-2">
      {title && (
        <h2 className="text-2xl font-bold tracking-tight px-4 md:px-6">
          {title}
        </h2>
      )}
      
      <Carousel
        opts={{
          align: 'start',
          slidesToScroll: 'auto',
        }}
        className="w-full relative group"
      >
        <CarouselContent className="px-4 md:px-6">
          {products?.map((product) => (
            <CarouselItem
              key={product.slug}
              className={cn(
                'basis-1/2', // Default mobile size
                hideDetails 
                  ? 'sm:basis-1/3 md:basis-1/4 lg:basis-1/6' 
                  : 'sm:basis-1/2 md:basis-1/3 lg:basis-1/4'
              )}
            >
              <div className="p-1 h-full"> {/* Padding for perfect spacing */}
                <ProductCard
                  hideDetails={hideDetails}
                  hideAddToCart
                  hideBorder
                  product={product}
                  // Ensure equal height
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation with hover effect */}
        <CarouselPrevious 
          className="left-2 opacity-0 group-hover:opacity-100 transition-opacity"
          variant="ghost"
          size="sm"
        />
        <CarouselNext 
          className="right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          variant="ghost"
          size="sm"
        />
      </Carousel>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}