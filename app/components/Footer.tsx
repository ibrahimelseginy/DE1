"use client";
import React from 'react';
import { Instagram, Facebook, Smartphone, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
    const { t, language } = useLanguage();
    const isRTL = language === 'ar';

    return (
        <footer className="bg-midnight border-t border-white/5 pt-0">

            {/* CTA Section */}
            <div className="relative py-20 bg-black/30 overflow-hidden">
                <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full scale-150 opacity-20"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.footer.ctaTitle}</h2>
                    <p className="text-xl text-gray-400 mb-10 font-light">
                        {t.footer.ctaSubtitle}
                    </p>
                    <a href="/teachers" className="px-8 py-4 bg-gold hover:bg-gold-shiny text-midnight font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(235,201,123,0.25)] inline-flex items-center justify-center gap-3 mx-auto">
                        {t.footer.ctaButton}
                        <ArrowLeft className={`w-3 h-3 relative top-[1px] ${!isRTL ? 'rotate-180' : ''}`} />
                    </a>
                </div>
            </div>

            {/* Footer Links */}
            <div className="container mx-auto px-4 py-16">
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>

                    {/* Brand & Social */}
                    <div className={`flex flex-col items-center ${isRTL ? 'md:items-start' : 'md:items-start'}`}>
                        <h3 className="text-3xl font-bold text-gold mb-6">DE1 Academy</h3>
                        <p className="text-gray-400 mb-8 leading-relaxed max-w-xs">
                            {t.footer.brandDescription}
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://www.instagram.com/de1.academy?igsh=MXVjb3FqenpvOHVpNw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-midnight transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-midnight transition-all">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-gold font-bold mb-6 text-lg">{t.footer.quickLinks}</h4>
                        <ul className="space-y-4">
                            <li><a href="/" className="text-gray-400 hover:text-gold transition-colors">{t.common.home}</a></li>
                            <li><a href="/why-de1" className="text-gray-400 hover:text-gold transition-colors">{t.common.about}</a></li>
                            <li><a href="/teachers" className="text-gray-400 hover:text-gold transition-colors">{t.common.teachers}</a></li>
                            <li><a href="/teachers" className="text-gray-400 hover:text-gold transition-colors">{t.common.bookNow}</a></li>
                        </ul>
                    </div>

                    {/* Tracks */}
                    <div>
                        <h4 className="text-gold font-bold mb-6 text-lg">{t.tracks.title}</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">{t.tracks.items.speaking.title}</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">{t.tracks.items.exams.title}</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">{t.tracks.items.business.title}</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">{t.tracks.items.custom.title}</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-gold font-bold mb-6 text-lg">{t.footer.contactInfo}</h4>
                        <div className={`flex flex-col gap-4 text-gray-400 items-center ${isRTL ? 'md:items-start' : 'md:items-start'}`}>
                            <a href="tel:+201555822735" className="flex items-center gap-3 hover:text-white transition-colors group">
                                <Smartphone size={20} className="text-gold group-hover:text-white transition-colors" />
                                <span dir="ltr" className="group-hover:text-gold transition-colors">+20 155 582 2735</span>
                            </a>
                            <div className="mt-4">
                                <a href="https://wa.me/201555822735" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-medium">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    {t.footer.freeConsultation}
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="border-t border-white/10 mt-16 pt-8 text-center">
                    <p className="text-white text-sm flex items-center justify-center gap-4 flex-wrap opacity-80 hover:opacity-100 transition-opacity" dir="ltr">
                        {t.footer.rights} <span className="text-gold">|</span>
                        <img src="/forsa-logo.png" alt="Doers Logo" className="h-8 md:h-10 brightness-0 invert opacity-100" />
                    </p>
                </div>
            </div>
        </footer>
    );
}
