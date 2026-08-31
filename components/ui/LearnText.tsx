'use client'
import { useState } from 'react'

interface LearnTextProps {
    eng: string;
    inter: string;
    beg: string;
}

export default function LearnText({ eng, inter, beg }: LearnTextProps) {
    const [level, setLevel] = useState<0 | 1 | 2>(0)
    const texts = [eng, inter, beg]
    const labels = ['ENG', 'INT', 'BEG']

    return (
        <span
            onClick={() => setLevel((l) => (l + 1) % 3 as 0 | 1 | 2)}
            className="inline-flex items-center gap-1.5 border border-cyan-900/50 bg-cyan-950/30 px-1.5 py-0.5 cursor-pointer hover:bg-cyan-900/60 transition-colors mx-1 select-none align-baseline"
            title="Click to simplify terminology"
        >
            <span className="text-cyan-400 font-mono text-[9px] px-1 bg-cyan-950 border border-cyan-800">{labels[level]}</span>
            <span className={level === 2 ? 'text-slate-300 italic' : 'text-cyan-100'}>{texts[level]}</span>
        </span>
    )
}