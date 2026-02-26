"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-lg text-muted-foreground mb-6">
                Oops! The page you’re looking for doesn’t exist.
            </p>

            <div className="flex gap-3">
                <Link href="/" passHref>
                    <Button>Go to Home</Button>
                </Link>
            </div>
        </div>
    )
}