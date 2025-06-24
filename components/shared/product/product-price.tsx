'use client'
import useSettingStore from '@/hooks/use-setting-store'
import { cn, round2 } from '@/lib/utils'
import { useFormatter, useTranslations } from 'next-intl'

type ProductPriceProps = {
  price: number
  isDeal?: boolean
  listPrice?: number
  className?: string
  forListing?: boolean
  plain?: boolean
}

const ProductPrice = ({
  price,
  className,
  listPrice = 0,
  isDeal = false,
  forListing = true,
  plain = false,
}: ProductPriceProps) => {
  const { getCurrency } = useSettingStore()
  const currency = getCurrency()
  const t = useTranslations()
  const format = useFormatter()

  // Convert prices based on currency rate
  const convertedPrice = round2(currency.convertRate * price)
  const convertedListPrice = round2(currency.convertRate * listPrice)
  
  // Calculate discount percentage
  const discountPercent = Math.round(
    100 - (convertedPrice / convertedListPrice) * 100
  )

  // Split price into integer and decimal parts
  const stringValue = convertedPrice.toString()
  const [intValue, floatValue] = stringValue?.includes('.')
    ? stringValue.split('.')
    : [stringValue, '']

  // Format price with currency
  const formattedPrice = format.number(convertedPrice, {
    style: 'currency',
    currency: currency.code,
    currencyDisplay: 'narrowSymbol',
  })

  // Format list price with currency
  const formattedListPrice = format.number(convertedListPrice, {
    style: 'currency',
    currency: currency.code,
    currencyDisplay: 'narrowSymbol',
  })

  if (plain) {
    return <span className={className}>{formattedPrice}</span>
  }

  if (convertedListPrice === 0) {
    return (
      <div className={cn('flex items-baseline', className)}>
        <span className="text-sm font-medium text-gray-500">{currency.symbol}</span>
        <span className="text-2xl font-bold text-gray-900">{intValue}</span>
        {floatValue && (
          <span className="text-sm font-medium text-gray-500">.{floatValue}</span>
        )}
      </div>
    )
  }

  return (
    <div className={cn('space-y-1', !forListing && 'w-full', className)}>
      {/* Discount badge */}
      {(isDeal || discountPercent > 0) && (
        <div className={cn(
          'flex items-center gap-2',
          forListing ? 'justify-center' : 'justify-start'
        )}>
          {isDeal && (
            <span className="bg-red-600  px-2 py-1 text-xs font-bold text-white">
              {t('Product.Limited time deal')}
            </span>
          )}
          <span className={cn(
            ' px-2 py-1 text-xs font-bold',
            isDeal ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-800'
          )}>
            {discountPercent}% {t('Product.Off')}
          </span>
        </div>
      )}

      {/* Price display */}
      <div className={cn(
        'flex items-baseline gap-2',
        forListing ? 'justify-center' : 'justify-start'
      )}>
        <div className="flex items-baseline">
          <span className="text-sm font-medium text-gray-500">{currency.symbol}</span>
          <span className="text-2xl font-bold text-gray-900">{intValue}</span>
          {floatValue && (
            <span className="text-sm font-medium text-gray-500">.{floatValue}</span>
          )}
        </div>

        {/* Original price */}
        {convertedListPrice > 0 && (
          <div className="text-sm text-gray-500">
            <span className="line-through">{formattedListPrice}</span>
            {!isDeal && (
              <span className="ml-1">{t('Product.Was')}</span>
            )}
          </div>
        )}
      </div>

      {/* You save message for non-deal discounts */}
      {!isDeal && discountPercent > 0 && (
        <div className="text-xs text-green-600">
          You Save {formattedListPrice} ({discountPercent}%)
        </div>
      )}
    </div>
  )
}

export default ProductPrice