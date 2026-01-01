export type Language = 'ar' | 'en' | 'de';

export const translations = {
    ar: {
        common: {
            loading: 'جاري التحميل...',
            home: 'الرئيسية',
            about: 'لماذا DE1؟',
            tracks: 'المسارات',
            teachers: 'معلمونا',
            contact: 'تواصل معنا',
            bookNow: 'احجز حصتك',
            readMore: 'اقرأ المزيد',
            copyright: 'جميع الحقوق محفوظة',
        },
        hero: {
            startJourney: "ابدأ رحلتك في التعلم اليوم",
            titlePart1: "لأن أهدافك ليست كغيرك..",
            titlePart2: "دورات لغة (مُفصّلة)",
            titlePart3: "على مقاسك تماماً",
            descriptionPart1: "نحن لا نتبع الطرق التقليدية، بل نبني لك مساراً تعليمياً يركز",
            descriptionPart2: "(فقط)",
            descriptionPart3: "على ما تحتاجه للوصول لهدفك.",
            ctaBookTrial: "احجز حصتك التجريبية الآن",
            ctaWhyUs: "لماذا DE1؟",
            footerNote: "لا انتظار بعد اليوم.. اختر معلمك، حدد منهجك و ابدأ حصتك الأولى خلال 24 ساعة من الاشتراك"
        },
        whyUs: {
            badge: "لماذا نحن؟",
            titlePart1: "لأننا لا نشبه الآخرين",
            titlePart2: "في أي شيء..",
            description: 'في الأكاديميات التقليدية، أنت جزء من "مجموعة". في DE1 Academy، أنت "المركز". نظامنا التعليمي صُمم ليحل كل المشاكل التي واجهتك سابقاً، ويوفر عليك سنوات من المحاولات غير المجدية.',
            ctaCompare: "اكتشف الفارق بنفسك (المقارنة الكاملة)",
            cards: {
                custom: { title: "منهج مفصل", desc: "محتوى مصمم خصيصاً لعلاج نقاط ضعفك." },
                instant: { title: "انطلاق فوري", desc: "ابدأ دراستك فوراً بدون انتظار اكتمال العدد." },
                focus: { title: "تركيز كامل", desc: "المعلم لك وحدك بنسبة 100% طوال الحصة." }
            }
        },
        journey: {
            title: "رحلتك نحو الإتقان..",
            titleHighlight: "خطوة بخطوة",
            subtitle: "منهجية علمية مجربة تضمن لك الوصول لهدفك بأسرع وقت.",
            steps: {
                discovery: { step: "01", title: "تحديد الوجهة", desc: "لا نبدأ بالتدريس فوراً؛ بل نبدأ بحصة تجريبية أقرب لجلسة استشارية لنفهم هدفك (سفر، عمل، أو طلاقة عامة) ونحدد مستواك الحالي بدقة." },
                matching: { step: "02", title: "اختيار رفيق الرحلة", desc: "نرشح لك المعلم الأنسب لشخصيتك وأهدافك من بين نخبة مدرسينا المعتمدين، مع فرصة اختيار المدرس بنفسك." },
                curriculum: { step: "03", title: "تفصيل المنهج", desc: "هنا نطبق شعارنا؛ نصمم لك محتوى تعليمياً (مُفصّلاً) يركز فقط على احتياجاتك، بعيداً عن حشو المناهج التقليدية." },
                start: { step: "04", title: "الانطلاق الفوري", desc: "لا انتظار لاكتمال مجموعات؛ تبدأ حصتك الأولى (1-on-1) فوراً وفي المواعيد التي تختارها بنفسك بكل مرونة." }
            }
        },
        tracks: {
            title: "المسارات التعليمية",
            items: {
                speaking: { title: "المحادثة بطلاقة", desc: "اكسر حاجز الخوف وتحدث كمتحدث اصلي. نركز على تصحيح النطق، واكتساب التعبيرات اليومية من خلال ممارسة محادثات حقيقية طوال الحصة." },
                exams: { title: "التحضير للاختبارات الدولية", desc: "استعد لاجتياز اختبارات (IELTS, TOEFL, Goethe) بأقصر طريق. نوفر لك استراتيجيات الحل، محاكاة حقيقية لظروف الامتحان." },
                business: { title: "التجهيز لسوق العمل", desc: "تعلم كيف تدير الاجتماعات، تكتب الإيميلات باحترافية، وتجتاز مقابلات العمل الدولية بكل ثقة في مجالك المهني." },
                custom: { title: "صمم مسارك الخاص", desc: "لم تجد ما تبحث عنه؟ إذا كان هدفك فريداً (مثل إلقاء المحاضرات أو السفر العاجل)، فنحن نبني لك منهجاً يخصك وحدك." }
            }
        },
        teachers: {
            title: 'معلمونا المعتمدون',
            subtitle: 'نخبة من أفضل المعلمين اختيروا بعناية لمساعدتك على تحقيق هدفك.',
            bookSession: 'احجز حصة مع المعلم',
            reviews: 'تقييم',
            sessions: 'حصة',
            experience: 'خبرة',
            years: 'سنوات',
            notFound: 'المعلم غير موجود',
        },
        booking: {
            title: 'احجز حصة مجانية',
            subtitle: 'سجل بياناتك وسنتواصل معك لتحديد الموعد',
            successTitle: 'تم التسجيل بنجاح!',
            successMessage: 'سيتواصل معك فريقنا قريباً لتأكيد الحجز.',
            bookAnother: 'حجز موعد آخر',
            confirm: 'تأكيد الحجز',
            contactInfo: 'بيانات التواصل',
            name: 'الاسم',
            namePlaceholder: 'أدخل اسمك بالكامل',
            phone: 'رقم الواتساب',
            phonePlaceholder: '01xxxxxxxxx',
            goalsTitle: 'ما هو هدفك؟',
            goals: {
                work: 'تعلم اللغة للعمل',
                speaking: 'تحسين المحادثة',
                exam: 'التحضير لاختبار',
                kids: 'تأسيس طفل',
            },
            levelTitle: 'ما هو مستواك الحالي؟',
            levels: {
                beginner: 'مبتدئ',
                basics: 'أساسيات',
                intermediate: 'متوسط',
                advanced: 'متقدم',
            },
            timelineTitle: 'متى تريد تحقيق هدفك؟',
            timelinePlaceholder: 'اختر المدة...',
            timelines: {
                weeks: '1-4 أسابيع',
                months1: '1-3 أشهر',
                months3: '3-6 أشهر',
                open: 'وقت مفتوح',
                oneLesson: 'درس واحد فقط',
            },
            availabilityTitle: 'الأوقات المناسبة',
            daysLabel: 'الأيام',
            timesLabel: 'الفترات',
            days: {
                sat: 'السبت',
                sun: 'الأحد',
                mon: 'الاثنين',
                tue: 'الثلاثاء',
                wed: 'الأربعاء',
                thu: 'الخميس',
                fri: 'الجمعة',
            },
            times: {
                morning: 'صباحاً',
                afternoon: 'ظهراً',
                evening: 'مساءً',
            },
            sourceTitle: 'كيف سمعت عنا؟',
            sourcePlaceholder: 'اختر المصدر...',
            sources: {
                friend: 'ترشيح من صديق',
                facebook: 'فيسبوك',
                instagram: 'انستجرام',
                tiktok: 'تيك توك',
                google: 'بحث جوجل',
                other: 'أخرى',
            }
        }
    },
    en: {
        common: {
            loading: 'Loading...',
            home: 'Home',
            about: 'Why DE1?',
            tracks: 'Tracks',
            teachers: 'Teachers',
            contact: 'Contact Us',
            bookNow: 'Book Now',
            readMore: 'Read More',
            copyright: 'All rights reserved',
        },
        hero: {
            startJourney: "Start today",
            titlePart1: "Because your goals are unique..",
            titlePart2: "Language courses (Tailored)",
            titlePart3: "Exactly to your size",
            descriptionPart1: "We do not follow traditional methods, but build a learning path focused",
            descriptionPart2: "(ONLY)",
            descriptionPart3: "on what you need to reach your goal.",
            ctaBookTrial: "Book your trial session now",
            ctaWhyUs: "Why DE1?",
            footerNote: "No more waiting.. Choose your teacher, define your curriculum and start your first session within 24 hours"
        },
        whyUs: {
            badge: "Why Us?",
            titlePart1: "Because we are unlike others",
            titlePart2: "In anything..",
            description: 'In traditional academies, you are part of a "group". In DE1 Academy, you are the "Center". Our system is designed to solve all prior problems.',
            ctaCompare: "Discover the difference (Full Comparison)",
            cards: {
                custom: { title: "Tailored Curriculum", desc: "Content designed specifically for your weaknesses." },
                instant: { title: "Instant Start", desc: "Start immediately without waiting for groups." },
                focus: { title: "Full Focus", desc: "The teacher is 100% yours during the session." }
            }
        },
        journey: {
            title: "Your journey to mastery..",
            titleHighlight: "Step by Step",
            subtitle: "Proven scientific methodology ensures you reach your goal fast.",
            steps: {
                discovery: { step: "01", title: "Discovery & Goals", desc: "We start with a trial session/consultation to understand your goal (travel, work, fluency) & level." },
                matching: { step: "02", title: "Teacher Matching", desc: "We recommend the best teacher for you from our elite certified team." },
                curriculum: { step: "03", title: "Customized Curriculum", desc: "We design tailored content focusing only on your needs." },
                start: { step: "04", title: "Instant Start", desc: "No waiting. Your 1-on-1 sessions start immediately at your chosen times." }
            }
        },
        tracks: {
            title: "Educational Tracks",
            items: {
                speaking: { title: "Speaking Fluency", desc: "Break fear and speak like a native. Focus on pronunciation & idioms." },
                exams: { title: "Intl. Exams Prep", desc: "Prepare for IELTS, TOEFL, Goethe with strategies & simulations." },
                business: { title: "Job Market Prep", desc: "Manage meetings, emails, and interview skills professionally." },
                custom: { title: "Design Your Path", desc: "Unique goal? We build a curriculum just for you (e.g. lectures, travel)." }
            }
        },
        teachers: {
            title: 'Our Certified Teachers',
            subtitle: 'Elite teachers carefully selected to help you achieve your goals.',
            bookSession: 'Book a Session',
            reviews: 'Reviews',
            sessions: 'Sessions',
            experience: 'Experience',
            years: 'Years',
            notFound: 'Teacher not found',
        },
        booking: {
            title: 'Book a Free Session',
            subtitle: 'Register your details and we will contact you to schedule an appointment',
            successTitle: 'Registered Successfully!',
            successMessage: 'Our team will contact you soon to confirm.',
            bookAnother: 'Book Another',
            confirm: 'Confirm Booking',
            contactInfo: 'Contact Information',
            name: 'Name',
            namePlaceholder: 'Enter your full name',
            phone: 'WhatsApp Number',
            phonePlaceholder: '01xxxxxxxxx',
            goalsTitle: 'What is your goal?',
            goals: {
                work: 'Learn for Work',
                speaking: 'Improve Speaking',
                exam: 'Exam Preparation',
                kids: 'Kids Tutoring',
            },
            levelTitle: 'Current Level?',
            levels: {
                beginner: 'Beginner',
                basics: 'Basics',
                intermediate: 'Intermediate',
                advanced: 'Advanced',
            },
            timelineTitle: 'Target Timeline?',
            timelinePlaceholder: 'Select duration...',
            timelines: {
                weeks: '1-4 Weeks',
                months1: '1-3 Months',
                months3: '3-6 Months',
                open: 'Open Time',
                oneLesson: 'One Lesson Only',
            },
            availabilityTitle: 'Availability',
            daysLabel: 'Days',
            timesLabel: 'Times',
            days: {
                sat: 'Sat',
                sun: 'Sun',
                mon: 'Mon',
                tue: 'Tue',
                wed: 'Wed',
                thu: 'Thu',
                fri: 'Fri',
            },
            times: {
                morning: 'Morning',
                afternoon: 'Afternoon',
                evening: 'Evening',
            },
            sourceTitle: 'How did you hear about us?',
            sourcePlaceholder: 'Select source...',
            sources: {
                friend: 'Friend Recommendation',
                facebook: 'Facebook',
                instagram: 'Instagram',
                tiktok: 'TikTok',
                google: 'Google Search',
                other: 'Other',
            }
        }
    },
    de: {
        common: {
            loading: 'Laden...',
            home: 'Startseite',
            about: 'Warum DE1?',
            tracks: 'Pfade',
            teachers: 'Lehrer',
            contact: 'Kontakt',
            bookNow: 'Jetzt buchen',
            readMore: 'Mehr lesen',
            copyright: 'Alle Rechte vorbehalten',
        },
        hero: {
            startJourney: "Starten Sie heute",
            titlePart1: "Weil Ihre Ziele einzigartig sind..",
            titlePart2: "Sprachkurse (Maßgeschneidert)",
            titlePart3: "Genau nach Ihrem Maß",
            descriptionPart1: "Wir folgen keinen traditionellen Methoden, sondern bauen einen Lernpfad",
            descriptionPart2: "(NUR)",
            descriptionPart3: "fokussiert auf das, was Sie brauchen.",
            ctaBookTrial: "Probestunde jetzt buchen",
            ctaWhyUs: "Warum DE1?",
            footerNote: "Kein Warten mehr.. Wählen Sie Ihren Lehrer und starten Sie innerhalb von 24 Stunden."
        },
        whyUs: {
            badge: "Warum wir?",
            titlePart1: "Weil wir anders sind",
            titlePart2: "In allem..",
            description: 'In traditionellen Akademien sind Sie Teil einer "Gruppe". In der DE1 Academy sind Sie das "Zentrum". Unser System löst alle Ihre bisherigen Probleme.',
            ctaCompare: "Entdecken Sie den Unterschied",
            cards: {
                custom: { title: "Maßgeschneiderter Plan", desc: "Inhalt speziell für Ihre Schwächen entwickelt." },
                instant: { title: "Sofortstart", desc: "Beginnen Sie sofort ohne Wartezeit auf Gruppen." },
                focus: { title: "Voller Fokus", desc: "Der Lehrer gehört 100% Ihnen während der Stunde." }
            }
        },
        journey: {
            title: "Ihr Weg zur Meisterschaft..",
            titleHighlight: "Schritt für Schritt",
            subtitle: "Bewährte Methode garantiert schnellen Erfolg.",
            steps: {
                discovery: { step: "01", title: "Ziele", desc: "Wir beginnen mit einer Probestunde/Beratung, um Ihr Ziel zu verstehen und Ihr Niveau zu bestimmen." },
                matching: { step: "02", title: "Lehrerauswahl", desc: "Wir empfehlen den besten Lehrer für Ihre Persönlichkeit." },
                curriculum: { step: "03", title: "Individueller Plan", desc: "Wir gestalten Inhalte, die sich nur auf Ihre Bedürfnisse konzentrieren." },
                start: { step: "04", title: "Sofortstart", desc: "Kein Warten. Ihre 1-zu-1 Stunden beginnen sofort flexibel." }
            }
        },
        tracks: {
            title: "Bildungswege",
            items: {
                speaking: { title: "Sprechflüssigkeit", desc: "Brechen Sie die Angst und sprechen Sie wie ein Muttersprachler." },
                exams: { title: "Prüfungsvorbereitung", desc: "Vorbereitung auf IELTS, TOEFL, Goethe mit Strategien & Simulationen." },
                business: { title: "Arbeitsmarkt", desc: "Meetings, E-Mails und Interviewfähigkeiten professionell meistern." },
                custom: { title: "Eigener Pfad", desc: "Einzigartiges Ziel? Wir bauen einen Lehrplan nur für Sie." }
            }
        },
        teachers: {
            title: 'Unsere zertifizierten Lehrer',
            subtitle: 'Elite-Lehrer sorgfältig ausgewählt, um Ihnen zu helfen, Ihre Ziele zu erreichen.',
            bookSession: 'Sitzung buchen',
            reviews: 'Bewertungen',
            sessions: 'Sitzungen',
            experience: 'Erfahrung',
            years: 'Jahre',
            notFound: 'Lehrer nicht gefunden',
        },
        booking: {
            title: 'Kostenlose Sitzung buchen',
            subtitle: 'Registrieren Sie Ihre Daten und wir werden Sie kontaktieren, um einen Termin zu vereinbaren',
            successTitle: 'Erfolgreich registriert!',
            successMessage: 'Unser Team wird Sie bald kontaktieren.',
            bookAnother: 'Nochmal buchen',
            confirm: 'Buchung bestätigen',
            contactInfo: 'Kontaktinformationen',
            name: 'Name',
            namePlaceholder: 'Geben Sie Ihren vollen Namen ein',
            phone: 'WhatsApp Nummer',
            phonePlaceholder: '01xxxxxxxxx',
            goalsTitle: 'Was ist Ihr Ziel?',
            goals: {
                work: 'Deutsch für die Arbeit',
                speaking: 'Sprechen verbessern',
                exam: 'Prüfungsvorbereitung',
                kids: 'Nachhilfe für Kinder',
            },
            levelTitle: 'Aktuelles Niveau?',
            levels: {
                beginner: 'Anfänger',
                basics: 'Grundlagen',
                intermediate: 'Mittelstufe',
                advanced: 'Fortgeschritten',
            },
            timelineTitle: 'Zeitrahmen?',
            timelinePlaceholder: 'Dauer wählen...',
            timelines: {
                weeks: '1-4 Wochen',
                months1: '1-3 Monate',
                months3: '3-6 Monate',
                open: 'Offen',
                oneLesson: 'Nur eine Lektion',
            },
            availabilityTitle: 'Verfügbarkeit',
            daysLabel: 'Tage',
            timesLabel: 'Zeiten',
            days: {
                sat: 'Sa',
                sun: 'So',
                mon: 'Mo',
                tue: 'Di',
                wed: 'Mi',
                thu: 'Do',
                fri: 'Fr',
            },
            times: {
                morning: 'Morgens',
                afternoon: 'Nachmittags',
                evening: 'Abends',
            },
            sourceTitle: 'Wie haben Sie von uns gehört?',
            sourcePlaceholder: 'Quelle wählen...',
            sources: {
                friend: 'Empfehlung eines Freundes',
                facebook: 'Facebook',
                instagram: 'Instagram',
                tiktok: 'TikTok',
                google: 'Google Suche',
                other: 'Andere',
            }
        }
    }
};
