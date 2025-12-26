"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, User, Zap, BookOpen, Calendar, Settings, Target, ShieldCheck, Mic } from 'lucide-react';

const comparisonData = [
    {
        aspect: "موعد البداية",
        icon: Clock,
        traditional: "تنتظر أسبوعين أو ثلاثة حتى يكتمل عدد المجموعة.",
        de1: "الانطلاق الفوري: تبدأ رحلتك التعليمية فوراً بمجرد اشتراكك!",
        highlight: true
    },
    {
        aspect: "اختيار المعلم",
        icon: User,
        traditional: "لا تختار معلمك ولا يمكنك تغييره.",
        de1: "الحرية: أنت من يختار المعلم، ويمكنك تغييره فوراً إذا لم يناسبك."
    },
    {
        aspect: "تجربة المعلم",
        icon: Zap,
        traditional: "تدفع ثمن الكورس كاملاً دون تجربة سابقة.",
        de1: "الأمان: نوفر لك حصص تجريبية (Trials) لتتأكد من الجودة قبل الدفع الكامل."
    },
    {
        aspect: "المواعيد",
        icon: Calendar,
        traditional: "مرتبطة بـ 10 طلاب آخرين؛ تغيير الموعد \"مستحيل\".",
        de1: "المرونة: أنت سيد قرارك؛ تحدد وتغير مواعيدك بما يناسب جدولك."
    },
    {
        aspect: "سرعة الكورس",
        icon: Settings,
        traditional: "لا تتحكم في السرعة؛ مجبر على وتيرة المجموعة.",
        de1: "التحكم: أنت من يحدد عدد الدروس وسرعة التقدم (مكثف أو هادئ)."
    },
    {
        aspect: "المنهج",
        icon: BookOpen,
        traditional: "كتاب واحد ثابت يُدرس للجميع بغض النظر عن الهدف.",
        de1: "التفصيل: تختار هدفك (سفر، بيزنس، دراسة) ونحن نصمم المنهج على مقاسك."
    },
    {
        aspect: "التركيز المباشر",
        icon: Target,
        traditional: "تدرس كورس كامل لعلاج \"نقطة ضعف\" واحدة.",
        de1: "علاج نقطي: نصمم لك وحدات تعليمية \"مركزة\" تعالج مشكلتك تحديداً دون حشو."
    },
    {
        aspect: "المخاطرة المالية",
        icon: ShieldCheck,
        traditional: "قد تخسر فلوسك إذا لم يعجبك الكورس في المنتصف.",
        de1: "ضمان الرضا: يمكنك استرداد قيمة الحصص المتبقية في أي وقت دون تعقيدات."
    },
    {
        aspect: "معدل التحدث",
        icon: Mic,
        traditional: "دقائق معدودة للمشاركة وسط المجموعة الكبيرة.",
        de1: "المساحة لك: تتحدث وتمارس اللغة 100% من وقت الحصة مع معلمك الخاص."
    }
];

export default function ComparisonTable() {
    return (
        <section className="py-24 bg-midnight relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] -z-10"></div>

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-gold font-medium text-sm border border-gold/20 px-4 py-1.5 rounded-full mb-4 inline-block">
                        مقارنة شاملة
                    </span>
                    <h2 className="text-3xl md:text-5xl font-lalezar text-white mb-6">
                        لماذا تفشل الطرق التقليدية <br /> <span className="text-gold">وينجح أسلوبنا؟</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg hover:text-gray-300 transition-colors">
                        لا داعي للمخاطرة بوقتك ومالك في تجارب قديمة. إليك الفرق بالأرقام والحقائق.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Header - Hidden on mobile, shown on desktop */}
                    <div className="hidden md:grid grid-cols-12 gap-6 bg-white/5 p-6 rounded-t-3xl border border-white/5 backdrop-blur-sm">
                        <div className="col-span-3 text-gold font-bold text-lg">وجه المقارنة</div>
                        <div className="col-span-4 text-gray-400 font-bold text-lg">الأكاديميات التقليدية</div>
                        <div className="col-span-5 text-gold font-bold text-2xl">DE1 Academy</div>
                    </div>

                    {/* Rows */}
                    <div className="space-y-4 md:space-y-0">
                        {comparisonData.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`
                                    relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 p-6 rounded-2xl md:rounded-none border-b border-white/5
                                    ${idx === comparisonData.length - 1 ? 'md:rounded-b-3xl border-b-0' : ''}
                                    ${item.highlight ? 'bg-gold/5 border-gold/20' : 'bg-white/[0.02] hover:bg-white/[0.04]'}
                                    transition-all duration-300
                                `}
                            >
                                {/* Aspect (Mobile Label included) */}
                                <div className="col-span-3 flex items-center gap-3 text-gold/90 font-medium text-lg border-b md:border-b-0 border-white/5 pb-3 md:pb-0 mb-3 md:mb-0">
                                    <div className="p-2 rounded-lg bg-gold/10">
                                        <item.icon size={20} />
                                    </div>
                                    {item.aspect}
                                </div>

                                {/* Traditional */}
                                <div className="col-span-4 flex items-start gap-3 text-gray-400 leading-relaxed group">
                                    <XCircle className="shrink-0 text-red-500/50 mt-1 size-5 group-hover:text-red-500 transition-colors" />
                                    <span className="text-sm md:text-base">{item.traditional}</span>
                                </div>

                                {/* DE1 */}
                                <div className="col-span-5 flex items-start gap-3 text-white font-medium leading-relaxed group">
                                    <CheckCircle2 className="shrink-0 text-green-500 mt-1 size-6 md:size-5 group-hover:text-green-400 transition-colors" />
                                    <span className="text-base md:text-lg">{item.de1}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mobile Note */}
                <div className="mt-8 text-center md:hidden">
                    <p className="text-sm text-gray-500">
                        اسحب لليمين واليسار لرؤية المزيد من التفاصيل إذا لزم الأمر
                    </p>
                </div>
            </div>
        </section>
    );
}
