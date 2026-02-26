import { ProductI } from "./product"

export interface WishlistI {
    status: string
    count: number
    data: ProductI[]
}