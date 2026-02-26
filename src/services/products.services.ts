export const API_URL = process.env.NEXT_PUBLIC_BASE_URL


export async function getAllProducts() {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json()
    return data
}

export async function getSpecificProduct(id : string ) {
    const response = await fetch(`${API_URL}/products/${id}`);
    const data = await response.json()
    return data
}

