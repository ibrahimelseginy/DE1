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
      {/* "Why DE1" Section which introduces the concept */}
      <WhyUs id="why-us" />
      {/* "Journey" Section showing the steps */}
      <Journey />
      <Services />
      <Teachers />
      <Testimonials />
      <Footer />
      <FloatingSocials />
    </main>
  );
}
