import { BrandI } from "./Brands"
import { CategoryI,  } from "./categories"
import { SubCategoryI } from "./subcategories"

export interface ProductI {
  sold: number
  images: string[]
  subcategory: SubCategoryI[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: CategoryI
  brand: BrandI
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
}

export interface ProductIdType {
    productId: string
}



