import Link from 'next/link'
import { HeroScene } from '@/components/3d/ClientWrappers'

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      <HeroScene />

      {/* UI Framing / Reticle */}
      <div className="absolute inset-0 z-10 pointer-events-none border-[1px] border-white/5 m-4">
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-500/50" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-500/50" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-500/50" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-500/50" />
      </div>

      <div className="relative z-20 max-w-screen-2xl mx-auto px-12 w-full flex justify-between items-center">

        {/* Left Column: Core Messaging */}
        <div className="max-w-2xl">
          <div className="font-mono text-cyan-400 text-xs tracking-[0.2em] mb-4 flex items-center gap-3">
            <span className="w-2 h-2 bg-cyan-400 animate-pulse" />
            ASTRA ARCHIVE SYSTEM.INITIALIZED
          </div>

          <h1 className="text-6xl md:text-8xl font-sans font-bold tracking-tighter text-white mb-6 uppercase leading-[0.9]">
            Humanity<br />
            <span className="text-slate-500">In The Void.</span>
          </h1>

          <p className="font-mono text-slate-400 mb-12 text-sm leading-relaxed max-w-md border-l border-cyan-500/30 pl-6 bg-gradient-to-r from-cyan-950/20 to-transparent py-2">
            An interactive digital museum of real spacecraft, rockets, landers, probes, station hardware, and astronaut equipment.
          </p>

          <div className="flex gap-4">
            <Link
              href="/archive"
              className="group relative bg-cyan-500/10 border border-cyan-500/50 hover:bg-cyan-400 hover:text-slate-950 text-cyan-50 font-mono text-xs tracking-widest px-8 py-4 transition-all duration-300 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-[1px] bg-cyan-400/50 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              [ ENTER THE ARCHIVE ]
            </Link>
            <Link
              href="/mission-control"
              className="group border border-slate-700 hover:border-slate-400 text-slate-300 font-mono text-xs tracking-widest px-8 py-4 transition-colors backdrop-blur-sm"
            >
              LIVE TELEMETRY
            </Link>
          </div>
        </div>

        {/* Right Column: Technical Decor */}
        <div className="hidden lg:flex flex-col gap-8 font-mono text-xs text-slate-500 text-right opacity-60">
          <div>
            <div className="text-slate-700 mb-1">LOCAL TIME</div>
            <div className="text-slate-300">T-MINUS SYSTEM SYNC</div>
          </div>
          <div>
            <div className="text-slate-700 mb-1">ARCHIVE STATUS</div>
            <div className="text-cyan-400/80">15 ASSETS VERIFIED</div>
          </div>
          <div>
            <div className="text-slate-700 mb-1">WEBGL RENDERER</div>
            <div className="text-slate-300">ACTIVE / 60FPS TARGET</div>
          </div>
          {/* Decorative bar code / scale */}
          <div className="flex justify-end gap-1 mt-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`w-1 bg-slate-700 ${i % 3 === 0 ? 'h-4' : 'h-2'}`} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}