import {Leaf, Spool, Shirt} from "lucide-react";
import Link from "next/link";

const About = () => {
    return (
        <section id="about" className="py-10 bg-black mx-auto">
            <div className=" max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="space-y-12  fade-up">
                    <div className="space-y-6">
                        <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
                            Our Philosophy
                        </h2>
                        <p className="text-xl text--brand-white  leading-relaxed max-w-3xl mx-auto">
                            In a world of fast fashion and disposable clothing, we believe in creating
                            pieces that stand the test of time. Every BTL garment is meticulously crafted
                            with premium materials and timeless design.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 pt-8 ">
                        <div className="space-y-4">
                            {/*<div className="w-16 h-16 bg-brand-charcoal mx-auto flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-xl cursor-pointer">*/}
                            {/*    <div className="w-8 h-8 border-2 border-white"></div>*/}
                            {/*</div>*/}
                            <Spool className="w-16 h-16 mx-auto text-brand-white"/>
                            <h3 className="text-lg font-medium text-brand-white">Quality</h3>
                            <p className="text-brand-white text-sm leading-relaxed">
                                Premium organic cotton and reinforced construction ensure longevity.
                            </p>
                        {/*    For future reference, in case needed*/}
                        {/*   <Link href="/quality" className="text-brand-white text-sm leading-relaxed">*/}
                        {/*       <button className="text-brand-white text-sm leading-relaxed">Learn More</button>*/}
                        {/*   </Link> */}
                        </div>

                        <div className="space-y-4">
                            {/*<div className="w-16 h-16 bg-brand-charcoal mx-auto flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-xl cursor-pointer">*/}
                            {/*    <div className="w-8 h-8 bg-white"></div>*/}
                            {/*</div>*/}
                            <Shirt className="w-16 h-16 mx-auto text-brand-white"/>
                            <h3 className="text-lg font-medium text-white">Minimalism</h3>
                            <p className="text-white text-sm leading-relaxed">
                                Clean lines and timeless design that transcends seasonal trends.
                            </p>
                            {/*    For future reference, in case needed*/}
                            {/*   <Link href="/minimal or w/e" className="text-brand-white text-sm leading-relaxed">*/}
                            {/*       <button className="text-brand-white text-sm leading-relaxed">Learn More</button>*/}
                            {/*   </Link> */}
                        </div>

                        <div className="space-y-4">
                            {/*<div className="w-16 h-16 bg-brand-charcoal mx-auto flex items-center justify-center*/}
                            {/*transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-xl cursor-pointer">*/}
                            {/*    <div className="w-8 h-8 border border-white bg-transparent"></div>*/}
                            {/*</div>*/}
                            <Leaf className="w-16 h-16 mx-auto text-brand-white"/>
                            <h3 className="text-lg font-medium text-brand-white">Sustainability</h3>
                            <p className="text-brand-white text-sm leading-relaxed">
                                Ethically sourced materials and responsible manufacturing practices.
                            </p>
                            {/*    For future reference, in case needed*/}
                            {/*   <Link href="/sustainability" className="text-brand-white text-sm leading-relaxed">*/}
                            {/*       <button className="text-brand-white text-sm leading-relaxed">Learn More</button>*/}
                            {/*   </Link> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-16" />

        </section>
    );
};

export default About;