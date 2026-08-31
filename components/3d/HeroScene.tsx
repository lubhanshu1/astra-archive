'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import Starfield from './Starfield'

function MockSatellite() {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
            groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
        }
    })

    return (
        <group ref={groupRef} rotation={[0.5, -0.5, 0]}>
            {/* Core Bus */}
            <mesh>
                <cylinderGeometry args={[0.8, 0.8, 3, 32]} />
                <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Core Wireframe Overlay */}
            <mesh>
                <cylinderGeometry args={[0.85, 0.85, 3.1, 16]} />
                <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.15} />
            </mesh>

            {/* Solar Array Left */}
            <mesh position={[-2.2, 0, 0]}>
                <boxGeometry args={[2.5, 0.05, 1.2]} />
                <meshStandardMaterial color="#020617" metalness={0.9} roughness={0.4} />
            </mesh>
            {/* Solar Array Right */}
            <mesh position={[2.2, 0, 0]}>
                <boxGeometry args={[2.5, 0.05, 1.2]} />
                <meshStandardMaterial color="#020617" metalness={0.9} roughness={0.4} />
            </mesh>

            {/* Communication Dish */}
            <mesh position={[0, 1.5, 0]} rotation={[-Math.PI / 4, 0, 0]}>
                <sphereGeometry args={[0.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.6} side={THREE.DoubleSide} />
            </mesh>
        </group>
    )
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Overlay gradient to blend 3D with UI */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />

            <Canvas camera={{ position: [0, 0, 12], fov: 45 }} gl={{ antialias: true }}>
                <fog attach="fog" args={['#020617', 5, 20]} />
                <color attach="background" args={['#020617']} />

                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={3} color="#e0f2fe" />
                <spotLight position={[-10, -10, 5]} intensity={2} color="#06b6d4" />

                <Starfield />

                <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
                    <MockSatellite />
                </Float>
            </Canvas>
        </div>
    )
}