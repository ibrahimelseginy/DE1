"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
    const { t, language } = useLanguage();
    const isRTL = language === 'ar';

    return (
        <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-midnight">
            {/* Background Effects - محسّن */}
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-gold/30 opacity-30 blur-[120px]"></div>

            <div className="container mx-auto px-4 text-center z-10 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-gold/10 text-gold text-base font-bold mb-8 mt-20 border-2 border-gold/20 backdrop-blur-sm shadow-lg shadow-gold/10">
                        <span className="text-xl">🚀</span>
                        <span>{t.hero.startJourney}</span>
                    </div>

                    {/* العنوان - خطوط أكبر وأوضح */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-lalezar mb-10 leading-tight">
                        <span className="text-white block mb-3 font-extrabold drop-shadow-lg">{t.hero.titlePart1}</span>
                        <span className="relative inline-block">
                            <span className="text-[#FFD700] font-extrabold block drop-shadow-[0_0_30px_rgba(255,215,0,0.5)] pb-3 text-5xl md:text-7xl lg:text-8xl relative z-10 leading-normal">
                                {t.hero.titlePart2}
                            </span>
                            <svg className="absolute bottom-0 md:-bottom-2 left-0 w-full h-4 md:h-6 text-[#FFD700] z-0 opacity-80" viewBox="0 0 300 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 19C52.3488 6.70327 124.773 -2.71617 297 3" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 19C52.3488 6.70327 124.773 -2.71617 297 3" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.2" />
                            </svg>
                        </span>
                        <span className="text-white block mt-3 text-2xl md:text-4xl lg:text-5xl font-sans font-bold">{t.hero.titlePart3}</span>
                    </h1>

                    {/* الوصف - خط أكبر وأوضح */}
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
                        {t.hero.descriptionPart1} <span className="text-gold font-bold">{t.hero.descriptionPart2}</span> {t.hero.descriptionPart3}
                    </p>

                    {/* الأزرار - أكبر وأوضح */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                        <a href="/teachers" className="group relative px-10 py-5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FFD700] text-midnight font-extrabold text-xl rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-[0_0_40px_rgba(255,215,0,0.4)] hover:shadow-[0_0_60px_rgba(255,215,0,0.6)] flex items-center gap-3">
                            {t.hero.ctaBookTrial}
                            <ArrowLeft className={`w-6 h-6 transition-transform group-hover:-translate-x-2 ${!isRTL ? 'rotate-180' : ''}`} />
                        </a>

                        <a href="/why-de1" className="group px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white hover:bg-white/20 hover:border-white/30 font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
                            <span>{t.hero.ctaWhyUs}</span>
                        </a>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto font-medium"
                    >
                        {t.hero.footerNote}
                    </motion.p>

                    {/* Divider */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="mt-14 mx-auto max-w-md h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"
                    ></motion.div>
                </motion.div>
            </div>
        </section>
    );
}
