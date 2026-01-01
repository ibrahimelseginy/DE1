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

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        goal: '',
        level: '',
        timeline: '',
        days: [] as string[],
        times: [] as string[],
        source: ''
    });
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
                            <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
                                {/* Contact Info */}
                                <div className="space-y-4">
                                    <h3 className="text-white font-bold text-lg border-r-4 border-gold pr-3">بيانات التواصل</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">الاسم</label>
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
                                </div>

                                <div className="w-full h-[1px] bg-white/10 my-6"></div>

                                {/* Goals */}
                                <div className="space-y-3">
                                    <h3 className="text-white font-bold text-lg border-r-4 border-gold pr-3">ما هو هدفك؟</h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {['تعلم اللغة للعمل', 'تحسين المحادثة', 'التحضير لاختبار', 'تأسيس طفل'].map((goal) => (
                                            <label key={goal} className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${formData.goal === goal ? 'bg-gold/10 border-gold text-white' : 'bg-black/20 border-white/10 text-gray-400 hover:bg-white/5'}`}>
                                                <input
                                                    type="radio"
                                                    name="goal"
                                                    value={goal}
                                                    checked={formData.goal === goal}
                                                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                                                    className="hidden"
                                                />
                                                <span className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${formData.goal === goal ? 'border-gold' : 'border-gray-500'}`}>
                                                    {formData.goal === goal && <div className="w-2 h-2 rounded-full bg-gold"></div>}
                                                </span>
                                                <span className="mr-2">{goal}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Level */}
                                <div className="space-y-3">
                                    <h3 className="text-white font-bold text-lg border-r-4 border-gold pr-3">ما هو مستواك الحالي؟</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['مبتدئ', 'أساسيات', 'متوسط', 'متقدم'].map((level) => (
                                            <label key={level} className={`flex items-center justify-center text-center p-3 rounded-xl border cursor-pointer transition-all ${formData.level === level ? 'bg-gold/10 border-gold text-white' : 'bg-black/20 border-white/10 text-gray-400 hover:bg-white/5'}`}>
                                                <input
                                                    type="radio"
                                                    name="level"
                                                    value={level}
                                                    checked={formData.level === level}
                                                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                                    className="hidden"
                                                />
                                                <span>{level}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="space-y-3">
                                    <h3 className="text-white font-bold text-lg border-r-4 border-gold pr-3">متى تريد تحقيق هدفك؟</h3>
                                    <select
                                        value={formData.timeline}
                                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled className="bg-gray-900">اختر المدة...</option>
                                        <option value="1-4 weeks" className="bg-gray-900">1-4 أسابيع</option>
                                        <option value="1-3 months" className="bg-gray-900">1-3 أشهر</option>
                                        <option value="3-6 months" className="bg-gray-900">3-6 أشهر</option>
                                        <option value="open" className="bg-gray-900">وقت مفتوح</option>
                                        <option value="one-lesson" className="bg-gray-900">درس واحد فقط</option>
                                    </select>
                                </div>

                                {/* Availability */}
                                <div className="space-y-3">
                                    <h3 className="text-white font-bold text-lg border-r-4 border-gold pr-3">الأوقات المناسبة</h3>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-2">الأيام</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day) => (
                                                <button
                                                    key={day}
                                                    type="button"
                                                    onClick={() => {
                                                        const days = formData.days.includes(day)
                                                            ? formData.days.filter(d => d !== day)
                                                            : [...formData.days, day];
                                                        setFormData({ ...formData, days });
                                                    }}
                                                    className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${formData.days.includes(day) ? 'bg-gold text-midnight border-gold font-bold' : 'bg-transparent border-white/20 text-gray-400 hover:border-white/40'}`}
                                                >
                                                    {day}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-2">الفترات</p>
                                        <div className="flex gap-2">
                                            {['صباحاً', 'ظهراً', 'مساءً'].map((time) => (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    onClick={() => {
                                                        const times = formData.times.includes(time)
                                                            ? formData.times.filter(t => t !== time)
                                                            : [...formData.times, time];
                                                        setFormData({ ...formData, times });
                                                    }}
                                                    className={`flex-1 py-2 rounded-lg text-sm border transition-all ${formData.times.includes(time) ? 'bg-gold text-midnight border-gold font-bold' : 'bg-transparent border-white/20 text-gray-400 hover:border-white/40'}`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Source */}
                                <div className="space-y-3">
                                    <h3 className="text-white font-bold text-lg border-r-4 border-gold pr-3">كيف سمعت عنا؟</h3>
                                    <select
                                        value={formData.source}
                                        onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled className="bg-gray-900">اختر المصدر...</option>
                                        <option value="friend" className="bg-gray-900">ترشيح من صديق</option>
                                        <option value="facebook" className="bg-gray-900">فيسبوك</option>
                                        <option value="instagram" className="bg-gray-900">انستجرام</option>
                                        <option value="tiktok" className="bg-gray-900">تيك توك</option>
                                        <option value="google" className="bg-gray-900">بحث جوجل</option>
                                        <option value="other" className="bg-gray-900">أخرى</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gold hover:bg-gold-shiny text-midnight font-bold rounded-xl transition-colors shadow-lg shadow-gold/10 flex items-center justify-center gap-2 mt-8 group"
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
