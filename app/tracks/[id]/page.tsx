"use client";
import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FloatingSocials from "../../components/FloatingSocials";
import { tracks } from '../../data/tracks';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function TrackDetails({ params }: { params: { id: string } }) {
    const track = tracks.find(t => t.id === params.id);

    if (!track) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-midnight text-foreground font-sans selection:bg-gold selection:text-midnight overflow-x-hidden">
            <Navbar />

            <section className="pt-32 pb-20 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] -z-10"></div>

                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-8">
                            <Link href="/tracks" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                                <ArrowLeft className="w-6 h-6 text-gray-400" />
                            </Link>
                            <span className="text-gold font-medium">تفاصيل المسار</span>
                        </div>

                        {/* Main Content */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                            <div className="flex items-start justify-between flex-wrap gap-6 mb-8">
                                <div>
                                    <div className={`inline-flex p-4 rounded-xl mb-6 ${track.special ? 'bg-gold text-midnight' : 'bg-midnight text-gold border border-gold/20'}`}>
                                        <track.icon size={40} strokeWidth={1.5} />
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-lalezar text-white mb-2">{track.title}</h1>
                                    <p className="text-lg text-gray-400">{track.desc}</p>
                                </div>
                            </div>

                            <div className="prose prose-invert prose-lg max-w-none mb-12">
                                <h3 className="text-xl font-bold text-white mb-4">عن هذا المسار</h3>
                                <p className="text-gray-300 leading-relaxed mb-8">
                                    {track.fullDesc}
                                </p>

                                <h3 className="text-xl font-bold text-white mb-4">ماذا ستتعلم؟</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {track.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                                            <CheckCircle2 className="text-gold w-5 h-5 flex-shrink-0" />
                                            <span className="text-gray-200">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
                                <a href="/teachers" className="flex-1 bg-gold hover:bg-gold-shiny text-midnight font-bold py-4 px-8 rounded-xl transition-all text-center text-lg">
                                    ابدأ هذا المسار الآن
                                </a>
                                <a href="https://wa.me/YOUR_NUMBER" target="_blank" rel="noopener noreferrer" className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-4 px-8 rounded-xl transition-all text-center text-lg border border-white/10">
                                    استفسر عن المسار
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <FloatingSocials />
        </main>
    );
}
