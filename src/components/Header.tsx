'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, UserRound, } from "lucide-react";
import CartButton from "./CartButton";
import CartDrawer from "./CartDrawer";
import { supabase } from '@/lib/supabaseClient';

const Navigation = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Determine auth state to set dynamic hover text for account icon
    useEffect(() => {
        let mounted = true;
        supabase.auth.getUser().then(({ data }) => {
            if (!mounted) return;
            setIsLoggedIn(!!data.user);
        });
        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session?.user);
        });
        return () => {
            mounted = false;
            sub.subscription.unsubscribe();
        };
    }, []);

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
                    <div className="hidden md:flex items-center space-x-12">
                        <Link href={"/store"} className="text-white hover:text-brand-grey transition-colors font-medium text-2xl">
                            Shop
                        </Link>
                        <Link href={"/about"} className="text-white hover:text-brand-grey transition-colors font-medium text-2xl">
                            About
                        </Link>
                        <Link href={"/contact"} className="text-white hover:text-brand-grey transition-colors font-medium text-2xl">
                            Contact
                        </Link>
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            href="/account"
                            className="text-white hover:text-brand-grey transition-colors font-medium"
                            title={isLoggedIn ? 'My account' : 'Log in'}
                            aria-label={isLoggedIn ? 'My account' : 'Log in'}
                        >
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
                            <Link href="/store" className="block px-3 py-2 text-white hover:text-brand-grey font-medium text-2xl">
                                Store
                            </Link>
                            <Link href="/about" className="block px-3 py-2 text-white hover:text-brand-grey font-medium text-2xl">
                                About
                            </Link>
                            <Link href="/contact" className="block px-3 py-2 text-white hover:text-brand-grey font-medium text-2xl">
                                Contact
                            </Link>
                            <Link href="/account" className="block px-3 py-2 text-white hover:text-brand-grey font-medium text-2xl">
                                Account
                            </Link>
                            <button 
                                onClick={() => setIsCartOpen(true)}
                                className="block w-full text-left px-3 py-2 text-white hover:text-brand-grey font-medium text-2xl"
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