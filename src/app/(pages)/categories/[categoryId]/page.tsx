import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllProducts } from '@/services/products.services'
import { ProductI } from '@/interface/product'
import Link from 'next/link'
import AddCartButton from '@/components/products/addToCartBtn';
import { Star, Layers } from 'lucide-react';
import { getSpecificCategory } from '@/services/categories.services';
import { CategoryI } from '@/interface/categories';
import BrandLink from '@/components/brandLink/brandLink';
import { getSubCategoriesOnCategory } from '@/services/subcategories.services';
import { SubCategoryI } from '@/interface/subcategories';
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
            <div className="max-w-7xl mx-auto px-4">
                {/* Breadcrumb */}
                <Breadcrumb className='my-6'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className='text-lg hover:underline' href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink className='text-lg hover:underline' href="/categories">Categories</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className='text-lg font-bold'>Category Details</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Category Card */}
                <Card
                    className=" grid grid-cols-3 mb-10 max-w-80 m-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl bg-card text-card-foreground rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl "
                >
                    <div className="col-span-3 group">
                        <div className='w-full h-80 relative overflow-hidden'>
                            <Image
                                fill
                                src={category.image}
                                className='object-contain transition-transform duration-300 group-hover:scale-105'
                                alt='productImage'
                            />
                        </div>
                    </div>

                    <div className="col-span-3 flex items-center">
                        <div className='w-full space-y-7 text-center'>
                            <CardHeader>
                                <CardTitle className='text-4xl transition-colors'>
                                    {category.name}
                                </CardTitle>
                            </CardHeader>
                        </div>
                    </div>
                </Card>

                {/* Sub Categories */}
                <div className="my-14">
                    <h2 className="text-2xl font-bold mb-6">Sub Categories</h2>

                    {subCategories.length === 0 ? (
                        <p className="text-muted-foreground">No sub categories found for this category</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {subCategories.map((sub) => (
                                <Card
                                    key={sub._id}
                                    className=" h-full rounded-xl overflow-hidden bg-card text-card-foreground transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1">
                                    <Link href={`/subcategories/${sub._id}`} className="group">
                                        <CardContent className="flex flex-col items-center justify-center gap-3 py-10">
                                            <Layers className="size-10 text-muted-foreground transition-transform duration-300 group-hover:scale-110" />
                                            <CardDescription
                                                className=" font-bold text-lg transition-colors duration-200 text-black dark:text-white group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black px-3 py-1 rounded-md">
                                                {sub.name}
                                            </CardDescription>
                                        </CardContent>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Products */}
                <div className="my-14">
                    <h2 className="text-2xl font-bold mb-6">Products from this category</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-6">
                        {categoryProducts.map((prod) => (
                            <div key={prod._id}>
                                <Card
                                    className=" h-full flex flex-col rounded-2xl overflow-hidden bg-card text-card-foreground transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1"
                                >
                                    <Link href={`/products/${prod._id}`} className="block relative aspect-square group overflow-hidden">
                                        <Image
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            src={prod.imageCover}
                                            alt='productImage'
                                        />
                                    </Link>

                                    <CardHeader className='my-2'>
                                        <CardDescription>
                                            <BrandLink brandId={prod.brand._id}>{prod.brand?.name}</BrandLink>
                                        </CardDescription>

                                        <Link href={`/products/${prod._id}`}>
                                            <CardTitle className="transition-colors hover:underline">
                                                {prod.title}
                                            </CardTitle>
                                            <CardDescription>{prod.category.name}</CardDescription>
                                        </Link>
                                    </CardHeader>

                                    <CardContent className='flex gap-1 items-center mt-auto'>
                                        {[0, 1, 2, 3, 4].map((star, index) => {
                                            const filledStar = star < Math.round(prod.ratingsAverage);
                                            return (
                                                <Star
                                                    key={index}
                                                    className={`size-6 ${filledStar ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground fill-muted-foreground"}`}
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