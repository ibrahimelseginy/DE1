"use client";
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Services from "../components/Services";
import FloatingSocials from "../components/FloatingSocials";

export default function TracksPage() {
    return (
        <main className="min-h-screen bg-midnight text-foreground font-sans selection:bg-gold selection:text-midnight overflow-x-hidden">
            <Navbar />
            <div className="pt-20">
                <Services />
            </div>
            <Footer />
            <FloatingSocials />
        </main>
    );
}
