import { loginSchemaType } from './../lib/validationSchema/auth.schema';
import { registerSchemaType } from "@/lib/validationSchema/auth.schema";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL




export async function signUpUser(formdata: registerSchemaType) {
    const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(formdata),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json()
    return data
}

export async function signInUser(formdata: loginSchemaType) {
    const response = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        body: JSON.stringify(formdata),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json()
    return data
}


export async function forgotPassword(email: string) {
    const response = await fetch(`${API_URL}/auth/forgotPasswords`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = await response.json()
    return data
}

export async function verifyResetCode(resetCode: string) {
    const response = await fetch(`${API_URL}/auth/verifyResetCode`, {
        method: "POST",
        body: JSON.stringify({ resetCode }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = await response.json()
    return data
}

export async function resetPassword(email: string, newPassword: string) {
    const response = await fetch(`${API_URL}/auth/resetPassword`, {
        method: "PUT",
        body: JSON.stringify({ email, newPassword }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = await response.json()
    return data
}
