import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hiclipart.com.png"
        alt="Hero background"
        fill
        className="object-contain object-center"
        priority
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Content Container */}
      <div className="relative h-full w-full">
        {/* Text - Bottom Left (leftmost on larger viewports) */}
        <div className="absolute bottom-8 left-4 sm:left-6 lg:left-8 space-y-2 max-w-md lg:max-w-lg">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight text-white">
            Built To Last
          </h1>
          
          <p className="text-sm sm:text-base text-white/90 leading-relaxed">
            Premium quality essentials designed for those who value craftsmanship and timeless style.
          </p>
        </div>

        {/* Shop Now Button - Bottom Right (rightmost edge) */}
        <Link 
          href="/store"
          className="absolute border  bottom-8 right-4 sm:right-6 lg:right-8 text-white text-xl sm:text-2xl lg:text-3xl font-medium hover:text-white/80 transition-all duration-300"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
