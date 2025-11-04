'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  objectPosition?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/images/hero.png',
    title: 'Built To Last',
    description: 'Premium quality essentials designed for those who value craftsmanship and timeless style.',
    objectPosition: 'center 13%'
  },
  {
    id: 2,
    image: '/images/V2 edited/Built To Last V2-5_(2).jpg',
    title: 'PLACEHOLDER',
    description: "YOUR TEXT HERE",
    objectPosition: 'center 13%'
  },
  {
    id: 3,
    image: '/images/V2 edited/Built To Last V2-9_(2).jpg',
    title: 'PLACEHOLDER',
    description: 'YOUR TEXT HERE',
    objectPosition: 'center 13%'
  },
  {
    id: 4,
    image: '/images/V2 edited/Built To Last V2-1_(2).jpg',
    title: 'PLACEHOLDER',
    description: 'YOUR TEXT HERE',
    objectPosition: 'center 13%'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleNavigation = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false);
    if (direction === 'prev') {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  return (
    <section className="relative w-full h-[45vh] sm:h-[50vh] lg:h-[55vh] overflow-hidden bg-black">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            style={{ objectPosition: slide.objectPosition || 'center center' }}
            priority={index === 0}
          />
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}
      
      {/* Content Container */}
      <div className="relative h-full w-full">
        {/* Text - Bottom Left */}
        <div className="absolute bottom-24 sm:bottom-32 lg:bottom-40 left-4 sm:left-6 lg:left-8 space-y-3 sm:space-y-4 max-w-md lg:max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-white transition-all duration-500">
            {slides[currentSlide].title}
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed transition-all duration-500">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => handleNavigation('prev')}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => handleNavigation('next')}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Shop Now Button - Bottom Right */}
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
