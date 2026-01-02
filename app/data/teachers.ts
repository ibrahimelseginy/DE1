export interface Teacher {
    id: number;
    name: string;
    role: string;
    bio: string;
    image: string;
    videoUrl?: string;
    stats: {
        stars: string | number;
        sessions: string;
        exp: string;
    };
    pricing: {
        duration: number; // in minutes (e.g., 70)
        currency: 'EGP' | 'USD' | 'SAR' | 'KWD';
        prices: {
            EGP: { price: number; oldPrice?: number };
            USD: { price: number; oldPrice?: number };
            SAR: { price: number; oldPrice?: number }; // Covers SAR, QAR, AED
            KWD: { price: number; oldPrice?: number };
        };
    };
}

export const teachers: Teacher[] = [
    {
        id: 1,
        name: "أ/ أسامة عيسى",
        role: "خبير اللغة الألمانية",
        stats: { stars: "4.9", sessions: "+1000", exp: "+4 سنوات" },
        bio: "متخصص في تحويل المبتدئين إلى متحدثين بطلاقة من خلال منهج تفاعلي يركز على احتياجاتك المهنية.",
        image: "/teachers/osama.jpg",
        pricing: {
            duration: 70,
            currency: 'EGP', // Default display currency, customizable via UI later
            prices: {
                EGP: { price: 500, oldPrice: 750 },
                USD: { price: 15, oldPrice: 25 },
                SAR: { price: 60, oldPrice: 100 },
                KWD: { price: 5, oldPrice: 8 },
            }
        }
    },
    {
        id: 2,
        name: "أ/ سارة محمد",
        role: "مدربة محادثة انجليزية",
        stats: { stars: "5.0", sessions: "+2500", exp: "+6 سنوات" },
        bio: "ساعدت مئات الطلاب على اجتياز اختبارات الآيلتس بفضل أسلوبها المبسط والعملي.",
        image: "/teachers/sara.jpg",
        pricing: {
            duration: 70,
            currency: 'EGP',
            prices: {
                EGP: { price: 450, oldPrice: 600 },
                USD: { price: 12, oldPrice: 20 },
                SAR: { price: 50, oldPrice: 80 },
                KWD: { price: 4, oldPrice: 7 },
            }
        }
    },
];
