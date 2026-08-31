'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Stars } from '@react-three/drei'
import * as THREE from 'three'

function SolarSystem() {
    const earthRef = useRef<THREE.Group>(null)
    const marsRef = useRef<THREE.Group>(null)
    const moonRef = useRef<THREE.Mesh>(null)

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        // Simulated orbital mechanics (not to scale, visually compressed)
        if (earthRef.current) {
            earthRef.current.position.x = Math.cos(t * 0.2) * 10
            earthRef.current.position.z = Math.sin(t * 0.2) * 10
            earthRef.current.rotation.y = t * 0.5
        }
        if (marsRef.current) {
            marsRef.current.position.x = Math.cos(t * 0.1) * 15
            marsRef.current.position.z = Math.sin(t * 0.1) * 15
            marsRef.current.rotation.y = t * 0.4
        }
        if (moonRef.current) {
            moonRef.current.position.x = Math.cos(t * 2) * 2
            moonRef.current.position.z = Math.sin(t * 2) * 2
        }
    })

    const PlanetLabel = ({ name, color }: { name: string, color: string }) => (
        <Html distanceFactor={15} center zIndexRange={[100, 0]}>
            <div className="font-mono text-[10px] tracking-widest px-2 py-1 bg-slate-950/80 border border-white/10 backdrop-blur-sm pointer-events-none" style={{ color }}>
                {name}
            </div>
        </Html>
    )

    return (
        <group>
            {/* Sun */}
            <mesh>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial color="#fbbf24" />
                <pointLight intensity={3} distance={100} decay={2} />
                <PlanetLabel name="SUN" color="#fbbf24" />
            </mesh>

            {/* Earth System */}
            <group ref={earthRef}>
                <mesh>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshStandardMaterial color="#3b82f6" />
                    <PlanetLabel name="EARTH" color="#3b82f6" />
                </mesh>
                {/* Moon */}
                <mesh ref={moonRef}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial color="#94a3b8" />
                    <PlanetLabel name="MOON" color="#94a3b8" />
                </mesh>
            </group>

            {/* Mars */}
            <group ref={marsRef}>
                <mesh>
                    <sphereGeometry args={[0.4, 32, 32]} />
                    <meshStandardMaterial color="#ef4444" />
                    <PlanetLabel name="MARS" color="#ef4444" />
                </mesh>
            </group>

            {/* Orbital Paths */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[9.95, 10.05, 64]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.DoubleSide} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[14.95, 15.05, 64]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.DoubleSide} />
            </mesh>
        </group>
    )
}

export default function OrbitalMap() {
    return (
        <Canvas camera={{ position: [0, 15, 25], fov: 45 }}>
            <ambientLight intensity={0.05} />
            <Stars radius={100} depth={50} count={3000} factor={4} fade speed={1} />
            <SolarSystem />
            <OrbitControls makeDefault maxDistance={60} minDistance={5} />
        </Canvas>
    )
}