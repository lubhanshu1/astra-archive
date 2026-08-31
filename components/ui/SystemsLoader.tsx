'use client'
import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

export default function SystemsLoader() {
    // We added 'total' to check if there are actual files in the queue
    const { active, progress, item, total } = useProgress()
    const [visible, setVisible] = useState(true)
    const [simulatedProgress, setSimulatedProgress] = useState(0)

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (total === 0) {
            // SCENARIO 1: No external files to load (Procedural mode). 
            // Force the boot sequence to complete quickly.
            setSimulatedProgress(50)
            timer = setTimeout(() => {
                setSimulatedProgress(100)
                setTimeout(() => setVisible(false), 800)
            }, 500)
        } else {
            // SCENARIO 2: Actual 3D models/textures are downloading.
            // Rely on the real loading manager's progress.
            setSimulatedProgress(progress)
            if (!active && progress === 100) {
                timer = setTimeout(() => setVisible(false), 800)
            }
        }

        return () => clearTimeout(timer)
    }, [active, progress, total])

    if (!visible) return null

    const displayProgress = total === 0 ? simulatedProgress : progress

    return (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center font-mono text-xs text-cyan-500 transition-opacity duration-500">
            <div className="max-w-md w-full p-6 border border-white/10 bg-slate-900/50">
                <div className="flex justify-between mb-4 border-b border-white/10 pb-2">
                    <span>ASTRA.SYS // BOOT SEQUENCE</span>
                    <span>{Math.round(displayProgress)}%</span>
                </div>

                <div className="space-y-2 text-slate-400 mb-6 h-20 overflow-hidden flex flex-col justify-end">
                    <div className="animate-pulse">MOUNTING KERNEL... OK</div>
                    <div>INITIALIZING WEBGL RENDERER... OK</div>
                    {item && <div className="truncate text-cyan-400">LOADING: {item}</div>}
                    {displayProgress === 100 && <div className="text-white">ALL SYSTEMS NOMINAL.</div>}
                </div>

                <div className="w-full h-1 bg-slate-900 overflow-hidden">
                    <div
                        className="h-full bg-cyan-500 transition-all duration-200 ease-out"
                        style={{ width: `${displayProgress}%` }}
                    />
                </div>
            </div>
        </div>
    )
}