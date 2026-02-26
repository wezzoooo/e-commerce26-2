"use client"

import Link from 'next/link'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet"
import { ShoppingCart, User, Heart, Search, Menu } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { Badge } from '../ui/badge'
import { useContext, useState } from 'react'
import { cartContext } from '@/providers/cart-provider'
import { Spinner } from '../ui/spinner'
import { wishlistContext } from '@/providers/wishlist-provider'
import NavSearch from '../navSearch/navSearch'

export default function Navbar() {
    const { data: session, status } = useSession()
    const { noOfCartItems, isLoading } = useContext(cartContext)
    const { noOfWishlistItems, isLoading: isWishlistLoading } = useContext(wishlistContext)

    const [showSearch, setShowSearch] = useState(false)


    async function logOutUser() {
        await signOut({ callbackUrl: "/login" })
    }

    const navLinks = [
        { name: 'Products', href: '/products' },
        { name: 'Brands', href: '/brands' },
        { name: 'Categories', href: '/categories' },
    ]

    return (
        <nav className='bg-[#F5F5F5E5] sticky top-0 z-50 border-b'>
            <div className="max-w-7xl mx-auto p-5 flex items-center justify-between">

                <div className="nav-logo flex gap-2 items-center">
                    <Avatar className='rounded-lg'>
                        <AvatarFallback className='font-bold text-xl rounded-lg bg-black text-white'>S</AvatarFallback>
                    </Avatar>
                    <Link className='font-bold text-2xl' href="/">ShopMart</Link>
                </div>

                <div className="nav-links hidden md:block">
                    <NavigationMenu className='gap-2 list-none flex'>
                        {navLinks.map((link) => (
                            <NavigationMenuItem key={link.href}>
                                <NavigationMenuLink asChild>
                                    <Link href={link.href} className='hover:bg-black hover:text-white px-3 py-2 rounded-md transition-colors'>
                                        {link.name}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenu>
                </div>

                <div className="nav-actions flex gap-3 items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <User className='size-6 cursor-pointer' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40" align="end">
                            <DropdownMenuGroup>
                                {session ? (
                                    <>
                                        <DropdownMenuItem asChild>
                                            <Link href='/profile'>Profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href='/allorders'>Your Orders</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={logOutUser} className="text-red-500 cursor-pointer">
                                            Log out
                                        </DropdownMenuItem>
                                    </>
                                ) : (
                                    <>
                                        <DropdownMenuItem asChild>
                                            <Link href='/login'>Login</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href='/register'>Register</Link>
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {status === "authenticated" && (
                        <>
                            <Link href="/cart">
                                <div className='relative inline-flex items-center'>
                                    <ShoppingCart className="size-6" />
                                    <Badge className='absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5'>
                                        {isLoading ? <Spinner className="size-3" /> : noOfCartItems}
                                    </Badge>
                                </div>
                            </Link>

                            <Link href="/wishlist">
                                <div className="relative inline-flex items-center">
                                    <Heart className='size-6 text-red-500' />
                                    <Badge className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 bg-red-500">
                                        {isWishlistLoading ? <Spinner className="size-3" /> : noOfWishlistItems}
                                    </Badge>
                                </div>
                            </Link>
                        </>
                    )}

                    <button onClick={() => setShowSearch(prev => !prev)} className="hidden md:block">
                        <Search className="size-6 cursor-pointer" />
                    </button>
                    <div
                        className={`absolute left-0 right-0 top-full bg-white shadow-md p-4 
                            hidden md:block
                            transition-all duration-300 ease-out
                            ${showSearch ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"}`}
                    >
                        <NavSearch onClose={() => setShowSearch(false)} />
                    </div>

                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="md:hidden">
                                <Menu className="size-6" />
                            </button>
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="md:hidden w-[85%] max-w-sm bg-white p-4 shadow-xl"
                        >
                            <div className="space-y-4 mt-12">
                                <NavSearch />

                                <div className="flex flex-col gap-1">
                                    {navLinks.map((link) => (
                                        <SheetClose asChild key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-left p-3 rounded-md hover:bg-black hover:text-white transition-colors font-medium"
                                            >
                                                {link.name}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

        </nav >
    )
}