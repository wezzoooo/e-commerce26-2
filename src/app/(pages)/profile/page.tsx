"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    updateProfileSchema,
    updateProfileSchemaType,
    changePasswordSchema,
    changePasswordSchemaType,
} from "@/lib/validationSchema/user.schema"
import { updateMe, changeMyPassword } from "@/services/user.services"
import { PasswordInput } from "@/components/showPasswordIcon/showPasswordIcon"

export default function Profile() {
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
    const { data: session } = useSession()
    const token = session?.token


    const updateForm = useForm({
        resolver: zodResolver(updateProfileSchema),
        mode: "all",
        defaultValues: { name: "", email: "", phone: "" },
    })

    const passwordForm = useForm({
        resolver: zodResolver(changePasswordSchema),
        mode: "all",
        defaultValues: { currentPassword: "", password: "", rePassword: "" },
    })

    async function handelUpdateProfile(values: updateProfileSchemaType) {
        if (!token) return toast.error("User not authenticated")

        try {
            const response = await updateMe(token, values)
            toast.success("Profile updated successfully")
            updateForm.reset()
            setIsUpdateProfileOpen(false)
        } catch (error: any) {
            toast.error(error?.message || "Failed to update profile")
        }
    }

    async function handelChangePassword(values: changePasswordSchemaType) {
        if (!token) return toast.error("User not authenticated")

        try {
            const response = await changeMyPassword(token, values)

            toast.success("Password updated successfully")
            passwordForm.reset()
            setIsChangePasswordOpen(false)
        } catch (error: any) {
            toast.error(error?.message || "Network error, try again")
        }
    }

    return (
        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 my-5 px-4">
                <section className="lg:col-span-2 order-2 lg:order-1">
                    <div className="border rounded-xl p-10 mt-10 space-y-6 shadow-sm">
                        <h2 className="text-3xl font-bold mb-4">{`Welcome to Your Profile ${session?.user?.name}`}</h2>

                        <div className="flex items-center justify-center flex-wrap ">
                            <div className="w-full mb-3">
                                <p className="text-muted-foreground text-sm">Name</p>
                                <p className="font-semibold text-lg">{session?.user?.name}</p>
                            </div>

                            <div className="w-full mb-3">
                                <p className="text-muted-foreground text-sm">Email</p>
                                <p className="font-semibold text-lg">{session?.user?.email}</p>
                            </div>
                        </div>
                        <div className="mt-6 p-5 rounded-lg bg-muted">
                            <p className="font-medium">
                                You can update your profile data or change your password from the sidebar.
                            </p>
                        </div>
                    </div>
                </section>
                {/* Sidebar */}
                <aside className="w-full lg:w-64 order-2 lg:order-2 border rounded-xl p-5 flex flex-col gap-4 items-center justify-center">
                    <Dialog open={isUpdateProfileOpen} onOpenChange={setIsUpdateProfileOpen}>
                        <DialogTrigger asChild>
                            <Button className="w-full">Update Profile</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Update Profile</DialogTitle>
                            </DialogHeader>
                            <form
                                onSubmit={updateForm.handleSubmit(handelUpdateProfile)}
                                className="space-y-4 mt-4"
                            >
                                <Controller
                                    name="name"
                                    control={updateForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                            <Input {...field} id={field.name} />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="email"
                                    control={updateForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                            <Input type="email" {...field} id={field.name} />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="phone"
                                    control={updateForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                                            <Input type="tel" {...field} id={field.name} />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Button type="submit" className="w-full">
                                    {updateForm.formState.isSubmitting ? <Spinner /> : "Update Profile"}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
                        <DialogTrigger asChild>
                            <Button className="w-full">Change Password</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Change Password</DialogTitle>
                            </DialogHeader>
                            <form
                                onSubmit={passwordForm.handleSubmit(handelChangePassword)}
                                className="space-y-4 mt-4"
                            >
                                <Controller
                                    name="currentPassword"
                                    control={passwordForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
                                            <PasswordInput type="password" {...field} id={field.name} />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="password"
                                    control={passwordForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                                            <PasswordInput type="password" {...field} id={field.name} />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="rePassword"
                                    control={passwordForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>Re-enter Password</FieldLabel>
                                            <PasswordInput type="password" {...field} id={field.name} />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Button type="submit" className="w-full">
                                    {passwordForm.formState.isSubmitting ? <Spinner /> : "Change Password"}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </aside>
        </main>
    )
}
