import React from 'react';
import { Users, BookOpen, Clock, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        { label: 'عدد المعلمين', value: '12', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="bg-[#1F2937] p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                <Icon size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                                <p className="text-gray-400 text-sm">{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Activity or Charts Placeholder */}
            <div className="bg-[#1F2937] rounded-3xl p-8 border border-white/5">
                <h3 className="text-xl font-bold text-white mb-6">النشاط الأخير</h3>
                <div className="text-center py-20 text-gray-500">
                    مخطط بياني سيظهر هنا...
                </div>
            </div>
        </div>
    );
}
