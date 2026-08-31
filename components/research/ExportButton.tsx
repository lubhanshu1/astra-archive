'use client'

export default function ExportButton({ artifacts }: { artifacts: any[] }) {
    const handleExport = () => {
        if (!artifacts || artifacts.length === 0) {
            alert("No data available to export based on current filters.");
            return;
        }

        // Deterministically map database fields to CSV columns
        const headers = ['ID', 'Name', 'Category', 'Year', 'Organization', 'Destination', 'Mass (kg)'].join(',');

        const rows = artifacts.map(a =>
            [
                a.id,
                `"${a.name}"`,
                `"${a.category || ''}"`,
                a.year || '',
                `"${a.organization || ''}"`,
                `"${a.destination || ''}"`,
                a.massKg || ''
            ].join(',')
        ).join('\n');

        const csv = `${headers}\n${rows}`;
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        // Trigger secure local download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'astra_research_export.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    return (
        <button
            onClick={handleExport}
            className="border border-slate-600 px-3 py-1 text-xs hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
        >
            EXPORT DATA
        </button>
    )
}