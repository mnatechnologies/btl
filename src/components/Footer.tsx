import { Instagram, Twitter, Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {SiTiktok, SiInstagram } from "@icons-pack/react-simple-icons";


const Footer = () => {
  return (
    <footer className="brand-black text-primary-foreground pt-10 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: brand blurb */}
        <div className="flex justify-center items-center mx-auto">
          <div className="flex flex-col items-center text-center space-y-2 max-w-2xl mx-auto pb-8">
            <Image
              src={'/images/logo-footer.png'}
              alt="Built To Last"
              width={300}
              height={80}
              className="h-16 w-auto flex-shrink-0"
            />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Premium quality clothing designed to last. Timeless style meets exceptional craftsmanship.
            </p>
          </div>
        </div>

        {/* Middle: link columns (asos-like) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 border-t border-primary-foreground/20 pt-8">
          {/* Help & Information */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-primary-foreground/80">Help & Information</h3>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
              <li><Link href="#" className="hover:text-primary-foreground transition-colors">Track order</Link></li>
              <li><Link href="/returns" className="hover:text-primary-foreground transition-colors">Returns and Exchanges </Link></li>
              <li><Link href="#" className="hover:text-primary-foreground transition-colors">Shipping</Link></li>
              <li><Link href="/contact" className="hover:text-primary-foreground transition-colors">Contact us</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-primary-foreground/80">About</h3>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
              <li><Link href="/about" className="hover:text-primary-foreground transition-colors">Our story</Link></li>
              <li><Link href="#" className="hover:text-primary-foreground transition-colors">Sustainability</Link></li>
              <li><Link href="#" className="hover:text-primary-foreground transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary-foreground transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* More from us */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-primary-foreground/80">More from Built To Last</h3>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Gift cards</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Affiliates</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Wholesale</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Student discount</a></li>
            </ul>
          </div>

          {/* Follow us */}
          <div className="sm:col-span-1 col-span-2 lg:col-span-1">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-primary-foreground/80">Follow us</h3>
            <p className="mt-4 text-sm text-primary-foreground/70">Join us on social for new drops and behind-the-scenes.</p>
            <div className="mt-4 flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label="Instagram">
                <SiInstagram className="h-5 w-5" />
              </a>
              <a href="https://tiktok.com." target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label="Twitter">
                <SiTiktok className="h-5 w-5" />
              </a>

            </div>
          </div>
        </div>

        {/* Bottom: legal row */}
        <div className="mt-8 border-t border-primary-foreground/20 pt-6 flex flex-col md:flex-row gap-4 md:gap-6 justify-between items-center text-sm text-primary-foreground/60">
          <p className="order-2 md:order-1">&copy; {new Date().getFullYear()} Built To Last. All rights reserved.</p>
          <div className="order-1 md:order-2 flex gap-6">
            <a href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-primary-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;