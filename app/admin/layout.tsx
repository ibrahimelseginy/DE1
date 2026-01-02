"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, PlusCircle, LogOut } from 'lucide-react';
import SWRProvider from './SWRProvider';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const menuItems = [
        { name: 'لوحة التحكم', icon: LayoutDashboard, href: '/admin' },
        { name: 'ادارة المعلمين', icon: Users, href: '/admin/teachers' },
        { name: 'اضافة معلم', icon: PlusCircle, href: '/admin/teachers/new' },
    ];

    return (
        <div className="min-h-screen bg-midnight text-white flex flex-col md:flex-row" dir="rtl">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#111827] border-l border-white/5 p-6 flex flex-col">
                <div className="mb-10 text-center">
                    <h1 className="text-2xl font-bold text-gold">DE1 Admin</h1>
                    <p className="text-xs text-gray-500 mt-1">لوحة تحكم المسؤول</p>
                </div>

                <nav className="flex-grow space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-gold text-midnight font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Icon size={20} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-white/5">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                        <LogOut size={20} />
                        <span>تسجيل خروج</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-6 overflow-y-auto">
                <SWRProvider>
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </SWRProvider>
            </main>
        </div>
    );
}
