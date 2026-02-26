"use client"

import { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { addToCart } from '@/app/_actions/cart.action'
import { Spinner } from '../ui/spinner'
import { toast } from 'sonner'
import { cartContext } from '@/providers/cart-provider'
import { redirect } from 'next/navigation'

export default function AddCartButton({ prodId }: { prodId: string }) {

    const [isLoading, setIsLoading] = useState(false)
    const {handelCart} = useContext(cartContext)

    async function addProductToCart(productId: string) {
        try {
            setIsLoading(true)
            const response = await addToCart(productId)
            if (response.status == "success") {
                toast.success(response.message, { position: "top-center" })
            handelCart()
        }
        } catch (error:any) {
            toast.error(error.message, { position: "top-center" })
            redirect("/login")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Button disabled={isLoading} onClick={() => {
                addProductToCart(prodId)
            }} className='grow'>
                {isLoading ? <Spinner /> : <> Add to Cart
                    <ShoppingCart className='size-6' /></>}
            </Button>
        </>
    )
}
