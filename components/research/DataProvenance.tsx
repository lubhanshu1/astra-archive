'use client'
import { Artifact } from '@/lib/types';

export default function DataProvenance({ artifact }: { artifact: Artifact }) {
    const fields = [
        { label: 'MASS', value: artifact.mass ? `${artifact.mass} kg` : null, source: (artifact as any).sourceMetadata?.mass },
        { label: 'DESTINATION', value: artifact.destination, source: (artifact as any).sourceMetadata?.destination },
        { label: 'YEAR', value: artifact.year, source: (artifact as any).sourceMetadata?.year }
    ];

    return (
        <div className="bg-slate-900 p-4 font-mono text-xs border border-slate-700">
            <h3 className="text-cyan-500 mb-4 border-b border-slate-800 pb-2">DATA PROVENANCE</h3>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-slate-500 border-b border-slate-800">
                        <th className="py-2">DATA FIELD</th>
                        <th className="py-2">VALUE</th>
                        <th className="py-2">STATUS</th>
                        <th className="py-2">SOURCE</th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((f, i) => (
                        <tr key={i} className="border-b border-slate-800/50 text-slate-300">
                            <td className="py-2">{f.label}</td>
                            <td className="py-2">{f.value || 'DATA UNAVAILABLE'}</td>
                            <td className="py-2">
                                {f.value ? <span className="text-emerald-400">VERIFIED</span> : <span className="text-slate-600">—</span>}
                            </td>
                            <td className="py-2 text-cyan-600 hover:text-cyan-400 cursor-pointer">
                                {f.source || '—'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}