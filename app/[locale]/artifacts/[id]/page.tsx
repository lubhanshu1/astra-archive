import { getArtifact } from '@/lib/data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArtifactCanvas } from '@/components/3d/ClientWrappers'
import LearnText from '@/components/ui/LearnText'
import ArtifactScanner from '@/components/ui/ArtifactScanner'

export default async function ArtifactDetailPage({ params }: { params: { id: string } }) {
    const resolvedParams = await params;
    const artifact = getArtifact(resolvedParams.id)

    if (!artifact) notFound()

    return (
        <div className="max-w-screen-2xl mx-auto px-6 py-8">
            <div className="mb-6 font-mono text-xs text-slate-500">
                <Link href="/archive" className="hover:text-cyan-400">ARCHIVE</Link>
                <span className="mx-2">/</span>
                <span className="text-slate-300">{artifact.id.toUpperCase()}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <ArtifactCanvas artifact={artifact} />
                </div>

                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">{artifact.name}</h1>
                        <p className="font-mono text-cyan-400 text-sm mb-4">
                            {artifact.mission ? `MISSION: ${artifact.mission.toUpperCase()}` : 'MISSION DATA UNAVAILABLE'}
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            <LearnText
                                eng="RCS (Reaction Control System)"
                                inter="Attitude Control Thrusters"
                                beg="small steering rockets"
                            />
                            {' '}{artifact.description}
                        </p>
                    </div>

                    <div className="border border-white/10 bg-slate-900/30 p-5 font-mono text-sm">
                        <h3 className="text-slate-500 border-b border-white/10 pb-2 mb-4">SPECIFICATIONS</h3>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-slate-500">CLASSIFICATION</span>
                                <span className="text-slate-200">{artifact.category}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">OPERATOR</span>
                                <span className="text-slate-200">{artifact.organization} ({artifact.country})</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">YEAR</span>
                                <span className="text-slate-200">{artifact.year || 'DATA UNAVAILABLE'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">STATUS</span>
                                <span className={artifact.status === 'Active' ? 'text-amber-500' : 'text-slate-200'}>
                                    {artifact.status || 'DATA UNAVAILABLE'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">DRY MASS</span>
                                <span className="text-slate-200">
                                    {artifact.mass ? `${artifact.mass.toLocaleString()} kg` : 'DATA UNAVAILABLE'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <ArtifactScanner name={artifact.name} />
                </div>
            </div>
        </div>
    )
}