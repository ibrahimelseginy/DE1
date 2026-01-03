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
                dedupingInterval: 1000, // 1 second - faster deduping
                focusThrottleInterval: 2000, // 2 seconds - faster focus revalidation
                refreshInterval: 0, // No auto-refresh, only manual/optimistic updates
            }}
        >
            {children}
        </SWRConfig>
    );
}
