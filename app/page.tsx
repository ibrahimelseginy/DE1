import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import WhyUs from "./components/WhyUs";
import Services from "./components/Services";
import Teachers from "./components/Teachers";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import FloatingSocials from "./components/FloatingSocials";

export default function Home() {
  return (
    <main className="min-h-screen bg-midnight text-foreground font-sans selection:bg-gold selection:text-midnight overflow-x-hidden">
      <Navbar />
      <Hero />

      {/* Divider */}
      <div className="container mx-auto px-4">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      {/* "Why DE1" Section which introduces the concept */}
      <WhyUs id="why-us" />

      {/* Divider */}
      <div className="container mx-auto px-4">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      {/* "Journey" Section showing the steps */}
      <Journey />

      {/* Divider */}
      <div className="container mx-auto px-4">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <Services />

      {/* Divider */}
      <div className="container mx-auto px-4">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <Teachers />

      {/* Divider */}
      <div className="container mx-auto px-4">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <Testimonials />

      <Footer />
      <FloatingSocials />
    </main>
  );
}
