'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Starfield() {
    const pointsRef = useRef<THREE.Points>(null)

    const [positions, sizes] = useMemo(() => {
        const count = 3000
        const pos = new Float32Array(count * 3)
        const sz = new Float32Array(count)
        for (let i = 0; i < count; i++) {
            const r = 50 + Math.random() * 100
            const theta = 2 * Math.PI * Math.random()
            const phi = Math.acos(2 * Math.random() - 1)
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            pos[i * 3 + 2] = r * Math.cos(phi)
            sz[i] = Math.random() * 1.5
        }
        return [pos, sz]
    }, [])

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
            pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01
        }
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={positions.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    args={[sizes, 1]}
                    count={sizes.length}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
        </points>
    )
}