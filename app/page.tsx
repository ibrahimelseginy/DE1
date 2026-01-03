import dynamic from 'next/dynamic';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import WhyUs from "./components/WhyUs";
import Services from "./components/Services";
import Teachers from "./components/Teachers";
import Footer from "./components/Footer";

// Lazy load components below the fold
const Testimonials = dynamic(() => import("./components/Testimonials"), {
  loading: () => <div className="min-h-[400px]" />,
});
const FloatingSocials = dynamic(() => import("./components/FloatingSocials"));

import fs from 'fs';
import path from 'path';

// Only import Prisma in production
let prisma: any = null;
if (process.env.NODE_ENV === 'production') {
  const prismaModule = await import('@/lib/prisma');
  prisma = prismaModule.default;
}

// Helper to get from JSON (Legacy fallback)
const getTeachersLegacy = () => {
  const dataFilePath = path.join(process.cwd(), 'app', 'data', 'teachers.json');
  if (!fs.existsSync(dataFilePath)) return [];
  try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (e) {
    return [];
  }
};

async function getTeachers() {
  // In development, use JSON directly for speed
  if (process.env.NODE_ENV === 'development') {
    return getTeachersLegacy();
  }

  // In production, use Prisma with fallback
  try {
    const dbTeachers = await prisma.teacher.findMany();
    if (dbTeachers.length > 0) {
      return dbTeachers.map((t: any) => JSON.parse(t.data));
    }
  } catch (e) {
    console.error('DB Fetch Error', e);
  }
  return getTeachersLegacy();
}

// Enable ISR only in production
export const revalidate = process.env.NODE_ENV === 'production' ? 300 : false;

export default async function Home() {
  const teachers = await getTeachers();

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

      <Teachers initialTeachers={teachers} />

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
