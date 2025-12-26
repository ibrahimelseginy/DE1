"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Award, Play } from 'lucide-react';

const teachers = [
    {
        id: 1,
        name: "أ/ أسامة عيسى",
        role: "خبير اللغة الألمانية",
        stats: { stars: "4.9", sessions: "+1000", exp: "+4 سنوات" },
        bio: "متخصص في تحويل المبتدئين إلى متحدثين بطلاقة من خلال منهج تفاعلي يركز على احتياجاتك المهنية.",
    },
    {
        id: 2,
        name: "أ/ سارة محمد",
        role: "مدربة محادثة انجليزية",
        stats: { stars: "5.0", sessions: "+2500", exp: "+6 سنوات" },
        bio: "ساعدت مئات الطلاب على اجتياز اختبارات الآيلتس بفضل أسلوبها المبسط والعملي.",
    },
];

export default function Teachers() {
    return (
        <section className="py-24 bg-midnight" id="teachers">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-gold uppercase tracking-widest text-sm font-semibold mb-2 block">فريق العمل</span>
                    <h2 className="text-4xl font-bold text-white mb-4">معلمونا المعتمدون</h2>
                    <p className="text-gray-400">نخبة من أفضل المعلمين اختيروا بعناية لمساعدتك على تحقيق هدفك.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
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

                                {/* Play Button */}
                                <button className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:scale-110 hover:bg-gold hover:text-midnight hover:border-gold transition-all duration-300 z-20 group-hover:opacity-100 opacity-0 group-hover:translate-y-0 translate-y-4">
                                    <Play fill="currentColor" size={24} className="ml-1" />
                                </button>
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
                                        <div className="text-gray-500 text-xs">تقييم</div>
                                    </div>
                                    <div className="w-[1px] h-8 bg-white/10"></div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center text-gold mb-1 gap-1">
                                            <Clock size={14} /> {teacher.stats.sessions}
                                        </div>
                                        <div className="text-gray-500 text-xs">حصة</div>
                                    </div>
                                    <div className="w-[1px] h-8 bg-white/10"></div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center text-gold mb-1 gap-1">
                                            <Award size={14} /> {teacher.stats.exp}
                                        </div>
                                        <div className="text-gray-500 text-xs">سنوات</div>
                                    </div>
                                </div>

                                <p className="text-gray-300 text-sm leading-relaxed mb-8 flex-grow">
                                    {teacher.bio}
                                </p>

                                <button className="w-full py-4 bg-gold hover:bg-amber-400 text-midnight font-bold rounded-xl transition-colors shadow-lg shadow-gold/10 mt-auto">
                                    احجز حصة مع المعلم
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
