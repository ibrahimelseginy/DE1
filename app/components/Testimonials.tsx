"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Testimonials() {
    const { t, language } = useLanguage();
    const isRTL = language === 'ar';

    const testimonials = t.testimonials.items.map((item, index) => ({
        ...item,
        rating: 5,
        image: undefined
    }));

    return (
        <section className="py-24 bg-midnight relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-lalezar text-white mb-4"
                    >
                        {t.testimonials.title}
                    </motion.h2>
                    <div className="h-1 w-20 bg-gold mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {testimonials.map((review, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/5 border border-white/5 p-8 rounded-2xl hover:border-gold/30 transition-all duration-300 relative group"
                        >
                            <Quote className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} text-gold/20 w-10 h-10 group-hover:text-gold/40 transition-colors transform ${!isRTL ? 'scale-x-[-1]' : ''}`} />

                            <div className="flex gap-1 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                                ))}
                            </div>

                            <p className="text-gray-300 leading-relaxed mb-8 relative z-10">
                                "{review.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                {review.image ? (
                                    <Image src={review.image} alt={review.name} width={48} height={48} className="w-12 h-12 rounded-full border border-gold/20 object-cover" />
                                ) : (
                                    <div className="w-12 h-12 rounded-full border border-gold/20 bg-white/5 flex items-center justify-center text-2xl">
                                        👤
                                    </div>
                                )}
                                <div>
                                    <h4 className="text-white font-bold text-sm">{review.name}</h4>
                                    <p className="text-gold text-xs">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <a href="/reviews" className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors border-b border-gold pb-1 hover:border-white">
                        {t.testimonials.readMore}
                        <ArrowLeft className={`w-4 h-4 ${!isRTL ? 'rotate-180' : ''}`} />
                    </a>
                </div>
            </div>
        </section>
    );
}
