"use client";
import React from 'react';
import useSWR from 'swr';
import { Users, BookOpen, Clock, TrendingUp, Calendar } from 'lucide-react';

export default function AdminDashboard() {
    // Use SWR for automatic caching and revalidation
    const { data: bookings = [], error: bookingsError } = useSWR('/api/bookings');
    const { data: teachers = [], error: teachersError } = useSWR('/api/teachers');

    const teacherCount = teachers.length;
    const bookingStats = React.useMemo(() => ({
        confirmed: bookings.filter((b: any) => b.status === 'مؤكد').length,
        pending: bookings.filter((b: any) => b.status === 'قيد الانتظار').length,
        cancelled: bookings.filter((b: any) => b.status === 'ملغي').length
    }), [bookings]);

    const stats = [
        { label: 'عدد المعلمين', value: teacherCount.toString(), icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'الحصص المكتملة', value: '1,250', icon: BookOpen, color: 'text-green-400', bg: 'bg-green-400/10' },
        { label: 'ساعات العمل', value: '3,400', icon: Clock, color: 'text-gold', bg: 'bg-gold/10' },
        { label: 'نسبة النمو', value: '+15%', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    ];

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">مرحباً بك 👋</h2>
                    <p className="text-gray-400">نظرة عامة على أداء الأكاديمية</p>
                </div>
                <div className="text-left" dir="ltr">
                    <p className="text-white font-mono text-sm">{new Date().toLocaleDateString('en-US')}</p>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Teachers Count Card */}
                <div className="bg-[#1F2937] p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-400/10 text-blue-400">
                        <Users size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">{teacherCount}</h3>
                        <p className="text-gray-400 text-sm">عدد المعلمين</p>
                    </div>
                </div>

                {/* Combined Booking Stats Card */}
                <div className="lg:col-span-3 bg-[#1F2937] p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4 w-full justify-center md:justify-start">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-400/10 text-green-400">
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">{bookingStats.confirmed}</h3>
                            <p className="text-gray-400 text-sm">حجوزات مؤكدة</p>
                        </div>
                    </div>

                    <div className="w-px h-12 bg-white/10 hidden md:block"></div>

                    <div className="flex items-center gap-4 w-full justify-center md:justify-start">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-yellow-400/10 text-yellow-400">
                            <Clock size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">{bookingStats.pending}</h3>
                            <p className="text-gray-400 text-sm">قيد الانتظار</p>
                        </div>
                    </div>

                    <div className="w-px h-12 bg-white/10 hidden md:block"></div>

                    <div className="flex items-center gap-4 w-full justify-center md:justify-start">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-red-400/10 text-red-400">
                            <TrendingUp size={24} className="rotate-180" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">{bookingStats.cancelled}</h3>
                            <p className="text-gray-400 text-sm">حجوزات ملغية</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-[#1F2937] rounded-3xl p-8 border border-white/5">
                <div className="flex items-center gap-3 mb-6">
                    <Calendar className="text-gold" size={24} />
                    <h3 className="text-xl font-bold text-white">الحجوزات الأخيرة</h3>
                </div>
                {bookings.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">لا توجد حجوزات حتى الآن</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-right" dir="rtl">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="pb-3 text-gray-400 font-medium text-sm">اسم الطالب</th>
                                    <th className="pb-3 text-gray-400 font-medium text-sm">المعلم</th>
                                    <th className="pb-3 text-gray-400 font-medium text-sm">التاريخ</th>
                                    <th className="pb-3 text-gray-400 font-medium text-sm">الوقت</th>
                                    <th className="pb-3 text-gray-400 font-medium text-sm">الحالة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking: any) => (
                                    <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="py-4 text-white">
                                            <div>{booking.name}</div>
                                            <div className="text-xs text-gray-500">{booking.phone}</div>
                                        </td>
                                        <td className="py-4 text-gray-300">{booking.teacher}</td>
                                        <td className="py-4 text-gray-300">{new Date(booking.submittedAt).toLocaleDateString()}</td>
                                        <td className="py-4 text-gray-300">{new Date(booking.submittedAt).toLocaleTimeString()}</td>
                                        <td className="py-4">
                                            <div className="flex flex-col gap-1 items-start">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'مؤكد'
                                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                    : booking.status === 'ملغي'
                                                        ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                                                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                                {booking.status === 'ملغي' && booking.cancellationReason && (
                                                    <span className="text-xs text-red-400 max-w-[150px] truncate" title={booking.cancellationReason}>
                                                        السبب: {booking.cancellationReason}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
