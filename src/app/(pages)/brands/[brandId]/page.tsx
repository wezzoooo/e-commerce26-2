import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BrandI, BrandIdType } from '@/interface/Brands';
import { getSpecificBrand } from '@/services/brands.services';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllProducts } from '@/services/products.services'
import { ProductI } from '@/interface/product'
import Link from 'next/link'
import React from 'react'
import AddCartButton from '@/components/products/addToCartBtn';
import { Star } from 'lucide-react';
import CategoryLink from '@/components/categoryLink/categoryLink';
import WishlistHeartBtn from '@/components/products/wishlistHeartBtn';

export default async function BrandDetails({ params }: { params: Promise<BrandIdType> }) {
    const { brandId } = await params
    const response = await getSpecificBrand(brandId)

    if (!response?.data) {
        notFound()
    }

    const brand: BrandI = response.data

    const productsResponse = await getAllProducts()
    const products: ProductI[] = productsResponse.data

    const brandProducts = products.filter(
        (prod) => prod.brand?._id === brand._id
    )


    return (
        <main>
            <div className="max-w-7xl mx-auto">
                <Breadcrumb className='my-3'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className='text-lg' href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink className='text-lg' href="/brands">Brands</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className='text-lg font-bold'>brand Details</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Card className='grid grid-cols-3 mb-3 max-w-80 m-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl'>
                    <div className="col-span-3">
                        <div className='w-full h-100 relative'>
                            <Image fill src={brand.image} className='object-contain' alt='productImage' />
                        </div>
                    </div>
                    <div className="col-span-3 flex items-center ">
                        <div className='w-full space-y-7 text-center'>
                            <CardHeader>
                                <CardTitle className='text-4xl'>{brand.name}</CardTitle>
                            </CardHeader>
                        </div>
                    </div>
                </Card>
                <div className="my-10">
                    <h2 className="text-2xl font-bold mb-5">Products from this brand</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-12">
                        {brandProducts.map((prod) => (
                            <div key={prod._id}>
                                <Card className='h-full flex flex-col hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden'>
                                    <Link href={`/products/${prod._id}`} className="block relative aspect-square">
                                        <Image fill className="object-cover hover:scale-105 transition-transform duration-300" src={prod.imageCover} alt="productImage" />
                                    </Link>
                                    <CardHeader className='my-2'>
                                        <Link href={`/products/${prod._id}`}>
                                            <CardDescription>{prod.brand?.name}</CardDescription>
                                            <CardTitle>{prod.title}</CardTitle>
                                        </Link>
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
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
