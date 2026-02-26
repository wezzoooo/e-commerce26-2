export const API_URL = process.env.NEXT_PUBLIC_BASE_URL


export async function getAllBrands() {
    const response = await fetch(`${API_URL}/brands`);
    const data = await response.json()
    return data
}

export async function getSpecificBrand(id : string ) {
    const response = await fetch(`${API_URL}/brands/${id}`);
    const data = await response.json()
    return data
}

