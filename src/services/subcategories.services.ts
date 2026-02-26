
export const API_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function getAllSubCategories(){
    const response = await fetch(`${API_URL}/subcategories`)
    const data = await response.json()

    return data
}

export async function getSpecificSubCategory(id:string) {
    const response = await fetch(`${API_URL}/subcategories/${id}`)
    const data = await response.json()

    return data
}

export async function getSubCategoriesOnCategory(CategoryId:string) {
    const response = await fetch(`${API_URL}/categories/${CategoryId}/subcategories`)
    const data = await response.json()
    return data
    
}