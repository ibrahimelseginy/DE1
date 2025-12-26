"use client";
import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingSocials from "../components/FloatingSocials";
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, X } from 'lucide-react';

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newReview, setNewReview] = useState({ name: '', role: '', content: '', rating: 5, image: '' });

    React.useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch('/api/reviews');
                if (res.ok) {
                    const data = await res.json();
                    setReviews(data);
                }
            } catch (error) {
                console.error("Failed to fetch reviews", error);
            }
        };
        fetchReviews();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const reviewToAdd = {
            ...newReview,
            image: newReview.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(newReview.name)}&background=c89e4c&color=0B1121`
        };

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewToAdd),
            });

            if (res.ok) {
                const updatedReviews = await res.json();
                setReviews(updatedReviews);
                setIsModalOpen(false);
                setNewReview({ name: '', role: '', content: '', rating: 5, image: '' });
                alert("شكراً لك! تم إضافة تقييمك بنجاح.");
            } else {
                alert(" حدث خطأ أثناء حفظ التقييم. حاول مرة أخرى.");
            }
        } catch (error) {
            console.error("Error submitting review", error);
            alert("حدث خطأ في الاتصال.");
        }
    };

    return (
        <main className="min-h-screen bg-midnight text-foreground font-sans selection:bg-gold selection:text-midnight overflow-x-hidden">
            <Navbar />

            <section className="pt-32 pb-20 relative">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] -z-10"></div>

                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-lalezar text-white mb-6">
                            قصص نجاح <span className="text-gold">طلابنا</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg hover:text-gray-300 transition-colors">
                            نفخر بكوننا جزءاً من رحلة نجاح مئات الطلاب حول العالم. هذه بعض آراءهم الحقيقية في تجربتهم معنا.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.map((review, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
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

                                <p className="text-gray-300 leading-relaxed mb-8 relative z-10 min-h-[80px]">
                                    "{review.content}"
                                </p>

                                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                                    <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full border border-gold/20" />
                                    <div>
                                        <h4 className="text-white font-bold text-sm">{review.name}</h4>
                                        <p className="text-gold text-xs">{review.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Submit Review CTA */}
                    <div className="mt-20 text-center bg-white/5 border border-white/10 rounded-3xl p-12 max-w-4xl mx-auto backdrop-blur-sm">
                        <h3 className="text-2xl font-bold text-white mb-4">هل أنت طالب حالي في DE1 Academy؟</h3>
                        <p className="text-gray-400 mb-8">شاركنا تجربتك وساعد الآخرين في اتخاذ القرار الصحيح.</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-8 py-3 bg-gold text-midnight font-bold rounded-xl hover:bg-gold-shiny transition-colors text-lg" // Increased text size slightly
                        >
                            أضف تقييمك
                        </button>
                    </div>
                </div>
            </section>

            {/* Review Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-midnight border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h3 className="text-2xl font-lalezar text-white mb-6 text-center">أضف تقييمك</h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">الاسم</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                                        value={newReview.name}
                                        onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">الوظيفة / الدراسة</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                                        value={newReview.role}
                                        onChange={e => setNewReview({ ...newReview, role: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">صورة شخصية (اختياري)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none transition-colors file:bg-gold file:text-midnight file:border-0 file:rounded-lg file:px-4 file:py-1 file:mr-4 file:font-semibold hover:file:bg-gold-shiny"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const imageUrl = URL.createObjectURL(file);
                                                setNewReview({ ...newReview, image: imageUrl });
                                            }
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">التقييم</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setNewReview({ ...newReview, rating: star })}
                                                className="transition-transform hover:scale-110 focus:outline-none"
                                            >
                                                <Star
                                                    className={`w-8 h-8 transition-colors ${star <= newReview.rating
                                                        ? "text-gold fill-gold"
                                                        : "text-gray-600 fill-none"
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">رأيك</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none transition-colors resize-none"
                                        value={newReview.content}
                                        onChange={e => setNewReview({ ...newReview, content: e.target.value })}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gold hover:bg-gold-shiny text-midnight font-bold py-4 rounded-xl transition-colors mt-4"
                                >
                                    نشر التقييم
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer />
            <FloatingSocials />
        </main>
    );
}
