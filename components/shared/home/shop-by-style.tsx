'use client'

import { Button } from '@/components/ui/button'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'


type CategoryCardProps = {
  title: string
  variant: 'scroll'
  items: {
    name: string
    image: string
    href: string
  }[]
}

const CategoryScroll: React.FC<CategoryCardProps> = ({ title, variant, items }) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (variant !== 'scroll') return null

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 300
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="w-full py-10">
      <div className="mb-6 flex items-center justify-between px-4 sm:px-8">
        <h2 className="text-2xl font-medium tracking-tighter">{title}</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => scroll('left')}
            className="rounded-full  p-2 hover:bg-gray-100"
            variant={'secondary'}
            size={'icon'}
          >
            <IconChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => scroll('right')}
            className="rounded-full"
            variant={'secondary'}
            size={'icon'}
          >
            <IconChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-4 sm:px-8 scroll-smooth scrollbar-hide"
      >
        {items.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className="relative min-w-[300px] aspect-[4/3] flex-shrink-0 overflow-hidden rounded-xl group"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-1 text-sm font-medium text-black shadow-md">
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategoryScroll
