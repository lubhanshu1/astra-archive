'use client'
import { useEffect } from 'react';
import { useTimeStore } from '@/lib/timeStore';

export default function TimeController() {
    const {
        currentYear, isPlaying, playbackSpeed,
        play, pause, setSpeed, jumpToYear, tick
    } = useTimeStore();

    // The actual "engine" that drives time forward when playing
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => tick(), 1000); // Ticks every 1 second
        }
        return () => clearInterval(interval);
    }, [isPlaying, tick]);

    return (
        <div className="fixed bottom-0 left-0 w-full bg-slate-950 border-t border-slate-800 p-4 font-mono text-xs z-50 flex items-center justify-between gap-6">

            {/* Playback Controls */}
            <div className="flex items-center gap-4">
                <button
                    onClick={isPlaying ? pause : play}
                    className="w-10 h-10 border border-cyan-500 bg-cyan-950/30 text-cyan-400 hover:bg-cyan-900 flex items-center justify-center transition-colors"
                >
                    {isPlaying ? '||' : '▶'}
                </button>
                <div className="text-slate-500 flex flex-col">
                    <span className="text-[10px] tracking-widest mb-1">SCALE</span>
                    <select
                        value={playbackSpeed}
                        onChange={(e) => setSpeed(e.target.value as any)}
                        className="bg-slate-900 border border-slate-700 text-slate-300 outline-none p-1"
                    >
                        <option value="REALTIME">REALTIME</option>
                        <option value="DAY">DAY</option>
                        <option value="MONTH">MONTH</option>
                        <option value="YEAR">YEAR</option>
                        <option value="DECADE">DECADE</option>
                    </select>
                </div>
            </div>

            {/* Interactive Timeline Scrubber */}
            <div className="flex-1 flex flex-col items-center group">
                <div className="text-cyan-400 font-bold text-lg mb-2 tracking-widest">{currentYear}</div>
                <div className="flex items-center w-full gap-4">
                    <span className="text-slate-600">1957</span>
                    <input
                        type="range"
                        min="1957"
                        max="2026"
                        value={currentYear}
                        onChange={(e) => jumpToYear(Number(e.target.value))}
                        className="flex-1 accent-cyan-500 cursor-ew-resize h-1 bg-slate-800 appearance-none"
                    />
                    <span className="text-slate-600">2026</span>
                </div>
            </div>

            {/* Readout */}
            <div className="text-right flex flex-col">
                <span className="text-slate-500 text-[10px] tracking-widest mb-1">STATUS</span>
                <span className={isPlaying ? "text-emerald-500 animate-pulse" : "text-amber-500"}>
                    {isPlaying ? 'TIME RUNNING' : 'PAUSED'}
                </span>
            </div>
        </div>
    )
}