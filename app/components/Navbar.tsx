"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: "الرئيسية", href: "#" },
        { name: "لماذا DE1؟", href: "#why-us" },
        { name: "المسارات", href: "#services" },
        { name: "معلمونا", href: "#teachers" },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-midnight/90 backdrop-blur-md py-4 shadow-lg border-b border-white/5' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl md:text-3xl font-bold text-gold tracking-tight">
                    DE1 Academy
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 bg-white/5 px-8 py-3 rounded-full border border-white/5 backdrop-blur-sm">
                    {navLinks.map(link => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-medium transition-colors ${link.name === "الرئيسية" ? "text-gold" : "text-gray-300 hover:text-white"}`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:block">
                    <button className="px-6 py-2.5 bg-gold text-midnight font-bold rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-gold/10 text-sm">
                        احجز حصتك
                    </button>
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
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-gray-300 hover:text-gold py-2 border-b border-white/5"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <button className="w-full py-3 bg-gold text-midnight font-bold rounded-xl mt-2">
                            احجز حصتك
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
