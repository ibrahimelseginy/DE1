"use client";
import { SWRConfig } from 'swr';
import { ReactNode } from 'react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function SWRProvider({ children }: { children: ReactNode }) {
    return (
        <SWRConfig
            value={{
                fetcher,
                revalidateOnFocus: true,
                revalidateOnReconnect: true,
                dedupingInterval: 5000, // 5 seconds
                focusThrottleInterval: 10000, // 10 seconds
                refreshInterval: 60000, // Auto-refresh every 60 seconds
            }}
        >
            {children}
        </SWRConfig>
    );
}
