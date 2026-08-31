'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navigation() {
    const pathname = usePathname();

    // Strip out the '/en' base path so it displays 'LAB' instead of 'EN/LAB'
    const cleanPath = pathname.replace('/en', '').replace(/^\//, '') || 'HOME';
    const mode = cleanPath.toUpperCase();

    const [time, setTime] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setTime(now.toISOString().substring(11, 19) + ' UTC');
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full h-12 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6 text-[10px] font-mono text-slate-400 z-[90]">
            <div className="flex gap-6 items-center">
                <span className="text-cyan-500 font-bold tracking-widest">ASTRA OS</span>
                <span className="bg-slate-900 px-3 py-1 rounded text-slate-300 tracking-widest border border-slate-800">
                    MODE: {mode || 'STANDBY'}
                </span>
                <div className="flex gap-6 ml-4">
                    {/* Hardcode the /en/ base path since middleware routing was bypassed */}
                    <Link href="/en/archive" className="hover:text-cyan-400 transition-colors">ARCHIVE</Link>
                    <Link href="/en/missions" className="hover:text-cyan-400 transition-colors">MISSIONS</Link>
                    <Link href="/en/timeline" className="hover:text-cyan-400 transition-colors">TIMELINE</Link>
                    <Link href="/en/lab" className="hover:text-cyan-400 transition-colors">LAB</Link>
                </div>
            </div>

            <div className="flex gap-6 items-center">
                <span className="tracking-widest">{time}</span>
                <span className="flex items-center gap-2 tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    DATA: NOMINAL
                </span>
                <span className="text-slate-600 border border-slate-700 px-2 py-1 rounded">CTRL+K</span>
            </div>
        </nav>
    );
}