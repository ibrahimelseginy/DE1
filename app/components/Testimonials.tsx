"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowLeft } from 'lucide-react';

const testimonials = [
    {
        name: "أحمد محمد",
        role: "مهندس برمجيات",
        content: "تجربة تعليمية ممتازة. لم أكن أتخيل أن أتحدث الألمانية بهذه الطلاقة في وقت قصير. التركيز على المحادثة كان هو المفتاح.",
        rating: 5,
        image: "https://ui-avatars.com/api/?name=أحمد+محمد&background=c89e4c&color=0B1121"
    },
    {
        name: "سارة علي",
        role: "طبيبة",
        content: "كنت أحتاج لاجتياز اختبار B2 للسفر، وبفضل الله ثم DE1 Academy حققت الدرجة المطلوبة من أول محاولة. شكراً لكم!",
        rating: 5,
        image: "https://ui-avatars.com/api/?name=سارة+علي&background=c89e4c&color=0B1121"
    },
    {
        name: "عمر خالد",
        role: "طالب جامعي",
        content: "أفضل ما في الأكاديمية هو المرونة في المواعيد واختيار المعلم. لا يوجد ضغط، وأتعلم بالسرعة التي تناسبني.",
        rating: 5,
        image: "https://ui-avatars.com/api/?name=عمر+خالد&background=c89e4c&color=0B1121"
    }
];

export default function Testimonials() {
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
                        ماذا يقول طلابنا؟
                    </motion.h2>
                    <div className="h-1 w-20 bg-gold mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {testimonials.map((review, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/5 border border-white/5 p-8 rounded-2xl hover:border-gold/30 transition-all duration-300 relative group"
                        >
                            <Quote className="absolute top-6 left-6 text-gold/20 w-10 h-10 group-hover:text-gold/40 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                                ))}
                            </div>

                            <p className="text-gray-300 leading-relaxed mb-8 relative z-10">
                                "{review.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full border border-gold/20" />
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
                        شاهد المزيد من قصص النجاح
                        <ArrowLeft className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
}
