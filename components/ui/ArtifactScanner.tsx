'use client'
import { useState } from 'react'

export default function ArtifactScanner({ name }: { name: string }) {
    const [scanning, setScanning] = useState(false)
    const [lines, setLines] = useState<string[]>([])

    const runScan = () => {
        if (scanning) return
        setScanning(true)
        setLines([])

        const sequence = [
            "INITIATING DATA RETRIEVAL...",
            "WARNING: HISTORICAL RECONSTRUCTION ONLY",
            "NOT A LIVE SENSOR FEED",
            `TARGET CONFIRMED: ${name.toUpperCase()}`,
            "STRUCTURAL INTEGRITY: NOMINAL",
            "THERMAL SHIELDING: VERIFIED",
            "PROPULSION SYSTEMS: DORMANT",
            "END OF HISTORICAL READOUT."
        ]

        sequence.forEach((line, index) => {
            setTimeout(() => {
                setLines(prev => [...prev, line])
                if (index === sequence.length - 1) {
                    setTimeout(() => setScanning(false), 3000)
                }
            }, index * 600)
        })
    }

    return (
        <div className="border border-white/10 bg-slate-900/30 p-5 font-mono text-sm mt-8">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <h3 className="text-slate-500">SYSTEM DIAGNOSTICS</h3>
                <button
                    onClick={runScan}
                    disabled={scanning}
                    className="px-3 py-1 bg-cyan-950 text-cyan-400 border border-cyan-900 hover:bg-cyan-900 disabled:opacity-50 text-xs transition-colors"
                >
                    {scanning ? 'SCANNING...' : 'RUN HISTORICAL SCAN'}
                </button>
            </div>

            <div className="h-32 bg-slate-950 border border-slate-800 p-3 overflow-hidden relative">
                <div className="space-y-1 text-xs">
                    {lines.map((line, i) => (
                        <div key={i} className={line.includes('WARNING') ? 'text-amber-500' : 'text-cyan-400'}>
                            &gt; {line}
                        </div>
                    ))}
                    {scanning && <div className="w-2 h-3 bg-cyan-500 animate-pulse mt-1" />}
                </div>

                {/* Scanner laser effect */}
                {scanning && (
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-[scan_1.5s_ease-in-out_infinite]" />
                )}
            </div>
        </div>
    )
}