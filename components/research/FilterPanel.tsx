'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function FilterPanel() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Deterministically update the URL parameters without AI
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) params.set(name, value);
            else params.delete(name);
            return params.toString();
        },
        [searchParams]
    );

    const handleFilterChange = (key: string, value: string) => {
        router.push('?' + createQueryString(key, value));
    };

    const activeFilters = Array.from(searchParams.entries());

    return (
        <div className="p-4 font-mono text-xs text-slate-300 flex flex-col h-full overflow-y-auto">
            <div className="text-cyan-500 font-bold mb-4 tracking-widest border-b border-slate-800 pb-2">ADVANCED FILTERS</div>

            {/* Active Filter Tokens */}
            {activeFilters.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                    {activeFilters.map(([key, val]) => (
                        <span
                            key={key}
                            onClick={() => handleFilterChange(key, '')}
                            className="bg-cyan-900/30 border border-cyan-700/50 text-cyan-300 px-2 py-1 flex items-center gap-2 cursor-pointer hover:bg-red-900/50 hover:border-red-700 hover:text-red-400 transition-colors"
                        >
                            [{val.toUpperCase()} &times;]
                        </span>
                    ))}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="text-slate-500 block mb-1">CATEGORY</label>
                    <select
                        className="w-full bg-slate-900 border border-slate-700 p-2 text-slate-300 outline-none focus:border-cyan-500"
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        value={searchParams.get('category') || ''}
                    >
                        <option value="">ALL CATEGORIES</option>
                        <option value="Launch Vehicle">Launch Vehicle</option>
                        <option value="Lander">Lander</option>
                        <option value="Rover">Rover</option>
                        <option value="Probe">Probe</option>
                    </select>
                </div>

                <div>
                    <label className="text-slate-500 block mb-1">ORGANIZATION</label>
                    <select
                        className="w-full bg-slate-900 border border-slate-700 p-2 text-slate-300 outline-none focus:border-cyan-500"
                        onChange={(e) => handleFilterChange('organization', e.target.value)}
                        value={searchParams.get('organization') || ''}
                    >
                        <option value="">ALL ORGANIZATIONS</option>
                        <option value="NASA (USA)">NASA (USA)</option>
                        <option value="ISRO (India)">ISRO (India)</option>
                        <option value="Roscosmos (Russia)">Roscosmos (Russia)</option>
                        <option value="ESA (Europe)">ESA (Europe)</option>
                    </select>
                </div>

                <div>
                    <label className="text-slate-500 block mb-1">DESTINATION</label>
                    <select
                        className="w-full bg-slate-900 border border-slate-700 p-2 text-slate-300 outline-none focus:border-cyan-500"
                        onChange={(e) => handleFilterChange('destination', e.target.value)}
                        value={searchParams.get('destination') || ''}
                    >
                        <option value="">ALL DESTINATIONS</option>
                        <option value="Earth Orbit">Earth Orbit</option>
                        <option value="Moon">Moon</option>
                        <option value="Mars">Mars</option>
                        <option value="Outer Solar System">Outer Solar System</option>
                    </select>
                </div>
            </div>
        </div>
    )
}