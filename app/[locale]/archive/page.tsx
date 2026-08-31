import { artifacts } from '@/lib/data'
import Link from 'next/link'

export default function ArchivePage() {
    return (
        <div className="max-w-screen-2xl mx-auto px-6 py-12">
            <header className="mb-12 border-b border-white/10 pb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold mb-2">The Archive</h1>
                    <p className="font-mono text-slate-400 text-sm">INDEX: {artifacts.length} VERIFIED ENTRIES</p>
                </div>
                <div className="font-mono text-xs text-cyan-600 bg-cyan-950/30 px-3 py-1 border border-cyan-900">
                    SYS.STATUS: ONLINE
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {artifacts.map((artifact) => (
                    <Link
                        key={artifact.id}
                        href={`/artifacts/${artifact.id}`}
                        className="group block border border-white/5 bg-slate-900/20 hover:bg-slate-900/50 hover:border-cyan-500/30 transition-all p-5"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <span className="font-mono text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
                                {artifact.category.toUpperCase()}
                            </span>
                            <span className="font-mono text-xs text-slate-600">
                                {artifact.year || 'UNAVAILABLE'}
                            </span>
                        </div>

                        <h2 className="text-xl font-bold mb-2 text-slate-200">{artifact.name}</h2>
                        <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                            {artifact.description}
                        </p>

                        <div className="pt-4 border-t border-white/5 font-mono text-xs text-slate-500 flex justify-between">
                            <span>{artifact.organization || 'ORG UNAVAILABLE'}</span>
                            <span className={artifact.status === 'Active' ? 'text-amber-500/80' : 'text-slate-600'}>
                                {artifact.status?.toUpperCase() || 'UNKNOWN'}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}