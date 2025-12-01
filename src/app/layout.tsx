import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WelcomeOffer from "../components/WelcomeOffer";
import LaunchGate from "../components/LaunchGate";
import Providers from "./providers";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: 'Built To Last | Premium Quality Essentials',
  description: 'Premium quality essentials designed for those who value craftsmanship and timeless style. Australian-made clothing built to last.',
  keywords: ['clothing', 'premium', 'Australian', 'quality', 'essentials', 'fashion'],
  openGraph: {
    title: 'Built To Last',
    description: 'Premium quality essentials designed for those who value craftsmanship and timeless style.',
    type: 'website',
  },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    colorScheme: "light",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous'/>
        <link
            href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
            rel="stylesheet"/>
    </head>
    <body
        className='min-h-screen flex flex-col bg-neutral-50 text-black selection:bg-brand dark:bg-neutral-900 dark:text-white dark:selection:bg-brand-grey dark:selection:text-white'
    >
    <Providers>
        <LaunchGate>
            <Header/>
            <WelcomeOffer/>
            <div className="flex-grow">
                {children}
            </div>
            <Footer/>
            <CookieConsent />
        </LaunchGate>
    </Providers>
    </body>
    </html>
  );
}
