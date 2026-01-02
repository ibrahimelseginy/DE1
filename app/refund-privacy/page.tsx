"use client";
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingSocials from "../components/FloatingSocials";
import { motion } from 'framer-motion';
import { Shield, RefreshCw, Clock, AlertCircle, CheckCircle, Lock, Mail, Phone } from 'lucide-react';

export default function RefundPrivacyPage() {
    return (
        <main className="min-h-screen bg-midnight text-foreground font-sans selection:bg-gold selection:text-midnight overflow-x-hidden">
            <Navbar />

            <section className="pt-32 pb-20 relative">
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] -z-10"></div>

                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-4 py-1 rounded-full border border-gold/20 text-gold text-sm font-medium mb-6"
                        >
                            <Shield className="w-4 h-4 inline-block mr-2" />
                            الشفافية والثقة
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-lalezar text-white mb-6"
                        >
                            سياسة <span className="text-gold">الاسترداد والخصوصية</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 max-w-2xl mx-auto text-lg"
                        >
                            نحن في DE1 Academy نلتزم بتقديم أفضل تجربة تعليمية مع ضمان حقوقك وخصوصيتك
                        </motion.p>
                    </div>

                    {/* Refund Policy Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-12"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                                <RefreshCw className="w-6 h-6 text-gold" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">سياسة الاسترداد</h2>
                        </div>

                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            نحن في DE1 نهدف إلى تقديم أفضل تجربة تعليمية. إذا لم تكن راضياً تماماً عن الكورس، فنحن هنا للمساعدة وفقاً للشروط التالية:
                        </p>

                        <div className="space-y-6">
                            {/* Before Start */}
                            <div className="bg-white/5 border border-green-500/20 rounded-2xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 mt-1">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">قبل البدء</h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            يمكن استرداد <span className="text-gold font-bold">كامل المبلغ</span> في حال إلغاء الاشتراك قبل موعد أول حصة بـ <span className="text-gold font-bold">48 ساعة</span> على الأقل.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* After Start */}
                            <div className="bg-white/5 border border-yellow-500/20 rounded-2xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0 mt-1">
                                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">بعد البدء</h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            في حال حضور حصة واحدة فقط وعدم الرغبة في الاستمرار، يتم خصم قيمة الحصة الواحدة + <span className="text-gold font-bold">10% رسوم إدارية</span>، واسترداد باقي المبلغ.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Rescheduling */}
                            <div className="bg-white/5 border border-blue-500/20 rounded-2xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-1">
                                        <Clock className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">تأجيل / إعادة جدولة الحصص</h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            يحق للطالب إعادة جدولة الحصص في مدة أقلها <span className="text-gold font-bold">24 ساعة</span> قبل موعدها.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Absence */}
                            <div className="bg-white/5 border border-red-500/20 rounded-2xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-1">
                                        <AlertCircle className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">الغياب</h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            لا يتم استرداد أي مبالغ في حال غياب الطالب عن الحصص.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Refund Process */}
                        <div className="mt-10 pt-8 border-t border-white/10">
                            <h3 className="text-2xl font-bold text-white mb-6">آلية استرداد الأموال</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-midnight font-bold text-sm shrink-0 mt-1">1</div>
                                    <p className="text-gray-300">يتم تقديم طلب الاسترداد عبر مراسلتنا على البريد الإلكتروني أو عبر رقم الواتساب المخصص.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-midnight font-bold text-sm shrink-0 mt-1">2</div>
                                    <p className="text-gray-300">يتم معالجة الطلب خلال <span className="text-gold font-bold">7 إلى 14 يوم عمل</span>.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-midnight font-bold text-sm shrink-0 mt-1">3</div>
                                    <p className="text-gray-300">يتم استرداد المبلغ بنفس وسيلة الدفع الأصلية (فيزا، محفظة إلكترونية)، مع ملاحظة أن أي رسوم تحويل إدارية تفرضها بوابة الدفع يتحملها العميل.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Privacy Policy Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-12"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                                <Lock className="w-6 h-6 text-gold" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">سياسة الخصوصية</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                                <h3 className="text-xl font-bold text-white mb-3">جمع البيانات</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    نجمع فقط البيانات اللازمة (الاسم، البريد الإلكتروني، الهاتف) لتوفير الدخول للكورسات وإصدار الشهادات.
                                </p>
                            </div>

                            <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                                <h3 className="text-xl font-bold text-white mb-3">الطرف الثالث</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    نحن <span className="text-gold font-bold">لا نقوم ببيع أو مشاركة</span> بياناتك الشخصية مع أي جهات خارجية لأغراض تسويقية.
                                </p>
                            </div>

                            <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                                <h3 className="text-xl font-bold text-white mb-3">أمان البيانات</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    نستخدم أحدث تقنيات التشفير والحماية لضمان سرية وأمان بياناتك الشخصية.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 rounded-3xl p-8 md:p-12 text-center"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">هل لديك أسئلة؟</h3>
                        <p className="text-gray-300 mb-8">تواصل معنا وسنكون سعداء بمساعدتك</p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a
                                href="https://wa.me/201551582735"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-shiny text-midnight font-bold rounded-xl transition-all"
                            >
                                <Phone className="w-5 h-5" />
                                واتساب
                            </a>
                            <a
                                href="mailto:info@de1academy.com"
                                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/10"
                            >
                                <Mail className="w-5 h-5" />
                                البريد الإلكتروني
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
            <FloatingSocials />
        </main>
    );
}
