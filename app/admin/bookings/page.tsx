"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, User, Phone, Target, Clock, CheckCircle, XCircle, MessageSquare } from 'lucide-react';

interface Booking {
    id: number;
    name: string;
    phone: string;
    teacher: string;
    teacherId: number;
    goal: string;
    level: string;
    timeline: string;
    days: string[];
    times: string[];
    source: string;
    submittedAt: string;
    status: string;
}

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await fetch('/api/bookings');
            if (res.ok) {
                const data = await res.json();
                setBookings(data.sort((a: Booking, b: Booking) =>
                    new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
                ));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: number, newStatus: string) => {
        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                fetchBookings();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const sendWhatsApp = (booking: Booking) => {
        const message = encodeURIComponent(
            `مرحباً ${booking.name}! 👋\n\n` +
            `شكراً لحجزك في DE1 Academy 🎓\n\n` +
            `تفاصيل حجزك:\n` +
            `👨‍🏫 المعلم: ${booking.teacher}\n` +
            `🎯 الهدف: ${booking.goal}\n` +
            `📊 المستوى: ${booking.level}\n` +
            `⏰ الإطار الزمني: ${booking.timeline}\n\n` +
            `سنتواصل معك قريباً لتأكيد موعد الحصة التجريبية! ✨`
        );
        window.open(`https://wa.me/${booking.phone.replace(/\D/g, '')}?text=${message}`, '_blank');
    };

    const filteredBookings = bookings.filter(b => {
        if (filter === 'all') return true;
        if (filter === 'pending') return b.status === 'قيد الانتظار';
        if (filter === 'confirmed') return b.status === 'مؤكد';
        if (filter === 'cancelled') return b.status === 'ملغي';
        return true;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'قيد الانتظار': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'مؤكد': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'ملغي': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0F172A] text-white p-8">
                <div className="flex items-center justify-center h-96">
                    <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F172A] text-white p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">الحجوزات</h1>
                    <p className="text-gray-400">إدارة جميع حجوزات الطلاب</p>
                </div>

                {/* Filters */}
                <div className="flex gap-4 mb-6 flex-wrap">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-6 py-2 rounded-xl font-bold transition-all ${filter === 'all'
                                ? 'bg-gold text-midnight'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        الكل ({bookings.length})
                    </button>
                    <button
                        onClick={() => setFilter('pending')}
                        className={`px-6 py-2 rounded-xl font-bold transition-all ${filter === 'pending'
                                ? 'bg-yellow-500 text-midnight'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        قيد الانتظار ({bookings.filter(b => b.status === 'قيد الانتظار').length})
                    </button>
                    <button
                        onClick={() => setFilter('confirmed')}
                        className={`px-6 py-2 rounded-xl font-bold transition-all ${filter === 'confirmed'
                                ? 'bg-green-500 text-midnight'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        مؤكد ({bookings.filter(b => b.status === 'مؤكد').length})
                    </button>
                    <button
                        onClick={() => setFilter('cancelled')}
                        className={`px-6 py-2 rounded-xl font-bold transition-all ${filter === 'cancelled'
                                ? 'bg-red-500 text-midnight'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        ملغي ({bookings.filter(b => b.status === 'ملغي').length})
                    </button>
                </div>

                {/* Bookings Grid */}
                <div className="grid gap-6">
                    {filteredBookings.length === 0 ? (
                        <div className="bg-white/5 rounded-2xl p-12 text-center">
                            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400 text-lg">لا توجد حجوزات</p>
                        </div>
                    ) : (
                        filteredBookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="bg-[#1F2937] rounded-2xl p-6 border border-white/5 hover:border-gold/20 transition-all"
                            >
                                <div className="flex flex-col lg:flex-row gap-6">
                                    {/* Main Info */}
                                    <div className="flex-grow space-y-4">
                                        <div className="flex items-start justify-between gap-4 flex-wrap">
                                            <div>
                                                <h3 className="text-2xl font-bold text-white mb-1">{booking.name}</h3>
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <Phone className="w-4 h-4" />
                                                    <span className="font-mono">{booking.phone}</span>
                                                </div>
                                            </div>
                                            <span className={`px-4 py-2 rounded-xl text-sm font-bold border ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <User className="w-4 h-4 text-gold" />
                                                <span className="font-medium">المعلم: {booking.teacher}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <Target className="w-4 h-4 text-gold" />
                                                <span className="font-medium">الهدف: {booking.goal}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <Clock className="w-4 h-4 text-gold" />
                                                <span className="font-medium">المستوى: {booking.level}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <Calendar className="w-4 h-4 text-gold" />
                                                <span className="font-medium">الإطار الزمني: {booking.timeline}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 flex-wrap text-sm">
                                            <div className="bg-white/5 px-3 py-1 rounded-lg">
                                                <span className="text-gray-400">الأيام: </span>
                                                <span className="text-white font-medium">{booking.days.join(', ')}</span>
                                            </div>
                                            <div className="bg-white/5 px-3 py-1 rounded-lg">
                                                <span className="text-gray-400">الأوقات: </span>
                                                <span className="text-white font-medium">{booking.times.join(', ')}</span>
                                            </div>
                                            <div className="bg-white/5 px-3 py-1 rounded-lg">
                                                <span className="text-gray-400">المصدر: </span>
                                                <span className="text-white font-medium">{booking.source}</span>
                                            </div>
                                        </div>

                                        <div className="text-xs text-gray-500">
                                            تم الإرسال: {new Date(booking.submittedAt).toLocaleString('ar-EG')}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex lg:flex-col gap-2 flex-wrap">
                                        <button
                                            onClick={() => sendWhatsApp(booking)}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all"
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                            <span>واتساب</span>
                                        </button>
                                        {booking.status === 'قيد الانتظار' && (
                                            <button
                                                onClick={() => updateStatus(booking.id, 'مؤكد')}
                                                className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-gold-shiny text-midnight rounded-xl font-bold transition-all"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                <span>تأكيد</span>
                                            </button>
                                        )}
                                        {booking.status !== 'ملغي' && (
                                            <button
                                                onClick={() => updateStatus(booking.id, 'ملغي')}
                                                className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-500 rounded-xl font-bold transition-all border border-red-500/20"
                                            >
                                                <XCircle className="w-4 h-4" />
                                                <span>إلغاء</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
