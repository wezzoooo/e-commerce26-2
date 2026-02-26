"use client"

import { PasswordInput } from '@/components/showPasswordIcon/showPasswordIcon'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { loginSchema, loginSchemaType } from '@/lib/validationSchema/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'


export default function Login() {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    }
  })

  async function handelLogin(values: loginSchemaType) {


    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,


    })
    if (response?.ok) {
      toast.success("Logged In Successfully")
      router.push("/")
    } else {
      toast.error(response?.error)
    }

  }


  return (
    <>
      <main>
        <div className="max-w-md sm:max-w-lg mx-auto px-4 mt-10 text-center">
          <div className="text-4xl sm:text-4xl font-bold">Welcome to ShopMart</div>
          <p className="text-xl font-medium">Login Now!</p>
          <form onSubmit={form.handleSubmit(handelLogin)} className='max-w-4xl mx-auto my-8 space-y-6'>

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field >
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    type="email"
                    {...field}
                    id={field.name}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field >
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <PasswordInput
                    type="password"
                    {...field}
                    id={field.name}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <div className="flex items-center justify-between">
              <Link href="/forgetpassword" className="text-blue-500 underline text-sm">
                Forgot your password?
              </Link>
              <Link href="/register" className="text-blue-500 underline text-sm">
                Register Now..!
              </Link>
            </div>
            <Button className='w-full cursor-pointer h-12 text-base sm:text-lg'>
              {form.formState.isSubmitting ? <Spinner /> : "Login"}
            </Button>
          </form>
        </div>
      </main>
    </>
  )
}
