"use client";
import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
    return (
        <a
            href="https://wa.me/201289050022"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 left-8 z-50 flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-105 transition-transform duration-300 group cursor-pointer"
        >
            <div className="relative">
                <MessageCircle size={28} fill="white" className="text-white" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </div>
            <span className="font-bold text-sm hidden sm:block">استشارة تعليمية مجانية</span>
        </a>
    );
}
