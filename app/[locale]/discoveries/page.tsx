'use client'

import { useState, useEffect } from 'react'
import { Database, Download, Trash2, Save } from 'lucide-react'

interface ResearchNote {
    id: string
    text: string
    timestamp: string
}

export default function Discoveries() {
    const [notes, setNotes] = useState<ResearchNote[]>([])
    const [input, setInput] = useState('')
    const [isClient, setIsClient] = useState(false)

    // Hydration safety and Local Storage initialization
    useEffect(() => {
        setIsClient(true)
        const saved = localStorage.getItem('astra-research')
        if (saved) {
            try {
                setNotes(JSON.parse(saved))
            } catch (e) {
                console.error('Failed to parse ASTRA research data')
            }
        }
    }, [])

    // Auto-sync to local storage whenever notes change
    useEffect(() => {
        if (isClient) {
            localStorage.setItem('astra-research', JSON.stringify(notes))
        }
    }, [notes, isClient])

    const addNote = () => {
        if (!input.trim()) return

        const newNote = {
            id: crypto.randomUUID(),
            text: input.trim(),
            timestamp: new Date().toISOString()
        }

        setNotes(prev => [newNote, ...prev])
        setInput('')
    }

    const clearNotes = () => {
        if (window.confirm('WARNING: Purging telemetry will delete all local session data. Proceed?')) {
            setNotes([])
            localStorage.removeItem('astra-research')
        }
    }

    const exportJSON = () => {
        const exportPayload = {
            system: 'ASTRA_OS',
            phase: '10.0',
            export_date: new Date().toISOString(),
            total_records: notes.length,
            data: notes
        }

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2))
        const node = document.createElement('a')
        node.setAttribute("href", dataStr)
        node.setAttribute("download", `astra_telemetry_${Date.now()}.json`)
        document.body.appendChild(node)
        node.click()
        node.remove()
    }

    // Prevent server/client HTML mismatch during initial render
    if (!isClient) return null

    return (
        <div className="max-w-5xl mx-auto p-8 font-mono">
            <header className="mb-12 border-b border-slate-800 pb-4 flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-cyan-500 tracking-widest mb-2 flex items-center gap-3">
                        <Database className="w-6 h-6" />
                        RESEARCH LOGS
                    </h1>
                    <p className="text-slate-500 text-xs tracking-widest">
                        LOCAL STORAGE PERSISTENCE // JSON EXPORT ACTIVE
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={exportJSON}
                        disabled={notes.length === 0}
                        className="flex items-center gap-2 text-xs text-cyan-400 hover:bg-cyan-950/50 border border-cyan-800 px-3 py-2 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                        <Download className="w-4 h-4" /> EXPORT JSON
                    </button>
                    <button
                        onClick={clearNotes}
                        disabled={notes.length === 0}
                        className="flex items-center gap-2 text-xs text-red-500 hover:bg-red-950/50 border border-red-900 px-3 py-2 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                        <Trash2 className="w-4 h-4" /> PURGE DATA
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Console */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-slate-900/50 border border-slate-800 p-4 relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-900 to-transparent"></div>
                        <label className="block text-[10px] text-cyan-600 mb-3 tracking-widest uppercase">
                            Log Observation
                        </label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                                    e.preventDefault()
                                    addNote()
                                }
                            }}
                            placeholder="Record artifact details, cross-reference data, or note anomalies... (Ctrl+Enter to save)"
                            className="w-full h-40 bg-slate-950 border border-slate-800 text-slate-200 p-3 text-sm focus:outline-none focus:border-cyan-700 transition-colors resize-none scrollbar-thin scrollbar-thumb-slate-800"
                        />
                        <button
                            onClick={addNote}
                            className="mt-4 w-full flex justify-center items-center gap-2 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-50 text-xs tracking-widest transition-colors"
                        >
                            <Save className="w-4 h-4" /> COMMIT TO RECORD
                        </button>
                    </div>
                </div>

                {/* Data Feed */}
                <div className="lg:col-span-2">
                    <div className="text-[10px] text-slate-500 tracking-widest border-b border-slate-800 pb-2 mb-4 flex justify-between">
                        <span>SESSION RECORDS: {notes.length}</span>
                        <span>STATUS: {notes.length > 0 ? 'SYNCED' : 'AWAITING DATA'}</span>
                    </div>

                    <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
                        {notes.length === 0 ? (
                            <div className="text-slate-600 text-center py-16 text-sm border border-dashed border-slate-800">
                                NO RESEARCH DATA FOUND IN CURRENT SESSION
                            </div>
                        ) : (
                            notes.map(note => (
                                <div key={note.id} className="bg-slate-900/50 p-4 border-l-2 border-cyan-800 hover:bg-slate-800/50 transition-colors group">
                                    <div className="text-[10px] text-cyan-700 mb-3 flex justify-between items-center tracking-widest">
                                        <span>ID: {note.id.split('-')[0]}</span>
                                        <span>{new Date(note.timestamp).toLocaleString()}</span>
                                    </div>
                                    <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                                        {note.text}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}