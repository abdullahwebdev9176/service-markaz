'use client'
import React, { useState } from 'react'
import { Menu, X, Layers, Plus, MapPin, LogIn } from 'lucide-react'
import Link from 'next/link'
import { images } from '@/data/assets'
import Image from 'next/image'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <>
            <header className="bg-white shadow-md sticky top-0 z-50">
                <nav className="flex flex-wrap items-center justify-between w-full py-4 px-4 md:px-8">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" onClick={closeMenu}>
                            <Image src={images.official_logo} alt="Official Logo" width={100} height={50} />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-purple-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center">
                        <ul className="flex gap-2">
                            <li>
                                <Link
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-purple-500 transition-colors rounded-lg hover:bg-purple-50"
                                    href="/categories"
                                >
                                    <Layers size={18} />
                                    <span>Categories</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-purple-500 transition-colors rounded-lg hover:bg-purple-50"
                                    href="/add-business"
                                >
                                    <Plus size={18} />
                                    <span>Add Business</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-purple-500 transition-colors rounded-lg hover:bg-purple-50"
                                    href="/cities"
                                >
                                    <MapPin size={18} />
                                    <span>Cities</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="flex items-center gap-2 px-4 py-2 text-white bg-purple-500 hover:bg-purple-600 transition-colors rounded-lg font-medium"
                                    href="/sign-up"
                                >
                                    <LogIn size={18} />
                                    <span>Sign Up</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Navigation Menu */}
                    {isMenuOpen && (
                        <div className="w-full md:hidden bg-white border-t border-gray-200 mt-4">
                            <ul className="flex flex-col">
                                <li>
                                    <Link
                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-purple-500 hover:bg-purple-50 transition-colors border-b border-gray-100"
                                        href="/categories"
                                        onClick={closeMenu}
                                    >
                                        <Layers size={20} />
                                        <span className="font-medium">Categories</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-purple-500 hover:bg-purple-50 transition-colors border-b border-gray-100"
                                        href="/add-business"
                                        onClick={closeMenu}
                                    >
                                        <Plus size={20} />
                                        <span className="font-medium">Add Business</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-purple-500 hover:bg-purple-50 transition-colors border-b border-gray-100"
                                        href="/cities"
                                        onClick={closeMenu}
                                    >
                                        <MapPin size={20} />
                                        <span className="font-medium">Cities</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="flex items-center gap-3 px-4 py-3 m-3 text-white bg-purple-500 hover:bg-purple-600 transition-colors rounded-lg font-medium justify-center"
                                        href="/sign-up"
                                        onClick={closeMenu}
                                    >
                                        <LogIn size={20} />
                                        <span>Sign Up</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </nav>
            </header>
        </>
    )
}

export default Navbar