import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Force Next.js to run this live every time, never caching a "random" result
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    // Fetch only the IDs to keep the query lightning fast
    const artifacts = await prisma.artifact.findMany({ select: { id: true } });

    if (artifacts.length === 0) {
        return NextResponse.redirect(new URL('/research', request.url));
    }

    // True deterministic random selection
    const randomIndex = Math.floor(Math.random() * artifacts.length);
    const selectedId = artifacts[randomIndex].id;

    // Redirect the user to the dedicated Discovery view for this artifact
    return NextResponse.redirect(new URL(`/discovery/${selectedId}`, request.url));
}