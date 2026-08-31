import prisma from '@/lib/prisma';
import ExportButton from '@/components/research/ExportButton';
import FilterPanel from '@/components/research/FilterPanel';
import ArchiveAnalytics from '@/components/research/ArchiveAnalytics';
import KnowledgeGraphWrapper from '@/components/research/KnowledgeGraphWrapper';

export const revalidate = 0;

export default async function ResearchWorkspace(props: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    // In Next.js 15, searchParams is a Promise
    const searchParams = await props.searchParams;

    // Construct a deterministic WHERE clause based on active filters
    const whereClause: any = {};
    if (searchParams.category) whereClause.category = searchParams.category;
    if (searchParams.organization) whereClause.organization = searchParams.organization;
    if (searchParams.destination) whereClause.destination = searchParams.destination;

    // Fetch live, filtered data from PostgreSQL
    const artifacts = await prisma.artifact.findMany({ where: whereClause });
    const missions = await prisma.mission.findMany();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-mono flex flex-col">
            <header className="border-b border-slate-800 p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold tracking-widest text-white">ASTRA RESEARCH ENGINE</h1>
                <div className="flex gap-4 items-center">
                    <span className="text-emerald-500 text-xs flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        LIVE DATA ACTIVE
                    </span>
                    <ExportButton artifacts={artifacts} />
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Active Filters */}
                <aside className="w-64 border-r border-slate-800 bg-slate-900/50 flex flex-col">
                    <FilterPanel />
                </aside>

                {/* Workspace Area */}
                <main className="flex-1 overflow-y-auto p-6 space-y-6">
                    <section>
                        <h2 className="text-cyan-500 mb-4 text-sm font-bold">KNOWLEDGE GRAPH</h2>
                        <div className="border border-slate-800 rounded-sm overflow-hidden relative">
                            <KnowledgeGraphWrapper artifacts={artifacts as any} missions={missions as any} />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-cyan-500 mb-4 text-sm font-bold">ARCHIVE ANALYTICS</h2>
                        <ArchiveAnalytics />
                    </section>
                </main>
            </div>
        </div>
    );
}