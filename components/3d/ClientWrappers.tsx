'use client'
import dynamic from 'next/dynamic'

export const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })
export const ArtifactCanvas = dynamic(() => import('./ArtifactCanvas'), { ssr: false })
export const IssGlobe = dynamic(() => import('./IssGlobe'), { ssr: false })
export const OrbitalMap = dynamic(() => import('./OrbitalMap'), { ssr: false })