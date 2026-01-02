"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Save, ArrowRight, Video, Star, Clock, Award } from 'lucide-react';

export default function EditTeacherPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);

    const [formData, setFormData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const res = await fetch(`/api/teachers/${id}`);
                if (res.ok) {
                    const teacher = await res.json();
                    setFormData({
                        ...teacher,
                        videoUrl: teacher.videoUrl || '',
                        pricing: teacher.pricing || {
                            duration: 70,
                            currency: 'EGP',
                            prices: {
                                'EGP': { price: 250, oldPrice: 350 },
                                'USD': { price: 15, oldPrice: 20 },
                                'SAR': { price: 40, oldPrice: 55 },
                                'KWD': { price: 5, oldPrice: 7 }
                            }
                        }
                    });
                } else {
                    alert("المعلم غير موجود");
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchTeacher();
    }, [id]);

    const handleContentChange = (field: string, lang: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: {
                ...prev[field],
                [lang]: value
            }
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleStatExpChange = (lang: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            stats: {
                ...prev.stats,
                exp: {
                    ...(typeof prev.stats.exp === 'object' ? prev.stats.exp : { ar: prev.stats.exp, en: '', de: '' }),
                    [lang]: value
                }
            }
        }));
    };

    const handleStatChange = (stat: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            stats: { ...prev.stats, [stat]: value }
        }));
    };

    const handlePriceChange = (currency: string, field: 'price' | 'oldPrice', value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            pricing: {
                ...prev.pricing,
                prices: {
                    ...prev.pricing.prices,
                    [currency]: {
                        ...prev.pricing.prices[currency],
                        [field]: Number(value)
                    }
                }
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/teachers/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert("تم حفظ البيانات بنجاح!");
                router.push('/admin/teachers');
            } else {
                alert("حدث خطأ أثناء الحفظ.");
            }
        } catch (error) {
            console.error(error);
            alert("حدث خطأ في الاتصال.");
        }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] text-white p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header ... */}
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
                        <ArrowRight />
                    </button>
                    <h2 className="text-2xl font-bold text-white">تعديل بيانات المعلم: <span className="text-gold">{formData?.name?.ar || '...'}</span></h2>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : !formData ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400">المعلم غير موجود</p>
                    </div>
                ) : (
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
                                        value={formData.name?.ar || ''}
                                        onChange={(e) => handleContentChange('name', 'ar', e.target.value)}
                                        className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                        dir="rtl"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Name (English)"
                                        value={formData.name?.en || ''}
                                        onChange={(e) => handleContentChange('name', 'en', e.target.value)}
                                        className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                        dir="ltr"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Name (Deutsch)"
                                        value={formData.name?.de || ''}
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
                                        value={formData.role?.ar || ''}
                                        onChange={(e) => handleContentChange('role', 'ar', e.target.value)}
                                        className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                        dir="rtl"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Role (English)"
                                        value={formData.role?.en || ''}
                                        onChange={(e) => handleContentChange('role', 'en', e.target.value)}
                                        className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                        dir="ltr"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Rolle (Deutsch)"
                                        value={formData.role?.de || ''}
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
                                        value={formData.bio?.ar || ''}
                                        onChange={(e) => handleContentChange('bio', 'ar', e.target.value)}
                                        className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                        dir="rtl"
                                        rows={2}
                                    />
                                    <textarea
                                        placeholder="Bio (English)"
                                        value={formData.bio?.en || ''}
                                        onChange={(e) => handleContentChange('bio', 'en', e.target.value)}
                                        className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                        dir="ltr"
                                        rows={2}
                                    />
                                    <textarea
                                        placeholder="Bio (Deutsch)"
                                        value={formData.bio?.de || ''}
                                        onChange={(e) => handleContentChange('bio', 'de', e.target.value)}
                                        className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                        dir="ltr"
                                        rows={2}
                                    />
                                </div>
                            </div>

                            {/* Image Upload */}
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
                                                    setFormData((prev: any) => ({ ...prev, image: reader.result as string }));
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
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <div className="bg-[#1F2937] p-6 rounded-2xl border border-white/5 space-y-6">
                            <h3 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-4">الأسعار والخصومات</h3>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">مدة الحصة (بالدقائق)</label>
                                <input
                                    type="number"
                                    value={formData.pricing?.duration || 70}
                                    onChange={(e) => setFormData((prev: any) => ({ ...prev, pricing: { ...prev.pricing, duration: Number(e.target.value) } }))}
                                    className="w-full md:w-1/3 bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {['EGP', 'USD', 'SAR', 'KWD'].map((currency) => (
                                    <div key={currency} className="bg-black/20 p-4 rounded-xl border border-white/5">
                                        <h4 className="text-gold font-bold mb-3">{currency}</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-xs text-gray-500 mb-1 block">السعر الحالي</label>
                                                <input
                                                    type="number"
                                                    value={formData.pricing?.prices?.[currency]?.price || 0}
                                                    onChange={(e) => handlePriceChange(currency, 'price', e.target.value)}
                                                    className="w-full bg-[#111827] border border-white/10 rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:border-gold/50"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500 mb-1 block">السعر القديم (مشطوب)</label>
                                                <input
                                                    type="number"
                                                    value={formData.pricing?.prices?.[currency]?.oldPrice || 0}
                                                    onChange={(e) => handlePriceChange(currency, 'oldPrice', e.target.value)}
                                                    className="w-full bg-[#111827] border border-white/10 rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:border-gold/50"
                                                    placeholder="اختياري"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
                                    value={formData.videoUrl || ''}
                                    onChange={handleChange}
                                    placeholder="https://youtube.com/..."
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                />
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
                                            value={formData.stats.exp?.ar || ''}
                                            onChange={(e) => handleStatExpChange('ar', e.target.value)}
                                            className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                            dir="rtl"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Experience (English)"
                                            value={formData.stats.exp?.en || ''}
                                            onChange={(e) => handleStatExpChange('en', e.target.value)}
                                            className="bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                            dir="ltr"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Erfahrung (Deutsch)"
                                            value={formData.stats.exp?.de || ''}
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
                                <span>حفظ التغييرات</span>
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
