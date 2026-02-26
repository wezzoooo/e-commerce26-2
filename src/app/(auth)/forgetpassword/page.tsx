"use client"

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { forgotPasswordSchema, forgotPasswordSchemaType } from '@/lib/validationSchema/auth.schema'
import { forgotPassword } from '@/services/auth.services'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ForgotPassword() {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "all",
    defaultValues: { email: "" }
  })

  async function handelForgot(values: forgotPasswordSchemaType) {


    try {
      const response = await forgotPassword(values.email)

      if (response?.statusMsg === "success") {
        toast.success("Check your email for reset code")
        router.push("/verifycode")
      } else {
        toast.error(response?.message || "Something went wrong, try again")
      }
    } catch (error) {
      toast.error("Network error, please try again")
    }
  }

  return (
    <main>
      <div className="max-w-md sm:max-w-lg mx-auto px-4 mt-10 text-center">
        <div className="text-4xl sm:text-4xl font-bold">Forgot Password</div>
        <p className="text-gray-600 mt-2">
          Enter your email and we’ll send you a reset code.
        </p>

        <form onSubmit={form.handleSubmit(handelForgot)} className='max-w-4xl mx-auto my-8 space-y-6'>
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
          <div className="text-right">
            <Link href="/login" className="text-sm text-blue-500 underline">
              Back to Login
            </Link>
          </div>

          <Button className='w-full cursor-pointer h-12 text-base sm:text-lg' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Spinner /> : "Send Code"}
          </Button>
        </form>
      </div>
    </main>
  )
}
