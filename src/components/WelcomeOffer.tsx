'use client'
import {useState, useEffect} from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { getSaleConfig } from "@/lib/saleConfig";

const LS_KEY = 'welcomeOfferDismissedAt';

export default function WelcomeOffer() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const sale = getSaleConfig()


  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(LS_KEY);
      if (dismissed) {
        const dismissedAt = Number(dismissed);
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        if (Date.now() - dismissedAt < sevenDays) {
          setIsOpen(false);
          return;
        }
      }
      // Show modal after 1 second
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.debug('WelcomeOffer localStorage access failed', err);
      }
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(LS_KEY, String(Date.now()));
    } catch (err){
      if (process.env.NODE_ENV !== 'production') {
        console.debug('WelcomeOffer localStorage access failed', err);
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to subscribe');
      }
      
      setSubmitted(true);
      setTimeout(() => handleClose(), 2000);
    } catch (err) {
      console.error('Subscription error:', err);
      alert('Failed to subscribe. Please try again.');
    }
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40" 
        onClick={handleClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black rounded-lg shadow-2xl z-50 w-[calc(100%-2rem)] max-w-md mx-4 p-8 sm:w-full sm:mx-0">
        <button
          onClick={handleClose}
          className=" cursor-pointer absolute top-4 right-4 h-6 w-6 flex items-center justify-center hover:bg-neutral-100 rounded transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-4">
          <div>
            <div>
              <Image
                  src="/images/btl-logo-black.jpg"
                  alt="Built To Last Logo"
                  width={100}
                  height={100}
                  className="mx-auto mb-4"
              />
            </div>

            {sale.isActive ? (
                <>
                  <div className="bg-brand-charcoal text-white py-2 px-4 -mx-8 mb-4">
                    <p className="text-center text-lg font-bold tracking-wide">
                      BOXING DAY SALE
                    </p>
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-2 text-red-600">
                    50% OFF
                  </h2>
                  <p className="text-lg font-medium text-neutral-800">
                    ALL PRODUCTS
                  </p>
                  <p className="text-sm text-neutral-600 mt-2">
                    Today only! No code needed.
                  </p>
                </>
            ) : (
                <>
                  <h2 className="text-2xl font-display font-bold mb-2">
                    Welcome to Built To Last
                  </h2>
                  <p className="text-sm text-neutral-600">
                    Join our mailing list for exclusive updates
                  </p>
                </>
            )}
          </div>

          {/* Only show email form if NOT during sale */}
          {!sale.isActive && (
              submitted ? (
                  <div className="text-center py-4">
                    <p className="text-green-600 font-medium">Thank you for subscribing!</p>
                  </div>
              ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full border border-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/50"
                      />
                    </div>
                    <button
                        type="submit"
                        className="cursor-pointer w-full bg-black text-white py-2 font-medium hover:bg-neutral-800 transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
              )
          )}

          {/* Show shop button during sale */}
          {sale.isActive && (
              <button
                  onClick={handleClose}
                  className="cursor-pointer w-full bg-brand-charcoal text-white py-3 font-bold hover:bg-black transition-colors text-lg"
              >
                SHOP NOW
              </button>
          )}
        </div>
      </div>
    </>
  );
}
