'use client'
import { useRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface DigitalTwinProps {
    url: string;
    viewMode: 'STANDARD' | 'WIREFRAME' | 'X-RAY';
}

export default function DigitalTwinModel({ url, viewMode }: DigitalTwinProps) {
    // Uses Draco compression automatically if available in the GLTF
    const { scene } = useGLTF(url, true)
    const clonedScene = useMemo(() => scene.clone(), [scene])

    // Apply visual QA overrides based on Advanced Viewer modes
    useMemo(() => {
        clonedScene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                // Store original materials if not already stored
                if (!child.userData.originalMaterial) {
                    child.userData.originalMaterial = child.material
                }

                if (viewMode === 'WIREFRAME') {
                    child.material = new THREE.MeshStandardMaterial({
                        color: '#22d3ee',
                        wireframe: true
                    })
                } else if (viewMode === 'X-RAY') {
                    child.material = new THREE.MeshPhysicalMaterial({
                        color: '#3b82f6',
                        transparent: true,
                        opacity: 0.2,
                        roughness: 0.1,
                        metalness: 0.8,
                        depthWrite: false,
                        side: THREE.DoubleSide
                    })
                } else {
                    // Restore high-fidelity PBR materials
                    child.material = child.userData.originalMaterial
                }
            }
        })
    }, [clonedScene, viewMode])

    return <primitive object={clonedScene} scale={1} />
}

// Preload critical models
useGLTF.preload('/models/saturn-v/scene.glb')