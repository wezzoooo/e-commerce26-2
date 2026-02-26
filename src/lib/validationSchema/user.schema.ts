import * as z from "zod"



export const changePasswordSchema = z.object({
    currentPassword: z.string().nonempty("Current password is required"),
    password: z.string().regex(/^\w{8,}$/, "Password must be atleast 8 characters"),
    rePassword: z.string(),
}).refine((obj) => obj.password === obj.rePassword, {
    path: ["rePassword"],
    error: "Passwords do not match"
})

export type changePasswordSchemaType = z.infer<typeof changePasswordSchema>


export const updateProfileSchema = z.object({
    name: z.string().min(3).max(15),
    email: z.email(),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Phone Number must be Egyption"),
})

export type updateProfileSchemaType = z.infer<typeof updateProfileSchema>
