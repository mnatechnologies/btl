'use client'
import Link from 'next/link';
import {useState, useEffect} from 'react';
import { X } from 'lucide-react';

const LS_KEY = 'welcomeOfferDismissedAt';

export default function WelcomeOffer() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(LS_KEY);
      if (dismissed) {
        const dismissedAt = Number(dismissed);
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        if (Date.now() - dismissedAt < sevenDays) setVisible(false);
        }
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.debug('WelcomeOffer localStorage access failed', err);
      }
    }
  }, []);
  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);

    try {
      localStorage.setItem(LS_KEY, String(Date.now()));
    } catch (err){
      if (process.env.NODE_ENV !== 'production') {
        console.debug('WelcomeOffer localStorage access failed', err);
      }
    }
  }
  return (
    <div
      className="w-full bg-neutral-900 text-white border-b border-accent/20"
      role="region"
      aria-label="Welcome offer announcement"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" relative flex items-center justify-center h-10 sm:h-11 text-xs sm:text-sm">
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-6 inline-flex items-center justify-center rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/ cursor-pointer"
            aria-label="Close welcome offer"
            >
            <X className="h-4 w-4" aria-hidden />
          </button>
          <p className="text-center">
            <span className="font-medium"> PLACEHOLDER: Welcome offer:</span> 10% off your first order with code <span className="font-semibold tracking-wide">WELCOME10</span>.{' '}
            <Link href="/terms" className="underline hover:no-underline ml-1">
              T&Cs apply
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
