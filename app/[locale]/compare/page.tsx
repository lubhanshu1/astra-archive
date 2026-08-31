'use client'
import { useState } from 'react'
import { getAllArtifacts } from '@/lib/data'
import { Artifact } from '@/lib/types'

export default function ComparePage() {
    const allArtifacts = getAllArtifacts()
    const [selected, setSelected] = useState<Artifact[]>([])
    const [isSelecting, setIsSelecting] = useState(false)

    const handleAdd = (artifact: Artifact) => {
        if (selected.length < 4 && !selected.find(a => a.id === artifact.id)) {
            setSelected([...selected, artifact])
        }
        setIsSelecting(false)
    }

    const handleRemove = (id: string) => {
        setSelected(selected.filter(a => a.id !== id))
    }

    return (
        <div className="max-w-screen-2xl mx-auto px-6 py-12">
            <header className="mb-12 border-b border-white/10 pb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Systems Comparison</h1>
                    <p className="font-mono text-slate-400 text-sm">CROSS-REFERENCE ARCHIVE DATA (MAX 4)</p>
                </div>
                <button
                    onClick={() => setIsSelecting(!isSelecting)}
                    disabled={selected.length >= 4}
                    className="px-4 py-2 bg-cyan-900/50 border border-cyan-500 text-cyan-400 font-mono text-xs hover:bg-cyan-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    + ADD ARTIFACT
                </button>
            </header>

            {/* Selector Dropdown */}
            {isSelecting && (
                <div className="mb-8 p-4 border border-white/10 bg-slate-900/50 flex flex-wrap gap-2">
                    {allArtifacts.map(a => (
                        <button
                            key={a.id}
                            onClick={() => handleAdd(a)}
                            className="px-3 py-1 border border-slate-700 bg-slate-950 text-xs font-mono hover:border-cyan-500"
                        >
                            {a.name}
                        </button>
                    ))}
                </div>
            )}

            {/* Comparison Matrix */}
            {selected.length === 0 ? (
                <div className="h-64 flex items-center justify-center border border-dashed border-slate-700 font-mono text-slate-500">
                    AWAITING DATA INPUT...
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full font-mono text-sm text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-4 border border-white/10 bg-slate-900/30 w-48 text-slate-500">SPECIFICATION</th>
                                {selected.map(a => (
                                    <th key={a.id} className="p-4 border border-white/10 bg-slate-900/50 relative min-w-[250px]">
                                        <div className="text-xl text-white font-bold font-sans">{a.name}</div>
                                        <div className="text-cyan-500 text-xs mt-1">{a.category}</div>
                                        <button onClick={() => handleRemove(a.id)} className="absolute top-4 right-4 text-slate-500 hover:text-red-400">✕</button>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-4 border border-white/10 text-slate-500">OPERATOR</td>
                                {selected.map(a => <td key={a.id} className="p-4 border border-white/10 text-slate-300">{a.organization}</td>)}
                            </tr>
                            <tr>
                                <td className="p-4 border border-white/10 text-slate-500">YEAR</td>
                                {selected.map(a => <td key={a.id} className="p-4 border border-white/10 text-slate-300">{a.year || 'N/A'}</td>)}
                            </tr>
                            <tr>
                                <td className="p-4 border border-white/10 text-slate-500">STATUS</td>
                                {selected.map(a => <td key={a.id} className="p-4 border border-white/10 text-slate-300">{a.status}</td>)}
                            </tr>
                            <tr>
                                <td className="p-4 border border-white/10 text-slate-500">DRY MASS</td>
                                {selected.map(a => <td key={a.id} className="p-4 border border-white/10 text-cyan-400">{a.mass ? `${a.mass.toLocaleString()} kg` : 'UNKNOWN'}</td>)}
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}