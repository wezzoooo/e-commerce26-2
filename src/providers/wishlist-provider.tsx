"use client"

import { createContext, useEffect, useState } from "react"
import { getLoggedUserWishlist } from "@/app/_actions/wishlist.action"
import { WishlistI } from "@/interface/wishlist"

interface WishlistContextI {
    noOfWishlistItems: number
    handelWishlist: () => void
    isLoading: boolean
    wishlistIds: string[]
}

export const wishlistContext = createContext<WishlistContextI>({
    noOfWishlistItems: 0,
    handelWishlist: () => { },
    isLoading: false,
    wishlistIds: [],
})

export default function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false)
    const [noOfWishlistItems, setNoOfWishlistItems] = useState(0)
    const [wishlistIds, setWishlistIds] = useState<string[]>([])

    async function handelWishlist() {
        try {
            setIsLoading(true)
            const data: WishlistI = await getLoggedUserWishlist()
            const ids = data.data.map((p) => p._id)
            setWishlistIds(ids)
            setNoOfWishlistItems(data.count)
        } catch (error) {
            console.log(error)
            setWishlistIds([])
            setNoOfWishlistItems(0)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handelWishlist()
    }, [])

    return (
        <wishlistContext.Provider value={{ noOfWishlistItems, handelWishlist, isLoading, wishlistIds }}>
            {children}
        </wishlistContext.Provider>
    )
}