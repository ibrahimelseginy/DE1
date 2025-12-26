"use client";
import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

export default function FloatingSocials() {
    return (
        <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-4">
            {/* Floating Pill Container */}
            <div className="flex flex-col items-center gap-6 bg-midnight/80 backdrop-blur-md border border-gold/20 p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.1)]">

                {/* Instagram */}
                <a
                    href="https://www.instagram.com/de1.academy?igsh=MXVjb3FqenpvOHVpNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-white transition-colors duration-300 transform hover:scale-110"
                >
                    <Instagram size={28} strokeWidth={1.5} />
                </a>

                {/* Separator (Optional, or just space) */}
                {/* <div className="w-8 h-[1px] bg-gold/20"></div> */}

                {/* WhatsApp */}
                <a
                    href="https://wa.me/201555822735"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-white transition-colors duration-300 transform hover:scale-110 relative"
                >
                    <MessageCircle size={28} strokeWidth={1.5} />
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-midnight animate-pulse"></span>
                </a>
            </div>
        </div>
    );
}
