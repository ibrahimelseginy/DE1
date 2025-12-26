"use client";
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingSocials from "../components/FloatingSocials";
import { tracks } from '../data/tracks';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Target, Users, Zap, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function TracksPage() {
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
                        className="text-4xl md:text-6xl font-lalezar text-white mb-6"
                    >
                        مسارات تعليمية <span className="text-[#c89e4c]">احترافية</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        لا نعتمد على منهج واحد للجميع. اختر المسار الذي يناسب هدفك، وسيقوم فريقنا بتخصيص خطة العمل لتصل إلى هدفك في أقصر وقت.
                    </motion.p>
                </div>
            </section>

            {/* How It Works (Roadmap) */}
            <section className="pb-20 pt-0 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">كيف تبدأ رحلتك معنا؟</h2>
                        <div className="h-1 w-20 bg-[#c89e4c] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 right-[10%] left-[10%] h-0.5 bg-gradient-to-l from-transparent via-[#c89e4c]/30 to-transparent -z-10"></div>

                        {[
                            { icon: Target, title: "تحديد الهدف", desc: "نناقش معك أهدافك والسبب وراء رغبتك في التعلم." },
                            { icon: Zap, title: "قياس المستوى", desc: "اختبار دقيق لتحديد نقطة البداية الصحيحة لك." },
                            { icon: Calendar, title: "خطة مخصصة", desc: "نصمم لك جدولاً ومنهجاً يناسب وقتك وهدفك." },
                            { icon: Users, title: "بداية الرحلة", desc: "ابدأ دروسك المباشرة مع معلمك الخاص فوراً." },
                        ].map((step, idx) => (
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
                        <h2 className="text-3xl font-bold text-white mb-4">استكشف مساراتنا التفصيلية</h2>
                        <p className="text-gray-400">كل مسار مصمم بعناية ليغطي جانباً محدداً من اللغة باحترافية</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {tracks.map((track, idx) => (
                            <motion.div
                                key={track.id}
                                id={track.id}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className={`flex flex-col md:flex-row gap-6 bg-midnight border ${track.special ? 'border-[#c89e4c]/40 shadow-[0_0_30px_rgba(200,158,76,0.1)]' : 'border-white/10'} p-8 rounded-3xl group hover:bg-white/[0.02] transition-colors scroll-mt-24`}
                            >
                                <div className="flex-shrink-0">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${track.special ? 'bg-[#c89e4c] text-midnight' : 'bg-white/10 text-[#c89e4c]'}`}>
                                        <track.icon size={32} strokeWidth={1.5} />
                                    </div>
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                                        {track.title}
                                        {track.special && <span className="text-xs bg-[#c89e4c] text-midnight px-2 py-0.5 rounded-full">مميز</span>}
                                    </h3>
                                    <p className="text-gray-300 mb-6 leading-relaxed">
                                        {track.desc}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                        {track.features.slice(0, 4).map((feature, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <CheckCircle2 size={16} className="text-[#c89e4c] flex-shrink-0" />
                                                <span className="text-sm text-gray-400">{feature}</span>
                                            </div>
                                        ))}
                                    </div>


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
