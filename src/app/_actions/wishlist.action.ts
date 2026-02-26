"use server"

import { getUserToken } from "@/lib/auth"

const API_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function addToWishlist(productId: string) {
    const token = await getUserToken()
    if (!token) throw new Error("Login required")

    const res = await fetch(`${API_URL}/wishlist`, {
        method: "POST",
        headers: {
            token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
    })

    return res.json()
}

export async function removeFromWishlist(productId: string) {
    const token = await getUserToken()
    if (!token) throw new Error("Login required")

    const res = await fetch(`${API_URL}/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
            token,
            "Content-Type": "application/json",
        },
    })

    return res.json()
}

export async function getLoggedUserWishlist() {
    const token = await getUserToken()
    if (!token) throw new Error("Login required")

    const res = await fetch(`${API_URL}/wishlist`, {
        headers: {
            token,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    })

    return res.json()
}
