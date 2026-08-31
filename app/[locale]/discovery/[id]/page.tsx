import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function DiscoveryPage(props: { params: Promise<{ id: string }> }) {
    // In Next.js 15, params is a Promise
    const params = await props.params;

    const artifact = await prisma.artifact.findUnique({
        where: { id: params.id },
        include: { mission: true }
    });

    if (!artifact) notFound();

    // Bypass Prisma's strict type-checking for dynamic/unmapped schema fields
    const safeArtifact = artifact as any;

    // Deterministically select "ONE VERIFIED FACT" without AI
    let verifiedFact = "NO ADDITIONAL DATA";
    if (safeArtifact.mass) verifiedFact = `MASS VERIFIED AT ${safeArtifact.mass.toLocaleString()} KG`;
    else if (safeArtifact.massKg) verifiedFact = `MASS VERIFIED AT ${safeArtifact.massKg.toLocaleString()} KG`;
    else if (safeArtifact.dimensions) verifiedFact = `DIMENSIONS: ${safeArtifact.dimensions}`;
    else if (safeArtifact.powerSource) verifiedFact = `POWER SOURCE: ${safeArtifact.powerSource}`;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-mono flex items-center justify-center p-6">
            <div className="max-w-2xl w-full border border-cyan-500 bg-slate-900/50 p-8 relative">
                {/* Decorative UI elements */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

                <h1 className="text-cyan-500 font-bold tracking-[0.3em] mb-8 border-b border-slate-800 pb-4 flex justify-between">
                    <span>RANDOM DISCOVERY</span>
                    <span className="text-slate-500 text-xs">ASTRA.ARCHIVE</span>
                </h1>

                <div className="space-y-6 text-lg">
                    <div className="flex border-b border-slate-800/50 pb-2">
                        <span className="w-48 text-slate-500">ARTIFACT</span>
                        <span className="text-white font-bold">{artifact.name}</span>
                    </div>

                    <div className="flex border-b border-slate-800/50 pb-2">
                        <span className="w-48 text-slate-500">CATEGORY</span>
                        <span className="text-slate-300">{artifact.category || 'UNCLASSIFIED'}</span>
                    </div>

                    <div className="flex border-b border-slate-800/50 pb-2">
                        <span className="w-48 text-slate-500">YEAR</span>
                        <span className="text-slate-300">{artifact.year || 'UNKNOWN'}</span>
                    </div>

                    <div className="flex border-b border-slate-800/50 pb-2">
                        <span className="w-48 text-slate-500">MISSION</span>
                        <span className="text-slate-300">{safeArtifact.mission?.name || 'INDEPENDENT / UNKNOWN'}</span>
                    </div>

                    <div className="flex border-b border-slate-800/50 pb-2">
                        <span className="w-48 text-slate-500">COUNTRY</span>
                        <span className="text-slate-300">{safeArtifact.country || 'INTERNATIONAL'}</span>
                    </div>

                    <div className="mt-8 bg-cyan-950/30 border border-cyan-900 p-4">
                        <div className="text-cyan-600 text-xs mb-1">ONE VERIFIED FACT</div>
                        <div className="text-cyan-400 tracking-wide">{verifiedFact}</div>
                    </div>
                </div>

                <div className="mt-12 flex gap-4">
                    <Link href="/api/discovery/random" className="flex-1 text-center bg-cyan-900/50 hover:bg-cyan-800 border border-cyan-700 py-3 text-sm tracking-widest transition-colors">
                        [ RE-ROLL DISCOVERY ]
                    </Link>
                    <Link href="/research" className="flex-1 text-center border border-slate-700 py-3 text-sm tracking-widest hover:bg-slate-800 transition-colors">
                        [ RETURN TO RESEARCH ]
                    </Link>
                </div>
            </div>
        </div>
    );
}