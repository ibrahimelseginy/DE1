"use client";
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhyUs from "../components/WhyUs";
import ComparisonTable from "../components/ComparisonTable";
import FloatingSocials from "../components/FloatingSocials";

export default function WhyDe1Page() {
    return (
        <main className="min-h-screen bg-midnight text-foreground font-sans selection:bg-gold selection:text-midnight overflow-x-hidden">
            <Navbar />
            <div className="pt-20"> {/* Add padding for fixed navbar */}
                <WhyUs />
                <ComparisonTable />
            </div>
            <Footer />
            <FloatingSocials />
        </main>
    );
}

