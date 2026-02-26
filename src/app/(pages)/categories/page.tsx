import React from 'react'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { getAllCategories } from '@/services/categories.services'
import { CategoryI } from '@/interface/categories'


export default async function Categories() {
  const { data } = await getAllCategories()
  const categories: CategoryI[] = data


  return (
    <main>
      <div className="max-w-7xl mx-auto p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((categorie) => <React.Fragment key={categorie._id}>

            <Link href={`/categories/${categorie._id}`}>
              <Card className='h-full  hover:shadow-lg transition rounded-xl overflow-hidden'>
                <div className="relative aspect-square">
                  <Image fill src={categorie.image} className="object-contain p-4" alt="brandImage" />
                </div>
                <CardContent className='text-center'>
                  <CardDescription className='font-bold text-black '>{categorie.name}</CardDescription>
                </CardContent>
              </Card>
            </Link>

          </React.Fragment>)}
        </div>
      </div>
    </main>
  )
}
