const AboutSection = () => {
  return (
      <section id="about" className="py-10 bg-gradient-to-bl from-primary via-secondary to-background   mx-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-12 fade-up">
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-brand-charcoal">
              Our Philosophy
            </h2>
            <p className="text-xl bg-gradient-to-bl from-primary via-brand-charcoal/80 to-muted bg-clip-text text-transparent animate-pulse-slow leading-relaxed max-w-3xl mx-auto">
              In a world of fast fashion and disposable clothing, we believe in creating
              pieces that stand the test of time. Every BTL garment is meticulously crafted
              with premium materials and timeless design.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-brand-charcoal mx-auto flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-xl cursor-pointer">
                <div className="w-8 h-8 border-2 border-white"></div>
              </div>
              <h3 className="text-lg font-medium text-brand-charcoal">Quality</h3>
              <p className="text-brand-grey text-sm leading-relaxed">
                Premium organic cotton and reinforced construction ensure longevity.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-brand-charcoal mx-auto flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-xl cursor-pointer">
                <div className="w-8 h-8 bg-white"></div>
              </div>
              <h3 className="text-lg font-medium text-brand-charcoal">Minimalism</h3>
              <p className="text-brand-grey text-sm leading-relaxed">
                Clean lines and timeless design that transcends seasonal trends.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-brand-charcoal mx-auto flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-xl cursor-pointer">
                <div className="w-8 h-8 border-2 border-white"></div>
              </div>
              <h3 className="text-lg font-medium text-brand-charcoal">Sustainability</h3>
              <p className="text-brand-grey text-sm leading-relaxed">
                Ethically sourced materials and responsible manufacturing practices.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-neutral-400 to-transparent mx-auto mt-16" />
    </section>
  );
};

export default AboutSection;
