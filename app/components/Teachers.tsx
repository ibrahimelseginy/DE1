"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Award, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import Link from 'next/link';

export default function Teachers() {
    const { t, language } = useLanguage();
    const [currency, setCurrency] = React.useState<'EGP' | 'USD' | 'SAR' | 'KWD'>('EGP');
    const [teachersList, setTeachersList] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const res = await fetch('/api/teachers');
                if (res.ok) {
                    const data = await res.json();
                    setTeachersList(data);
                }
            } catch (error) {
                console.error("Failed to load teachers", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeachers();
    }, []);

    const currencies = [
        { code: 'EGP', label: 'EGP 🇪🇬' },
        { code: 'SAR', label: 'SAR 🇸🇦' },
        { code: 'USD', label: 'USD 🇺🇸' },
        { code: 'KWD', label: 'KWD 🇰🇼' },
    ];

    return (
        <section className="py-24 bg-midnight" id="teachers">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    {/* <span className="text-gold uppercase tracking-widest text-sm font-semibold mb-2 block">Team</span> */}
                    <h2 className="text-4xl font-bold text-white mb-4">{t.teachers.title}</h2>
                    <p className="text-gray-400 mb-8">{t.teachers.subtitle}</p>

                    {/* Currency Selector */}
                    <div className="inline-flex bg-white/5 p-1 rounded-xl border border-white/10">
                        {currencies.map((curr) => (
                            <button
                                key={curr.code}
                                onClick={() => setCurrency(curr.code as any)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${currency === curr.code
                                    ? 'bg-gold text-midnight shadow-lg'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {curr.label}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-[#111827] rounded-3xl overflow-hidden border border-white/5 animate-pulse">
                                <div className="h-64 bg-slate-800"></div>
                                <div className="p-6 space-y-4">
                                    <div className="h-6 bg-slate-700 rounded w-3/4"></div>
                                    <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                                    <div className="h-20 bg-slate-700 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                        {teachersList.map((teacher, idx) => {
                            const priceData = teacher.pricing?.prices?.[currency] || { price: 0, oldPrice: 0 };

                            // Helper to get localized content safely
                            const getContent = (content: any) => {
                                if (typeof content === 'string') return content;
                                return content?.[language] || content?.['ar'] || '';
                            };

                            return (
                                <motion.div
                                    key={teacher.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.03, duration: 0.3 }}
                                    className="bg-[#111827] rounded-3xl overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-300 group shadow-lg flex flex-col"
                                >
                                    {/* Image Area */}
                                    <div className="relative h-64 bg-slate-800 flex items-center justify-center overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent z-10"></div>
                                        {/* Placeholder for Image */}
                                        {/* <div className="text-gray-600 text-sm font-light">[صورة معلم]</div> */}
                                        <img src={teacher.image} alt={getContent(teacher.name)} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Play Button - Only if video exists, but for now generic */}
                                        {teacher.videoUrl && (
                                            <a
                                                href={teacher.videoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:scale-110 hover:bg-gold hover:text-midnight hover:border-gold transition-all duration-300 z-20 group-hover:opacity-100 opacity-0 group-hover:translate-y-0 translate-y-4"
                                            >
                                                <Play fill="currentColor" size={24} className="ml-1" />
                                            </a>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex-grow flex flex-col">
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-gold transition-colors">{getContent(teacher.name)}</h3>
                                            <p className="text-gray-400 font-medium">{getContent(teacher.role)}</p>
                                        </div>

                                        {/* Pricing Section */}
                                        <div className="flex items-center justify-between mb-6 bg-gold/5 p-4 rounded-xl border border-gold/10">
                                            <div>
                                                <div className="text-gray-400 text-xs mb-1 line-through opacity-70">
                                                    {priceData.oldPrice} {currency}
                                                </div>
                                                <div className="text-gold font-bold text-xl flex items-baseline gap-1">
                                                    {priceData.price} <span className="text-sm font-medium">{currency}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                                                    <Clock size={12} /> Duration
                                                </div>
                                                <div className="text-white font-bold">
                                                    {teacher.pricing?.duration || 70} Min
                                                </div>
                                            </div>
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
                                                    <Award size={14} /> {getContent(teacher.stats.exp)}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-300 text-sm leading-relaxed mb-8 flex-grow">
                                            {getContent(teacher.bio)}
                                        </p>

                                        <Link href={`/teachers/${teacher.id}`} className="w-full py-4 bg-gold hover:bg-gold-shiny text-midnight font-bold rounded-xl transition-colors shadow-lg shadow-gold/10 mt-auto text-center block">
                                            {t.teachers.bookSession}
                                        </Link>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
