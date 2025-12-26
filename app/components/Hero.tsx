"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, PlayCircle } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-midnight">
            {/* Background Effects */}
            <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-gold/20 opacity-20 blur-[100px]"></div>

            <div className="container mx-auto px-4 text-center z-10 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-gold/5 text-gold text-sm font-medium mb-8 border border-gold/10 backdrop-blur-sm">
                        <span>🚀</span>
                        <span>ابدأ رحلتك في التعلم اليوم</span>
                    </div>

                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight tracking-tight">
                        <span className="text-white block mb-2">لأن أهدافك ليست كغيرك..</span>
                        <span className="text-gold block drop-shadow-sm">دورات لغة (مُفصّلة)</span>
                        <span className="text-white block mt-2 text-xl md:text-3xl">على مقاسك تماماً</span>
                    </h1>

                    <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                        نحن لا نتبع الطرق التقليدية، بل نبني لك مساراً تعليمياً يركز <span className="text-gold font-medium">(فقط)</span> على ما تحتاجه للوصول لهدفك.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10">
                        <a href="/teachers" className="group relative px-8 py-4 bg-gold hover:bg-gold-shiny text-midnight font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(235,201,123,0.2)] flex items-center gap-3">
                            احجز حصتك التجريبية الآن
                            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        </a>

                        <a href="/why-de1" className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 font-medium text-lg rounded-2xl transition-all duration-300 flex items-center gap-3">
                            <span>لماذا DE1؟</span>
                            {/* <PlayCircle className="w-5 h-5 text-gold group-hover:text-gold-shiny transition-colors" /> */}
                        </a>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto"
                    >
                        لا انتظار بعد اليوم.. اختر معلمك، حدد منهجك و ابدأ حصتك الأولى خلال 24 ساعة من الاشتراك
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
