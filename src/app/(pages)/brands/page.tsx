import React from 'react'
import { getAllBrands } from '@/services/brands.services'
import { BrandI } from '@/interface/Brands'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'


export default async function Brands() {

  const { data } = await getAllBrands()
  const brands: BrandI[] = data


  return (
    <main>
      <div className="max-w-7xl mx-auto p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => <React.Fragment key={brand._id}>

            <Card className='h-full hover:shadow-lg transition rounded-xl overflow-hidden'>
              <Link href={`/brands/${brand._id}`}>
                <div className="relative aspect-square">
                  <Image fill src={brand.image} className="object-contain p-4" alt="brandImage" />
                </div>
                <CardContent className='text-center'>
                  <CardDescription className='font-bold text-black'>{brand.name}</CardDescription>
                </CardContent>
              </Link>
            </Card>

          </React.Fragment>)}
        </div>
      </div>
    </main>
  )
}
