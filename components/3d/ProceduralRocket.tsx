'use client'
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

interface RocketProps {
    exploded: boolean;
    engineeringMode: boolean;
    onFocusPart: (position: THREE.Vector3, target: THREE.Vector3) => void;
}

export default function ProceduralRocket({ exploded, engineeringMode, onFocusPart }: RocketProps) {
    const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false

    // Part Refs for animation
    const stage1Ref = useRef<THREE.Group>(null)
    const stage2Ref = useRef<THREE.Group>(null)
    const payloadRef = useRef<THREE.Group>(null)
    const [hovered, setHovered] = useState<string | null>(null)

    // Target Y positions for exploded state
    const targets = {
        payload: exploded ? 3 : 1.5,
        stage2: exploded ? 0 : 0,
        stage1: exploded ? -3.5 : -2
    }

    useFrame((_, delta) => {
        const speed = prefersReducedMotion ? 100 : 4 * delta // Instant if reduced motion
        if (payloadRef.current) payloadRef.current.position.y = THREE.MathUtils.lerp(payloadRef.current.position.y, targets.payload, speed)
        if (stage2Ref.current) stage2Ref.current.position.y = THREE.MathUtils.lerp(stage2Ref.current.position.y, targets.stage2, speed)
        if (stage1Ref.current) stage1Ref.current.position.y = THREE.MathUtils.lerp(stage1Ref.current.position.y, targets.stage1, speed)
    })

    // Reusable hotspot component
    const Hotspot = ({ id, label, fn, pos, camPos }: { id: string, label: string, fn: string, pos: [number, number, number], camPos: [number, number, number] }) => (
        <Html position={pos} center distanceFactor={10} zIndexRange={[100, 0]}>
            <div
                className={`group flex items-center gap-2 cursor-pointer transition-opacity ${exploded || engineeringMode ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onPointerEnter={() => setHovered(id)}
                onPointerLeave={() => setHovered(null)}
                onClick={(e) => { e.stopPropagation(); onFocusPart(new THREE.Vector3(...camPos), new THREE.Vector3(...pos)) }}
            >
                <div className={`w-2 h-2 bg-cyan-400 rounded-full transition-transform ${hovered === id ? 'scale-150' : ''}`} />
                <div className="bg-slate-900/90 border border-cyan-500/50 p-2 text-xs font-mono whitespace-nowrap backdrop-blur-md">
                    <div className="text-white font-bold">{label}</div>
                    <div className="text-slate-400">{fn}</div>
                </div>
            </div>
        </Html>
    )

    return (
        <group>
            {/* Payload / Command Module */}
            <group ref={payloadRef} position={[0, 1.5, 0]}>
                <mesh>
                    <coneGeometry args={[0.5, 1.5, 32]} />
                    <meshStandardMaterial color="#cbd5e1" metalness={0.5} roughness={0.5} wireframe={engineeringMode} />
                </mesh>
                <Hotspot id="cmd" label="COMMAND MODULE" fn="Crew habitat & avionics" pos={[0.6, 0, 0]} camPos={[2, 2, 2]} />
            </group>

            {/* Stage 2 */}
            <group ref={stage2Ref} position={[0, 0, 0]}>
                <mesh>
                    <cylinderGeometry args={[0.5, 0.8, 1.5, 32]} />
                    <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.4} wireframe={engineeringMode} />
                </mesh>
                <Hotspot id="s2" label="STAGE 2 BOOSTER" fn="Orbital insertion propulsion" pos={[0.9, 0, 0]} camPos={[3, 0, 3]} />
                {engineeringMode && (
                    <Html position={[-1, 0, 0]} center className="text-cyan-400 font-mono text-xs whitespace-nowrap opacity-50">
                        Ø 1.6m / L 1.5m
                    </Html>
                )}
            </group>

            {/* Stage 1 */}
            <group ref={stage1Ref} position={[0, -2, 0]}>
                <mesh>
                    <cylinderGeometry args={[0.8, 0.8, 2.5, 32]} />
                    <meshStandardMaterial color="#e2e8f0" metalness={0.3} roughness={0.7} wireframe={engineeringMode} />
                </mesh>
                <Hotspot id="s1" label="STAGE 1 CORE" fn="Primary liftoff thrust" pos={[1, 0, 0]} camPos={[4, -2, 4]} />
            </group>

            {/* Engineering Grid Floor */}
            {engineeringMode && (
                <gridHelper args={[10, 20, '#06b6d4', '#1e293b']} position={[0, -3.5, 0]} />
            )}
        </group>
    )
}