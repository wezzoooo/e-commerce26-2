"use server"

import { CheckoutSchemaType } from '@/lib/validationSchema/checkout.schema';
import { getUserToken } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { jwtDecode } from 'jwt-decode';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL


export async function checkoutOnlineSession(cartId: string, formData: CheckoutSchemaType) {

    const token = await getUserToken()
    if (!token) {
        throw new Error("you are not authorized to do this action")
    }
    const response = await fetch(`${API_URL}/orders/checkout-session/${cartId}?url=https://e-commerce26-2.vercel.app`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    });
    const data = await response.json()
    return data
}


export async function checkoutCashSession(cartId: string, formData: CheckoutSchemaType) {

    const token = await getUserToken()
    if (!token) {
        throw new Error("you are not authorized to do this action")
    }
    const response = await fetch(`${API_URL}/orders/${cartId}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    });
    const data = await response.json()
    return data
}

export async function getUserOrders() {

    const token = await getUserToken()
    if (!token) {
        throw new Error("you are not authorized to do this action")
    }

    const session = await getServerSession(authOptions)
    if (!session?.token) {
        throw new Error("User is not logged in")
    }

    const decoded: any = jwtDecode(session.token as string)
    const userId = decoded.id
    if (!userId) {
        throw new Error("User id not found in session")
    }

    const response = await fetch(`${API_URL}/orders/user/${userId}`, {
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    });
    const data = await response.json()
    return data
}