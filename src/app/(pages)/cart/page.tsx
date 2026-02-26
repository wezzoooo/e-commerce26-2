"use client"

import { clearUserCart, getLoggedUserCart } from '@/app/_actions/cart.action'
import CartItem from '@/components/cart/cart-items'
import { CheckoutDialog } from '@/components/checkout/checkoutDialog'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { CartDataI, CartI, CartProductI } from '@/interface/cart'
import { cartContext } from '@/providers/cart-provider'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function Cart() {

  const [isLoading, setIsLoading] = useState(true)
  const { handelCart, noOfCartItems } = useContext(cartContext)

  const [products, setProducts] = useState<CartProductI[] | []>([])
  const [cart, setCart] = useState<CartI | null>(null)
  const [cartData, setCartData] = useState<CartDataI | null>(null)

  const [cartId, setCartId] = useState<string>("")

  async function getUserCart() {
    try {
      const data: CartI = await getLoggedUserCart()
      setCartId(data.cartId)
      setProducts(data.data.products)
      setCart(data)
      setCartData(data.data)
    } catch (error) {
      toast.error("Connection Error", { position: "top-center" })

    } finally {
      setIsLoading(false)
    }
  }


  async function clearCart() {
    try {
      setIsLoading(true)
      const response = await clearUserCart()
      if (response.message == "success") {
        toast.success("Cart Cleard Successfully", { position: "top-center" })
      }
      setProducts([])
      handelCart()
    } catch (error) {
      toast.error("Error Occurred", { position: "top-center" })
    } finally {
      setIsLoading(false)
    }
  }



  useEffect(() => {
    getUserCart()
  }, [])

  if (products.length == 0) {
    return <>
      <div className="h-screen flex justify-center items-center">
        Your Cart is Empty, Go Shop <Link href="/products" className='hover:underline font-bold'> NOW! </Link>
      </div>
    </>
  }



  return (
    <>
      <div className="max-w-7xl mx-auto py-6 px-4">
        <h1 className='text-3xl font-bold tracking-tight'>Shopping Cart</h1>
        <p className='text-muted-foreground mt-1'>{noOfCartItems} items in your cart</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start mt-6">
          {/* items details */}
          <div className="space-y-4 lg:col-span-2">
            {products.map((prod) => <React.Fragment key={prod.product._id}>
              <CartItem setProducts={setProducts} product={prod} updateCartData={setCartData} />
            </React.Fragment>)}
          </div>
          {/* order summary */}
          <div className="sticky top-18 lg:col-span-1">
            <div className="border rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className='text-sm text-muted-foreground'>
                    Subtotal :{cartData?.products.reduce((accu, prod) => accu + prod.count, 0)} items
                  </span>
                  <span className='font-semibold'>{cartData?.totalCartPrice} EGP</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className='text-sm text-muted-foreground'>Shipping</span>
                  <span className='text-emerald-600 font-medium'>Free</span>
                </div>
              </div>
              <div className="my-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold">Total</span>
                  <span className="text-base font-bold">{cartData?.totalCartPrice} EGP</span>
                </div>
                <CheckoutDialog cartId={cartId} onCashSuccess={async () => { await clearCart() }} />
                <Link href="/products"><Button className='w-full text-lg mt-2'>Continue Shopping </Button></Link>
              </div>

            </div>
            <Button onClick={clearCart} variant={'outline'} className='mt-2 ms-auto text-destructive hover:text-destructive flex'><Trash2 />{isLoading ? <Spinner /> : "Clear Cart"}</Button>
          </div>
        </div>
      </div>
    </>
  )
}
