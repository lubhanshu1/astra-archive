'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// 1. Inner component that lives INSIDE the Canvas (where useFrame is allowed)
function GlobeScene({ lat, lon }: { lat: number, lon: number }) {
    const globeRef = useRef<THREE.Group>(null)
    const issRef = useRef<THREE.Mesh>(null)

    const radius = 3

    // Convert Lat/Lon to 3D Vector on a sphere
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    const x = -(radius * 1.05) * Math.sin(phi) * Math.cos(theta)
    const y = (radius * 1.05) * Math.cos(phi)
    const z = (radius * 1.05) * Math.sin(phi) * Math.sin(theta)

    // useFrame works perfectly here because GlobeScene is inside <Canvas>
    useFrame((state) => {
        if (globeRef.current) {
            globeRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
        }
    })

    return (
        <>
            <ambientLight intensity={0.1} />
            <directionalLight position={[10, 10, 5]} intensity={2} />

            <group ref={globeRef}>
                {/* Wireframe Earth */}
                <mesh>
                    <sphereGeometry args={[radius, 32, 32]} />
                    <meshBasicMaterial color="#0f172a" wireframe transparent opacity={0.3} />
                </mesh>

                {/* Equator */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[radius, radius + 0.02, 64]} />
                    <meshBasicMaterial color="#1e293b" side={THREE.DoubleSide} />
                </mesh>

                {/* Live ISS Marker */}
                <mesh position={[x, y, z]} ref={issRef}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshBasicMaterial color="#ef4444" />
                    <pointLight color="#ef4444" intensity={2} distance={2} />
                </mesh>
            </group>

            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </>
    )
}

// 2. Outer component that PROVIDES the Canvas
export default function IssGlobe({ lat, lon }: { lat: number, lon: number }) {
    return (
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
            <GlobeScene lat={lat} lon={lon} />
        </Canvas>
    )
}