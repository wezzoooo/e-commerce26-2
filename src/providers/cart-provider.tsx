"use client"

import { getLoggedUserCart } from '@/app/_actions/cart.action'
import { CartI } from '@/interface/cart'
import React, { createContext, useEffect, useState } from 'react'


interface CartContextI {
    noOfCartItems: number,
    cartItems: any[],
    handelCart: () => void,
    clearCart: () => void,
    isLoading: boolean
}
export const cartContext = createContext<CartContextI>({
    noOfCartItems: 0,
    cartItems: [],
    handelCart: () => { },
    clearCart: () => { },
    isLoading: false
})
export default function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false)
    const [noOfCartItems, setNoOfCartItems] = useState(0)
    const [cartItems, setCartItems] = useState<any[]>([])

    async function handelCart() {
        try {
            setIsLoading(true)
            const data: CartI = await getLoggedUserCart()
            const total = data.data.products.reduce((accu, prod) => prod.count + accu, 0)
            setNoOfCartItems(total)
            setCartItems(data.data.products)
        } catch (error) {
            console.log(error);
            setNoOfCartItems(0)
            setCartItems([])

        } finally {
            setIsLoading(false)
        }
    }

    const clearCart = () => {
        setNoOfCartItems(0)
        setCartItems([])
    }

    useEffect(() => {
        handelCart()
    }, [])

    return (
        <cartContext.Provider value={{ noOfCartItems, handelCart, isLoading , cartItems , clearCart }}>
            {children}
        </cartContext.Provider>
    )
}
