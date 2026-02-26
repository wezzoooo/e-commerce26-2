"use client"

import { Heart } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { wishlistContext } from "@/providers/wishlist-provider"
import { addToWishlist, removeFromWishlist } from "@/app/_actions/wishlist.action"
import { toast } from "sonner"
import { redirect } from "next/navigation"

export default function WishlistHeartBtn({ productId }: { productId: string }) {
    const { handelWishlist, wishlistIds } = useContext(wishlistContext)
    const [loading, setLoading] = useState(false)
    const [animate, setAnimate] = useState(false)
    const [justAdded, setJustAdded] = useState(false)


    const isInWishlist = wishlistIds.includes(productId)

    async function handleWishlist() {
        try {
            setLoading(true)


            if (isInWishlist) {
                const res = await removeFromWishlist(productId)
                toast.success("Removed from wishlist")
                setJustAdded(false)
            } else {
                const res = await addToWishlist(productId)
                toast.success("Added to wishlist ❤️")
                setJustAdded(true)
            }

            handelWishlist()
            window.dispatchEvent(new Event("wishlist-updated"))
        } catch (e: any) {
            toast.error(e.message)
            redirect("/login")
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
                if (justAdded && isInWishlist) {
                    setAnimate(true)
                    const t = setTimeout(() => setAnimate(false), 250)
                    return () => clearTimeout(t)
                }
            }, [justAdded, isInWishlist])

    return (
        <button disabled={loading} onClick={handleWishlist} className="relative disabled:opacity-60 disabled:cursor-not-allowed" aria-label="wishlist">
            <Heart className={`size-6 transition-transform duration-200 ease-out ${isInWishlist ? "fill-red-500 text-red-500" : ""} ${animate ? "scale-125" : "scale-100"}`} />
        </button>
    )
}