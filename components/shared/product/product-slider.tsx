'use client'

import * as React from 'react'
import { useRef } from 'react'
// import ProductCard from './product-card'
import { IProduct } from '@/lib/db/models/product.model'
import { Button } from '@/components/ui/button'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import ProductCardMinimal from './product-card-simple'

export default function ProductSlider({
  title,
  products,
  // hideDetails = false,
}: {
  title?: string
  products: IProduct[]
  hideDetails?: boolean
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 300
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <div className="w-full space-y-6 mt-[90px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-8">
        {title && (
          <h2 className="text-2xl font-medium tracking-tighter">{title}</h2>
        )}
        <div className="flex gap-2">
          <Button
            onClick={() => scroll('left')}
            className="rounded-full p-2 hover:bg-gray-100"
            variant="secondary"
            size="icon"
          >
            <IconChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => scroll('right')}
            className="rounded-full"
            variant="secondary"
            size="icon"
          >
            <IconChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Scrollable Card Row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide"
      >
        {products.map((product) => (
          <div
            key={product.slug}
            className="flex-shrink-0 w-[300px] h-full"
          >
           <ProductCardMinimal product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
