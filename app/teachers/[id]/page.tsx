"use client";
import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FloatingSocials from "../../components/FloatingSocials";
import { teachers } from '../../data/teachers';
import { useParams } from 'next/navigation';
import { Star, Clock, Award, CheckCircle, User, Phone, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TeacherDetailsPage() {
    const params = useParams();
    const teacherId = Number(params.id);
    const teacher = teachers.find(t => t.id === teacherId);

    const [formData, setFormData] = useState({ name: '', phone: '' });
    const [submitted, setSubmitted] = useState(false);

    if (!teacher) {
        return (
            <main className="min-h-screen bg-midnight text-foreground font-sans">
                <Navbar />
                <div className="min-h-[60vh] flex items-center justify-center pt-20">
                    <p className="text-white text-xl">المعلم غير موجود</p>
                </div>
                <Footer />
            </main>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would send the data to a backend
        console.log("Booking:", { teacher: teacher.name, ...formData });
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-midnight text-foreground font-sans selection:bg-gold selection:text-midnight overflow-x-hidden">
            <Navbar />
            <div className="pt-32 pb-20 container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Teacher Details Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8 order-2 lg:order-1"
                    >
                        <div className="bg-[#111827] rounded-3xl p-8 border border-white/5 shadow-2xl">
                            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-right" dir="rtl">
                                {/* Image Placeholder */}
                                <div className="w-32 h-32 rounded-full bg-slate-800 border-2 border-gold flex items-center justify-center text-gray-500 shrink-0 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-midnight to-transparent opacity-50"></div>
                                    <span className="z-10 text-sm">صورة المعلم</span>
                                </div>
                                <div className="flex-grow">
                                    <h1 className="text-3xl font-bold text-white mb-2">{teacher.name}</h1>
                                    <p className="text-gold text-lg font-medium mb-4">{teacher.role}</p>

                                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                        <div className="bg-white/5 px-4 py-2 rounded-lg flex items-center gap-2 border border-white/5">
                                            <Star className="text-gold w-4 h-4" fill="currentColor" />
                                            <span className="text-sm text-gray-300">{teacher.stats.stars} تقييم</span>
                                        </div>
                                        <div className="bg-white/5 px-4 py-2 rounded-lg flex items-center gap-2 border border-white/5">
                                            <Clock className="text-gold w-4 h-4" />
                                            <span className="text-sm text-gray-300">{teacher.stats.sessions} حصة</span>
                                        </div>
                                        <div className="bg-white/5 px-4 py-2 rounded-lg flex items-center gap-2 border border-white/5">
                                            <Award className="text-gold w-4 h-4" />
                                            <span className="text-sm text-gray-300">{teacher.stats.exp} خبرة</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-white/10 pt-8" dir="rtl">
                                <h3 className="text-xl font-bold text-white mb-4">نبذة عن المعلم</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {teacher.bio}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Booking Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#111827] rounded-3xl p-8 border border-white/5 border-t-4 border-t-gold shadow-2xl order-1 lg:order-2"
                    >
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-bold text-white mb-2">احجز حصة مجانية</h2>
                            <p className="text-gray-400 text-sm">سجل بياناتك وسنتواصل معك لتحديد الموعد</p>
                        </div>

                        {submitted ? (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center"
                            >
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">تم التسجيل بنجاح!</h3>
                                <p className="text-gray-400">سيتواصل معك فريقنا قريباً لتأكيد الحجز.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 text-gold text-sm hover:underline"
                                >
                                    حجز موعد آخر
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">الاسم ثلاثي</label>
                                    <div className="relative">
                                        <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pr-12 pl-4 text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-gray-600"
                                            placeholder="أدخل اسمك بالكامل"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">رقم الواتساب</label>
                                    <div className="relative">
                                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pr-12 pl-4 text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-gray-600 font-sans"
                                            placeholder="01xxxxxxxxx"
                                            style={{ direction: 'ltr', textAlign: 'right' }}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gold hover:bg-gold-shiny text-midnight font-bold rounded-xl transition-colors shadow-lg shadow-gold/10 flex items-center justify-center gap-2 mt-4 group"
                                >
                                    <span>تأكيد الحجز</span>
                                    <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
            <Footer />
            <FloatingSocials />
        </main>
    );
}
