const API_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function changeMyPassword(token: string, body: {
    currentPassword: string
    password: string
    rePassword: string
}) {
    if (!token) throw new Error("User not authenticated")
    const response = await fetch(`${API_URL}/users/changeMyPassword`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            token
        }
    })

    let data
    try {
        data = await response.json()
    } catch (err) {
        throw new Error("Server returned invalid response")
    }
    if (!response.ok) throw new Error(data?.message || "Failed to change password")
    return data
}

export async function updateMe(token: string, body: {
    name: string
    email: string
    phone: string
}) {
    if (!token) throw new Error("User not authenticated")

    const response = await fetch(`${API_URL}/users/updateMe/`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            token
        }
    })

    let data
    try {
        data = await response.json()
    } catch (err) {
        throw new Error("Server returned invalid response")
    }

    if (!response.ok) throw new Error(data?.message || JSON.stringify(data) || "Failed to update profile")

    return data
}

