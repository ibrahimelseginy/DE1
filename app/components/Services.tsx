"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, BookOpen, Briefcase, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';

export default function Services() {
    const { t, language } = useLanguage();

    const tracks = [
        {
            id: "speaking-fluency",
            title: t.tracks.items.speaking.title,
            desc: t.tracks.items.speaking.desc,
            icon: MessageSquare,
            special: false
        },
        {
            id: "international-exams",
            title: t.tracks.items.exams.title,
            desc: t.tracks.items.exams.desc,
            icon: BookOpen,
            special: false
        },
        {
            id: "business-work",
            title: t.tracks.items.business.title,
            desc: t.tracks.items.business.desc,
            icon: Briefcase,
            special: false
        },
        {
            id: "custom-path",
            title: t.tracks.items.custom.title,
            desc: t.tracks.items.custom.desc,
            icon: Compass,
            special: true
        },
    ];

    return (
        <section className="py-24 bg-midnight" id="services">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-white mb-4"
                    >
                        {t.tracks.title}
                    </motion.h2>
                    <div className="h-1 w-20 bg-gold mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {tracks.map((track, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`rounded-2xl p-8 transition-all duration-300 group border relative overflow-hidden h-full flex flex-col justify-start
                ${track.special
                                    ? 'bg-gradient-to-br from-gold/10 to-midnight border-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]'
                                    : 'bg-white/5 border-white/5 hover:border-gold/30 hover:bg-white/10'
                                }`}
                        >
                            <div className={`mb-6 inline-flex p-4 rounded-xl ${track.special ? 'bg-gold text-midnight' : 'bg-midnight text-gold border border-gold/20'} group-hover:scale-110 transition-transform duration-300 self-start`}>
                                <track.icon size={28} strokeWidth={1.5} />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-4">{track.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                                {track.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
