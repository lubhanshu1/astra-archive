'use client'
import { useState, useEffect } from 'react'

export default function SettingsPanel() {
    const [isOpen, setIsOpen] = useState(false)
    const [settings, setSettings] = useState({
        sound: false,
        motion: 'FULL',
        graphics: 'HIGH',
        theme: 'DARK (DEFAULT)'
    })

    // Mount ambient spacecraft hum (Mixkit free royalty-free asset)
    const [audio] = useState(() => typeof Audio !== 'undefined' ? new Audio('https://assets.mixkit.co/active_storage/sfx/2693/2693-preview.mp3') : null)

    useEffect(() => {
        if (audio) {
            audio.loop = true
            audio.volume = 0.15
            if (settings.sound) {
                audio.play().catch(() => console.log('Audio autoplay blocked by browser'))
            } else {
                audio.pause()
            }
        }
    }, [settings.sound, audio])

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 z-40 font-mono text-[10px] text-slate-500 hover:text-cyan-400 p-2 border border-transparent hover:border-cyan-900/50 bg-slate-950/80 backdrop-blur-md transition-all"
            >
                SYS.SETTINGS
            </button>
        )
    }

    return (
        <div className="fixed inset-y-0 right-0 w-80 bg-slate-900/95 border-l border-white/10 z-[250] backdrop-blur-xl p-6 font-mono text-sm shadow-2xl flex flex-col">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                <h2 className="text-cyan-500">SYSTEM PREFERENCES</h2>
                <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">✕</button>
            </div>

            <div className="space-y-6 flex-1">
                <div>
                    <div className="text-xs text-slate-500 mb-2">AMBIENT TELEMETRY SOUND</div>
                    <button
                        onClick={() => setSettings(s => ({ ...s, sound: !s.sound }))}
                        className={`w-full p-2 border transition-colors ${settings.sound ? 'bg-cyan-950 border-cyan-500 text-cyan-400' : 'bg-slate-950 border-slate-700 text-slate-500 hover:border-slate-500'}`}
                    >
                        {settings.sound ? 'ENABLED' : 'DISABLED'}
                    </button>
                </div>

                <div>
                    <div className="text-xs text-slate-500 mb-2">CINEMATIC MOTION</div>
                    <div className="flex gap-2">
                        {['FULL', 'REDUCED'].map(m => (
                            <button
                                key={m}
                                onClick={() => setSettings(s => ({ ...s, motion: m }))}
                                className={`flex-1 p-2 border transition-colors ${settings.motion === m ? 'bg-cyan-950 border-cyan-500 text-cyan-400' : 'bg-slate-950 border-slate-700 text-slate-500 hover:border-slate-500'}`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="text-xs text-slate-500 mb-2">WEBGL RENDER QUALITY</div>
                    <div className="flex gap-2">
                        {['LOW', 'HIGH', 'ULTRA'].map(g => (
                            <button
                                key={g}
                                onClick={() => setSettings(s => ({ ...s, graphics: g }))}
                                className={`flex-1 p-2 border transition-colors ${settings.graphics === g ? 'bg-cyan-950 border-cyan-500 text-cyan-400' : 'bg-slate-950 border-slate-700 text-slate-500 hover:border-slate-500'}`}
                            >
                                {g}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="text-xs text-slate-500 mb-2">INTERFACE THEME</div>
                    <button className="w-full p-2 bg-slate-950 border border-slate-700 text-slate-500 opacity-50 cursor-not-allowed">
                        {settings.theme}
                    </button>
                </div>
            </div>

            <div className="text-[10px] text-slate-600 border-t border-white/10 pt-4 mt-6">
                ASTRA.SYS v1.0.0 // BUILD 8492
            </div>
        </div>
    )
}