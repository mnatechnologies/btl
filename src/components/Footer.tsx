import { Instagram, Twitter, Facebook } from "lucide-react";
import Image from "next/image";


const Footer = () => {
  return (
    <footer className="brand-black text-primary-foreground pt-6 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center mx-auto">
          {/* Brand - Logo and text side by side */}
          <div className="flex flex-col items-center text-center space-y-2 max-w-2xl mx-auto pb-3">
            <Image
              src={'/images/logo-footer.png'}
              alt="Built To Last" 
              width={300}
              height={80}
              className="h-16 w-auto flex-shrink-0"
            />
            <p className="text-primary-foreground/70 text-sm leading-relaxed text-center ">
              Premium quality clothing designed to last. Timeless style meets exceptional craftsmanship.
            </p>
          </div>
        </div >

        <div className="border-t border-primary-foreground/20 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} Built To Last. All rights reserved.</p>
          
          {/* Social Media Icons */}
          <div className="flex space-x-4 my-4 md:my-0">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;