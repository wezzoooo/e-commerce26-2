"use client"

import { PasswordInput } from '@/components/showPasswordIcon/showPasswordIcon'
import { Button } from '@/components/ui/button'
import { Field,  FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { registerSchema, registerSchemaType } from '@/lib/validationSchema/auth.schema'
import { signUpUser } from '@/services/auth.services'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'


export default function Register() {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    }
  })

  async function handelRegister(values: registerSchemaType) {

    console.log(values);
    const response = await signUpUser(values);
    console.log(response);

    if (response.message == "success") {
      toast.success("Registered Successfully")
      router.push("/login")
    }else{
      toast.error(response.message)
    }
    
    
  }


  return (
    <>
      <main>
        <div className="max-w-md sm:max-w-lg mx-auto px-4 mt-10 text-center">
          <div className="text-4xl sm:text-4xl font-bold">Welcome to ShopMart</div>
          <p className="text-xl font-medium">Register Now!</p>
          <form onSubmit={form.handleSubmit(handelRegister)} className='max-w-4xl mx-auto my-8 space-y-6'>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field >
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    type="text"
                    {...field}
                    id={field.name}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}

                </Field>
              )}
            />
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
                  {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
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
                  {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                </Field>
              )}
            />
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field >
                  <FieldLabel htmlFor={field.name}>RePassword</FieldLabel>
                  <PasswordInput
                    type="password"
                    {...field}
                    id={field.name}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field >
                  <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                  <Input
                    type="tel"
                    {...field}
                    id={field.name}
                  
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                </Field>
              )}
            />
            <div className="text-left">
              <Link href="/login" className="text-blue-500 underline text-sm">
                You have account..?!
              </Link>
            </div>
            <Button className='w-full cursor-pointer h-12 text-base sm:text-lg'>
              {form.formState.isSubmitting? <Spinner /> : "Register"}
            </Button>
          </form>
        </div>
      </main>
    </>
  )
}
