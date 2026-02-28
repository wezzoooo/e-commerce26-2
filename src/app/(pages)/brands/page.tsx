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
          {brands.map((brand) => (
            <Card
              key={brand._id}
              className=" h-full rounded-xl overflow-hidden bg-card text-card-foreground transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y- ">
              <Link href={`/brands/${brand._id}`} className="group block">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    fill
                    src={brand.image}
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    alt="brandImage"
                  />
                </div>

                <CardContent className='text-center'>
                  <CardDescription
                    className=" font-bold transition-colors duration-200 text-black dark:text-white group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black inline-block px-3 py-1 rounded-m ">
                    {brand.name}
                  </CardDescription>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}