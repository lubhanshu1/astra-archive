'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useKeyboardControls() {
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if user is typing in an input
            if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;

            switch (e.key.toLowerCase()) {
                case 'r': router.push('/research'); break;
                case 'g': router.push('/research#graph'); break;
                case 'c': router.push('/compare'); break;
                case 'd':
                    // Deterministic Random Discovery
                    router.push('/api/discovery/random');
                    break;
                case 'escape':
                    document.dispatchEvent(new CustomEvent('close-panels'));
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [router]);
}