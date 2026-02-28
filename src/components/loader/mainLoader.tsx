"use client"

import { Spinner } from "@/components/ui/spinner"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function MainLoader() {
    return (
        <div className="flex items-center justify-center h-screen bg-background transition-all duration-300 animate-in fade-in zoom-in">            
        <div className="relative flex items-center justify-center">
            <Spinner className="h-24 w-24 text-foreground" />

            <div className="absolute transition-transform duration-300 ease-out animate-pulse">
                <Avatar className="h-10 w-10 rounded-lg">
                    <AvatarFallback
                        className="font-bold text-2xl rounded-lg bg-black text-white dark:bg-white dark:text-black transition-colors duration-300"
                    >
                        S
                    </AvatarFallback>
                </Avatar>
            </div>
        </div>
        </div>
    )
}