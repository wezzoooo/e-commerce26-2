"use client"

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { verifyCodeSchema, verifyCodeSchemaType } from '@/lib/validationSchema/auth.schema'
import { verifyResetCode } from '@/services/auth.services'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function VerifyCode() {
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(verifyCodeSchema),
        mode: "all",
        defaultValues: { resetCode: "" }
    })

    async function handelVerify(values: verifyCodeSchemaType) {
        try {
            const response = await verifyResetCode(values.resetCode)

            if (response.status === "Success") {
                toast.success("Code verified successfully")
                router.push("/resetpassword")
            } else {
                toast.error(response.message|| "Something went wrong, try again")
            }
        } catch (error) {
            toast.error("Network error, please try again")
        }
    }

    return (
        <main>
            <div className="max-w-md sm:max-w-lg mx-auto px-4 mt-10 text-center">
                <div className="text-4xl sm:text-4xl font-bold">Verify Code</div>

                <form onSubmit={form.handleSubmit(handelVerify)} className='max-w-4xl mx-auto my-8 space-y-6'>
                    <Controller
                        name="resetCode"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}>Reset Code</FieldLabel>
                                <Input {...field} id={field.name} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Button className='w-full cursor-pointer h-12 text-base sm:text-lg'>
                        {form.formState.isSubmitting ? <Spinner /> : "Verify"}
                    </Button>
                </form>
            </div>
        </main>
    )
}
