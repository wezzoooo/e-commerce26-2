import * as z from "zod"

export const checkoutSchema = z.object({
    shippingAddress: z.object({
        city: z.string().min(3, "City must be at least 3 characters").max(15, "City must be less than 15 characters").nonempty("City is required"),

        details: z.string().min(10, "Address details must be at least 10 characters").nonempty("Address details is required"),

        phone: z.string().regex(/^01[0125][0-9]{8}$/, "Phone number must be a valid Egyptian number"),
    }),
})

export type CheckoutSchemaType = z.infer<typeof checkoutSchema>