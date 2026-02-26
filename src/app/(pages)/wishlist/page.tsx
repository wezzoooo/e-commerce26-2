"use client"

import React, { useContext, useEffect, useState } from "react"
import { wishlistContext } from "@/providers/wishlist-provider"
import { getLoggedUserWishlist } from "@/app/_actions/wishlist.action"
import { WishlistI } from "@/interface/wishlist"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import AddCartButton from "@/components/products/addToCartBtn"
import WishlistHeartBtn from "@/components/products/wishlistHeartBtn"
import BrandLink from "@/components/brandLink/brandLink"
import CategoryLink from "@/components/categoryLink/categoryLink"
import { Star } from "lucide-react"
import MainLoader from "@/components/loader/mainLoader"

export default function WishlistPage() {
  const { isLoading } = useContext(wishlistContext)
  const [products, setProducts] = useState<WishlistI["data"]>([])
  const [pageLoading, setPageLoading] = useState(true)

  async function loadWishlistPage() {
    try {
      setPageLoading(true)
      const data: WishlistI = await getLoggedUserWishlist()
      setProducts(data.data)
    } catch (error) {
      setProducts([])
    } finally {
      setPageLoading(false)
    }
  }

  useEffect(() => {
    loadWishlistPage()
    window.addEventListener("wishlist-updated", loadWishlistPage)
    return () => {
      window.removeEventListener("wishlist-updated", loadWishlistPage)
    }
  }, [])

  if (isLoading || pageLoading) {
    return (
      <MainLoader/>
    )
  }

  if (!products.length) {
    return <div className="h-screen flex items-center justify-center">Your wishlist is empty 💔</div>
  }

  return (
    <div className="max-w-7xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((prod) => (
          <div key={prod._id}>
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

              <CardFooter className="flex gap-3">
                <AddCartButton prodId={prod._id} />
                <WishlistHeartBtn productId={prod._id} />
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}