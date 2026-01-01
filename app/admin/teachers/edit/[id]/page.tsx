"use client";
import React, { useState, useEffect } from 'react';
import { teachers } from '../../../../data/teachers';
import { useParams, useRouter } from 'next/navigation';
import { Save, ArrowRight, Video, Star, Clock, Award } from 'lucide-react';

export default function EditTeacherPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);

    const [formData, setFormData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching
        const teacher = teachers.find(t => t.id === id);
        if (teacher) {
            setFormData({
                ...teacher,
                videoUrl: '' // Add video field default
            });
        }
        setLoading(false);
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleStatChange = (stat: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            stats: {
                ...prev.stats,
                [stat]: value
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would make an API call to save
        alert("تم حفظ البيانات بنجاح! (محاكاة)");
        console.log("Saved Data:", formData);
        router.push('/admin/teachers');
    };

    if (loading) return <div className="p-10 text-white">جاري التحميل...</div>;
    if (!formData) return <div className="p-10 text-white">المعلم غير موجود.</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
                    <ArrowRight />
                </button>
                <h2 className="text-2xl font-bold text-white">تعديل بيانات المعلم: <span className="text-gold">{formData.name}</span></h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-[#1F2937] p-6 rounded-2xl border border-white/5 space-y-6">
                    <h3 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-4">المعلومات الأساسية</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">اسم المعلم</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">المسمى الوظيفي (Role)</label>
                            <input
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">نبذة عن المعلم (Bio)</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                        />
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
                        <div>
                            <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                                <Award size={16} className="text-gold" />
                                <span>الخبرة (Experience)</span>
                            </label>
                            <input
                                type="text"
                                value={formData.stats.exp}
                                onChange={(e) => handleStatChange('exp', e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                            />
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
        </div>
    );
}
