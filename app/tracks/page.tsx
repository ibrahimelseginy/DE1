"use client";
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingSocials from "../components/FloatingSocials";
import { motion } from 'framer-motion';
import { CheckCircle2, Target, Users, Zap, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function TracksPage() {
    const { t, language } = useLanguage();

    // Journey steps - using existing translations
    const journeySteps = [
        { icon: Target, title: t.journey.steps.discovery.title, desc: t.journey.steps.discovery.desc },
        { icon: Zap, title: t.journey.steps.matching.title, desc: t.journey.steps.matching.desc },
        { icon: Calendar, title: t.journey.steps.curriculum.title, desc: t.journey.steps.curriculum.desc },
        { icon: Users, title: t.journey.steps.start.title, desc: t.journey.steps.start.desc },
    ];

    // Get tracks from translations
    const tracksData = [
        {
            id: 'speaking',
            title: t.tracks.items.speaking.title,
            desc: t.tracks.items.speaking.desc,
            features: t.tracks.items.speaking.features,
            special: false
        },
        {
            id: 'exams',
            title: t.tracks.items.exams.title,
            desc: t.tracks.items.exams.desc,
            features: t.tracks.items.exams.features,
            special: false
        },
        {
            id: 'business',
            title: t.tracks.items.business.title,
            desc: t.tracks.items.business.desc,
            features: t.tracks.items.business.features,
            special: false
        },
        {
            id: 'custom',
            title: t.tracks.items.custom.title,
            desc: t.tracks.items.custom.desc,
            features: t.tracks.items.custom.features,
            special: true
        }
    ];

    return (
        <main className="min-h-screen bg-midnight text-foreground font-sans selection:bg-gold selection:text-midnight overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-40 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] -z-10"></div>

                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6"
                    >
                        {t.tracks.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        {t.whyUs.description}
                    </motion.p>
                </div>
            </section>

            {/* How It Works (Roadmap) */}
            <section className="pb-20 pt-0 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            {t.journey.title} <span className="text-[#c89e4c]">{t.journey.titleHighlight}</span>
                        </h2>
                        <div className="h-1 w-20 bg-[#c89e4c] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 right-[10%] left-[10%] h-0.5 bg-gradient-to-l from-transparent via-[#c89e4c]/30 to-transparent -z-10"></div>

                        {journeySteps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative bg-midnight border border-white/5 p-6 rounded-2xl text-center hover:border-[#c89e4c]/30 transition-colors group"
                            >
                                <div className="w-16 h-16 mx-auto bg-[#c89e4c]/10 rounded-full flex items-center justify-center text-[#c89e4c] mb-6 group-hover:scale-110 transition-transform duration-300 ring-1 ring-[#c89e4c]/20 ring-offset-2 ring-offset-midnight">
                                    <step.icon size={30} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tracks List */}
            <section className="py-20 bg-white/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">{t.tracks.title}</h2>
                        <p className="text-gray-400">{t.journey.subtitle}</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {tracksData.map((track, idx) => (
                            <motion.div
                                key={track.id}
                                id={track.id}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className={`flex flex-col gap-6 bg-midnight border ${track.special ? 'border-[#c89e4c]/40 shadow-[0_0_30px_rgba(200,158,76,0.1)]' : 'border-white/10'} p-8 rounded-3xl group hover:bg-white/[0.02] transition-colors scroll-mt-24`}
                            >
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                                        {track.title}
                                        {track.special && <span className="text-xs bg-[#c89e4c] text-midnight px-2 py-0.5 rounded-full font-bold">
                                            {language === 'ar' ? 'مميز' : language === 'de' ? 'Besonders' : 'Special'}
                                        </span>}
                                    </h3>
                                    <p className="text-gray-300 mb-6 leading-relaxed font-medium">
                                        {track.desc}
                                    </p>

                                    <div className="grid grid-cols-1 gap-3 mb-6">
                                        {track.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <CheckCircle2 size={18} className="text-[#c89e4c] flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-gray-400 font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link
                                        href="/teachers"
                                        className={`w-full text-center py-3 px-4 rounded-xl font-extrabold transition-all duration-300 block ${track.special
                                            ? 'bg-[#c89e4c] text-midnight hover:bg-[#d4af37] shadow-lg shadow-[#c89e4c]/10'
                                            : 'bg-white/5 text-[#c89e4c] border border-[#c89e4c]/20 hover:bg-[#c89e4c] hover:text-midnight'
                                            }`}
                                    >
                                        {t.hero.ctaBookTrial}
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
            <FloatingSocials />
        </main>
    );
}
