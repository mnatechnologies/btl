'use client'
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, UserRound, } from "lucide-react";
import CartButton from "./CartButton";
import CartDrawer from "./CartDrawer";
import { SiTiktok, SiInstagram } from '@icons-pack/react-simple-icons';

const Navigation = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <>
        <nav className='sticky top-0 w-full bg-black backdrop-blur-md border-b border-accent/20 shadow-sm z-40'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href={'/'} className="hover-scale">
                            <Image
                                src='/images/btl-logo-white.jpg'
                                alt="Built To Last - Premium Clothing"
                                width={300}
                                height={80}
                                className="h-12 sm:h-14 lg:h-16 w-auto cursor-pointer"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href={"/store"} className="text-white hover:text-brand-grey transition-colors font-medium">
                            Store
                        </Link>
                        <Link href={"/about"} className="text-white hover:text-brand-grey transition-colors font-medium">
                            About
                        </Link>
                        <Link href={"/contact"} className="text-white hover:text-brand-grey transition-colors font-medium">
                            Contact
                        </Link>
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex items-center space-x-4 ">
                            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-grey transition-colors">
                                <SiInstagram  className="h-5 w-5" />
                            </Link>
                            <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-grey transition-colors">
                                <SiTiktok className="h-5 w-5" />
                            </Link>
                        </div>
                        <Link href="/account" className="text-white hover:text-brand-grey transition-colors font-medium">
                            <UserRound className="h-5 w-5" />
                        </Link>
                        <CartButton onClick={() => setIsCartOpen(true)} />
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden ">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-5 w-5 cursor-pointer" /> : <Menu className="h-5 w-5 cursor-pointer" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link href="/store" className="block px-3 py-2 text-white hover:text-brand-grey font-medium">
                                Store
                            </Link>
                            <Link href="/about" className="block px-3 py-2 text-white hover:text-brand-grey font-medium">
                                About
                            </Link>
                            <Link href="/contact" className="block px-3 py-2 text-white hover:text-brand-grey font-medium">
                                Contact
                            </Link>
                            <Link href="/account" className="block px-3 py-2 text-white hover:text-brand-grey font-medium">
                                Account
                            </Link>
                            <button 
                                onClick={() => setIsCartOpen(true)}
                                className="block w-full text-left px-3 py-2 text-white hover:text-brand-grey font-medium"
                            >
                                Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Navigation;