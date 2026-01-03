"use client";

import React from 'react';

const BackgroundWaves = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none bg-midnight">
            <svg
                className="absolute w-full h-full opacity-30"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: 'var(--color-gold)', stopOpacity: 0.1 }} />
                        <stop offset="50%" style={{ stopColor: 'var(--color-gold)', stopOpacity: 0.5 }} />
                        <stop offset="100%" style={{ stopColor: 'var(--color-gold)', stopOpacity: 0.1 }} />
                    </linearGradient>
                    <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.1 }} />
                        <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
                        <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.1 }} />
                    </linearGradient>
                </defs>

                {/* مجموعة خطوط انسيابية تحاكي الحركة في الصورة */}
                <g fill="none" stroke="url(#grad1)" strokeWidth="1">
                    {/* موجات علوية يمنى */}
                    <path d="M500,0 Q700,200 1000,100" />
                    <path d="M480,0 Q680,220 1000,120" />
                    <path d="M460,0 Q660,240 1000,140" />
                    <path d="M440,0 Q640,260 1000,160" />
                    <path d="M420,0 Q620,280 1000,180" />
                    <path d="M400,0 Q600,300 1000,200" />

                    {/* تداخلات */}
                    <path d="M0,400 C300,300 700,700 1000,600" opacity="0.6" />
                    <path d="M0,420 C320,320 720,720 1000,620" opacity="0.6" />
                    <path d="M0,440 C340,340 740,740 1000,640" opacity="0.6" />
                    <path d="M0,460 C360,360 760,760 1000,660" opacity="0.6" />
                </g>

                <g fill="none" stroke="url(#grad2)" strokeWidth="1.5">
                    {/* موجات رئيسية كبيرة */}
                    <path d="M-100,500 C200,800 800,200 1100,500" />
                    <path d="M-100,520 C220,820 820,220 1100,520" />
                    <path d="M-100,540 C240,840 840,240 1100,540" />
                    <path d="M-100,560 C260,860 860,260 1100,560" />
                    <path d="M-100,580 C280,880 880,280 1100,580" />
                    <path d="M-100,600 C300,900 900,300 1100,600" />
                </g>

                {/* دوائر زخرفية خفيفة */}
                <circle cx="800" cy="200" r="150" stroke="url(#grad1)" strokeWidth="0.5" opacity="0.2" />
                <circle cx="200" cy="800" r="200" stroke="url(#grad2)" strokeWidth="0.5" opacity="0.2" />

            </svg>

            {/* طبقة Noise خفيفة لجعل الخلفية أكثر ثراءً */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
        </div>
    );
};

export default BackgroundWaves;
