import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllProducts } from '@/services/products.services'
import { ProductI } from '@/interface/product'
import Link from 'next/link'
import AddCartButton from '@/components/products/addToCartBtn';
import { Star } from 'lucide-react';
import { getSpecificCategory } from '@/services/categories.services';
import { CategoryI } from '@/interface/categories';
import BrandLink from '@/components/brandLink/brandLink';
import { getSubCategoriesOnCategory } from '@/services/subcategories.services';
import { SubCategoryI } from '@/interface/subcategories';
import { Layers } from 'lucide-react'
import WishlistHeartBtn from '@/components/products/wishlistHeartBtn';


export default async function CategoryDetails({ params }: { params: Promise<{ categoryId: string }> }) {

    const { categoryId } = await params
    const response = await getSpecificCategory(categoryId)

    if (!response?.data) {
        notFound()
    }

    const category: CategoryI = response.data

    const productsResponse = await getAllProducts()
    const products: ProductI[] = productsResponse.data

    const categoryProducts = products.filter(
        (prod) => prod.category?._id === category._id
    )


    const subCategoriesResponse = await getSubCategoriesOnCategory(category._id)
    const subCategories: SubCategoryI[] = subCategoriesResponse.data.filter(
        (sub: SubCategoryI) => sub.category === category._id
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
                            <BreadcrumbLink className='text-lg' href="/categories">Categories</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className='text-lg font-bold'>category Details</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Card className='grid grid-cols-3 mb-3 max-w-80 m-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl'>
                    <div className="col-span-3">
                        <div className='w-full h-100 relative'>
                            <Image fill src={category.image} className='object-contain' alt='productImage' />
                        </div>
                    </div>
                    <div className="col-span-3 flex items-center ">
                        <div className='w-full space-y-7 text-center'>
                            <CardHeader>
                                <CardTitle className='text-4xl'>{category.name}</CardTitle>
                            </CardHeader>
                        </div>
                    </div>
                </Card>
                <div className="my-10">
                    <h2 className="text-2xl font-bold mb-5">Sub Categories</h2>
                    {subCategories.length === 0 ? (
                        <p className="text-gray-500">No sub categories found for this category</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {subCategories.map((sub) => (
                                <Card key={sub._id} className="h-full hover:shadow-md transition">
                                    <Link href={`/subcategories/${sub._id}`}>
                                        <CardContent className="flex flex-col items-center justify-center gap-3 py-10">
                                            <Layers className="size-10 text-gray-500" />
                                            <CardDescription className="font-bold text-black text-lg">
                                                {sub.name}
                                            </CardDescription>
                                        </CardContent>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                <div className="my-10">
                    <h2 className="text-2xl font-bold mb-5">Products from this category</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-12">
                        {categoryProducts.map((prod) => (
                            <div key={prod._id}>
                                <Card className='h-full flex flex-col hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden'>
                                    <div>
                                        <Link href={`/products/${prod._id}`} className="block relative aspect-square">
                                            <Image fill className="object-cover hover:scale-105 transition-transform duration-300" src={prod.imageCover} alt='productImage' />
                                        </Link>

                                        <CardHeader className='my-2'>
                                            <CardDescription><BrandLink brandId={prod.brand._id}>{prod.brand?.name}</BrandLink></CardDescription>

                                            <Link href={`/products/${prod._id}`}>
                                                <CardTitle>{prod.title}</CardTitle>
                                                <CardDescription>{prod.category.name}</CardDescription>
                                            </Link>
                                        </CardHeader>
                                    </div>

                                    <CardContent className='flex gap-1 items-center mt-auto'>
                                        {[0, 1, 2, 3, 4].map((star, index) => {
                                            const filledStar = star < Math.round(prod.ratingsAverage);
                                            return <Star key={index} className={`size-6 ${filledStar ? "text-yellow-500 fill-yellow-500" : "text-gray-500 fill-gray-500"}`} />
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
