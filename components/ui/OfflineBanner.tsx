'use client'
import { useState, useEffect } from 'react';

export default function OfflineBanner() {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        // Check initial state
        setIsOffline(!navigator.onLine);

        // Setup listeners for network changes
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (!isOffline) return null;

    return (
        <div className="fixed top-0 left-0 w-full bg-red-950 text-red-400 text-xs font-mono tracking-[0.2em] font-bold py-2 text-center z-[100] border-b border-red-900 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
            ⚠️ LIVE DATA UNAVAILABLE — OFFLINE
        </div>
    );
}