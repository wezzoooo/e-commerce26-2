"use server"

import { getUserToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL



export async function addToCart(productId: string) {

    const token = await getUserToken()
    if (!token){
        throw new Error("you must be Logged in to do this action")
    }
    const response = await fetch(`${API_URL}/cart`, {
        method: "POST",
        body: JSON.stringify({productId : productId}),
        headers: {
            token : token,
            "Content-Type":"application/json"
        }
    });
    const data = await response.json()
    return data
}

export async function getLoggedUserCart() {

    const token = await getUserToken()
    if (!token){
        throw new Error("you are not authorized to do this action")
    }
    const response = await fetch(`${API_URL}/cart`, {
        headers: {
            token : token,
            "Content-Type":"application/json"
        }
    });
    const data = await response.json()
    return data
}

export async function deleteCartProduct(productId : string) {

    const token = await getUserToken()
    if (!token){
        throw new Error("you are not authorized to do this action")
    }
    const response = await fetch(`${API_URL}/cart/${productId}`, {
        method: "DELETE",
        headers: {
            token : token,
            "Content-Type":"application/json"
        }
    });
    const data = await response.json()
    return data
}


export async function clearUserCart() {

    const token = await getUserToken()
    if (!token){
        throw new Error("you are not authorized to do this action")
    }
    const response = await fetch(`${API_URL}/cart`, {
        method: "DELETE",
        headers: {
            token : token,
            "Content-Type":"application/json"
        }
    });
    const data = await response.json()
    return data
}


export async function updateCartProductCount(productId : string , newCount:number) {

    const token = await getUserToken()
    if (!token){
        throw new Error("you are not authorized to do this action")
    }
    const response = await fetch(`${API_URL}/cart/${productId}`, {
        method: "PUT",
        body: JSON.stringify({count:newCount}),
        headers: {
            token : token,
            "Content-Type":"application/json"
        }
    });
    const data = await response.json()
    return data
}