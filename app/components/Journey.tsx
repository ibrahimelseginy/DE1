"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Compass, UserCheck, PenTool, Zap } from 'lucide-react';

const steps = [
    {
        id: "01",
        titleEn: "Discovery & Goals",
        titleAr: "تحديد الوجهة",
        description: "لا نبدأ بالتدريس فوراً؛ بل نبدأ بحصة تجريبية أقرب لجلسة استشارية لنفهم هدفك (سفر، عمل، أو طلاقة عامة) ونحدد مستواك الحالي بدقة.",
        icon: Compass,
    },
    {
        id: "02",
        titleEn: "Teacher Matching",
        titleAr: "اختيار رفيق الرحلة",
        description: "نرشح لك المعلم الأنسب لشخصيتك وأهدافك من بين نخبة مدرسينا المعتمدين، مع فرصة اختيار المدرس بنفسك.",
        icon: UserCheck,
    },
    {
        id: "03",
        titleEn: "Customized Curriculum",
        titleAr: "تفصيل المنهج",
        description: "هنا نطبق شعارنا؛ نصمم لك محتوى تعليمياً (مُفصّلاً) يركز فقط على احتياجاتك، بعيداً عن حشو المناهج التقليدية.",
        icon: PenTool,
    },
    {
        id: "04",
        titleEn: "Instant Start",
        titleAr: "الانطلاق الفوري",
        description: "لا انتظار لاكتمال مجموعات؛ تبدأ حصتك الأولى (1-on-1) فوراً وفي المواعيد التي تختارها بنفسك بكل مرونة.",
        icon: Zap,
    },
];

export default function Journey() {
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
                        رحلتك نحو الإتقان.. <span className="text-gold">خطوة بخطوة</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg"
                    >
                        منهجية علمية مجربة تضمن لك الوصول لهدفك بأسرع وقت.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
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

                            <h4 className="text-gray-400 text-sm font-medium mb-1 font-serif tracking-wide">{step.titleEn}</h4>
                            <h3 className="text-xl font-bold text-white mb-4">{step.titleAr}</h3>

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
