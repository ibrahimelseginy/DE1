"use client";
import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-6 right-6 z-[9999] animate-slide-in-right">
            <div className={`flex items-center gap-4 px-8 py-5 rounded-2xl shadow-2xl border-2 backdrop-blur-md transform transition-all duration-200 ${type === 'success'
                    ? 'bg-green-500 text-white border-green-300 shadow-green-500/50'
                    : 'bg-red-500 text-white border-red-300 shadow-red-500/50'
                }`}>
                {type === 'success' ? (
                    <CheckCircle className="w-7 h-7 animate-bounce" />
                ) : (
                    <XCircle className="w-7 h-7 animate-pulse" />
                )}
                <span className="font-bold text-lg">{message}</span>
                <button
                    onClick={onClose}
                    className="ml-2 hover:bg-white/30 rounded-lg p-1.5 transition-all hover:scale-110"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
