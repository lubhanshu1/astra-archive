export default function MissionsPage() {
    return (
        <div className="max-w-screen-xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[65vh] text-center">
            <div className="text-cyan-500 mb-4 font-mono text-sm">
                [ SECURE UPLINK ESTABLISHED ]
            </div>
            <h1 className="text-4xl font-bold mb-4">Mission Database</h1>
            <p className="text-slate-400 font-mono max-w-lg mb-12 text-sm leading-relaxed">
                ARCHIVE EXPANSION IN PROGRESS. HISTORICAL MISSION PROFILES ARE CURRENTLY BEING DIGITIZED AND VERIFIED FOR STRUCTURAL INTEGRITY.
            </p>
            <div className="border border-white/10 bg-slate-900/50 px-6 py-3 font-mono text-xs text-slate-500 flex items-center gap-3">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                AWAITING DECLASSIFICATION
            </div>
        </div>
    )
}