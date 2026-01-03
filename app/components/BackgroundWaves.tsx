"use client";

import React from 'react';

const BackgroundWaves = () => {
    // نولد مصفوفة من الأرقام لإنشاء الخطوط المتكررة
    const lines = Array.from({ length: 40 }, (_, i) => i);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none bg-midnight">
            {/* طبقة Noise خفيفة لجعل الخلفية أكثر ثراءً */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>

            <svg
                className="absolute w-full h-full opacity-40"
                viewBox="0 0 1440 900"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#1e40af" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="goldGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* الموجة الزرقاء - مجموعة خطوط متوازية */}
                <g className="animate-pulse-slow">
                    {lines.map((i) => (
                        <path
                            key={`blue-${i}`}
                            d={`M-100,${800 - i * 5} C400,${600 - i * 2} 800,${900 + i * 2} 1600,${200 + i * 5}`}
                            fill="none"
                            stroke="url(#blueGradient)"
                            strokeWidth="1.5"
                            className="opacity-60"
                            style={{
                                animation: `float 10s ease-in-out infinite alternate`,
                                animationDelay: `${i * 0.1}s`
                            }}
                        />
                    ))}
                </g>

                {/* الموجة الذهبية - متداخلة */}
                <g className="animate-pulse-slow" style={{ animationDelay: '1s' }}>
                    {lines.map((i) => (
                        <path
                            key={`gold-${i}`}
                            d={`M-100,${200 + i * 8} C500,${400 + i * 3} 900,${100 - i * 3} 1600,${700 - i * 8}`}
                            fill="none"
                            stroke="url(#goldGradient)"
                            strokeWidth="1.5"
                            className="opacity-50"
                            style={{
                                animation: `float-reverse 12s ease-in-out infinite alternate`,
                                animationDelay: `${i * 0.1}s`
                            }}
                        />
                    ))}
                </g>
            </svg>

            <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(20px) translateX(10px); }
        }
        @keyframes float-reverse {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(-20px) translateX(-10px); }
        }
      `}</style>
        </div>
    );
};

export default BackgroundWaves;
