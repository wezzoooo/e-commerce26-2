'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface CategoryLinkProps {
    categoryId: string
    children: React.ReactNode
}

export default function CategoryLink({ categoryId, children }: CategoryLinkProps) {
    const router = useRouter()


    return (
        <span
            className="hover:text-blue-500 hover:underline cursor-pointer"
            onClick={()=>router.push(`/categories/${categoryId}`)}
        >
            {children}
        </span>
    )
}
