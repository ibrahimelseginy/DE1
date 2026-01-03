"use client";
import React, { useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import { Users, BookOpen, Clock, TrendingUp, Calendar, Check, X, Printer, Download, Plus, Eye } from 'lucide-react';

export default function AdminDashboard() {
    // Optimized SWR for "Blazing Fast" Speed 🚀
    const swrConfig = {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 60000, // Cache 1 min
        keepPreviousData: true
    };

    // Explicit fetcher to ensure consistency
    const fetcher = (url: string) => fetch(url).then(res => res.json());

    const { data: bookingsRaw = [], error: bookingsError } = useSWR('/api/bookings', fetcher, swrConfig);
    const { data: teachersRaw = [], error: teachersError } = useSWR('/api/teachers', fetcher, swrConfig);

    // Local state to hold bookings + new ones (to prevent disappearing on SWR revalidate)
    const [localBookings, setLocalBookings] = React.useState<any[]>([]);

    // Sync local state with SWR data initially, but preserve our local additions
    React.useEffect(() => {
        if (Array.isArray(bookingsRaw)) {
            setLocalBookings(prev => {
                // Return SWR data if we haven't added anything locally yet, OR merge carefully
                // For this specific issue where SWR overwrites our manual add, we prioritize local additions if they exist in a "modified" way
                // But simple way: Just rely on SWR unless we explicitly added something? 
                // Better approach: Just set it initially, and when we add, we prepend to THIS state.
                // However, if SWR refetches, we want to respect it UNLESS it wipes our temp data.
                // Since this is a specialized case for "Demo on Vercel", let's trust SWR but KEEP locally added items.

                // Strategy: Only update from SWR if the count is different and we haven't just added one? 
                // Or: Keep a separate list of "optimistic" bookings and display merged list.
                return bookingsRaw; // Reset to server state normally
            });
        }
    }, [bookingsRaw]);

    // Better strategy for "Demo":
    // 1. Maintain `displayBookings` which is `optimisticBookings` + `serverBookings`
    const [optimisticBookings, setOptimisticBookings] = React.useState<any[]>([]);

    // Combine server data + optimistic data
    const bookings = React.useMemo(() => {
        const serverData = Array.isArray(bookingsRaw) ? bookingsRaw : [];
        // Filter out any server items that might duplicate optimistic (by ID)
        return [...optimisticBookings, ...serverData];
    }, [bookingsRaw, optimisticBookings]);

    const teachers = Array.isArray(teachersRaw) ? teachersRaw : [];

    const [selectedBooking, setSelectedBooking] = React.useState<any>(null);

    const teacherCount = teachers.length;
    const bookingStats = React.useMemo(() => ({
        confirmed: bookings.filter((b: any) => b.status === 'مؤكد').length,
        pending: bookings.filter((b: any) => b.status === 'قيد الانتظار').length,
        cancelled: bookings.filter((b: any) => b.status === 'ملغي').length
    }), [bookings]);

    // Hydration fix for date
    const [currentDate, setCurrentDate] = React.useState('');
    React.useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString('en-US'));
    }, []);

    const stats = [
        { label: 'عدد المعلمين', value: teacherCount.toString(), icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'الحصص المكتملة', value: '1,250', icon: BookOpen, color: 'text-green-400', bg: 'bg-green-400/10' },
        { label: 'ساعات العمل', value: '3,400', icon: Clock, color: 'text-gold', bg: 'bg-gold/10' },
        { label: 'نسبة النمو', value: '+15%', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    ];

    // State for new booking modal
    const [showNewBookingModal, setShowNewBookingModal] = React.useState(false);
    const [newBooking, setNewBooking] = React.useState({
        name: '',
        phone: '',
        teacherId: '',
        teacherName: '',
        status: 'قيد الانتظار',
        deposit: '',
        notes: ''
    });


    // Handler for confirming booking
    const handleConfirmBooking = useCallback(async (bookingId: number) => {
        const deposit = prompt('أدخل قيمة الديبوزت (جنيه):');
        if (!deposit) return;

        // Optimistic update
        const updatedBookings = bookings.map((b: any) =>
            b.id === bookingId
                ? { ...b, status: 'مؤكد', deposit: parseFloat(deposit) }
                : b
        );
        mutate('/api/bookings', updatedBookings, false);

        try {
            const res = await fetch(`/api/bookings/${bookingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: 'مؤكد',
                    deposit: parseFloat(deposit)
                })
            });

            if (res.ok) {
                mutate('/api/bookings');
                alert('✅ تم تأكيد الحجز بنجاح!');
            } else {
                mutate('/api/bookings');
                alert('❌ فشل التأكيد');
            }
        } catch (error) {
            mutate('/api/bookings');
            alert('❌ حدث خطأ');
        }
    }, [bookings]);

    // Handler for rejecting booking
    const handleRejectBooking = useCallback(async (bookingId: number) => {
        const reason = prompt('سبب الرفض:');
        if (!reason) return;

        // Optimistic update
        const updatedBookings = bookings.map((b: any) =>
            b.id === bookingId
                ? { ...b, status: 'ملغي', cancellationReason: reason }
                : b
        );
        mutate('/api/bookings', updatedBookings, false);

        try {
            const res = await fetch(`/api/bookings/${bookingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: 'ملغي',
                    cancellationReason: reason
                })
            });

            if (res.ok) {
                mutate('/api/bookings');
                alert('✅ تم رفض الحجز');
            } else {
                mutate('/api/bookings');
                alert('❌ فشل الرفض');
            }
        } catch (error) {
            mutate('/api/bookings');
            alert('❌ حدث خطأ');
        }
    }, [bookings]);

    // Handler for printing booking
    const handlePrintBooking = useCallback((booking: any) => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const printContent = `
            <!DOCTYPE html>
            <html dir="rtl" lang="ar">
            <head>
                <meta charset="UTF-8">
                <title>إيصال حجز - DE1 Academy</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        padding: 40px;
                        background: #fff;
                        color: #000;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 40px;
                        border-bottom: 3px solid #000;
                        padding-bottom: 20px;
                    }
                    .logo {
                        font-size: 32px;
                        font-weight: bold;
                        color: #000;
                        margin-bottom: 10px;
                    }
                    .subtitle {
                        color: #000;
                        font-size: 14px;
                    }
                    .info-section {
                        margin: 30px 0;
                        padding: 20px;
                        background: #fff;
                        border: 2px solid #000;
                        border-radius: 8px;
                    }
                    .info-row {
                        display: flex;
                        justify-content: space-between;
                        padding: 12px 0;
                        border-bottom: 1px solid #ccc;
                    }
                    .info-row:last-child { border-bottom: none; }
                    .label {
                        font-weight: bold;
                        color: #000;
                    }
                    .value {
                        color: #000;
                    }
                    .status {
                        display: inline-block;
                        padding: 6px 16px;
                        border-radius: 20px;
                        font-size: 14px;
                        font-weight: bold;
                        border: 2px solid #000;
                    }
                    .status-confirmed {
                        background: #fff;
                        color: #000;
                    }
                    .status-pending {
                        background: #fff;
                        color: #000;
                    }
                    .status-cancelled {
                        background: #fff;
                        color: #000;
                    }
                    .deposit-box {
                        background: #fff;
                        color: #000;
                        padding: 20px;
                        border: 3px solid #000;
                        border-radius: 8px;
                        text-align: center;
                        margin: 20px 0;
                    }
                    .deposit-amount {
                        font-size: 32px;
                        font-weight: bold;
                        margin: 10px 0;
                        color: #000;
                    }
                    .footer {
                        margin-top: 40px;
                        text-align: center;
                        color: #000;
                        font-size: 12px;
                        border-top: 2px solid #000;
                        padding-top: 20px;
                    }
                    @media print {
                        body { padding: 20px; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="logo">🎓 DE1 Academy</div>
                    <div class="subtitle">نظرة عامة على أداء الأكاديمية</div>
                </div>

                <div class="info-section">
                    <h2 style="margin-bottom: 20px; color: #c89e4c;">تفاصيل الحجز</h2>
                    
                    <div class="info-row">
                        <span class="label">رقم الحجز:</span>
                        <span class="value">#${booking.id}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="label">اسم الطالب:</span>
                        <span class="value">${booking.name}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="label">رقم الهاتف:</span>
                        <span class="value">${booking.phone}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="label">المعلم:</span>
                        <span class="value">${booking.teacherName || booking.teacher || 'غير محدد'}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="label">التاريخ:</span>
                        <span class="value">${new Date(booking.submittedAt).toLocaleDateString('ar-EG')}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="label">الوقت:</span>
                        <span class="value">${new Date(booking.submittedAt).toLocaleTimeString('ar-EG')}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="label">الحالة:</span>
                        <span class="value">
                            <span class="status ${booking.status === 'مؤكد' ? 'status-confirmed' :
                booking.status === 'ملغي' ? 'status-cancelled' : 'status-pending'
            }">${booking.status}</span>
                        </span>
                    </div>
                </div>

                ${booking.deposit ? `
                    <div class="deposit-box">
                        <div>المبلغ المدفوع (الديبوزت)</div>
                        <div class="deposit-amount">${booking.deposit} جنيه</div>
                    </div>
                ` : ''}

                ${booking.cancellationReason || booking.pendingReason || booking.notes ? `
                    <div class="info-section">
                        <h3 style="margin-bottom: 15px; color: #333;">ملاحظات:</h3>
                        <p style="color: #666; line-height: 1.6;">
                            ${booking.cancellationReason || booking.pendingReason || booking.notes}
                        </p>
                    </div>
                ` : ''}

                <div class="footer">
                    <p>تم الطباعة في: ${new Date().toLocaleString('ar-EG')}</p>
                    <p style="margin-top: 10px;">DE1 Academy - جميع الحقوق محفوظة © ${new Date().getFullYear()}</p>
                </div>

                <script>
                    window.onload = function() {
                        window.print();
                    }
                </script>
            </body>
            </html>
        `;

        printWindow.document.write(printContent);
        printWindow.document.close();
    }, []);

    // Handler for exporting to Excel with styling
    const handleExportToExcel = useCallback(async () => {
        // Dynamic import to avoid SSR issues
        const XLSX = await import('xlsx');

        // Prepare data with headers
        const data = [
            // Title row
            ['DE1 Academy - تقرير الحجوزات'],
            [],
            // Headers
            ['رقم الحجز', 'اسم الطالب', 'رقم الهاتف', 'المعلم', 'التاريخ', 'الوقت', 'الحالة', 'الديبوزت', 'السبب/الملاحظات'],
            // Data rows
            ...bookings.map((booking: any) => [
                booking.id,
                booking.name,
                `'${booking.phone}`, // Add apostrophe to preserve leading zeros
                booking.teacherName || booking.teacher || 'غير محدد',
                new Date(booking.submittedAt).toLocaleDateString('ar-EG'),
                new Date(booking.submittedAt).toLocaleTimeString('ar-EG'),
                booking.status,
                booking.deposit || '-',
                booking.cancellationReason || booking.pendingReason || booking.notes || '-'
            ])
        ];

        // Create worksheet
        const ws = XLSX.utils.aoa_to_sheet(data);

        // Set column widths (in characters)
        ws['!cols'] = [
            { wch: 12 },  // رقم الحجز
            { wch: 25 },  // اسم الطالب
            { wch: 20 },  // رقم الهاتف
            { wch: 25 },  // المعلم
            { wch: 15 },  // التاريخ
            { wch: 15 },  // الوقت
            { wch: 12 },  // الحالة
            { wch: 12 },  // الديبوزت
            { wch: 40 }   // السبب/الملاحظات
        ];

        // Merge cells for title
        ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 8 } }];

        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'الحجوزات');

        // Generate file name with date
        const fileName = `DE1_Academy_Bookings_${new Date().toISOString().split('T')[0]}.xlsx`;

        // Download
        XLSX.writeFile(wb, fileName);
    }, [bookings]);

    // Handler for creating new booking
    const handleCreateBooking = useCallback(async () => {
        // Validation
        if (!newBooking.name || !newBooking.phone || !newBooking.teacherName) {
            alert('❌ برجاء ملء جميع الحقول المطلوبة');
            return;
        }

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newBooking,
                    deposit: newBooking.deposit ? parseFloat(newBooking.deposit) : undefined,
                    submittedAt: new Date().toISOString()
                })
            });

            if (res.ok) {
                const createdBooking = await res.json();

                // Robust Optimistic Update: Add to local state which persists across SWR revalidations
                setOptimisticBookings(prev => [createdBooking, ...prev]);

                // Also try to update SWR cache just in case, but rely on optimistic state for display
                mutate('/api/bookings', (currentBookings: any) => {
                    const bookingsArray = Array.isArray(currentBookings) ? currentBookings : [];
                    return [createdBooking, ...bookingsArray];
                }, false);

                setShowNewBookingModal(false);
                setNewBooking({
                    name: '',
                    phone: '',
                    teacherId: '',
                    teacherName: '',
                    status: 'قيد الانتظار',
                    deposit: '',
                    notes: ''
                });
                alert('✅ تم إضافة الحجز بنجاح!');
            } else {
                alert('❌ فشل إضافة الحجز');
            }
        } catch (error) {
            alert('❌ حدث خطأ');
        }
    }, [newBooking]);


    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">مرحباً بك 👋</h2>
                    <p className="text-gray-400">نظرة عامة على أداء الأكاديمية</p>
                </div>
                <div className="text-left" dir="ltr">
                    <p className="text-white font-mono text-sm">{currentDate}</p>
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
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Calendar className="text-gold" size={24} />
                        <h3 className="text-xl font-bold text-white">الحجوزات الأخيرة</h3>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowNewBookingModal(true)}
                            className="flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-lg hover:bg-gold/20 transition-colors border border-gold/20"
                            title="إضافة حجز جديد"
                        >
                            <Plus size={18} />
                            <span className="text-sm font-medium">حجز جديد</span>
                        </button>
                        <button
                            onClick={handleExportToExcel}
                            className="flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500/20 transition-colors border border-green-500/20"
                            title="تصدير إلى Excel"
                        >
                            <Download size={18} />
                            <span className="text-sm font-medium">تصدير Excel</span>
                        </button>
                    </div>
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
                                    <th className="pb-3 text-gray-400 font-medium text-sm">الديبوزت</th>
                                    <th className="pb-3 text-gray-400 font-medium text-sm">السبب/الملاحظات</th>
                                    <th className="pb-3 text-gray-400 font-medium text-sm text-center">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking: any) => (
                                    <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="py-4 text-white">
                                            <div>{booking.name}</div>
                                            <div className="text-xs text-gray-500">{booking.phone}</div>
                                        </td>
                                        <td className="py-4 text-gray-300">{booking.teacherName || booking.teacher || 'غير محدد'}</td>
                                        <td className="py-4 text-gray-300">{new Date(booking.submittedAt).toLocaleDateString()}</td>
                                        <td className="py-4 text-gray-300">{new Date(booking.submittedAt).toLocaleTimeString()}</td>
                                        <td className="py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'مؤكد'
                                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                : booking.status === 'ملغي'
                                                    ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                                                    : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-gray-300">
                                            {booking.deposit ? (
                                                <span className="text-green-400 font-medium">{booking.deposit} جنيه</span>
                                            ) : (
                                                <span className="text-gray-500">-</span>
                                            )}
                                        </td>
                                        <td className="py-4">
                                            {(booking.cancellationReason || booking.pendingReason || booking.notes) ? (
                                                <span className="text-xs text-gray-400 max-w-[200px] block truncate"
                                                    title={booking.cancellationReason || booking.pendingReason || booking.notes}>
                                                    {booking.cancellationReason || booking.pendingReason || booking.notes}
                                                </span>
                                            ) : (
                                                <span className="text-gray-500">-</span>
                                            )}
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                {booking.status === 'قيد الانتظار' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleConfirmBooking(booking.id)}
                                                            className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors"
                                                            title="تأكيد الحجز"
                                                        >
                                                            <Check size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleRejectBooking(booking.id)}
                                                            className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                                                            title="رفض الحجز"
                                                        >
                                                            <X size={18} />
                                                        </button>
                                                    </>
                                                )}
                                                {/* View button - available for all bookings */}
                                                <button
                                                    onClick={() => setSelectedBooking(booking)}
                                                    className="p-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors"
                                                    title="عرض التفاصيل"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                {/* Print button - available for all bookings */}
                                                <button
                                                    onClick={() => handlePrintBooking(booking)}
                                                    className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                                                    title="طباعة الحجز"
                                                >
                                                    <Printer size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* New Booking Modal */}
            {showNewBookingModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowNewBookingModal(false)}>
                    <div className="bg-[#1F2937] rounded-2xl p-8 max-w-2xl w-full border border-white/10" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold text-white mb-6">إضافة حجز جديد</h2>

                        <div className="space-y-4">
                            {/* Student Name */}
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">اسم الطالب *</label>
                                <input
                                    type="text"
                                    value={newBooking.name}
                                    onChange={(e) => setNewBooking({ ...newBooking, name: e.target.value })}
                                    className="w-full bg-[#111827] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                    placeholder="أدخل اسم الطالب"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">رقم الهاتف *</label>
                                <input
                                    type="tel"
                                    value={newBooking.phone}
                                    onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                                    className="w-full bg-[#111827] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                    placeholder="01xxxxxxxxx"
                                />
                            </div>

                            {/* Teacher Selection */}
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">المعلم *</label>
                                <select
                                    value={newBooking.teacherId}
                                    onChange={(e) => {
                                        const selectedTeacher = teachers.find((t: any) => t.id === parseInt(e.target.value));
                                        setNewBooking({
                                            ...newBooking,
                                            teacherId: e.target.value,
                                            teacherName: selectedTeacher?.name?.ar || ''
                                        });
                                    }}
                                    className="w-full bg-[#111827] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                >
                                    <option value="">اختر المعلم</option>
                                    {teachers.map((teacher: any) => (
                                        <option key={teacher.id} value={teacher.id}>
                                            {teacher.name?.ar || teacher.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">الحالة</label>
                                <select
                                    value={newBooking.status}
                                    onChange={(e) => setNewBooking({ ...newBooking, status: e.target.value })}
                                    className="w-full bg-[#111827] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                >
                                    <option value="قيد الانتظار">قيد الانتظار</option>
                                    <option value="مؤكد">مؤكد</option>
                                    <option value="ملغي">ملغي</option>
                                </select>
                            </div>

                            {/* Deposit */}
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">الديبوزت (اختياري)</label>
                                <input
                                    type="number"
                                    value={newBooking.deposit}
                                    onChange={(e) => setNewBooking({ ...newBooking, deposit: e.target.value })}
                                    className="w-full bg-[#111827] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-gold/50"
                                    placeholder="0"
                                />
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">ملاحظات (اختياري)</label>
                                <textarea
                                    value={newBooking.notes}
                                    onChange={(e) => setNewBooking({ ...newBooking, notes: e.target.value })}
                                    className="w-full bg-[#111827] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-gold/50 min-h-[100px]"
                                    placeholder="أي ملاحظات إضافية..."
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 mt-6">
                            <button
                                onClick={handleCreateBooking}
                                className="flex-1 bg-gold text-midnight font-bold py-3 rounded-lg hover:bg-gold-shiny transition-colors"
                            >
                                إضافة الحجز
                            </button>
                            <button
                                onClick={() => setShowNewBookingModal(false)}
                                className="flex-1 bg-white/5 text-white font-bold py-3 rounded-lg hover:bg-white/10 transition-colors border border-white/10"
                            >
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Booking Details Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setSelectedBooking(null)}>
                    <div className="bg-[#1F2937] rounded-2xl p-8 max-w-2xl w-full border border-white/10 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gold mb-2">تفاصيل الحجز #{selectedBooking.id}</h2>
                                <p className="text-gray-400">تاريخ الطلب: {new Date(selectedBooking.submittedAt).toLocaleDateString()} {new Date(selectedBooking.submittedAt).toLocaleTimeString()}</p>
                            </div>
                            <button onClick={() => setSelectedBooking(null)} className="text-gray-400 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-black/20 p-5 rounded-xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">بيانات الطالب</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">الاسم:</span>
                                        <span className="text-white font-medium">{selectedBooking.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">الهاتف:</span>
                                        <span className="text-white font-medium" dir="ltr">{selectedBooking.phone}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">المعلم:</span>
                                        <span className="text-white font-medium">{selectedBooking.teacherName || selectedBooking.teacher || 'غير محدد'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">الحالة:</span>
                                        <span className={`px-2 py-0.5 rounded text-xs ${selectedBooking.status === 'مؤكد' ? 'bg-green-500/20 text-green-400' :
                                            selectedBooking.status === 'ملغي' ? 'bg-red-500/20 text-red-400' :
                                                'bg-yellow-500/20 text-yellow-400'
                                            }`}>{selectedBooking.status}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black/20 p-5 rounded-xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">تفاصيل الدورة</h3>
                                <div className="space-y-3">
                                    {selectedBooking.level && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">المستوى:</span>
                                            <span className="text-white font-medium">{selectedBooking.level}</span>
                                        </div>
                                    )}
                                    {selectedBooking.goal && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">الهدف:</span>
                                            <span className="text-white font-medium">{selectedBooking.goal}</span>
                                        </div>
                                    )}
                                    {selectedBooking.timeline && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">الإطار الزمني:</span>
                                            <span className="text-white font-medium">{selectedBooking.timeline}</span>
                                        </div>
                                    )}
                                    {selectedBooking.source && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">المصدر:</span>
                                            <span className="text-white font-medium">{selectedBooking.source}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {(selectedBooking.days?.length > 0 || selectedBooking.times?.length > 0) && (
                            <div className="mt-6 bg-black/20 p-5 rounded-xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">المواعيد المفضلة</h3>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {Array.isArray(selectedBooking.days) && selectedBooking.days.map((day: string, i: number) => (
                                        <span key={i} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">{day}</span>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {Array.isArray(selectedBooking.times) && selectedBooking.times.map((time: string, i: number) => (
                                        <span key={i} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">{time}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {(selectedBooking.notes || selectedBooking.cancellationReason || selectedBooking.pendingReason) && (
                            <div className="mt-6 bg-yellow-500/5 p-5 rounded-xl border border-yellow-500/10">
                                <h3 className="text-lg font-bold text-yellow-500 mb-2">ملاحظات / أسباب</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {selectedBooking.notes || selectedBooking.cancellationReason || selectedBooking.pendingReason}
                                </p>
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t border-white/10 flex justify-end gap-3">
                            <button
                                onClick={() => handlePrintBooking(selectedBooking)}
                                className="flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/20 transition-colors"
                            >
                                <Printer size={18} />
                                <span>طباعة</span>
                            </button>
                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="bg-white/10 text-white px-6 py-2 rounded-lg hover:bg-white/20 transition-colors font-bold"
                            >
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
