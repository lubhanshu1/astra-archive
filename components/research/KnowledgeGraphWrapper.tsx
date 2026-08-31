'use client'
import dynamic from 'next/dynamic';
import { Artifact, Mission } from '@/lib/types';

// The dynamic import is now safely inside a Client Component
const ForceGraph = dynamic(() => import('./KnowledgeGraph'), {
    ssr: false,
    loading: () => (
        <div className="h-[600px] flex items-center justify-center text-cyan-500 font-mono text-xs animate-pulse bg-slate-950">
            INITIALIZING NEURAL GRAPH...
        </div>
    )
});

export default function KnowledgeGraphWrapper({ artifacts, missions }: { artifacts: Artifact[], missions: Mission[] }) {
    return <ForceGraph artifacts={artifacts} missions={missions} />
}