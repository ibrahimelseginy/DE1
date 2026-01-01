export interface Teacher {
    id: number;
    name: string;
    role: string;
    bio: string;
    image: string;
    videoUrl?: string; // Optional new field
    stats: {
        stars: string | number;
        sessions: string;
        exp: string;
    };
}

export const teachers: Teacher[] = [
    {
        id: 1,
        name: "أ/ أسامة عيسى",
        role: "خبير اللغة الألمانية",
        stats: { stars: "4.9", sessions: "+1000", exp: "+4 سنوات" },
        bio: "متخصص في تحويل المبتدئين إلى متحدثين بطلاقة من خلال منهج تفاعلي يركز على احتياجاتك المهنية.",
        image: "/teachers/osama.jpg"
    },
    {
        id: 2,
        name: "أ/ سارة محمد",
        role: "مدربة محادثة انجليزية",
        stats: { stars: "5.0", sessions: "+2500", exp: "+6 سنوات" },
        bio: "ساعدت مئات الطلاب على اجتياز اختبارات الآيلتس بفضل أسلوبها المبسط والعملي.",
        image: "/teachers/sara.jpg"
    },
];
