'use client'
import { useState, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, Stage, Html, OrthographicCamera, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { Artifact } from '@/lib/types'
import ProceduralRocket from './ProceduralRocket'
import DigitalTwinModel from './DigitalTwinModel'

export default function ArtifactCanvas({ artifact }: { artifact: Artifact }) {
    const [viewMode, setViewMode] = useState<'STANDARD' | 'WIREFRAME' | 'X-RAY'>('STANDARD')
    const [cameraType, setCameraType] = useState<'PERSP' | 'ORTHO'>('PERSP')
    const [measuring, setMeasuring] = useState(false)
    const cameraControlsRef = useRef<CameraControls>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleReset = () => {
        if (cameraControlsRef.current) {
            // Updated reset position to match the new zoomed-out default
            cameraControlsRef.current.setLookAt(0, 0, 150, 0, 0, 0, true)
        }
    }

    const handleFullscreen = () => {
        if (containerRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen()
            } else {
                containerRef.current.requestFullscreen()
            }
        }
    }

    return (
        <div ref={containerRef} className="w-full h-[60vh] lg:h-[75vh] bg-slate-900/20 border border-white/10 relative overflow-hidden group flex flex-col md:flex-row">

            {/* Integrity Badges & Digital Twin Metadata */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
                {!artifact.hasModel ? (
                    <div className="bg-amber-500/10 border border-amber-500/50 text-amber-500 px-3 py-1 text-xs font-mono backdrop-blur-sm">
                        3D RECONSTRUCTION UNAVAILABLE // DATA MISSING
                    </div>
                ) : artifact.modelUrl ? (
                    <>
                        <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-3 py-1 text-xs font-mono flex items-center gap-2 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            REAL MODEL LOADED
                        </div>
                        <div className="bg-slate-950/80 border border-slate-700 text-slate-300 px-3 py-1 text-[10px] font-mono backdrop-blur-sm">
                            {artifact.digitalTwin?.modelAccuracy || 'SCALE APPROXIMATE'}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-3 py-1 text-xs font-mono flex items-center gap-2 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                            3D RECONSTRUCTION
                        </div>
                        <div className="bg-amber-950/80 border border-amber-900/50 text-amber-500 px-3 py-1 text-[10px] font-mono backdrop-blur-sm">
                            GEOMETRY NOT OFFICIAL
                        </div>
                    </>
                )}

                {measuring && (
                    <div className="bg-indigo-950/80 border border-indigo-500 text-indigo-300 px-3 py-1 text-[10px] font-mono backdrop-blur-sm mt-2">
                        MODEL MEASUREMENT // NOT CERTIFIED ENGINEERING DRAWING
                    </div>
                )}
            </div>

            {/* Advanced Viewer Toolbar */}
            <div className="absolute right-4 top-4 z-10 flex flex-col gap-2 font-mono text-[10px]">
                <div className="bg-slate-950/80 border border-slate-700 p-1 flex flex-col gap-1 backdrop-blur-md">
                    {(['STANDARD', 'WIREFRAME', 'X-RAY'] as const).map(mode => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode)}
                            className={`px-3 py-2 text-left transition-colors ${viewMode === mode ? 'bg-cyan-900 text-cyan-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>

                <div className="bg-slate-950/80 border border-slate-700 p-1 flex flex-col gap-1 backdrop-blur-md mt-2">
                    <button
                        onClick={() => setCameraType(t => t === 'PERSP' ? 'ORTHO' : 'PERSP')}
                        className="px-3 py-2 text-left text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                        CAM: {cameraType}
                    </button>
                    <button
                        onClick={() => setMeasuring(!measuring)}
                        className={`px-3 py-2 text-left transition-colors ${measuring ? 'bg-indigo-900 text-indigo-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        MEASURE
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-3 py-2 text-left text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                        RESET VIEW
                    </button>
                    <button
                        onClick={handleFullscreen}
                        className="px-3 py-2 text-left text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                        FULLSCREEN
                    </button>
                </div>
            </div>

            {/* Component Tree Sidebar */}
            {artifact.digitalTwin?.components && (
                <div className="absolute bottom-4 left-4 z-10 bg-slate-950/90 border border-slate-700 p-4 max-w-xs font-mono text-xs backdrop-blur-md max-h-[40vh] overflow-y-auto hidden md:block">
                    <div className="text-cyan-500 mb-2 border-b border-white/10 pb-2">COMPONENT TREE</div>
                    <ul className="space-y-1">
                        {artifact.digitalTwin.components.map(comp => (
                            <li key={comp.id} className="text-slate-300">
                                <span className="text-slate-500 mr-2">├─</span>{comp.name}
                                {comp.children && (
                                    <ul className="pl-4 mt-1 space-y-1 border-l border-slate-800 ml-1">
                                        {comp.children.map(child => (
                                            <li key={child.id} className="text-slate-400 hover:text-cyan-400 cursor-pointer">
                                                <span className="text-slate-600 mr-2">└─</span>{child.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* WebGL Canvas */}
            <Canvas className="absolute inset-0 z-0 w-full h-full">
                <color attach="background" args={['#020617']} />

                {cameraType === 'PERSP' ? (
                    // Updated default perspective position to z=150
                    <PerspectiveCamera makeDefault position={[0, 0, 150]} fov={45} />
                ) : (
                    // Updated default orthographic position and zoom
                    <OrthographicCamera makeDefault position={[0, 0, 150]} zoom={5} />
                )}

                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" castShadow />
                <spotLight position={[-5, 5, -5]} intensity={5} color="#06b6d4" angle={0.5} penumbra={1} />

                <Suspense fallback={
                    <Html center>
                        <div className="font-mono text-cyan-400 text-xs bg-slate-950/80 px-4 py-2 border border-cyan-900">
                            LOADING ASSETS...
                        </div>
                    </Html>
                }>
                    <Stage environment="night" intensity={0.2} adjustCamera={false}>
                        {artifact.hasModel ? (
                            artifact.modelUrl ? (
                                <DigitalTwinModel url={artifact.modelUrl} viewMode={viewMode} />
                            ) : (
                                <ProceduralRocket
                                    exploded={false}
                                    engineeringMode={viewMode === 'WIREFRAME'}
                                    onFocusPart={() => { }}
                                />
                            )
                        ) : (
                            <mesh>
                                <boxGeometry args={[1, 1, 1]} />
                                <meshBasicMaterial color="#ef4444" wireframe />
                            </mesh>
                        )}
                    </Stage>
                </Suspense>

                <CameraControls
                    ref={cameraControlsRef}
                    minDistance={1}
                    maxDistance={500} // Increased maxDistance so the camera doesn't snap back to 50
                    dollySpeed={1}
                />
            </Canvas>
        </div>
    )
}