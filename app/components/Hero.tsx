"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, PlayCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
    const { t, language } = useLanguage();
    const isRTL = language === 'ar';

    return (
        <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-midnight">
            {/* Background Effects */}
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-gold/20 opacity-20 blur-[100px]"></div>

            <div className="container mx-auto px-4 text-center z-10 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-gold/5 text-gold text-sm font-medium mb-8 mt-12 border border-gold/10 backdrop-blur-sm">
                        <span>🚀</span>
                        <span>{t.hero.startJourney}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-lalezar mb-8 leading-tight tracking-wider">
                        <span className="text-white block mb-2">{t.hero.titlePart1}</span>
                        <span className="text-[#c89e4c] font-bold block drop-shadow-sm pb-2">{t.hero.titlePart2}</span>
                        <span className="text-white block mt-2 text-xl md:text-3xl font-sans font-bold">{t.hero.titlePart3}</span>
                    </h1>

                    <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                        {t.hero.descriptionPart1} <span className="text-gold font-medium">{t.hero.descriptionPart2}</span> {t.hero.descriptionPart3}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10">
                        <a href="/teachers" className="group relative px-8 py-4 bg-gold hover:bg-gold-shiny text-midnight font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(235,201,123,0.2)] flex items-center gap-3">
                            {t.hero.ctaBookTrial}
                            <ArrowLeft className={`w-3 h-3 transition-transform group-hover:-translate-x-1 relative top-[1px] ${!isRTL ? 'rotate-180' : ''}`} />
                        </a>

                        <a href="/why-de1" className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 font-medium text-lg rounded-2xl transition-all duration-300 flex items-center gap-3">
                            <span>{t.hero.ctaWhyUs}</span>
                            {/* <PlayCircle className="w-5 h-5 text-gold group-hover:text-gold-shiny transition-colors" /> */}
                        </a>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto"
                    >
                        {t.hero.footerNote}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
