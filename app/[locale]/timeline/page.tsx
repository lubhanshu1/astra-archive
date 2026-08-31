'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

// Real mission data mapped to the Integrity Rules
const timelineData = [
    {
        year: 1957,
        date: 'OCTOBER 4',
        name: 'Sputnik 1',
        agency: 'Soviet Space Program',
        desc: 'The Soviet Union launched the Earth\'s first artificial satellite. It orbited for three weeks before its batteries died, marking the start of the Space Age.',
        flagship: false,
    },
    {
        year: 1969,
        date: 'JULY 16 - 24',
        name: 'Apollo 11',
        agency: 'NASA',
        desc: 'Commanded by Neil Armstrong, this mission successfully landed the first humans on the Moon and returned them safely to Earth.',
        flagship: true,
        phases: [
            { title: 'LAUNCH', detail: 'Saturn V liftoff from LC-39A' },
            { title: 'TLI', detail: 'Trans-Lunar Injection burn' },
            { title: 'DESCENT', detail: 'Powered descent to Sea of Tranquility' },
            { title: 'RETURN', detail: 'Splashdown in the Pacific Ocean' }
        ]
    },
    {
        year: 1977,
        date: 'SEPTEMBER 5',
        name: 'Voyager 1',
        agency: 'NASA',
        desc: 'Launched to study the outer Solar System. It carries the Golden Record and is currently the farthest human-made object from Earth, operating in interstellar space.',
        flagship: false,
    },
    {
        year: 1990,
        date: 'APRIL 24',
        name: 'Hubble Space Telescope',
        agency: 'NASA / ESA',
        desc: 'Deployed by Space Shuttle Discovery, Hubble revolutionized astrophysics by providing unprecedented deep-field views of the universe unhindered by Earth\'s atmosphere.',
        flagship: false,
    },
    {
        year: 1998,
        date: 'NOVEMBER 20',
        name: 'International Space Station',
        agency: 'Multi-Agency',
        desc: 'The launch of the Zarya module began the construction of the largest modular space station in low Earth orbit, establishing a continuous human presence in space.',
        flagship: false,
    },
    {
        year: 2021,
        date: 'DECEMBER 25',
        name: 'James Webb Space Telescope',
        agency: 'NASA / ESA / CSA',
        desc: 'The largest optical telescope in space, equipped with high-resolution and highly sensitive instruments, allowing it to view objects too old, distant, or faint for the Hubble.',
        flagship: false,
    }
]

export default function TimelinePage() {
    const [activePhase, setActivePhase] = useState(0)

    return (
        <div className="max-w-screen-xl mx-auto px-6 py-12">
            <header className="mb-16 border-b border-white/10 pb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Missions Timeline</h1>
                    <p className="font-mono text-slate-400 text-sm">HISTORICAL ARCHIVE // CHRONOLOGICAL EVENT LOG</p>
                </div>
            </header>

            <div className="relative border-l border-white/10 ml-4 md:ml-8 pl-8 space-y-24 pb-24">
                {timelineData.map((mission, index) => (
                    <motion.div
                        key={mission.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="relative"
                    >
                        {/* Timeline Node */}
                        <div className="absolute -left-[37px] top-1 w-4 h-4 bg-slate-950 border-2 border-cyan-500 rounded-full" />

                        <div className="flex flex-col md:flex-row gap-4 md:gap-12">
                            {/* Metadata */}
                            <div className="w-48 shrink-0 font-mono">
                                <div className="text-3xl text-white font-bold">{mission.year}</div>
                                <div className="text-cyan-500 text-xs tracking-widest mt-1">{mission.date}</div>
                                <div className="text-slate-500 text-xs mt-2">{mission.agency.toUpperCase()}</div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-slate-200 mb-3">{mission.name}</h2>
                                <p className="text-slate-400 leading-relaxed max-w-2xl text-sm">
                                    {mission.desc}
                                </p>

                                {/* Flagship Scrubbable Moment */}
                                {mission.flagship && mission.phases && (
                                    <div className="mt-8 border border-white/10 bg-slate-900/30 p-1 font-mono text-xs max-w-2xl">
                                        <div className="p-3 border-b border-white/5 text-amber-500 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                                            FLAGSHIP MISSION PROFILE
                                        </div>
                                        <div className="flex">
                                            {mission.phases.map((phase, pIdx) => (
                                                <div
                                                    key={phase.title}
                                                    onMouseEnter={() => setActivePhase(pIdx)}
                                                    className={`flex-1 p-3 cursor-pointer border-r border-white/5 last:border-r-0 transition-colors ${activePhase === pIdx ? 'bg-cyan-900/40 text-cyan-50' : 'text-slate-500 hover:bg-slate-800/50'
                                                        }`}
                                                >
                                                    <div className="mb-2 text-[10px]">{`T+0${pIdx + 1}`}</div>
                                                    <div className={`font-bold mb-1 ${activePhase === pIdx ? 'text-cyan-400' : ''}`}>{phase.title}</div>
                                                    <div className={`text-[10px] leading-tight ${activePhase === pIdx ? 'text-slate-300' : 'text-transparent'}`}>
                                                        {phase.detail}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Scrub Progress Bar */}
                                        <div className="h-1 bg-slate-900 w-full relative">
                                            <motion.div
                                                className="absolute top-0 left-0 h-full bg-cyan-500"
                                                animate={{ width: `${((activePhase + 1) / mission.phases.length) * 100}%` }}
                                                transition={{ ease: "easeInOut", duration: 0.3 }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}