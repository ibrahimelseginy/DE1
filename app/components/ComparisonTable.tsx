"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, User, Zap, BookOpen, Calendar, Settings, Target, ShieldCheck, Mic } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ComparisonTable() {
    const { t, language } = useLanguage();
    const isRTL = language === 'ar';

    const keys = [
        { id: 'startDate', icon: Clock, highlight: true },
        { id: 'teacherChoice', icon: User, highlight: false },
        { id: 'teacherExp', icon: Zap, highlight: false },
        { id: 'schedule', icon: Calendar, highlight: false },
        { id: 'speed', icon: Settings, highlight: false },
        { id: 'curriculum', icon: BookOpen, highlight: false },
        { id: 'focus', icon: Target, highlight: false },
        { id: 'financialRisk', icon: ShieldCheck, highlight: false },
        { id: 'speakingRate', icon: Mic, highlight: false },
    ] as const;

    const comparisonData = keys.map(k => ({
        ...t.comparison.items[k.id],
        icon: k.icon,
        highlight: k.highlight
    }));

    return (
        <section className="py-24 bg-midnight relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] -z-10"></div>

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-gold font-medium text-sm border border-gold/20 px-4 py-1.5 rounded-full mb-4 inline-block">
                        {t.comparison.badge}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-lalezar text-white mb-6">
                        {t.comparison.titlePart1} <br /> <span className="text-gold">{t.comparison.titlePart2}</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg hover:text-gray-300 transition-colors">
                        {t.comparison.description}
                    </p>
                </div>

                <div className="max-w-5xl mx-auto" dir={getDir(language)}>
                    {/* Header - Hidden on mobile, shown on desktop */}
                    <div className="hidden md:grid grid-cols-12 gap-6 bg-white/5 p-6 rounded-t-3xl border border-white/5 backdrop-blur-sm">
                        <div className="col-span-3 text-gold font-bold text-lg">{t.comparison.headers.aspect}</div>
                        <div className="col-span-4 text-gray-400 font-bold text-lg">{t.comparison.headers.traditional}</div>
                        <div className="col-span-5 text-gold font-bold text-2xl">{t.comparison.headers.de1}</div>
                    </div>

                    {/* Rows */}
                    <div className="space-y-4 md:space-y-0">
                        {comparisonData.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`
                                    relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 p-6 rounded-2xl md:rounded-none border-b border-white/5
                                    ${idx === comparisonData.length - 1 ? 'md:rounded-b-3xl border-b-0' : ''}
                                    ${item.highlight ? 'bg-gold/5 border-gold/20' : 'bg-white/[0.02] hover:bg-white/[0.04]'}
                                    transition-all duration-300
                                `}
                            >
                                {/* Aspect (Mobile Label included) */}
                                <div className="col-span-3 flex items-center gap-3 text-gold/90 font-medium text-lg border-b md:border-b-0 border-white/5 pb-3 md:pb-0 mb-3 md:mb-0">
                                    <div className="p-2 rounded-lg bg-gold/10">
                                        <item.icon size={20} />
                                    </div>
                                    {item.aspect}
                                </div>

                                {/* Traditional */}
                                <div className="col-span-4 flex items-start gap-3 text-gray-400 leading-relaxed group">
                                    <XCircle className="shrink-0 text-red-500/50 mt-1 size-5 group-hover:text-red-500 transition-colors" />
                                    <span className="text-sm md:text-base">{item.trad}</span>
                                </div>

                                {/* DE1 */}
                                <div className="col-span-5 flex items-start gap-3 text-white font-medium leading-relaxed group">
                                    <CheckCircle2 className="shrink-0 text-green-500 mt-1 size-6 md:size-5 group-hover:text-green-400 transition-colors" />
                                    <span className="text-base md:text-lg">{item.de1}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mobile Note */}
                <div className="mt-8 text-center md:hidden">
                    <p className="text-sm text-gray-500">
                        {t.comparison.mobileNote}
                    </p>
                </div>
            </div>
        </section>
    );
}

function getDir(lang: string) {
    return lang === 'ar' ? 'rtl' : 'ltr';
}
