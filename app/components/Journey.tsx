"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Compass, UserCheck, PenTool, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Journey() {
    const { t, language } = useLanguage();

    const steps = [
        {
            id: t.journey.steps.discovery.step,
            titleEn: "Discovery & Goals", // Keeping original for style or maybe translate? style says "font-serif tracking-wide", likely English style. Let's keep titleEn separate if needed but user asked for full translation. The previous code had `titleEn` and `titleAr`. I'll just use one title from `t`.
            title: t.journey.steps.discovery.title,
            description: t.journey.steps.discovery.desc,
            icon: Compass,
        },
        {
            id: t.journey.steps.matching.step,
            titleEn: "Teacher Matching",
            title: t.journey.steps.matching.title,
            description: t.journey.steps.matching.desc,
            icon: UserCheck,
        },
        {
            id: t.journey.steps.curriculum.step,
            titleEn: "Customized Curriculum",
            title: t.journey.steps.curriculum.title,
            description: t.journey.steps.curriculum.desc,
            icon: PenTool,
        },
        {
            id: t.journey.steps.start.step,
            titleEn: "Instant Start",
            title: t.journey.steps.start.title,
            description: t.journey.steps.start.desc,
            icon: Zap,
        },
    ];

    return (
        <section className="py-20 bg-midnight relative overflow-hidden" id="journey">
            {/* Subtle Divider */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4 text-white"
                    >
                        {t.journey.title} <span className="text-gold">{t.journey.titleHighlight}</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg"
                    >
                        {t.journey.subtitle}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 border border-white/5 rounded-2xl p-8 hover:bg-white/10 hover:border-gold/30 transition-all duration-300 group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-gray-500 font-mono text-sm">{step.id}</span>
                                <div className="p-3 rounded-xl bg-gold text-midnight group-hover:scale-110 transition-transform duration-300">
                                    <step.icon size={24} strokeWidth={2} />
                                </div>
                            </div>

                            {/* Optional: Keep English subtitle or remove. The design had `titleEn` and `titleAr`. I'll remove `titleEn` and just show `title` to be cleaner for all langs. */}
                            {/* <h4 className="text-gray-400 text-sm font-medium mb-1 font-serif tracking-wide">{step.titleEn}</h4> */}
                            <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>

                            <p className="text-gray-400 text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
