'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IProduct } from '@/lib/db/models/product.model'
import { generateId, round2 } from '@/lib/utils'
import Rating from './rating'
import ProductPrice from './product-price'
import AddToCart from './add-to-cart'
import ImageHover from './image-hover'

interface ProductCardProps {
  product: IProduct
  className?: string
  hideAddToCart?: boolean
}

const ProductCard = ({ product, className = '', hideAddToCart = true }: ProductCardProps) => {
  const isDeal = product.tags?.includes('todays-deal')
  const discount = product.listPrice && product.listPrice > product.price

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <Link href={`/product/${product.slug}`} className="relative block aspect-[3/4] w-full overflow-hidden group rounded-sm bg-[#f3f4f6]">
        {product.images.length > 1 ? (
          <ImageHover
            src={product.images[0]}
            hoverSrc={product.images[1]}
            alt={product.name}
          />
        ) : (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {(isDeal || discount) && (
          <div className="absolute top-2 right-2 z-10 flex flex-col items-end gap-1">
            {isDeal && (
              <span className="bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm">
                Deal
              </span>
            )}
            {discount && (
              <span className="bg-black text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm">
                {Math.round(100 - (product.price / product.listPrice) * 100)}% off
              </span>
            )}
          </div>
        )}
      </Link>

      <div className="pt-3 px-1.5 flex flex-col gap-1 text-left">
        {/* Name */}
        <Link href={`/product/${product.slug}`} className="text-[14px] font-medium text-foreground leading-tight line-clamp-2">
          {product.name}
        </Link>

        {/* Price */}
        <ProductPrice
          price={product.price}
          listPrice={product.listPrice}
          isDeal={isDeal}
          forListing
        />

        {/* Rating */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Rating rating={product.avgRating} size={4} />
          <span className="text-xs">({product.numReviews})</span>
        </div>
      </div>

      {/* Optional Add to Cart */}
      {!hideAddToCart && (
        <div className="pt-2 px-1.5">
          <AddToCart
            minimal
            item={{
              clientId: generateId(),
              product: product._id,
              size: product.sizes[0],
              color: product.colors[0],
              countInStock: product.countInStock,
              name: product.name,
              slug: product.slug,
              category: product.category,
              price: round2(product.price),
              quantity: 1,
              image: product.images[0],
            }}
          />
        </div>
      )}
    </div>
  )
}

export default ProductCard
