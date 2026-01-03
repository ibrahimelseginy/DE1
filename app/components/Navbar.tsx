"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../data/translations';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { t, language, setLanguage } = useLanguage();

    const navLinks = [
        { name: t.common.home, href: "/" },
        { name: t.common.about, href: "/why-de1" },
        { name: t.common.tracks, href: "/tracks" },
        { name: t.common.teachers, href: "/teachers" },
    ];

    const toggleLanguage = (lang: Language) => {
        setLanguage(lang);
        setMobileMenuOpen(false);
    }

    return (
        <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-midnight/90 backdrop-blur-md py-4 shadow-lg border-b border-white/5' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl md:text-3xl font-bold text-gold tracking-tight hover:text-white transition-colors" style={{ fontFamily: 'var(--font-lalezar)' }}>
                    DE1 Academy
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 bg-white/5 px-8 py-3 rounded-full border border-white/5 backdrop-blur-sm">
                    {navLinks.map(link => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors relative py-1 ${isActive ? "text-gold font-bold" : "text-gray-300 hover:text-white"}`}
                            >
                                {link.name}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.5)]"></span>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* CTA & Language Switcher */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Language Switcher */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 text-gray-300 hover:text-white text-sm font-medium">
                            <Globe size={16} />
                            <span className="uppercase">{language}</span>
                            <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                        </button>

                        <div className="absolute top-full right-0 mt-2 w-32 bg-[#111827] border border-white/10 rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                            <button onClick={() => toggleLanguage('ar')} className={`w-full text-right px-4 py-2 text-sm hover:bg-white/5 transition-colors ${language === 'ar' ? 'text-gold' : 'text-gray-300'}`}>العربية</button>
                            <button onClick={() => toggleLanguage('en')} className={`w-full text-right px-4 py-2 text-sm hover:bg-white/5 transition-colors ${language === 'en' ? 'text-gold' : 'text-gray-300'}`}>English</button>
                            <button onClick={() => toggleLanguage('de')} className={`w-full text-right px-4 py-2 text-sm hover:bg-white/5 transition-colors ${language === 'de' ? 'text-gold' : 'text-gray-300'}`}>Deutsch</button>
                        </div>
                    </div>

                    <a href="/teachers" className="px-6 py-2.5 bg-gold text-midnight font-bold rounded-xl hover:bg-gold-shiny transition-colors shadow-lg shadow-gold/10 text-sm">
                        {t.common.bookNow}
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-midnight border-b border-white/10 p-4 shadow-xl">
                    <div className="flex flex-col gap-4">
                        {navLinks.map(link => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-300 hover:text-gold py-2 border-b border-white/5"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="flex gap-2 justify-center py-4 border-b border-white/5">
                            <button onClick={() => toggleLanguage('ar')} className={`px-3 py-1 rounded-lg text-sm border ${language === 'ar' ? 'bg-gold text-midnight border-gold' : 'border-white/20 text-gray-300'}`}>AR</button>
                            <button onClick={() => toggleLanguage('en')} className={`px-3 py-1 rounded-lg text-sm border ${language === 'en' ? 'bg-gold text-midnight border-gold' : 'border-white/20 text-gray-300'}`}>EN</button>
                            <button onClick={() => toggleLanguage('de')} className={`px-3 py-1 rounded-lg text-sm border ${language === 'de' ? 'bg-gold text-midnight border-gold' : 'border-white/20 text-gray-300'}`}>DE</button>
                        </div>

                        <Link href="/teachers" className="w-full py-3 bg-gold text-midnight font-bold rounded-xl mt-2 text-center" onClick={() => setMobileMenuOpen(false)}>
                            {t.common.bookNow}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
