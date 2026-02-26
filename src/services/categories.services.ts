export const API_URL = process.env.NEXT_PUBLIC_BASE_URL


export async function getAllCategories() {
    const response = await fetch(`${API_URL}/categories`);
    const data = await response.json()
    return data
}

export async function getSpecificCategory(id : string ) {
    const response = await fetch(`${API_URL}/categories/${id}`);
    const data = await response.json()
    return data
}

