import { getSpecificSubCategory } from '@/services/subcategories.services'
import { getAllProducts } from '@/services/products.services'
import { SubCategoryI } from '@/interface/subcategories'
import { ProductI } from '@/interface/product'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle,
} from '@/components/ui/card'
import { Heart, Star } from 'lucide-react'
import AddCartButton from '@/components/products/addToCartBtn'
import BrandLink from '@/components/brandLink/brandLink'
import CategoryLink from '@/components/categoryLink/categoryLink'


export default async function SubCategoryDetails({ params }: { params: Promise<{ subCategoryId: string }> }) {
    const { subCategoryId } = await params
    const response = await getSpecificSubCategory(subCategoryId)

    if (!response?.data) {
        notFound()
    }

    const subCategory: SubCategoryI = response.data

    const productsResponse = await getAllProducts()
    const products: ProductI[] = productsResponse.data

    const subCategoryProducts = products.filter(
        (prod) => prod.subcategory?.some((sub) => sub._id === subCategory._id)
    )


    return (
        <main>
            <div className="max-w-7xl mx-auto p-10">

                <Card className='mb-10 max-w-4xl m-auto text-center py-10'>
                    <CardHeader>
                        <CardTitle className="text-4xl">{subCategory.name}</CardTitle>
                    </CardHeader>
                </Card>

                <h2 className="text-2xl font-bold my-5">Products in this sub category</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-12">
                    {subCategoryProducts.map((prod) => (
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

                                <CardFooter className='flex items-center gap-3'>
                                    <AddCartButton prodId={prod._id} />
                                    <Heart className='size-6' />
                                </CardFooter>
                            </Card>
                        </div>
                    ))}
                </div>

            </div>
        </main>
    )
}
