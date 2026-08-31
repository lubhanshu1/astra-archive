'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface CommandAction {
    id: string
    label: string
    category: 'NAVIGATION' | 'ARTIFACT' | 'TIMELINE' | 'SYSTEM'
    keywords: string[]
    execute: (locale: string, router: ReturnType<typeof useRouter>) => void
    hint?: string
}

const COMMAND_REGISTRY: CommandAction[] = [
    {
        id: 'nav-archive',
        label: 'Access Artifact Archive',
        category: 'NAVIGATION',
        keywords: ['archive', 'database', 'artifacts', 'catalog', 'records'],
        execute: (locale, router) => router.push(`/${locale}/archive`),
        hint: '/archive',
    },
    {
        id: 'nav-missions',
        label: 'Launch Mission Control',
        category: 'NAVIGATION',
        keywords: ['mission', 'control', 'operations', 'flights'],
        execute: (locale, router) => router.push(`/${locale}/missions`),
        hint: '/missions',
    },
    {
        id: 'nav-discoveries',
        label: 'Open Discovery Board & Research Workspace',
        category: 'NAVIGATION',
        keywords: ['discover', 'board', 'notes', 'workspace', 'research', 'export'],
        execute: (locale, router) => router.push(`/${locale}/discoveries`),
        hint: '/discoveries',
    },
    {
        id: 'nav-lab',
        label: 'Initialize WebGL Engineering Lab',
        category: 'NAVIGATION',
        keywords: ['lab', 'engineering', 'simulation', '3d', 'webgl', 'render'],
        execute: (locale, router) => router.push(`/${locale}/lab`),
        hint: '/lab',
    },
    {
        id: 'nav-timeline',
        label: 'Inspect Global Mission Chronology',
        category: 'NAVIGATION',
        keywords: ['timeline', 'chronology', 'history', 'dates', 'era'],
        execute: (locale, router) => router.push(`/${locale}/timeline`),
        hint: '/timeline',
    },
    {
        id: 'artifact-voyager',
        label: 'Inspect Deep Space Probe: Voyager 1',
        category: 'ARTIFACT',
        keywords: ['voyager', 'voyager 1', 'interstellar', 'golden record', 'probe'],
        execute: (locale, router) => router.push(`/${locale}/archive?artifact=voyager-1`),
        hint: '?artifact=voyager-1',
    },
    {
        id: 'artifact-jwst',
        label: 'Inspect Optical Payload: James Webb Space Telescope',
        category: 'ARTIFACT',
        keywords: ['jwst', 'webb', 'james webb', 'infrared', 'telescope'],
        execute: (locale, router) => router.push(`/${locale}/archive?artifact=jwst`),
        hint: '?artifact=jwst',
    },
    {
        id: 'artifact-hubble',
        label: 'Inspect Orbital Observatory: Hubble Space Telescope',
        category: 'ARTIFACT',
        keywords: ['hubble', 'hst', 'telescope', 'optical'],
        execute: (locale, router) => router.push(`/${locale}/archive?artifact=hubble`),
        hint: '?artifact=hubble',
    },
    {
        id: 'artifact-curiosity',
        label: 'Inspect Surface Rover: MSL Curiosity',
        category: 'ARTIFACT',
        keywords: ['curiosity', 'mars', 'rover', 'msl', 'gale crater'],
        execute: (locale, router) => router.push(`/${locale}/archive?artifact=curiosity`),
        hint: '?artifact=curiosity',
    },
    {
        id: 'timeline-apollo11',
        label: 'Jump to Lunar Landing: Apollo 11 (July 20, 1969)',
        category: 'TIMELINE',
        keywords: ['1969', 'apollo', 'apollo 11', 'moon', 'armstrong', 'lunar landing'],
        execute: (locale, router) => router.push(`/${locale}/timeline?date=1969-07-20`),
        hint: '?date=1969-07-20',
    },
    {
        id: 'timeline-sputnik',
        label: 'Jump to Space Age Dawn: Sputnik 1 (October 4, 1957)',
        category: 'TIMELINE',
        keywords: ['1957', 'sputnik', 'sputnik 1', 'first satellite', 'orbit'],
        execute: (locale, router) => router.push(`/${locale}/timeline?date=1957-10-04`),
        hint: '?date=1957-10-04',
    },
]

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const router = useRouter()
    const pathname = usePathname()
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLDivElement>(null)

    // Extract current locale from pathname or fallback to 'en'
    const currentLocale = useMemo(() => {
        const segments = pathname.split('/').filter(Boolean)
        return segments.length > 0 && segments[0].length === 2 ? segments[0] : 'en'
    }, [pathname])

    // Filter commands based on input match across labels and keywords
    const filteredCommands = useMemo(() => {
        const query = input.toLowerCase().trim()
        if (!query) return COMMAND_REGISTRY.slice(0, 6)

        return COMMAND_REGISTRY.filter((cmd) => {
            const matchLabel = cmd.label.toLowerCase().includes(query)
            const matchKeywords = cmd.keywords.some((kw) => kw.toLowerCase().includes(query))
            return matchLabel || matchKeywords
        })
    }, [input])

    // Keyboard shortcut listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                setIsOpen((prev) => !prev)
            }
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    // Focus management and index reset
    useEffect(() => {
        if (isOpen) {
            setSelectedIndex(0)
            setTimeout(() => inputRef.current?.focus(), 10)
        } else {
            setInput('')
        }
    }, [isOpen])

    // Reset selected index when filtered list changes
    useEffect(() => {
        setSelectedIndex(0)
    }, [filteredCommands.length])

    // Scroll active item into view
    useEffect(() => {
        if (listRef.current) {
            const activeElement = listRef.current.children[selectedIndex] as HTMLElement
            if (activeElement) {
                activeElement.scrollIntoView({ block: 'nearest' })
            }
        }
    }, [selectedIndex])

    const handleSelectCommand = (cmd: CommandAction) => {
        cmd.execute(currentLocale, router)
        setIsOpen(false)
        setInput('')
    }

    const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1))
        } else if (e.key === 'Enter') {
            e.preventDefault()
            if (filteredCommands.length > 0) {
                handleSelectCommand(filteredCommands[selectedIndex])
            } else {
                fallbackNaturalLanguageParser(input)
            }
        }
    }

    const fallbackNaturalLanguageParser = (rawInput: string) => {
        const cmd = rawInput.toLowerCase().trim()
        if (!cmd) return

        if (cmd.includes('lab') || cmd.includes('engineering') || cmd.includes('render')) {
            router.push(`/${currentLocale}/lab`)
        } else if (cmd.includes('mission') || cmd.includes('control')) {
            router.push(`/${currentLocale}/missions`)
        } else if (cmd.includes('discover') || cmd.includes('board') || cmd.includes('notes')) {
            router.push(`/${currentLocale}/discoveries`)
        } else if (cmd.includes('archive') || cmd.includes('artifact')) {
            router.push(`/${currentLocale}/archive`)
        } else if (cmd.includes('voyager')) {
            router.push(`/${currentLocale}/archive?artifact=voyager-1`)
        } else if (cmd.includes('1969') || cmd.includes('apollo')) {
            router.push(`/${currentLocale}/timeline?date=1969-07-20`)
        } else if (cmd.includes('1957') || cmd.includes('sputnik')) {
            router.push(`/${currentLocale}/timeline?date=1957-10-04`)
        } else {
            router.push(`/${currentLocale}/archive?search=${encodeURIComponent(cmd)}`)
        }

        setIsOpen(false)
        setInput('')
    }

    if (!isOpen) return null

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="ASTRA Command Interface"
            className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4 animate-in fade-in duration-150"
            onClick={() => setIsOpen(false)}
        >
            <div
                className="w-full max-w-2xl bg-slate-900 border border-slate-700 shadow-2xl shadow-cyan-950/40 rounded-sm overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Status Bar */}
                <div className="px-4 py-2 border-b border-slate-800 text-[10px] font-mono text-cyan-500 tracking-widest flex items-center justify-between bg-slate-950/60 select-none">
                    <div className="flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span>ASTRA COMMAND INTERFACE // v10.0</span>
                    </div>
                    <span className="text-slate-400">LOCALE: {currentLocale.toUpperCase()}</span>
                </div>

                {/* Search Input Box */}
                <div className="p-4 border-b border-slate-800/80 flex items-center gap-3">
                    <span className="text-cyan-400 font-mono text-lg select-none">&gt;</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDownInput}
                        placeholder="Search telemetry, execute directives, or query year (e.g. '1969')..."
                        className="w-full bg-transparent text-lg font-mono text-slate-100 focus:outline-none placeholder:text-slate-600"
                    />
                    {input && (
                        <button
                            onClick={() => setInput('')}
                            className="text-[10px] font-mono text-slate-500 hover:text-slate-300 px-1.5 py-0.5 border border-slate-700 rounded"
                        >
                            CLEAR
                        </button>
                    )}
                </div>

                {/* Filtered Directives List */}
                <div
                    ref={listRef}
                    className="max-h-[320px] overflow-y-auto p-2 divide-y divide-slate-800/40 font-mono text-sm scrollbar-thin scrollbar-thumb-slate-700"
                >
                    {filteredCommands.length > 0 ? (
                        filteredCommands.map((cmd, idx) => {
                            const isSelected = idx === selectedIndex
                            return (
                                <div
                                    key={cmd.id}
                                    onClick={() => handleSelectCommand(cmd)}
                                    onMouseEnter={() => setSelectedIndex(idx)}
                                    className={`flex items-center justify-between px-3 py-2.5 rounded cursor-pointer transition-colors ${isSelected
                                        ? 'bg-cyan-950/50 border border-cyan-700/50 text-cyan-200'
                                        : 'text-slate-300 hover:bg-slate-800/50 border border-transparent'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold ${cmd.category === 'ARTIFACT'
                                                ? 'bg-amber-950/80 text-amber-400 border border-amber-800'
                                                : cmd.category === 'TIMELINE'
                                                    ? 'bg-purple-950/80 text-purple-400 border border-purple-800'
                                                    : cmd.category === 'NAVIGATION'
                                                        ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-800'
                                                        : 'bg-slate-800 text-slate-300'
                                                }`}
                                        >
                                            {cmd.category}
                                        </span>
                                        <span className="text-xs md:text-sm">{cmd.label}</span>
                                    </div>

                                    {cmd.hint && (
                                        <span className="text-[11px] text-slate-500 tracking-tight hidden sm:inline">
                                            {cmd.hint}
                                        </span>
                                    )}
                                </div>
                            )
                        })
                    ) : (
                        <div className="py-6 text-center font-mono">
                            <p className="text-xs text-slate-500">NO PREDEFINED DIRECTIVE MATCHED</p>
                            <p className="text-[11px] text-cyan-500/80 mt-1">
                                Press [ENTER] to execute dynamic archive search for &quot;{input}&quot;
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer Navigation Hints */}
                <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center justify-between tracking-wider select-none">
                    <div className="flex items-center gap-3">
                        <span>
                            <kbd className="px-1 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">↑</kbd>{' '}
                            <kbd className="px-1 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">↓</kbd> NAVIGATE
                        </span>
                        <span>
                            <kbd className="px-1 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">↵</kbd> EXECUTE
                        </span>
                    </div>
                    <span>
                        <kbd className="px-1 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">ESC</kbd> ABORT
                    </span>
                </div>
            </div>
        </div>
    )
}