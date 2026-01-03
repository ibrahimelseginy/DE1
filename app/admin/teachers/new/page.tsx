"use client";
import React, { useState } from 'react';
import { mutate } from 'swr'; // Import mutate
import { useRouter } from 'next/navigation';
import { Save, ArrowRight, Video, Star, Clock, Award } from 'lucide-react';

export default function NewTeacherPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: { ar: '', en: '', de: '' },
        role: { ar: '', en: '', de: '' },
        bio: { ar: '', en: '', de: '' },
        image: '',
        videoUrl: '',
        stats: {
            stars: 5.0,
            sessions: '0',
            exp: { ar: '', en: '', de: '' }
        },
        pricing: {
            duration: 70,
            currency: 'EGP' as 'EGP' | 'USD' | 'SAR' | 'KWD',
            prices: {
                EGP: { price: 500, oldPrice: 750 },
                USD: { price: 15, oldPrice: 25 },
                SAR: { price: 60, oldPrice: 100 },
                KWD: { price: 5, oldPrice: 8 },
            }
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleContentChange = (field: string, lang: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: {
                ...prev[field],
                [lang]: value
            }
        }));
    };

    const handleStatExpChange = (lang: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            stats: {
                ...prev.stats,
                exp: { ...prev.stats.exp, [lang]: value }
            }
        }));
    };

    const handleStatChange = (stat: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            stats: {
                ...prev.stats,
                [stat]: value
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/teachers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const newTeacher = await res.json();

                // 🚀 Optimistic Update: Add to global cache immediately
                await mutate('/api/teachers', (currentTeachers: any[] = []) => {
                    return [newTeacher, ...currentTeachers];
                }, false);

                alert("تم إضافة المعلم بنجاح! 🚀");
                router.push('/admin/teachers');
            } else {
                alert("حدث خطأ أثناء الإضافة.");
            }
        } catch (error) {
            console.error("Error creating teacher:", error);
            alert("حدث خطأ في الاتصال.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
                    <ArrowRight />
                </button>
                <h2 className="text-2xl font-bold text-white">إضافة معلم جديد</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-[#1F2937] p-6 rounded-2xl border border-white/5 space-y-6">
                    <h3 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-4">المعلومات الأساسية (متعدد اللغات)</h3>

                    {/* Name */}
                    <div className="space-y-3">
                        <label className="block text-sm text-gray-400">اسم المعلم</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="الاسم (عربي)"
                                value={formData.name.ar}
                                onChange={(e) => handleContentChange('name', 'ar', e.target.value)}
                                className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                dir="rtl"
                            />
                            <input
                                type="text"
                                placeholder="Name (English)"
                                value={formData.name.en}
                                onChange={(e) => handleContentChange('name', 'en', e.target.value)}
                                className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                dir="ltr"
                            />
                            <input
                                type="text"
                                placeholder="Name (Deutsch)"
                                value={formData.name.de}
                                onChange={(e) => handleContentChange('name', 'de', e.target.value)}
                                className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                dir="ltr"
                            />
                        </div>
                    </div>

                    {/* Role */}
                    <div className="space-y-3">
                        <label className="block text-sm text-gray-400">المسمى الوظيفي</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="الدور (عربي)"
                                value={formData.role.ar}
                                onChange={(e) => handleContentChange('role', 'ar', e.target.value)}
                                className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                dir="rtl"
                            />
                            <input
                                type="text"
                                placeholder="Role (English)"
                                value={formData.role.en}
                                onChange={(e) => handleContentChange('role', 'en', e.target.value)}
                                className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                dir="ltr"
                            />
                            <input
                                type="text"
                                placeholder="Rolle (Deutsch)"
                                value={formData.role.de}
                                onChange={(e) => handleContentChange('role', 'de', e.target.value)}
                                className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                dir="ltr"
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-3">
                        <label className="block text-sm text-gray-400">نبذة عن المعلم</label>
                        <div className="grid grid-cols-1 gap-4">
                            <textarea
                                placeholder="النبذة (عربي)"
                                value={formData.bio.ar}
                                onChange={(e) => handleContentChange('bio', 'ar', e.target.value)}
                                className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                dir="rtl"
                                rows={2}
                            />
                            <textarea
                                placeholder="Bio (English)"
                                value={formData.bio.en}
                                onChange={(e) => handleContentChange('bio', 'en', e.target.value)}
                                className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                dir="ltr"
                                rows={2}
                            />
                            <textarea
                                placeholder="Bio (Deutsch)"
                                value={formData.bio.de}
                                onChange={(e) => handleContentChange('bio', 'de', e.target.value)}
                                className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                dir="ltr"
                                rows={2}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">صورة المعلم</label>
                        <div className="space-y-3">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setFormData(prev => ({ ...prev, image: reader.result as string }));
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-midnight hover:file:bg-gold-shiny cursor-pointer"
                            />
                            {formData.image && (
                                <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-gold/20">
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">اختر صورة من جهازك (JPG, PNG)</p>
                    </div>
                </div>

                {/* Media */}
                <div className="bg-[#1F2937] p-6 rounded-2xl border border-white/5 space-y-6">
                    <h3 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-4 flex items-center gap-2">
                        <Video size={20} className="text-gold" />
                        <span>الوسائط والفيديو</span>
                    </h3>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">رابط الفيديو التعريفي (Youtube/Vimeo)</label>
                        <input
                            type="text"
                            name="videoUrl"
                            value={formData.videoUrl}
                            onChange={handleChange}
                            placeholder="https://youtube.com/..."
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                        />
                    </div>
                </div>

                {/* Pricing */}
                <div className="bg-[#1F2937] p-6 rounded-2xl border border-white/5 space-y-6">
                    <h3 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-4">الأسعار والخصومات</h3>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">مدة الحصة (بالدقائق)</label>
                        <input
                            type="number"
                            value={formData.pricing.duration}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                pricing: { ...prev.pricing, duration: parseInt(e.target.value) }
                            }))}
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {(['EGP', 'USD', 'SAR', 'KWD'] as const).map((currency) => (
                            <div key={currency} className="bg-black/20 p-4 rounded-xl border border-white/5">
                                <h4 className="text-gold font-bold mb-3">{currency}</h4>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">السعر الحالي</label>
                                        <input
                                            type="number"
                                            value={formData.pricing.prices[currency].price}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                pricing: {
                                                    ...prev.pricing,
                                                    prices: {
                                                        ...prev.pricing.prices,
                                                        [currency]: {
                                                            ...prev.pricing.prices[currency],
                                                            price: parseFloat(e.target.value)
                                                        }
                                                    }
                                                }
                                            }))}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:border-gold/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">السعر القديم (مشطوب)</label>
                                        <input
                                            type="number"
                                            value={formData.pricing.prices[currency].oldPrice}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                pricing: {
                                                    ...prev.pricing,
                                                    prices: {
                                                        ...prev.pricing.prices,
                                                        [currency]: {
                                                            ...prev.pricing.prices[currency],
                                                            oldPrice: parseFloat(e.target.value)
                                                        }
                                                    }
                                                }
                                            }))}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:border-gold/50"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-[#1F2937] p-6 rounded-2xl border border-white/5 space-y-6">
                    <h3 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-4">الإحصائيات والتقييم</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                                <Star size={16} className="text-gold" />
                                <span>التقييم (Stars)</span>
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                value={formData.stats.stars}
                                onChange={(e) => handleStatChange('stars', e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                                <Clock size={16} className="text-gold" />
                                <span>عدد الحصص (Sessions)</span>
                            </label>
                            <input
                                type="text"
                                value={formData.stats.sessions}
                                onChange={(e) => handleStatChange('sessions', e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                            />
                        </div>
                        <div className="md:col-span-3">
                            <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                                <Award size={16} className="text-gold" />
                                <span>الخبرة (Experience) - متعدد اللغات</span>
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    placeholder="الخبرة (عربي)"
                                    value={(formData.stats.exp as any)?.ar || ''}
                                    onChange={(e) => handleStatExpChange('ar', e.target.value)}
                                    className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                    dir="rtl"
                                />
                                <input
                                    type="text"
                                    placeholder="Experience (English)"
                                    value={(formData.stats.exp as any)?.en || ''}
                                    onChange={(e) => handleStatExpChange('en', e.target.value)}
                                    className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                    dir="ltr"
                                />
                                <input
                                    type="text"
                                    placeholder="Erfahrung (Deutsch)"
                                    value={(formData.stats.exp as any)?.de || ''}
                                    onChange={(e) => handleStatExpChange('de', e.target.value)}
                                    className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                    dir="ltr"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="bg-gold text-midnight text-lg font-bold px-8 py-3 rounded-xl hover:bg-gold-shiny transition-all shadow-lg shadow-gold/10 flex items-center gap-2"
                    >
                        <Save size={20} />
                        <span>إضافة المعلم</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
