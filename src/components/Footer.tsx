import Image from "next/image";
import {SiTiktok, SiInstagram } from "@icons-pack/react-simple-icons";

const Footer = () => {
  return (
    <footer className=" bg-black brand-black text-primary-foreground  pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: brand blurb */}
        <div className="flex justify-center items-center mx-auto">
          <div className="flex flex-col items-center text-center space-y-2 max-w-2xl mx-auto py-4">
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

        {/* Middle: socials */}
        <div className="border-t border-primary-foreground/20 pt-8 pb-8">
          <div className="flex flex-col items-center">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-primary-foreground/80 mb-4">Follow us</h3>
            <div className="flex space-x-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label="Instagram">
                <SiInstagram className="h-6 w-6" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label="TikTok">
                <SiTiktok className="h-6 w-6" />
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
