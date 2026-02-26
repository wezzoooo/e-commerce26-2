import { deleteCartProduct, updateCartProductCount } from '@/app/_actions/cart.action'
import { CartProductI } from '@/interface/cart'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'
import { cartContext } from '@/providers/cart-provider'

export default function CartItem({ product, setProducts , updateCartData }: { product: CartProductI, setProducts: (products: CartProductI[]) => void, updateCartData:(data: any) => void}) {

    const [isLoading, setIsLoading] = useState(false)
    const { handelCart  } = useContext(cartContext)


    async function deleteProduct(id: string) {
        try {
            setIsLoading(true)
            const data = await deleteCartProduct(id)
            if (data.status == "success") {
                toast.success("Removed Product Successfully", { position: "top-center" })
                setProducts(data.data.products)
                handelCart()
            }
        } catch (error) {
            toast.error("Error Occurred", { position: "top-center" })

        } finally {
            setIsLoading(false)
        }
    }
    

    async function updateProductCount(id: string, newCount: number) {

        try {
            setIsLoading(true)
            const response = await updateCartProductCount(id, newCount)
            toast.success("Product Quantity Updated Successfully", { position: "top-center" })
            setProducts(response.data.products)
            updateCartData(response.data)
            handelCart()
        } catch (error) {
            toast.error("Error Occurred", { position: "top-center" })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card">
                <Image width={100} height={100} src={product.product.imageCover} alt={product.product.title} className='w-24 h-24 rounded-xl object-cover md:w-28 md:h-28' />
                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <h3 className="text-base font-semibold md:text-lg line-clamp-2">
                                {product.product.title}
                            </h3>
                            <p className='text-sm text-muted-foreground mt-1'>
                                {product.product.brand.name} <br />
                                {product.product.category.name}

                            </p>
                        </div>

                        <div className="text-right">
                            <div className="font-semibold">
                                <span className='block text-gray-400 text-xs'> {product.count}x{product.price} EGP</span>
                                {product.price * product.count} EGP
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <button disabled={isLoading} onClick={() => { updateProductCount(product.product._id, product.count - 1) }} aria-label='decrease' className='size-8 rounded-lg border text-2xl hover:bg-black hover:text-white disabled:bg-slate-600 disabled:cursor-not-allowed'>
                                -
                            </button>
                            <span className='w-6 text-center font-medium'>
                                {isLoading ? <Spinner /> : <>{product.count}</>}
                            </span>
                            <button disabled={isLoading} onClick={() => { updateProductCount(product.product._id, product.count + 1) }} aria-label='decrease' className='size-8 rounded-lg border text-2xl hover:bg-black hover:text-white disabled:bg-slate-600 disabled:cursor-not-allowed'>
                                +
                            </button>
                        </div>
                        <button onClick={() => { deleteProduct(product.product._id) }} aria-label='remove' className='text-sm cursor-pointer flex text-destructive hover:underline'>
                            {isLoading ? <Spinner /> : "Remove"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
