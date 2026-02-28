"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import {
    searchProducts,
    searchCategories,
    searchSubCategories,
    searchBrands,
} from "@/app/_actions/search.action"
import { X } from "lucide-react"

export default function NavSearch({ onClose }: { onClose?: () => void }) {
    const [q, setQ] = useState("")
    const [loading, setLoading] = useState(false)

    const [products, setProducts] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [subCategories, setSubCategories] = useState<any[]>([])
    const [brands, setBrands] = useState<any[]>([])

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClose?.()
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [onClose])

    useEffect(() => {
        function handleEsc(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onClose?.()
            }
        }
        document.addEventListener("keydown", handleEsc)
        return () => document.removeEventListener("keydown", handleEsc)
    }, [onClose])

    useEffect(() => {
        if (!q) {
            setProducts([])
            setCategories([])
            setSubCategories([])
            setBrands([])
            return
        }

        const timeout = setTimeout(async () => {
            try {
                setLoading(true)
                const [p, c, s, b] = await Promise.all([
                    searchProducts(q),
                    searchCategories(q),
                    searchSubCategories(q),
                    searchBrands(q),
                ])

                setProducts(p)
                setCategories(c)
                setSubCategories(s)
                setBrands(b)
            } finally {
                setLoading(false)
            }
        }, 400)

        return () => clearTimeout(timeout)
    }, [q])

    const totalResults =
        products.length + categories.length + subCategories.length + brands.length

    return (
        <div ref={ref} className="relative w-full max-w-md mx-auto">
            <Input
                autoFocus
                placeholder="Search anything..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="pr-14"
            />

            {q && (
                <button
                    onClick={() => {
                        setQ("")
                        setProducts([])
                        setCategories([])
                        setSubCategories([])
                        setBrands([])
                    }}
                    className=" absolute right-2 top-2  text-muted-foreground  hover:text-foreground transition-colors">
                    <X className="size-5" />
                </button>
            )}

            {/* Spinner */}
            {loading && (
                <div className="absolute right-9 top-2">
                    <Spinner />
                </div>
            )}

            {/* Results Dialog */}
            {(q || loading) && (
                <div
                    className=" absolute mt-2 w-full  rounded-xl border shadow-xl bg-popover text-popover-foreground transition-all duration-200 ease-out animate-in fade-in-0 zoom-in-95 z-50 "
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-3 py-2 border-b text-sm text-muted-foreground">
                        <span>Results</span>
                        <span>{loading ? "Searching..." : `${totalResults} results`}</span>
                    </div>

                    {/* Body */}
                    <div className="max-h-72 overflow-y-auto p-3 space-y-3">
                        {!loading && totalResults === 0 && (
                            <p className="text-sm text-muted-foreground text-center">
                                No results found
                            </p>
                        )}

                        {!!products.length && (
                            <div>
                                <p className="font-semibold text-sm mb-1">Products</p>
                                {products.map((p) => (
                                    <Link
                                        key={p._id}
                                        href={`/products/${p._id}`}
                                        onClick={() => onClose?.()}
                                        className=" block text-sm rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground transition-colors ">
                                        {p.title}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {!!categories.length && (
                            <div>
                                <p className="font-semibold text-sm mb-1">Categories</p>
                                {categories.map((c) => (
                                    <Link
                                        key={c._id}
                                        href={`/categories/${c._id}`}
                                        onClick={() => onClose?.()}
                                        className=" block text-sm rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground transition-colors ">
                                        {c.name}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {!!subCategories.length && (
                            <div>
                                <p className="font-semibold text-sm mb-1">SubCategories</p>
                                {subCategories.map((s) => (
                                    <Link
                                        key={s._id}
                                        href={`/subcategories/${s._id}`}
                                        onClick={() => onClose?.()}
                                        className=" block text-sm rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground transition-colors">
                                        {s.name}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {!!brands.length && (
                            <div>
                                <p className="font-semibold text-sm mb-1">Brands</p>
                                {brands.map((b) => (
                                    <Link
                                        key={b._id}
                                        href={`/brands/${b._id}`}
                                        onClick={() => onClose?.()}
                                        className=" block text-sm rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground transition-colors">
                                        {b.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}