'use client'
import { useMemo, useState, useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Artifact, Mission } from '@/lib/types';
import { useTimeStore } from '@/lib/timeStore';

export default function KnowledgeGraph({ artifacts, missions }: { artifacts: Artifact[], missions: Mission[] }) {
    const [focusedNode, setFocusedNode] = useState<any>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const containerRef = useRef<HTMLDivElement>(null);
    const fgRef = useRef<any>(null); // FIXED: Added missing 'null' argument

    const currentYear = useTimeStore((state) => state.currentYear);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                setDimensions({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height
                });
            }
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const graphData = useMemo(() => {
        const nodesMap = new Map();
        const links: any[] = [];
        const activeArtifacts = artifacts.filter(a => !a.year || a.year <= currentYear);

        missions.forEach(m => {
            nodesMap.set(`m_${m.id}`, { id: `m_${m.id}`, name: m.name, group: 'MISSION', val: 5 });
            // @ts-ignore
            if (m.destination) {
                // @ts-ignore
                nodesMap.set(`dest_${m.destination}`, { id: `dest_${m.destination}`, name: m.destination, group: 'DESTINATION', val: 3 });
                // @ts-ignore
                links.push({ source: `m_${m.id}`, target: `dest_${m.destination}`, label: 'TARGETS' });
            }
        });

        activeArtifacts.forEach(a => {
            // FIXED: Moved ...a to the front so it doesn't overwrite the custom graph ID and Name
            nodesMap.set(`a_${a.id}`, { ...a, id: `a_${a.id}`, name: a.name, group: 'ARTIFACT', val: 2 });

            if (a.mission && nodesMap.has(`m_${a.mission}`)) {
                links.push({ source: `a_${a.id}`, target: `m_${a.mission}`, label: 'PART OF' });
            }
            if (a.organization) {
                nodesMap.set(`org_${a.organization}`, { id: `org_${a.organization}`, name: a.organization, group: 'ORGANIZATION', val: 4 });
                links.push({ source: `a_${a.id}`, target: `org_${a.organization}`, label: 'OPERATED BY' });
            }
        });

        return { nodes: Array.from(nodesMap.values()), links };
    }, [artifacts, missions, currentYear]);

    return (
        <div ref={containerRef} className="relative w-full h-[600px] bg-slate-950">
            <ForceGraph2D
                ref={fgRef}
                width={dimensions.width}
                height={dimensions.height}
                graphData={graphData}
                nodeLabel="name"
                nodeAutoColorBy="group"
                onNodeClick={(node) => setFocusedNode(node)}
                linkColor={() => 'rgba(255,255,255,0.2)'}
                cooldownTicks={50}
                onEngineStop={() => fgRef.current?.zoomToFit(400, 100)}
            />
            {focusedNode && (
                <div className="absolute bottom-4 right-4 bg-slate-900 border border-cyan-500 p-4 font-mono text-xs w-64 text-slate-300 z-10 shadow-xl">
                    <div className="text-cyan-400 font-bold mb-2">{focusedNode.name}</div>
                    <div className="text-slate-500 mb-1">TYPE: {focusedNode.group}</div>
                    {focusedNode.group === 'ARTIFACT' && (
                        <>
                            <div className="mb-1">CATEGORY: {focusedNode.category}</div>
                            {focusedNode.year && <div>YEAR: {focusedNode.year}</div>}
                        </>
                    )}
                    <button
                        onClick={() => setFocusedNode(null)}
                        className="mt-4 px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 w-full text-slate-300 transition-colors"
                    >
                        CLOSE
                    </button>
                </div>
            )}
        </div>
    );
}