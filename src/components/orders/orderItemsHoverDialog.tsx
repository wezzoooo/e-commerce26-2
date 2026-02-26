"use client"

import Image from "next/image"
import { useState } from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

export default function OrderItemsHoverDialog({ items }: { items: any[] }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                    <Button
                        className="text-sm font-medium hover:underline"
                        onClick={() => setOpen(true)}
                    >
                        View Details
                    </Button>
                </HoverCardTrigger>

                <HoverCardContent className="w-80">
                    <div className="space-y-3 max-h-72 overflow-auto">
                        {items.map((item) => (
                            <div key={item._id} className="flex gap-3 items-start">
                                <Image
                                    src={item.product?.imageCover}
                                    alt={item.product?.title}
                                    width={50}
                                    height={50}
                                    className="rounded-md border"
                                />
                                <div className="flex-1">
                                    <p className="text-sm font-medium line-clamp-2">
                                        {item.product?.title}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>Qty: {item.count}</span>
                                        <span>•</span>
                                        <span>Total: {item.price * item.count} EGP</span>
                                    </div>
                                </div>
                                <Badge variant="secondary">{item.price} EGP</Badge>
                            </div>
                        ))}
                    </div>
                </HoverCardContent>
            </HoverCard>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
                    <DialogHeader>
                        <DialogTitle>Order Items</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item._id} className="flex items-center gap-4 border rounded-lg p-3">
                                <Image
                                    src={item.product?.imageCover}
                                    alt={item.product?.title}
                                    width={70}
                                    height={70}
                                    className="rounded-md border"
                                />
                                <div className="flex-1">
                                    <p className="font-medium line-clamp-2">{item.product?.title}</p>
                                    <div className="text-sm text-muted-foreground">Qty: {item.count}</div>
                                    <div className="text-sm">Total: {item.price * item.count} EGP</div>
                                </div>
                                <div className="text-sm font-semibold">{item.price} EGP / item</div>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}