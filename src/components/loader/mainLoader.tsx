"use client"

import { Spinner } from "@/components/ui/spinner"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function MainLoader() {
    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="relative flex items-center justify-center">
                <Spinner className="h-24 w-24" />

                <div className="absolute">
                    <Avatar className="h-10 w-10 rounded-lg">
                        <AvatarFallback className="font-bold text-2xl rounded-lg bg-black text-white">
                            S
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    )
}