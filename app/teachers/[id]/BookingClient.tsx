"use client";
import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FloatingSocials from "../../components/FloatingSocials";
import { Star, Clock, Award, CheckCircle, User, Phone, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function BookingClient({ teacher }: { teacher: any }) {
    const { t, dir, language } = useLanguage();

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

    // Helper to get localized content
    const getContent = (content: any) => {
        if (typeof content === 'string') return content;
        return content?.[language] || content?.['ar'] || '';
    };

    if (!teacher) {
        return (
            <main className="min-h-screen bg-midnight text-foreground">
                <Navbar />
                <div className="min-h-[60vh] flex items-center justify-center pt-20">
                    <p className="text-white text-xl">{t.teachers.notFound}</p>
                </div>
                <Footer />
            </main>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name.trim()) {
            alert(language === 'ar' ? 'من فضلك أدخل اسمك' : 'Please enter your name');
            return;
        }

        if (!formData.phone.trim() || formData.phone.length < 10) {
            alert(language === 'ar' ? 'من فضلك أدخل رقم هاتف صحيح (10 أرقام على الأقل)' : 'Please enter a valid phone number (at least 10 digits)');
            return;
        }

        if (!formData.goal) {
            alert(language === 'ar' ? 'من فضلك اختر هدفك من التعلم' : 'Please select your learning goal');
            return;
        }

        if (!formData.level) {
            alert(language === 'ar' ? 'من فضلك اختر مستواك الحالي' : 'Please select your current level');
            return;
        }

        if (!formData.timeline) {
            alert(language === 'ar' ? 'من فضلك اختر الإطار الزمني' : 'Please select your timeline');
            return;
        }

        if (formData.days.length === 0) {
            alert(language === 'ar' ? 'من فضلك اختر يوم واحد على الأقل' : 'Please select at least one day');
            return;
        }

        if (formData.times.length === 0) {
            alert(language === 'ar' ? 'من فضلك اختر وقت واحد على الأقل' : 'Please select at least one time');
            return;
        }

        if (!formData.source) {
            alert(language === 'ar' ? 'من فضلك اختر كيف سمعت عنا' : 'Please select how you heard about us');
            return;
        }

        // Use Arabic name for admin dashboard consistency
        const teacherNameForBooking = teacher.name?.ar || getContent(teacher.name);

        const bookingData = {
            teacherId: teacher.id,
            teacher: teacherNameForBooking,
            ...formData,
            submittedAt: new Date().toISOString(),
            status: 'قيد الانتظار' // Pending
        };

        try {
            // 1. Try to save to Database (API)
            let bookingId = 'pending';
            try {
                const res = await fetch('/api/bookings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookingData)
                });

                if (res.ok) {
                    const booking = await res.json();
                    bookingId = booking.id;
                } else {
                    console.error('Failed to save booking to DB');
                }
            } catch (apiError) {
                console.error('API Error:', apiError);
            }

            // 2. Send WhatsApp notification (Always happens)
            const whatsappMessage = encodeURIComponent(
                `🎓 *حجز جديد - DE1 Academy*\n\n` +
                `👤 *الاسم:* ${formData.name}\n` +
                `📱 *الهاتف:* ${formData.phone}\n` +
                `👨‍🏫 *المعلم:* ${teacherNameForBooking}\n` +
                `🎯 *الهدف:* ${formData.goal}\n` +
                `📊 *المستوى:* ${formData.level}\n` +
                `⏰ *الإطار الزمني:* ${formData.timeline}\n` +
                `📅 *الأيام:* ${formData.days.join(', ')}\n` +
                `🕐 *الأوقات:* ${formData.times.join(', ')}\n` +
                `📢 *المصدر:* ${formData.source}\n` +
                `🆔 *رقم الحجز:* ${bookingId}\n\n` +
                `_تم الإرسال من موقع DE1 Academy_`
            );

            // Open WhatsApp
            const whatsappNumber = '201551582735';
            window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');

            // 3. Show success UI
            setSubmitted(true);

        } catch (err) {
            console.error('Unexpected error:', err);
            // Even on unexpected error, try to show success if possible or alert
            setSubmitted(true);
        }
    };

    return (
        <main className="min-h-screen bg-midnight text-foreground selection:bg-gold selection:text-midnight overflow-x-hidden">
            <Navbar />
            <div className="pt-32 pb-20 container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Teacher Details Side */}
                    <motion.div
                        initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8 order-2 lg:order-1"
                    >
                        <div className="bg-[#111827] rounded-3xl p-8 border border-white/5 shadow-2xl">
                            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-start">
                                {/* Image Placeholder */}
                                <div className="w-32 h-32 rounded-full bg-slate-800 border-2 border-gold flex items-center justify-center text-gray-500 shrink-0 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-midnight to-transparent opacity-50"></div>
                                    <img src={teacher.image} alt={getContent(teacher.name)} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow">
                                    <h1 className="text-3xl font-extrabold text-white mb-2">{getContent(teacher.name)}</h1>
                                    <p className="text-gold text-xl font-bold mb-4">{getContent(teacher.role)}</p>

                                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                        <div className="bg-white/5 px-4 py-2 rounded-lg flex items-center gap-2 border border-white/5">
                                            <Star className="text-gold w-4 h-4" fill="currentColor" />
                                            <span className="text-sm font-semibold text-gray-300">{teacher.stats.stars} {t.teachers.reviews}</span>
                                        </div>
                                        <div className="bg-white/5 px-4 py-2 rounded-lg flex items-center gap-2 border border-white/5">
                                            <Clock className="text-gold w-4 h-4" />
                                            <span className="text-sm font-semibold text-gray-300">{teacher.stats.sessions} {t.teachers.sessions}</span>
                                        </div>
                                        <div className="bg-white/5 px-4 py-2 rounded-lg flex items-center gap-2 border border-white/5">
                                            <Award className="text-gold w-4 h-4" />
                                            <span className="text-sm font-semibold text-gray-300">{getContent(teacher.stats.exp)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-white/10 pt-8">
                                <h3 className="text-2xl font-bold text-white mb-4">{t.teachers.bio}</h3>
                                <p className="text-gray-300 font-medium leading-relaxed text-lg">
                                    {getContent(teacher.bio)}
                                </p>

                                {teacher.videoUrl && (
                                    <div className="mt-8">
                                        <h3 className="text-2xl font-bold text-white mb-4">{t.teachers.video}</h3>
                                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                                            {teacher.videoUrl.includes('youtube') || teacher.videoUrl.includes('youtu.be') ? (
                                                <iframe
                                                    src={teacher.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                                                    className="w-full h-full"
                                                    title="Teacher Video"
                                                    allowFullScreen
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                ></iframe>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-black/50 text-gray-400">
                                                    (Video Player Placeholder)
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Booking Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05, duration: 0.3 }}
                        className="bg-[#111827] rounded-3xl p-8 border border-white/5 border-t-4 border-t-gold shadow-2xl order-1 lg:order-2"
                    >
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-extrabold text-white mb-2">{t.booking.title}</h2>
                            <p className="text-gray-400 font-bold">{t.booking.subtitle}</p>
                        </div>

                        {submitted ? (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center"
                            >
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h3 className="text-xl font-extrabold text-white mb-2">{t.booking.successTitle}</h3>
                                <p className="text-gray-400 font-bold">{t.booking.successMessage}</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 text-gold font-extrabold hover:underline"
                                >
                                    {t.booking.bookAnother}
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6" dir={dir}>
                                {/* Contact Info */}
                                <div className="space-y-4">
                                    <h3 className={`text-white font-extrabold text-xl ${dir === 'rtl' ? 'border-r-4 pr-3' : 'border-l-4 pl-3'} border-gold`}>{t.booking.contactInfo}</h3>
                                    <div>
                                        <label className="block text-sm font-extrabold text-white mb-2">{t.booking.name}</label>
                                        <div className="relative">
                                            <User className={`absolute ${dir === 'rtl' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none`} />
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className={`w-full bg-black/20 border border-white/10 rounded-xl py-3 ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-white font-bold focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-gray-600`}
                                                placeholder={t.booking.namePlaceholder}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-extrabold text-white mb-2">{t.booking.phone}</label>
                                        <div className="relative">
                                            <Phone className={`absolute ${dir === 'rtl' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none`} />
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className={`w-full bg-black/20 border border-white/10 rounded-xl py-3 ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-white font-bold focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-gray-600 font-sans`}
                                                placeholder={t.booking.phonePlaceholder}
                                                style={{ direction: 'ltr', textAlign: dir === 'rtl' ? 'right' : 'left' }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-[1px] bg-white/10 my-6"></div>

                                {/* Goals */}
                                <div className="space-y-3">
                                    <h3 className={`text-white font-extrabold text-xl ${dir === 'rtl' ? 'border-r-4 pr-3' : 'border-l-4 pl-3'} border-gold`}>{t.booking.goalsTitle}</h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[
                                            { key: 'work', label: t.booking.goals.work },
                                            { key: 'speaking', label: t.booking.goals.speaking },
                                            { key: 'exam', label: t.booking.goals.exam },
                                            { key: 'kids', label: t.booking.goals.kids }
                                        ].map((item) => (
                                            <label key={item.key} className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${formData.goal === item.key ? 'bg-gold/10 border-gold text-white' : 'bg-black/20 border-white/10 text-gray-400 hover:bg-white/5'}`}>
                                                <input
                                                    type="radio"
                                                    name="goal"
                                                    value={item.key}
                                                    checked={formData.goal === item.key}
                                                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                                                    className="hidden"
                                                />
                                                <span className={`w-4 h-4 rounded-full border ${dir === 'rtl' ? 'ml-2' : 'mr-2'} flex items-center justify-center ${formData.goal === item.key ? 'border-gold' : 'border-gray-500'}`}>
                                                    {formData.goal === item.key && <div className="w-2 h-2 rounded-full bg-gold"></div>}
                                                </span>
                                                <span className="font-bold">{item.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Level */}
                                <div className="space-y-3">
                                    <h3 className={`text-white font-extrabold text-xl ${dir === 'rtl' ? 'border-r-4 pr-3' : 'border-l-4 pl-3'} border-gold`}>{t.booking.levelTitle}</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            { key: 'beginner', label: t.booking.levels.beginner },
                                            { key: 'basics', label: t.booking.levels.basics },
                                            { key: 'intermediate', label: t.booking.levels.intermediate },
                                            { key: 'advanced', label: t.booking.levels.advanced }
                                        ].map((item) => (
                                            <label key={item.key} className={`flex items-center justify-center text-center p-3 rounded-xl border cursor-pointer transition-all ${formData.level === item.key ? 'bg-gold/10 border-gold text-white' : 'bg-black/20 border-white/10 text-gray-400 hover:bg-white/5'}`}>
                                                <input
                                                    type="radio"
                                                    name="level"
                                                    value={item.key}
                                                    checked={formData.level === item.key}
                                                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                                    className="hidden"
                                                />
                                                <span className="font-bold">{item.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="space-y-3">
                                    <h3 className={`text-white font-extrabold text-xl ${dir === 'rtl' ? 'border-r-4 pr-3' : 'border-l-4 pl-3'} border-gold`}>{t.booking.timelineTitle}</h3>
                                    <select
                                        value={formData.timeline}
                                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white font-bold focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled className="bg-gray-900">{t.booking.timelinePlaceholder}</option>
                                        <option value="weeks" className="bg-gray-900">{t.booking.timelines.weeks}</option>
                                        <option value="months1" className="bg-gray-900">{t.booking.timelines.months1}</option>
                                        <option value="months3" className="bg-gray-900">{t.booking.timelines.months3}</option>
                                        <option value="open" className="bg-gray-900">{t.booking.timelines.open}</option>
                                        <option value="oneLesson" className="bg-gray-900">{t.booking.timelines.oneLesson}</option>
                                    </select>
                                </div>

                                {/* Availability */}
                                <div className="space-y-3">
                                    <h3 className={`text-white font-extrabold text-lg ${dir === 'rtl' ? 'border-r-4 pr-3' : 'border-l-4 pl-3'} border-gold`}>{t.booking.availabilityTitle}</h3>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 mb-2">{t.booking.daysLabel}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'].map((dayKey) => (
                                                <button
                                                    key={dayKey}
                                                    type="button"
                                                    onClick={() => {
                                                        const days = formData.days.includes(dayKey)
                                                            ? formData.days.filter(d => d !== dayKey)
                                                            : [...formData.days, dayKey];
                                                        setFormData({ ...formData, days });
                                                    }}
                                                    className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${formData.days.includes(dayKey) ? 'bg-gold text-midnight border-gold font-extrabold' : 'bg-transparent border-white/20 text-gray-400 hover:border-white/40 font-bold'}`}
                                                >
                                                    {t.booking.days[dayKey as keyof typeof t.booking.days]}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 mb-2">{t.booking.timesLabel}</p>
                                        <div className="flex gap-2">
                                            {['morning', 'afternoon', 'evening'].map((timeKey) => (
                                                <button
                                                    key={timeKey}
                                                    type="button"
                                                    onClick={() => {
                                                        const times = formData.times.includes(timeKey)
                                                            ? formData.times.filter(t => t !== timeKey)
                                                            : [...formData.times, timeKey];
                                                        setFormData({ ...formData, times });
                                                    }}
                                                    className={`flex-1 py-2 rounded-lg text-sm border transition-all ${formData.times.includes(timeKey) ? 'bg-gold text-midnight border-gold font-extrabold' : 'bg-transparent border-white/20 text-gray-400 hover:border-white/40 font-bold'}`}
                                                >
                                                    {t.booking.times[timeKey as keyof typeof t.booking.times]}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Source */}
                                <div className="space-y-3">
                                    <h3 className={`text-white font-extrabold text-lg ${dir === 'rtl' ? 'border-r-4 pr-3' : 'border-l-4 pl-3'} border-gold`}>{t.booking.sourceTitle}</h3>
                                    <select
                                        value={formData.source}
                                        onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white font-bold focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled className="bg-gray-900">{t.booking.sourcePlaceholder}</option>
                                        <option value="friend" className="bg-gray-900">{t.booking.sources.friend}</option>
                                        <option value="facebook" className="bg-gray-900">{t.booking.sources.facebook}</option>
                                        <option value="tiktok" className="bg-gray-900">{t.booking.sources.tiktok}</option>
                                        <option value="google" className="bg-gray-900">{t.booking.sources.google}</option>
                                        <option value="other" className="bg-gray-900">{t.booking.sources.other}</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gold hover:bg-gold-shiny text-midnight font-extrabold rounded-xl transition-colors shadow-lg shadow-gold/10 flex items-center justify-center gap-2 mt-8 group"
                                >
                                    <span>{t.booking.confirm}</span>
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
