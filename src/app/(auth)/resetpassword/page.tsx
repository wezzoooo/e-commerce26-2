"use client"

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { resetPasswordSchema, resetPasswordSchemaType } from '@/lib/validationSchema/auth.schema'
import { resetPassword } from '@/services/auth.services'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { PasswordInput } from '@/components/showPasswordIcon/showPasswordIcon'

export default function ResetPassword() {
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(resetPasswordSchema),
        mode: "all",
        defaultValues: {
            email: "",
            newPassword: ""
        }
    })

    async function handelReset(values: resetPasswordSchemaType) {
        const response = await resetPassword(values.email, values.newPassword)

        if (response.token) {
            toast.success("Password reset successfully")
            router.push("/login")
        } else {
            toast.error(response.message)
        }
    }

    return (
        <main>
            <div className="max-w-md sm:max-w-lg mx-auto px-4 mt-10 text-center">
                <div className="text-4xl sm:text-4xl font-bold">Reset Password</div>

                <form onSubmit={form.handleSubmit(handelReset)} className='max-w-4xl mx-auto my-8 space-y-6'>
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                <Input type="email" {...field} id={field.name} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="newPassword"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                                <PasswordInput type="password" {...field} id={field.name} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Button className='w-full cursor-pointer h-12 text-base sm:text-lg'>
                        {form.formState.isSubmitting ? <Spinner /> : "Reset Password"}
                    </Button>
                </form>
            </div>
        </main>
    )
}
