import { ProductI } from '@/interface/product';
import { getAllProducts } from '@/services/products.services';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { Star } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import AddCartButton from '@/components/products/addToCartBtn';
import WishlistHeartBtn from '@/components/products/wishlistHeartBtn';
import BrandLink from '@/components/brandLink/brandLink';
import CategoryLink from '@/components/categoryLink/categoryLink';
export default async function Products() {


  const { data } = await getAllProducts();
  const products: ProductI[] = data




  return (
    <main>
      <div className="max-w-7xl mx-auto p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-6">
          {products.map((prod) => <React.Fragment key={prod._id}>
            <div>
              <Card className='h-full flex flex-col hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden'>
                <Link href={`/products/${prod._id}`} className="block relative aspect-square">
                  <Image fill className="object-cover hover:scale-105 transition-transform duration-300" src={prod.imageCover} alt='productImage' />
                </Link>
                <CardHeader>
                  <CardDescription><BrandLink brandId={prod.brand._id}>{prod.brand.name}</BrandLink></CardDescription>
                  <Link href={`/products/${prod._id}`}><CardTitle>{prod.title}</CardTitle></Link>
                  <CardDescription><CategoryLink categoryId={prod.category._id}>{prod.category.name}</CategoryLink></CardDescription>
                </CardHeader>
                <CardContent className='flex gap-1 items-center mt-auto'>
                  {[0, 1, 2, 3, 4].map((star, index) => {
                    const filledStar = star < Math.round(prod.ratingsAverage);
                    return <React.Fragment key={index}>
                      <Star className={`size-6 ${filledStar ? "text-yellow-500 fill-yellow-500" : "text-gray-500 fill-gray-500"}`} />
                    </React.Fragment>
                  })}
                  <p>{prod.ratingsAverage}</p>
                </CardContent>
                <CardContent>
                  <p className="text-lg font-semibold">
                    {prod.price} <span className="text-sm text-muted-foreground">EGP</span>
                  </p>
                </CardContent>

                <CardFooter className='flex items-center gap-3'>
                  <AddCartButton prodId={prod._id} />
                  <WishlistHeartBtn productId={prod._id} />
                </CardFooter>
              </Card>
            </div>
          </React.Fragment>)}
        </div>
      </div>
    </main>
  )
}
