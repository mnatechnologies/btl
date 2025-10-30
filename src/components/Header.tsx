'use client'
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Instagram, Twitter, Facebook, User, LogOut } from "lucide-react";
import CartButton from "./CartButton";
const Navigation = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <nav className='sticky top-0 w-full bg-black backdrop-blur-md border-b border-accent/20 shadow-sm z-40 '>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
                    {/* Logo */}
                    {/* BTL Logo */}
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
                        <Link href={'/'} className="text-white hover:text-brand-grey transition-colors font-medium">
                            Home
                        </Link>
                        <Link href={"/about"} className="text-white hover:text-brand-grey transition-colors font-medium">
                            About
                        </Link>
                        <Link href={"/contact"} className="text-white hover:text-brand-grey transition-colors font-medium">
                            Contact
                        </Link>
                    </div>

                    {/* Social Links & CTA */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-grey transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-grey transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-grey transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                        </div>
                        <div className="h-4 w-px bg-border"></div>
                        <Link href="/account" className="text-white hover:text-brand-grey transition-colors font-medium">Account</Link>
                        <CartButton />
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
                    <div className="md:hidden ">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link href="/" className="block px-3 py-2 text-white hover:text-brand-grey font-medium">
                                Home
                            </Link>
                            <Link href="/about" className="block px-3 py-2 text-white hover:text-brand-grey font-medium">
                                About
                            </Link>
                            <Link href="/account" className="block px-3 py-2 text-white hover:text-brand-grey font-medium">
                                Account
                            </Link>
                            <Link href="/cart" className="block px-3 py-2 text-white hover:text-brand-grey font-medium">
                                Cart
                            </Link>
                            <a href="/contact" className="block px-3 py-2 text-contact hover:text-brand-grey font-medium">
                                Contact
                            </a>
                            {/*<div className="px-3 pt-2 space-y-2">*/}
                            {/*    {authState.isAuthenticated ? (*/}
                            {/*        <div className="space-y-2">*/}
                            {/*            <Link*/}
                            {/*                to="/profile"*/}
                            {/*                className="block px-3 py-2 text-brand-charcoal hover:text-brand-grey font-medium"*/}
                            {/*            >*/}
                            {/*                Hello, {authState.user?.user_metadata?.firstName || 'User'}*/}
                            {/*            </Link>*/}
                            {/*            <Button*/}
                            {/*                variant="ghost"*/}
                            {/*                size="sm"*/}
                            {/*                className="w-full justify-start"*/}
                            {/*                onClick={logout}*/}
                            {/*            >*/}
                            {/*                <LogOut className="h-4 w-4 mr-2" />*/}
                            {/*                Sign Out*/}
                            {/*            </Button>*/}
                            {/*        </div>*/}
                            {/*    ) : (*/}
                            {/*        <Button*/}
                            {/*            variant="ghost"*/}
                            {/*            size="sm"*/}
                            {/*            className="w-full justify-start"*/}
                            {/*            onClick={() => setIsAuthModalOpen(true)}*/}
                            {/*        >*/}
                            {/*            <User className="h-4 w-4 mr-2" />*/}
                            {/*            Sign In*/}
                            {/*        </Button>*/}
                            {/*    )}*/}
                            {/*</div>*/}
                        </div>
                    </div>
                )}
            </div>

            {/*<AuthModal*/}
            {/*    isOpen={isAuthModalOpen}*/}
            {/*    onClose={() => setIsAuthModalOpen(false)}*/}
            {/*/>*/}
        </nav>
    );
};

export default Navigation;