"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { checkoutSchema, CheckoutSchemaType } from "@/lib/validationSchema/checkout.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Spinner } from "../ui/spinner"
import { checkoutCashSession, checkoutOnlineSession } from "@/app/_actions/checkout.action"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function CheckoutDialog({ cartId, onCashSuccess }: { cartId: string; onCashSuccess: () => Promise<void> }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [paymentLoading, setPaymentLoading] = useState<null | "online" | "cash">(null)
    const router = useRouter()

    const checkoutForm = useForm<CheckoutSchemaType>({
        resolver: zodResolver(checkoutSchema),
        mode: "all",
        defaultValues: {
            shippingAddress: {
                city: "",
                details: "",
                phone: ""
            }
        }
    })


    async function handleOnlineCheckout(cartId: string, values: CheckoutSchemaType) {

        try {
            setPaymentLoading("online")
            const data = await checkoutOnlineSession(cartId, values)

            if (data.status == "success") {
                checkoutForm.reset()
                window.location.href = data.session.url
            } else {
                toast.error(data.message || "Something went wrong")
                setPaymentLoading(null)
            }
        } catch (error: any) {
            toast.error(error?.message || "Network error, try again")
            setPaymentLoading(null)
        }
    }


    async function handleCashCheckout(cartId: string, values: CheckoutSchemaType) {
        try {
            setPaymentLoading("cash")
            const response = await checkoutCashSession(cartId, values)

            if (response.status === "success") {
                toast.success("Order placed successfully!")
                await onCashSuccess()
                checkoutForm.reset()
                setIsDialogOpen(false)
                router.push("/allorders")
            } else {
                toast.error(response.message || "Something went wrong")
                setPaymentLoading(null)
            }
        } catch (error: any) {
            toast.error(error?.message || "Network error, try again")
            setPaymentLoading(null)
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>

            <DialogTrigger asChild>
                <Button variant={'outline'} className='w-full text-lg mt-4'>Proceed to Checkout</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Checkout</DialogTitle>
                    <DialogDescription>
                        Add a shipping address for your deliveries
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={checkoutForm.handleSubmit((values) => handleOnlineCheckout(cartId, values))}
                    className="space-y-4"
                >
                    <Controller
                        name="shippingAddress.city"
                        control={checkoutForm.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}>your city :</FieldLabel>
                                <Input {...field} id={field.name} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="shippingAddress.details"
                        control={checkoutForm.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}>your address details :</FieldLabel>
                                <Input {...field} id={field.name} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="shippingAddress.phone"
                        control={checkoutForm.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}>your Phone number :</FieldLabel>
                                <Input type="tel" {...field} id={field.name} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <DialogFooter className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Online Checkout */}
                        <Button
                            type="button"
                            className="w-full"
                            disabled={paymentLoading !== null}
                            onClick={checkoutForm.handleSubmit((values) => handleOnlineCheckout(cartId, values))}
                        >
                            {(checkoutForm.formState.isSubmitting && paymentLoading === "online")? <Spinner /> : "Online Checkout"}
                        </Button>

                        {/* Cash Checkout */}
                        <Button
                            type="button"
                            className="w-full"
                            disabled={paymentLoading !== null}
                            onClick={checkoutForm.handleSubmit((values) => handleCashCheckout(cartId, values))}
                        >
                            {(checkoutForm.formState.isSubmitting && paymentLoading === "cash")? <Spinner /> : "Cash Checkout"}
                        </Button>

                        {/* Cancel */}
                        <DialogClose asChild className=" hover:text-red-500">
                            <Button variant="outline" className="sm:col-span-2">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
