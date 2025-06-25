import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { IProduct } from '@/lib/db/models/product.model'
import Rating from './rating'
import { formatNumber, generateId, round2 } from '@/lib/utils'
import ProductPrice from './product-price'
import ImageHover from './image-hover'
import AddToCart from './add-to-cart'

interface ProductCardProps {
  product: IProduct
  hideBorder?: boolean
  hideDetails?: boolean
  hideAddToCart?: boolean
  className?: string
}

const ProductCard = ({
  product,
  hideBorder = false,
  hideDetails = false,
  hideAddToCart = false,
  className = ''
}: ProductCardProps) => {
  const ProductImage = () => (
    <Link href={`/product/${product.slug}`} className="block">
      <div className="relative  h-full w-full bg-secondary rounded-lg overflow-hidden group">
  {product.images.length > 1 ? (
    <ImageHover
      src={product.images[0]}
      hoverSrc={product.images[1]}
      alt={product.name}
      // subtle fallback color
    />
  ) : (
    <Image
      src={product.images[0]}
      alt={product.name}
      fill
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      className="object-contain transition-transform duration-300 group-hover:scale-105"
      style={{ backgroundColor: '#f3f4f6' }} // subtle fallback color
      priority
    />
  )}
  
  {/* Optional: Add a subtle shadow effect */}
  <div className="absolute inset-0 rounded-lg shadow-inner pointer-events-none" />
</div>
    </Link>
  )

  const ProductDetails = () => (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold tracking-tight text-foreground/90">
          {product.brand}
        </p>
        <div className="flex items-center ">
          <Rating rating={product.avgRating} />
          <span className="text-xs text-muted-foreground">
            ({formatNumber(product.numReviews)})
          </span>
        </div>
      </div>
      
      <Link
        href={`/product/${product.slug}`}
        className="block text-sm font-medium tracking-tight text-foreground hover:text-primary transition-colors"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {product.name}
      </Link>

      <ProductPrice
        isDeal={product.tags?.includes('todays-deal')}
        price={product.price}
        listPrice={product.listPrice}
        forListing
        className="mt-1"
      />
    </div>
  )

  const AddButton = () => (
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
  )

  if (hideBorder) {
    return (
      <div className={`flex flex-col h-full ${className}`}>
        <ProductImage />
        {!hideDetails && (
          <>
            <div className="p-3 flex-1 flex flex-col">
              <ProductDetails />
            </div>
            {!hideAddToCart && (
              <div className="px-3 pb-3">
                <AddButton />
              </div>
            )}
          </>
        )}
      </div>
    )
  }

  return (
    <Card className={`flex flex-col h-full overflow-hidden ${className}`}>
      <CardHeader className="p-3 pb-0">
        <ProductImage />
      </CardHeader>
      {!hideDetails && (
        <>
          <CardContent className="p-3 flex-1">
            <ProductDetails />
          </CardContent>
          <CardFooter className="p-3 pt-0">
            {!hideAddToCart && <AddButton />}
          </CardFooter>
        </>
      )}
    </Card>
  )
}

export default ProductCard