"use client";
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import Link from 'next/link';
import Toast from '@/app/components/Toast';
import { Edit, Trash2, Star, Eye, Plus } from 'lucide-react';

export default function AdminTeachersPage() {
    const { data: teachers = [], error } = useSWR<any[]>('/api/teachers');
    const [searchTerm, setSearchTerm] = useState('');
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);


    const filteredTeachers: any[] = teachers.filter((t: any) => {
        const name = typeof t.name === 'string' ? t.name : t.name?.ar || '';
        const role = typeof t.role === 'string' ? t.role : t.role?.ar || '';
        return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            role.toLowerCase().includes(searchTerm.toLowerCase());
    });


    const handleDelete = async (id: number) => {
        // Instant DELETE - No Confirmation for Speed 🚀
        setDeletingId(id);

        // 1. Optimistic update - Remove immediately from UI
        const previousTeachers = teachers;
        const newTeachers = teachers.filter((t: any) => t.id !== id);
        mutate('/api/teachers', newTeachers, false);

        // 2. Show Success Immediately
        setToast({ message: 'تم حذف المعلم بنجاح! 🚀', type: 'success' });

        try {
            // 3. Send Request in Background
            const res = await fetch(`/api/teachers/${id}`, { method: 'DELETE' });

            if (res.ok) {
                // 4. Silent Revalidation to ensure consistency
                mutate('/api/teachers');
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) {
            // 5. Revert on Error
            console.error("Delete failed", error);
            mutate('/api/teachers', previousTeachers, false);
            setToast({ message: 'فشل الحذف. تمت استعادة البيانات.', type: 'error' });
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">إدارة المعلمين</h2>
                        <p className="text-gray-400 text-sm">عرض وتحرير بيانات المعلمين</p>
                    </div>
                    <Link
                        href="/admin/teachers/new"
                        className="flex items-center gap-2 bg-gold text-midnight px-6 py-2.5 rounded-xl font-bold hover:bg-gold-shiny transition-colors"
                    >
                        <Plus size={20} />
                        <span>إضافة معلم</span>
                    </Link>
                </div>

                {/* Search */}
                <div className="bg-[#1F2937] p-4 rounded-xl border border-white/5">
                    <input
                        type="text"
                        placeholder="بحث عن معلم..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-gold/50"
                        suppressHydrationWarning
                    />
                </div>

                {/* Table */}
                <div className="bg-[#1F2937] rounded-2xl border border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead className="bg-black/20 text-gray-400 text-sm">
                                <tr>
                                    <th className="p-4">المعلم</th>
                                    <th className="p-4">الدور</th>
                                    <th className="p-4">التقييم</th>
                                    <th className="p-4">الحصص</th>
                                    <th className="p-4">الخبرة</th>
                                    <th className="p-4 text-center">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredTeachers.map((teacher: any) => (
                                    <tr key={teacher.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-bold text-white">
                                            {typeof teacher.name === 'string' ? teacher.name : teacher.name?.ar}
                                        </td>
                                        <td className="p-4 text-gray-300">
                                            {typeof teacher.role === 'string' ? teacher.role : teacher.role?.ar}
                                        </td>
                                        <td className="p-4 flex items-center gap-1 text-gold">
                                            <Star size={16} fill="currentColor" />
                                            <span>{teacher.stats.stars}</span>
                                        </td>
                                        <td className="p-4 text-gray-300">{teacher.stats.sessions}</td>
                                        <td className="p-4 text-gray-300">
                                            {typeof teacher.stats.exp === 'object' ? teacher.stats.exp.ar : teacher.stats.exp}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <a
                                                    href={`/teachers/${teacher.id}`}
                                                    target="_blank"
                                                    className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                                                    title="معاينة"
                                                >
                                                    <Eye size={18} />
                                                </a>
                                                <Link
                                                    href={`/admin/teachers/edit/${teacher.id}`}
                                                    className="p-2 bg-gold/10 text-gold rounded-lg hover:bg-gold/20 transition-colors"
                                                    title="تعديل"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(teacher.id)}
                                                    disabled={deletingId === teacher.id}
                                                    className={`p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors ${deletingId === teacher.id ? 'opacity-50 cursor-not-allowed' : ''
                                                        }`}
                                                    title="حذف"
                                                >
                                                    <Trash2 size={18} className={deletingId === teacher.id ? 'animate-spin' : ''} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredTeachers.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            لا يوجد معلمين مطابقين للبحث.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
