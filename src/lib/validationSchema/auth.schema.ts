import * as z from "zod"


export const registerSchema = z.object({
    name: z.string().nonempty("name is Required").min(3, "name must be atleast 3 characters").max(15, "name must not exceed 15 characters"),
    email: z.email({ error: "Email is Required " }),
    password: z.string().nonempty("Password is Required").regex(/^\w{8,}$/, "Password must be atleast 8 characters"),
    rePassword: z.string().nonempty("RePassword is Required"),
    phone: z.string().nonempty("Phone is Required").regex(/^01[0125][0-9]{8}$/, "Phone Number must be Egyption")
}).refine((object) => object.password == object.rePassword, {
    path: ["rePassword"],
    error: "Repassword and password didnt match"
})

export type registerSchemaType = z.infer<typeof registerSchema>



export const loginSchema = z.object({
    email: z.email({ error: "Email is Required " }),
    password: z.string().nonempty("Password is Required").regex(/^\w{8,}$/, "Password must be atleast 8 characters"),
})

export type loginSchemaType = z.infer<typeof loginSchema>


export const forgotPasswordSchema = z.object({
    email: z.email({ error: "Email is Required" }),
})

export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>


export const verifyCodeSchema = z.object({
    resetCode: z.string().nonempty("Reset code is required").length(6, "Code must be 6 digits"),
})

export type verifyCodeSchemaType = z.infer<typeof verifyCodeSchema>


export const resetPasswordSchema = z.object({
    email: z.email({ error: "Email is Required" }),
    newPassword: z.string().regex(/^\w{8,}$/, "Password must be atleast 8 characters"),
})

export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>


