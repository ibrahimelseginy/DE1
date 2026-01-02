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
            titlePart1: "لماذا لا يحقق 90% من الطلاب",
            titlePart2: "أهدافهم في تعلم اللغة؟",
            description: 'في الأكاديميات التقليدية، أنت جزء من "مجموعة". في DE1 Academy، أنت "المركز". نظامنا التعليمي صُمم ليحل كل المشاكل التي واجهتك سابقاً، ويوفر عليك سنوات من المحاولات غير المجدية.',
            ctaCompare: "اكتشف الفارق بنفسك (المقارنة الكاملة)",
            cards: {
                custom: { title: "منهج مفصل", desc: "محتوى مصمم خصيصاً ليناسب أهدافك." },
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
                matching: { step: "02", title: "اختيار معلمك الشخصي", desc: "اختر معلمك بنفسك؛ لأننا لا نكتفي بالترشيح، بل نمنحك حرية القرار الكاملة." },
                curriculum: { step: "03", title: "تفصيل المنهج", desc: "هنا نطبق شعارنا؛ نصمم لك محتوى تعليمياً (مُفصّلاً) يركز فقط على احتياجاتك، بعيداً عن حشو المناهج التقليدية." },
                start: { step: "04", title: "الانطلاق الفوري", desc: "لا انتظار لاكتمال مجموعات؛ تبدأ حصتك الأولى (1-on-1) فوراً وفي المواعيد التي تختارها بنفسك بكل مرونة." }
            }
        },
        tracks: {
            title: "المسارات التعليمية",
            items: {
                speaking: {
                    title: 'المحادثة بطلاقة',
                    desc: 'تحدث اللغة من أول يوم حتى بدون معرفة سابقة. نركز على تصحيح النطق واكتساب التعبيرات اليومية.',
                    features: [
                        'سيناريوهات واقعية (مطاعم، سفر، عمل)',
                        'ممارسة التحدث 100% من وقت الحصة',
                        'تصحيح فوري للأخطاء', // Updated
                        'تركز على النطق الصحيح (Accent Reduction)'
                    ]
                },
                exams: {
                    title: 'التحضير للاختبارات الدولية',
                    desc: 'بأقصر طريق.. نوفر لك استراتيجيات (IELTS, TOEFL, Goethe) استعد لاجتياز اختبارات، الحل، محاكاة حقيقية لظروف الامتحان',
                    features: [
                        'استراتيجيات حل ذكية لكل قسم',
                        'تحليل دقيق لنقاط الضعف',
                        'اختبارات تجريبية غير محدودة',
                        'ضمان تحسن الدرجة'
                    ]
                },
                business: {
                    title: 'التجهيز لسوق العمل',
                    desc: 'تعلم كيف تدير الاجتماعات، وتجتاز مقابلات العمل الدولية بكل ثقة في مجالك المهني',
                    features: [
                        'مصطلحات تخصصية في مجالك',
                        'مهارات التفاوض والاجتماعات',
                        'محاكاة مقابلات العمل'
                    ]
                },
                custom: {
                    title: 'صمم مسارك الخاص',
                    desc: 'لم تجد ما تبحث عنه؟ إذا كان هدفك فريداً (مثل إلقاء المحاضرات أو السفر العاجل)، فنحن نبني لك منهجاً يخصك وحدك',
                    features: [
                        'جدول زمن مرن جداً',
                        'مرونة في تغيير المحتوى',
                        'منهج مصمم خصيصاً لك',
                        'تركيز على أهدافك الدقيقة'
                    ]
                }
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
            bio: 'نبذة عن المعلم',
            video: 'فيديو تعريفي',
        },
        testimonials: {
            title: "ماذا يقول طلابنا؟",
            readMore: "شاهد المزيد من قصص النجاح",
            items: [
                {
                    name: "أحمد محمد",
                    role: "مهندس برمجيات",
                    content: "تجربة تعليمية ممتازة. لم أكن أتخيل أن أتحدث الألمانية بهذه الطلاقة في وقت قصير. التركيز على المحادثة كان هو المفتاح."
                },
                {
                    name: "سارة علي",
                    role: "طبيبة",
                    content: "كنت أحتاج لاجتياز اختبار B2 للسفر، وبفضل الله ثم DE1 Academy حققت الدرجة المطلوبة من أول محاولة. شكراً لكم!"
                },
                {
                    name: "عمر خالد",
                    role: "طالب جامعي",
                    content: "أفضل ما في الأكاديمية هو المرونة في المواعيد واختيار المعلم. لا يوجد ضغط، وأتعلم بالسرعة التي تناسبني."
                }
            ]
        },
        footer: {
            ctaTitle: "ابدأ رحلتك نحو الإتقان اليوم",
            ctaSubtitle: "لا انتظار لاكتمال المجموعات.. ابدأ فوراً مع معلمك الخاص",
            ctaButton: "احجز حصتك التجريبية الآن",
            brandDescription: "لأن أهدافك ليست كغيرك. نحن نبني لك مساراً تعليمياً يركز (فقط) على ما تحتاجه للوصول لهدفك.",
            quickLinks: "روابط سريعة",
            contactInfo: "معلومات التواصل",
            freeConsultation: "استشارة تعليمية مجانية",
            rights: "All Rights Reserved DE1 Academy 2025 ©" // Keeping English structure mostly but text can be variable
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
        },
        comparison: {
            badge: "مقارنة شاملة",
            titlePart1: "لماذا تفشل الطرق التقليدية",
            titlePart2: "وينجح أسلوبنا؟",
            description: "لا داعي للمخاطرة بوقتك ومالك في تجارب قديمة. إليك الفرق بالأرقام والحقائق.",
            mobileNote: "اسحب لليمين واليسار لرؤية المزيد من التفاصيل إذا لزم الأمر",
            headers: {
                aspect: "وجه المقارنة",
                traditional: "الأكاديميات التقليدية",
                de1: "DE1 Academy"
            },
            items: {
                startDate: { aspect: "موعد البداية", trad: "تنتظر أسبوعين أو ثلاثة حتى يكتمل عدد المجموعة.", de1: "الانطلاق الفوري: تبدأ رحلتك التعليمية فوراً بمجرد اشتراكك!" },
                teacherChoice: { aspect: "اختيار المعلم", trad: "لا تختار معلمك ولا يمكنك تغييره.", de1: "الحرية: أنت من يختار المعلم، ويمكنك تغييره فوراً إذا لم يناسبك." },
                teacherExp: { aspect: "تجربة المعلم", trad: "تدفع ثمن الكورس كاملاً دون تجربة سابقة.", de1: "الأمان: نوفر لك حصص تجريبية (Trials) لتتأكد من الجودة قبل الدفع الكامل." },
                schedule: { aspect: "المواعيد", trad: "مرتبطة بـ 10 طلاب آخرين؛ تغيير الموعد 'مستحيل'.", de1: "المرونة: أنت سيد قرارك؛ تحدد وتغير مواعيدك بما يناسب جدولك." },
                speed: { aspect: "سرعة الكورس", trad: "لا تتحكم في السرعة؛ مجبر على وتيرة المجموعة.", de1: "التحكم: أنت من يحدد عدد الدروس وسرعة التقدم (مكثف أو هادئ)." },
                curriculum: { aspect: "المنهج", trad: "كتاب واحد ثابت يُدرس للجميع بغض النظر عن الهدف.", de1: "التفصيل: تختار هدفك (سفر، بيزنس، دراسة) ونحن نصمم المنهج على مقاسك." },
                focus: { aspect: "التركيز المباشر", trad: "تدرس كورس كامل لعلاج 'نقطة ضعف' واحدة.", de1: "علاج نقطي: نصمم لك وحدات تعليمية 'مركزة' تعالج مشكلتك تحديداً دون حشو." },
                financialRisk: { aspect: "المخاطرة المالية", trad: "قد تخسر فلوسك إذا لم يعجبك الكورس في المنتصف.", de1: "ضمان الرضا: يمكنك استرداد قيمة الحصص المتبقية في أي وقت دون تعقيدات." },
                speakingRate: { aspect: "معدل التحدث", trad: "دقائق معدودة للمشاركة وسط المجموعة الكبيرة.", de1: "المساحة لك: تتحدث وتمارس اللغة 100% من وقت الحصة مع معلمك الخاص." }
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
            titlePart1: "Why 90% of students don't achieve",
            titlePart2: "their language learning goals?",
            description: 'In traditional academies, you are part of a "group". In DE1 Academy, you are the "Center". Our system is designed to solve all prior problems.',
            ctaCompare: "Discover the difference (Full Comparison)",
            cards: {
                custom: { title: "Tailored Curriculum", desc: "Content designed specifically to suit your goals." },
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
                matching: { step: "02", title: "Choose Your Teacher", desc: "Choose your teacher yourself. We don't just recommend; we give you full freedom to decide." },
                curriculum: { step: "03", title: "Customized Curriculum", desc: "We design tailored content focusing only on your needs." },
                start: { step: "04", title: "Instant Start", desc: "No waiting. Your 1-on-1 sessions start immediately at your chosen times." }
            }
        },
        tracks: {
            title: "Educational Tracks",
            items: {
                speaking: {
                    title: 'Speaking Fluency',
                    desc: 'Speak the language from day one even without prior knowledge. We focus on pronunciation correction and acquiring daily expressions.',
                    features: [
                        'Real-life scenarios (restaurants, travel, work)',
                        'Speaking practice 100% of session time',
                        'Instant error correction',
                        'Focus on correct pronunciation (Accent Reduction)'
                    ]
                },
                exams: {
                    title: 'International Exam Prep',
                    desc: 'Shortest path.. We provide strategies for (IELTS, TOEFL, Goethe). Prepare to pass tests with real simulation of exam conditions.',
                    features: [
                        'Smart solving strategies for each section',
                        'Precise analysis of weak points',
                        'Unlimited mock tests',
                        'Score improvement guarantee'
                    ]
                },
                business: {
                    title: 'Job Market Preparation',
                    desc: 'Learn how to manage meetings and pass international job interviews with confidence in your field.',
                    features: [
                        'Specialized terminology in your field',
                        'Negotiation and meeting skills',
                        'Job interview simulation'
                    ]
                },
                custom: {
                    title: 'Design Your Path',
                    desc: 'Didn\'t find what you are looking for? If your goal is unique (like giving lectures or urgent travel), we build a curriculum just for you.',
                    features: [
                        'Very flexible schedule',
                        'Flexibility to change content',
                        'Curriculum designed specifically for you',
                        'Focus on your precise goals'
                    ]
                }
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
            bio: 'About the Teacher',
            video: 'Intro Video',
        },
        testimonials: {
            title: "What our students say?",
            readMore: "View more success stories",
            items: [
                {
                    name: "Ahmed Mohamed",
                    role: "Software Engineer",
                    content: "Excellent educational experience. I never imagined speaking German so fluently in such a short time. Focusing on conversation was the key."
                },
                {
                    name: "Sara Ali",
                    role: "Doctor",
                    content: "I needed to pass the B2 exam for travel, and thanks to God and DE1 Academy, I achieved the required score on the first attempt. Thank you!"
                },
                {
                    name: "Omar Khaled",
                    role: "University Student",
                    content: "The best thing about the academy is the flexibility in appointments and teacher selection. No pressure, and I learn at my own pace."
                }
            ]
        },
        footer: {
            ctaTitle: "Start your journey to mastery today",
            ctaSubtitle: "No need to wait for groups.. Start immediately with your private teacher",
            ctaButton: "Book your trial session now",
            brandDescription: "Because your goals are unique. We build a learning path focused (completely) on what you need to reach your goal.",
            quickLinks: "Quick Links",
            contactInfo: "Contact Info",
            freeConsultation: "Free Educational Consultation",
            rights: "All Rights Reserved DE1 Academy 2025 ©"
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
        },
        comparison: {
            badge: "Comprehensive Comparison",
            titlePart1: "Why Traditional Methods Fail",
            titlePart2: "And Our Approach Succeeds?",
            description: "No need to risk your time and money on old experiments. Here is the difference in numbers and facts.",
            mobileNote: "Swipe left and right to see more details if needed.",
            headers: {
                aspect: "Comparison Aspect",
                traditional: "Traditional Academies",
                de1: "DE1 Academy"
            },
            items: {
                startDate: { aspect: "Start Date", trad: "Wait 2-3 weeks for group to fill.", de1: "Instant Start: Start your journey immediately upon subscription!" },
                teacherChoice: { aspect: "Teacher Choice", trad: "You don't choose your teacher nor can you change them.", de1: "Freedom: You choose the teacher, and can change them immediately if they don't suit you." },
                teacherExp: { aspect: "Teacher Trial", trad: "Pay full course price without prior trial.", de1: "Safety: We provide trial sessions so you ensure quality before full payment." },
                schedule: { aspect: "Schedule", trad: "Tied to 10 other students; changing time is 'impossible'.", de1: "Flexibility: You are the decision maker; set and change times to fit your schedule." },
                speed: { aspect: "Course Speed", trad: "You don't control speed; forced to group pace.", de1: "Control: You determine number of lessons and pace (intensive or relaxed)." },
                curriculum: { aspect: "Curriculum", trad: "One fixed book taught to everyone regardless of goal.", de1: "Tailored: You choose your goal (Travel, Business, Study) and we tailor the curriculum to your size." },
                focus: { aspect: "Direct Focus", trad: "Study full course to fix one 'weakness'.", de1: "Spot Treatment: We design 'focused' units effectively addressing your specific problem without filler." },
                financialRisk: { aspect: "Financial Risk", trad: "You might lose money if you don't like the course halfway.", de1: "Satisfaction Guarantee: You can refund remaining sessions at any time without complications." },
                speakingRate: { aspect: "Speaking Rate", trad: "Few minutes to participate amidst large group.", de1: "Your Space: You speak and practice language 100% of the session time with your private teacher." }
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
            titlePart1: "Warum 90% der Schüler ihre",
            titlePart2: "Sprachlernziele nicht erreichen?",
            description: 'In traditionellen Akademien sind Sie Teil einer "Gruppe". In der DE1 Academy sind Sie das "Zentrum". Unser System löst alle Ihre bisherigen Probleme.',
            ctaCompare: "Entdecken Sie den Unterschied",
            cards: {
                custom: { title: "Maßgeschneiderter Plan", desc: "Inhalt speziell für Ihre Ziele entwickelt." },
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
                matching: { step: "02", title: "Wählen Sie Ihren Lehrer", desc: "Wählen Sie Ihren Lehrer selbst. Wir empfehlen nicht nur, sondern geben Ihnen die volle Entscheidungsfreiheit." },
                curriculum: { step: "03", title: "Individueller Plan", desc: "Wir gestalten Inhalte, die sich nur auf Ihre Bedürfnisse konzentrieren." },
                start: { step: "04", title: "Sofortstart", desc: "Kein Warten. Ihre 1-zu-1 Stunden beginnen sofort flexibel." }
            }
        },
        tracks: {
            title: "Bildungswege",
            items: {
                speaking: {
                    title: "Sprechflüssigkeit",
                    desc: "Sprechen Sie die Sprache vom ersten Tag an, auch ohne Vorkenntnisse. Fokus auf Aussprache.",
                    features: [
                        'Reale Szenarien (Restaurants, Reisen, Arbeit)',
                        '100% Sprechpraxis während der Sitzung',
                        'Sofortige Fehlerkorrektur',
                        'Fokus auf korrekte Aussprache (Akzentreduzierung)'
                    ]
                },
                exams: {
                    title: "Prüfungsvorbereitung",
                    desc: "Vorbereitung auf IELTS, TOEFL, Goethe mit Strategien und Simulationen.",
                    features: [
                        'Intelligente Lösungsstrategien für jeden Teil',
                        'Präzise Analyse von Schwachstellen',
                        'Unbegrenzte Übungstests',
                        'Garantierte Notenverbesserung'
                    ]
                },
                business: {
                    title: "Arbeitsmarktvorbereitung",
                    desc: "Meetings leiten und Vorstellungsgespräche meistern.",
                    features: [
                        'Fachterminologie in Ihrem Bereich',
                        'Verhandlungs- und Meeting-Kompetenzen',
                        'Simulation von Vorstellungsgesprächen'
                    ]
                },
                custom: {
                    title: "Individueller Pfad",
                    desc: "Einzigartiges Ziel? Wir erstellen einen Lehrplan nur für Sie.",
                    features: [
                        'Sehr flexibler Zeitplan',
                        'Flexibilität bei Inhaltsänderungen',
                        'Speziell für Sie entwickelter Lehrplan',
                        'Fokussierung auf Ihre genauen Ziele'
                    ]
                }
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
            bio: 'Über den Lehrer',
            video: 'Einführungsvideo',
        },
        testimonials: {
            title: "Was unsere Schüler sagen?",
            readMore: "Mehr Erfolgsgeschichten sehen",
            items: [
                {
                    name: "Ahmed Mohamed",
                    role: "Software Engineer",
                    content: "Hervorragende Lernerfahrung. Ich hätte nie gedacht, dass ich in so kurzer Zeit so fließend Deutsch sprechen würde. Der Fokus auf Konversation war der Schlüssel."
                },
                {
                    name: "Sara Ali",
                    role: "Ärztin",
                    content: "Ich musste die B2-Prüfung für die Reise bestehen, und dank Gott und der DE1 Academy habe ich die erforderliche Punktzahl beim ersten Versuch erreicht. Danke!"
                },
                {
                    name: "Omar Khaled",
                    role: "Student",
                    content: "Das Beste an der Akademie ist die Flexibilität bei Terminen und der Lehrerauswahl. Kein Druck, ich lerne in meinem eigenen Tempo."
                }
            ]
        },
        footer: {
            ctaTitle: "Beginnen Sie heute Ihre Reise zur Meisterschaft",
            ctaSubtitle: "Kein Warten auf Gruppen.. Starten Sie sofort mit Ihrem Privatlehrer",
            ctaButton: "Buchen Sie jetzt Ihre Probestunde",
            brandDescription: "Weil Ihre Ziele einzigartig sind. Wir bauen einen Lernpfad, der sich (nur) auf das konzentriert, was Sie brauchen.",
            quickLinks: "Schnelllinks",
            contactInfo: "Kontaktinformationen",
            freeConsultation: "Kostenlose Bildungsberatung",
            rights: "All Rights Reserved DE1 Academy 2025 ©"
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
        },
        comparison: {
            badge: "Umfassender Vergleich",
            titlePart1: "Warum traditionelle Methoden scheitern",
            titlePart2: "Und unser Ansatz erfolgreich ist?",
            description: "Riskieren Sie nicht Ihre Zeit und Geld. Hier ist der Unterschied in Zahlen und Fakten.",
            mobileNote: "Wischen Sie nach links und rechts, um mehr Details zu sehen",
            headers: {
                aspect: "Vergleichsaspekt",
                traditional: "Traditionelle Akademien",
                de1: "DE1 Academy"
            },
            items: {
                startDate: { aspect: "Starttermin", trad: "2-3 Wochen warten, bis Gruppe voll ist.", de1: "Sofortstart: Ihre Reise beginnt sofort nach Anmeldung!" },
                teacherChoice: { aspect: "Lehrerauswahl", trad: "Sie wählen weder Lehrer noch können Sie ihn ändern.", de1: "Freiheit: Sie wählen den Lehrer und können ihn sofort wechseln." },
                teacherExp: { aspect: "Probestunde", trad: "Vollen Preis zahlen ohne vorherigen Test.", de1: "Sicherheit: Wir bieten Probestunden, um Qualität zu sichern." },
                schedule: { aspect: "Termine", trad: "Abhängig von 10 anderen; Änderung 'unmöglich'.", de1: "Flexibilität: Sie bestimmen und ändern Termine nach Ihrem Plan." },
                speed: { aspect: "Tempo", trad: "Keine Kontrolle; gezwungen zum Gruppentempo.", de1: "Kontrolle: Sie bestimmen Lektionenanzahl und Tempo." },
                curriculum: { aspect: "Lehrplan", trad: "Ein festes Buch für alle, egal welches Ziel.", de1: "Maßgeschneidert: Ziel wählen (Reise, Business) und wir passen an." },
                focus: { aspect: "Fokus", trad: "Ganzen Kurs lernen für eine 'Schwäche'.", de1: "Punktuelle Behandlung: Wir lösen Ihr spezifisches Problem direkt." },
                financialRisk: { aspect: "Finanzielles Risiko", trad: "Geldverlust möglich bei Abbruch.", de1: "Zufriedenheitsgarantie: Restbetrag jederzeit erstattbar." },
                speakingRate: { aspect: "Sprechzeit", trad: "Wenige Minuten in großer Gruppe.", de1: "Ihr Raum: 100% der Zeit sprechen Sie mit Ihrem Lehrer." }
            }
        }
    }
};
