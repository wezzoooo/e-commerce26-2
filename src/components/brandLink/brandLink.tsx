'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface BrandLinkProps {
    brandId: string
    children: React.ReactNode
}

export default function BrandLink({ brandId, children }: BrandLinkProps) {
    const router = useRouter()

    return (
        <span
            className="hover:text-blue-500 hover:underline cursor-pointer"
            onClick={() => router.push(`/brands/${brandId}`)}
        >
            {children}
        </span>
    )
}
