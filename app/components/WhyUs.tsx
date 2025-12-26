"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Zap, PenTool } from 'lucide-react';

const benefits = [
    {
        title: "منهج مفصل",
        desc: "محتوى مصمم خصيصاً لعلاج نقاط ضعفك.",
        icon: PenTool
    },
    {
        title: "انطلاق فوري",
        desc: "ابدأ دراستك فوراً بدون انتظار اكتمال العدد.",
        icon: Zap
    },
    {
        title: "تركيز كامل",
        desc: "المعلم لك وحدك بنسبة 100% طوال الحصة.",
        icon: User
    }
];

export default function WhyUs({ id }: { id?: string }) {
    return (
        <section className="py-24 bg-midnight relative" id={id}>
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Cards */}
                    <div className="grid gap-6">
                        {benefits.map((benefit, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-white/10 transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 rounded-full bg-midnight border border-white/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                                    <benefit.icon size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gold transition-colors">{benefit.title}</h3>
                                    <p className="text-gray-400 text-sm">{benefit.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-right"
                    >
                        <div className="inline-block px-4 py-1 rounded-full border border-gold/20 text-gold text-sm font-medium mb-6">
                            لماذا نحن؟
                        </div>
                        <h2 className="text-4xl md:text-6xl font-lalezar leading-tight mb-8">
                            <span className="text-white">لأننا لا نشبه الآخرين</span>
                            <br />
                            <span className="text-gold">في أي شيء..</span>
                        </h2>

                        <p className="text-gray-300 text-lg leading-relaxed mb-10">
                            في الأكاديميات التقليدية، أنت جزء من "مجموعة". في <span className="text-gold font-bold">DE1 Academy</span>، أنت "المركز". نظامنا التعليمي صُمم ليحل كل المشاكل التي واجهتك سابقاً، ويوفر عليك سنوات من المحاولات غير المجدية.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a href="/why-de1" className="px-8 py-4 bg-gold hover:bg-gold-shiny text-midnight font-bold rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg shadow-gold/10">
                                اكتشف الفارق بنفسك (المقارنة الكاملة)
                                <ArrowLeft className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
