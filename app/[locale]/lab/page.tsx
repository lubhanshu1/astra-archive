'use client'
import { useState } from 'react';
import Link from 'next/link';
import EngineeringVisualizer from '@/components/ui/EngineeringVisualizer';

export default function EngineeringLaboratory() {
    // --- ORBITAL CALCULATOR STATE ---
    const [altitude, setAltitude] = useState<number>(400);

    // Physics Constants
    const G = 6.6743e-11;
    const M = 5.972e24;
    const R_earth = 6371;
    const r_meters = (R_earth + altitude) * 1000;

    const v_orbital = Math.sqrt((G * M) / r_meters) / 1000;
    const v_escape = Math.sqrt((2 * G * M) / r_meters) / 1000;
    const period = (2 * Math.PI * Math.sqrt(Math.pow(r_meters, 3) / (G * M))) / 60;

    // --- MISSION SANDBOX STATE ---
    const [origin, setOrigin] = useState('EARTH');
    const [destination, setDestination] = useState('MOON');
    const [missionType, setMissionType] = useState('ORBITER');
    const [payload, setPayload] = useState<number>(1000);

    // Educational Delta-v Estimation Logic
    let baseDeltaV = 9.4; // LEO baseline
    if (origin === 'EARTH' && destination === 'MOON') baseDeltaV = 14.1;
    if (origin === 'EARTH' && destination === 'MARS') baseDeltaV = 18.3;
    if (origin === 'EARTH' && destination === 'LEO') baseDeltaV = 9.4;

    if (missionType === 'LANDER') baseDeltaV += 2.5;
    if (missionType === 'FLYBY') baseDeltaV -= 1.5;

    const massPenalty = payload > 5000 ? (payload - 5000) * 0.0002 : 0;
    const finalDeltaV = baseDeltaV + massPenalty;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-mono p-6 flex flex-col overflow-y-auto">
            <header className="border-b border-slate-800 pb-4 mb-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/research" className="text-slate-500 hover:text-cyan-500 transition-colors">
                        [ &larr; BACK ]
                    </Link>
                    <h1 className="text-xl font-bold tracking-widest text-white">ASTRA ENGINEERING LAB</h1>
                </div>
                <div className="text-emerald-500 text-xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    MODULE ACTIVE
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-slate-900/50 border border-slate-800 p-6">
                    <h2 className="text-cyan-500 font-bold mb-4 tracking-widest">ORBITAL PARAMETERS</h2>
                    <label className="block text-slate-500 text-xs mb-2">TARGET ALTITUDE (km)</label>
                    <input
                        type="range" min="100" max="35000" value={altitude}
                        onChange={(e) => setAltitude(Number(e.target.value))}
                        className="w-full accent-cyan-500 mb-2"
                    />
                    <input
                        type="number" value={altitude}
                        onChange={(e) => setAltitude(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 p-2 text-white outline-none focus:border-cyan-500"
                    />
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-900/50 border border-slate-800 p-4 relative overflow-hidden">
                        <div className="text-slate-500 text-xs mb-1">ORBITAL VELOCITY</div>
                        <div className="text-3xl text-white font-bold">{v_orbital.toFixed(2)} <span className="text-sm text-cyan-500 font-normal">km/s</span></div>
                        <div className="absolute bottom-0 left-0 w-full bg-red-900/80 text-white text-[10px] text-center py-1 font-bold">EDUCATIONAL MODEL</div>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 p-4 relative overflow-hidden">
                        <div className="text-slate-500 text-xs mb-1">ESCAPE VELOCITY</div>
                        <div className="text-3xl text-white font-bold">{v_escape.toFixed(2)} <span className="text-sm text-cyan-500 font-normal">km/s</span></div>
                        <div className="absolute bottom-0 left-0 w-full bg-red-900/80 text-white text-[10px] text-center py-1 font-bold">EDUCATIONAL MODEL</div>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 p-4 relative overflow-hidden">
                        <div className="text-slate-500 text-xs mb-1">ORBITAL PERIOD</div>
                        <div className="text-3xl text-white font-bold">{period.toFixed(1)} <span className="text-sm text-cyan-500 font-normal">min</span></div>
                        <div className="absolute bottom-0 left-0 w-full bg-red-900/80 text-white text-[10px] text-center py-1 font-bold">EDUCATIONAL MODEL</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 border border-slate-800 p-6 flex flex-col gap-4">
                    <h2 className="text-cyan-500 font-bold mb-2 tracking-widest">MISSION SANDBOX</h2>

                    <div>
                        <label className="block text-slate-500 text-xs mb-1">ORIGIN</label>
                        <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full bg-slate-950 border border-slate-700 p-2 text-white outline-none">
                            <option value="EARTH">EARTH (SURFACE)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-slate-500 text-xs mb-1">DESTINATION</label>
                        <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full bg-slate-950 border border-slate-700 p-2 text-white outline-none">
                            <option value="LEO">LOW EARTH ORBIT</option>
                            <option value="MOON">THE MOON</option>
                            <option value="MARS">MARS</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-slate-500 text-xs mb-1">MISSION TYPE</label>
                        <select value={missionType} onChange={(e) => setMissionType(e.target.value)} className="w-full bg-slate-950 border border-slate-700 p-2 text-white outline-none">
                            <option value="FLYBY">FLYBY</option>
                            <option value="ORBITER">ORBITER</option>
                            <option value="LANDER">LANDER</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-slate-500 text-xs mb-1">PAYLOAD MASS (kg)</label>
                        <input type="number" value={payload} onChange={(e) => setPayload(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-700 p-2 text-white outline-none" />
                    </div>
                </div>

                <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 p-6 flex flex-col justify-center items-center relative overflow-hidden">
                    <div className="text-slate-500 text-sm mb-2 tracking-widest text-center">ESTIMATED TOTAL DELTA-V (Δv)</div>
                    <div className="text-6xl text-cyan-400 font-bold mb-4">{finalDeltaV.toFixed(2)} <span className="text-2xl text-slate-400 font-normal">km/s</span></div>

                    <div className="text-xs text-slate-500 max-w-lg text-center border-t border-slate-800 pt-4">
                        * Estimates calculate rough theoretical minimums using Hohmann transfer orbits. Actual mission requirements vary based on planetary alignment, gravity assists, and launch vehicle staging. Do not use for professional launch planning.
                    </div>

                    <div className="absolute top-0 w-full bg-red-900/80 text-white text-[10px] text-center py-1 font-bold tracking-widest">EDUCATIONAL ESTIMATE</div>
                </div>
            </div>

            {/* 3D VISUALIZATION MODULE */}
            <div className="mt-6 mb-12">
                <EngineeringVisualizer />
            </div>
        </div>
    )
}