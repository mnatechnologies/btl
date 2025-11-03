import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative w-full h-[45vh] sm:h-[50vh] lg:h-[55vh] overflow-hidden bg-black">
      {/* Background Image */}
      <Image
        src="/images/hero.png"
        alt="Hero background"
        fill
        className="object-cover " style={{objectPosition: 'center 13%'}}
        priority
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Content Container */}
      <div className="relative h-full w-full">
        {/* Text - Bottom Left (leftmost on larger viewports) */}
        <div className="absolute bottom-24 sm:bottom-32 lg:bottom-40 left-4 sm:left-6 lg:left-8 space-y-3 sm:space-y-4 max-w-md lg:max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-white">
            Built To Last
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
            Premium quality essentials designed for those who value craftsmanship and timeless style.
          </p>
        </div>

        {/* Shop Now Button - Bottom Right (rightmost edge) */}
        <Link 
          href="/store"
          className="absolute border p-2 bottom-8 right-4 sm:right-6 lg:right-8 text-white text-xl sm:text-2xl lg:text-3xl font-medium hover:text-white/80 transition-all duration-300"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
