export default function AboutPage() {
    return (
        <div className="max-w-screen-md mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-2">About ASTRA</h1>
            <p className="font-mono text-cyan-500 text-sm mb-12">THE SPACE ARTIFACT ARCHIVE // v1.0.0</p>

            <div className="space-y-8 text-slate-300 leading-relaxed">
                <section>
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">PROJECT DIRECTIVE</h2>
                    <p>
                        ASTRA is an interactive digital archive designed to preserve, reconstruct, and explore humanity's journey beyond Earth.
                        It combines historical telemetry, simulated orbital mechanics, and interactive WebGL reconstructions to bring space history to life.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">DATA INTEGRITY RULES</h2>
                    <p className="mb-4 text-sm text-slate-400">
                        To prevent the spread of misinformation regarding spaceflight capabilities, this application adheres to strict data visualization guidelines:
                    </p>
                    <ul className="list-disc pl-5 space-y-3 font-mono text-sm text-slate-400">
                        <li><strong className="text-slate-200">NO FAKED SENSORS:</strong> All readouts are clearly labeled as historical data.</li>
                        <li><strong className="text-slate-200">NO FAKED MODELS:</strong> If 3D data is unavailable, a strict wireframe bounding box is displayed.</li>
                        <li><strong className="text-slate-200">SIMULATED MECHANICS:</strong> Orbital maps are clearly marked as visualizations, not live ephemeris feeds.</li>
                    </ul>
                </section>

                <div className="mt-16 p-4 border border-cyan-900/50 bg-cyan-950/20 font-mono text-xs text-center text-cyan-500">
                    SYSTEM INITIALIZED: AUGUST 2026 // CHANDIGARH, INDIA
                </div>
            </div>
        </div>
    )
}