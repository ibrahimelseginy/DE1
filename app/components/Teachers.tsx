"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Award, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import { teachers } from '../data/teachers';
import Link from 'next/link';

export default function Teachers() {
    const { t, language } = useLanguage();

    return (
        <section className="py-24 bg-midnight" id="teachers">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    {/* <span className="text-gold uppercase tracking-widest text-sm font-semibold mb-2 block">Team</span> */}
                    <h2 className="text-4xl font-bold text-white mb-4">{t.teachers.title}</h2>
                    <p className="text-gray-400">{t.teachers.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {teachers.map((teacher, idx) => (
                        <motion.div
                            key={teacher.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-[#111827] rounded-3xl overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-300 group shadow-lg flex flex-col"
                        >
                            {/* Image Area */}
                            <div className="relative h-64 bg-slate-800 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent z-10"></div>
                                {/* Placeholder for Image */}
                                <div className="text-gray-600 text-sm font-light">[صورة معلم]</div>

                                {/* Play Button - Only if video exists, but for now generic */}
                                {teacher.videoUrl && (
                                    <button className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:scale-110 hover:bg-gold hover:text-midnight hover:border-gold transition-all duration-300 z-20 group-hover:opacity-100 opacity-0 group-hover:translate-y-0 translate-y-4">
                                        <Play fill="currentColor" size={24} className="ml-1" />
                                    </button>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-8 flex-grow flex flex-col">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-gold transition-colors">{teacher.name}</h3>
                                    <p className="text-gray-400 font-medium">{teacher.role}</p>
                                </div>

                                <div className="flex justify-between items-center bg-black/20 rounded-xl p-4 mb-6 text-sm">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center text-gold mb-1 gap-1">
                                            <Star size={14} fill="currentColor" /> {teacher.stats.stars}
                                        </div>
                                        <div className="text-gray-500 text-xs">{t.teachers.reviews}</div>
                                    </div>
                                    <div className="w-[1px] h-8 bg-white/10"></div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center text-gold mb-1 gap-1">
                                            <Clock size={14} /> {teacher.stats.sessions}
                                        </div>
                                        <div className="text-gray-500 text-xs">{t.teachers.sessions}</div>
                                    </div>
                                    <div className="w-[1px] h-8 bg-white/10"></div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center text-gold mb-1 gap-1">
                                            <Award size={14} /> {teacher.stats.exp}
                                        </div>
                                        <div className="text-gray-500 text-xs">{t.teachers.years}</div>
                                    </div>
                                </div>

                                <p className="text-gray-300 text-sm leading-relaxed mb-8 flex-grow">
                                    {teacher.bio}
                                </p>

                                <Link href={`/teachers/${teacher.id}`} className="w-full py-4 bg-gold hover:bg-gold-shiny text-midnight font-bold rounded-xl transition-colors shadow-lg shadow-gold/10 mt-auto text-center block">
                                    {t.teachers.bookSession}
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
