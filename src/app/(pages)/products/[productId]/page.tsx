import { ProductI, ProductIdType } from '@/interface/product'
import { getAllProducts, getSpecificProduct } from '@/services/products.services'
import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Image from 'next/image'
import { Star } from 'lucide-react'
import { notFound } from 'next/navigation'
import AddCartButton from '@/components/products/addToCartBtn'
import WishlistHeartBtn from '@/components/products/wishlistHeartBtn'
import Link from 'next/link'
import BrandLink from '@/components/brandLink/brandLink'
import CategoryLink from '@/components/categoryLink/categoryLink'


export default async function ProductDetails({ params }: { params: Promise<ProductIdType> }) {
    const { productId } = await params
    const response = await getSpecificProduct(productId)

    if (!response?.data) {
        notFound()
    }
    const product: ProductI = response.data

    const productsResponse = await getAllProducts()
    const allProducts: ProductI[] = productsResponse.data

    const relatedProducts = allProducts.filter(
        (prod) =>
            prod._id !== product._id &&
            prod.category?._id === product.category?._id
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
                            <BreadcrumbLink className='text-lg' href="/products">Products</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className='text-lg font-bold'>Product Details</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Card className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-3 p-4 md:p-8 mx-4'>
                    <div className="col-span-1">

                        <Carousel opts={{
                            align: "start",
                            loop: true
                        }}
                        >
                            <CarouselContent>
                                {product?.images?.map((img, index) =>
                                    <CarouselItem key={index}>
                                        <div className='w-full h-100 relative'>
                                            <Image fill src={img} className='object-contain' alt='productImage' />
                                        </div>
                                    </CarouselItem>)}

                            </CarouselContent>
                        </Carousel>
                    </div>
                    <div className="flex items-center">
                        <div className='w-full space-y-6 text-center md:text-left'>
                            <CardHeader>
                                <CardDescription><BrandLink brandId={product.brand._id}>{product.brand.name}</BrandLink></CardDescription>
                                <CardTitle>{product.title}</CardTitle>
                                <CardDescription><CategoryLink categoryId={product.category._id}>{product.category.name}</CategoryLink></CardDescription>
                                <CardDescription>{product.description}</CardDescription>
                            </CardHeader>
                            <CardContent className='flex gap-1 items-center justify-center'>
                                {[0, 1, 2, 3, 4].map((star, index) => {
                                    const filledStar = star < Math.round(product.ratingsAverage);
                                    return <React.Fragment key={index}>
                                        <Star className={`size-6 ${filledStar ? "text-yellow-500 fill-yellow-500" : "text-gray-500 fill-gray-500"}`} />
                                    </React.Fragment>
                                })}
                                <p>{product.ratingsAverage}</p>
                            </CardContent>
                            <CardContent>
                                <p>Price: <strong>{product.price}</strong> EGP</p>
                            </CardContent>
                            <CardFooter className='flex items-center gap-3'>
                                <AddCartButton prodId={product._id} />
                                <WishlistHeartBtn productId={product._id} />
                            </CardFooter>
                        </div>
                    </div>
                </Card>
                <div className="my-10">
                    <h2 className="text-2xl font-bold mb-5">Related Products</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-12">
                        {relatedProducts.map((prod) => (
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
                                            const filledStar = star < Math.round(prod.ratingsAverage)
                                            return (
                                                <Star
                                                    key={index}
                                                    className={`size-6 ${filledStar ? "text-yellow-500 fill-yellow-500" : "text-gray-500 fill-gray-500"}`}
                                                />
                                            )
                                        })}
                                        <p>{prod.ratingsAverage}</p>
                                    </CardContent>
                                    <CardContent>
                                        <p className="text-lg font-semibold">
                                            {prod.price} <span className="text-sm text-muted-foreground">EGP</span>
                                        </p>
                                    </CardContent>

                                    <CardFooter className="flex items-center gap-3">
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
