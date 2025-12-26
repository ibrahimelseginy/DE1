"use client";
import React from 'react';
import { Instagram, Facebook, Smartphone, ArrowLeft } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-midnight border-t border-white/5 pt-0">

            {/* CTA Section */}
            <div className="relative py-20 bg-black/30 overflow-hidden">
                <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full scale-150 opacity-20"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">ابدأ رحلتك نحو الإتقان اليوم</h2>
                    <p className="text-xl text-gray-400 mb-10 font-light">
                        لا انتظار لاكتمال المجموعات.. ابدأ فوراً مع معلمك الخاص
                    </p>
                    <a href="/teachers" className="px-10 py-5 bg-gold hover:bg-gold-shiny text-midnight font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(235,201,123,0.25)] flex items-center justify-center gap-3 mx-auto">
                        احجز حصتك التجريبية الآن
                        <ArrowLeft className="w-6 h-6" />
                    </a>
                </div>
            </div>

            {/* Footer Links */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-right">

                    {/* Brand & Social */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-3xl font-bold text-gold mb-6">DE1 Academy</h3>
                        <p className="text-gray-400 mb-8 leading-relaxed max-w-xs">
                            لأن أهدافك ليست كغيرك. نحن نبني لك مساراً تعليمياً يركز (فقط) على ما تحتاجه للوصول لهدفك.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-midnight transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-midnight transition-all">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-gold font-bold mb-6 text-lg">روابط سريعة</h4>
                        <ul className="space-y-4">
                            <li><a href="/" className="text-gray-400 hover:text-gold transition-colors">الرئيسية</a></li>
                            <li><a href="/why-de1" className="text-gray-400 hover:text-gold transition-colors">لماذا DE1؟</a></li>
                            <li><a href="/teachers" className="text-gray-400 hover:text-gold transition-colors">معلمونا</a></li>
                            <li><a href="/teachers" className="text-gray-400 hover:text-gold transition-colors">احجز حصتك</a></li>
                        </ul>
                    </div>

                    {/* Tracks */}
                    <div>
                        <h4 className="text-gold font-bold mb-6 text-lg">المسارات التعليمية</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">المحادثة بطلاقة</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">التحضير للاختبارات الدولية</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">التجهيز لسوق العمل</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">صمم مسارك الخاص</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-gold font-bold mb-6 text-lg">معلومات التواصل</h4>
                        <div className="flex flex-col gap-4 text-gray-400 items-center md:items-start">
                            <div className="flex items-center gap-3">
                                <Smartphone size={20} className="text-gold" />
                                <span dir="ltr">+20 128 905 0022</span>
                            </div>
                            <div className="mt-4">
                                <a href="https://wa.me/201289050022" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-medium">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    استشارة تعليمية مجانية
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="border-t border-white/5 mt-16 pt-8 text-center text-gray-600 text-sm">
                    All Rights Reserved | DE1 Academy 2025 ©
                </div>
            </div>
        </footer>
    );
}
