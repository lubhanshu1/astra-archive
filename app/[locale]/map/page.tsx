import { OrbitalMap } from '@/components/3d/ClientWrappers'

export default function MapPage() {
    return (
        <div className="w-full h-[calc(100vh-4rem)] relative flex flex-col overflow-hidden">

            {/* UI Overlay */}
            <div className="absolute top-0 left-0 w-full p-6 z-10 pointer-events-none flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Orbital Map</h1>
                    <p className="font-mono text-slate-400 text-sm">INNER SOLAR SYSTEM // ORBITAL MECHANICS</p>
                </div>
                <div className="font-mono text-xs text-amber-500 bg-amber-950/30 px-3 py-1 border border-amber-900 backdrop-blur-md">
                    SIMULATED VISUALIZATION
                </div>
            </div>

            <div className="absolute bottom-6 left-6 z-10 font-mono text-xs text-slate-500 pointer-events-none bg-slate-950/50 p-4 border border-white/5 backdrop-blur-md">
                <div className="text-cyan-400 mb-2">TELEMETRY CONTROLS</div>
                <div>[LEFT CLICK] DRAG TO ROTATE</div>
                <div>[RIGHT CLICK] DRAG TO PAN</div>
                <div>[SCROLL] TO ZOOM</div>
            </div>

            {/* 3D Canvas */}
            <div className="flex-1 w-full relative bg-slate-950">
                <OrbitalMap />
            </div>

        </div>
    )
}