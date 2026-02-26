import { getAllProducts } from "@/services/products.services"
import { getAllCategories } from "@/services/categories.services"
import { getAllSubCategories } from "@/services/subcategories.services"
import { getAllBrands } from "@/services/brands.services"

export async function searchProducts(q: string) {
    const { data } = await getAllProducts()
    return data.filter((p: any) =>
        p.title.toLowerCase().includes(q.toLowerCase())
    )
}

export async function searchCategories(q: string) {
    const { data } = await getAllCategories()
    return data.filter((c: any) =>
        c.name.toLowerCase().includes(q.toLowerCase())
    )
}

export async function searchSubCategories(q: string) {
    const { data } = await getAllSubCategories()
    return data.filter((s: any) =>
        s.name.toLowerCase().includes(q.toLowerCase())
    )
}

export async function searchBrands(q: string) {
    const { data } = await getAllBrands()
    return data.filter((b: any) =>
        b.name.toLowerCase().includes(q.toLowerCase())
    )
}