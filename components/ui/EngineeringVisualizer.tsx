'use client'
import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { XR, createXRStore } from '@react-three/xr';

// Initialize the XR store for the new v6 API
const store = createXRStore();

export default function EngineeringVisualizer() {
    const [viewMode, setViewMode] = useState<'SOLID' | 'WIREFRAME' | 'X-RAY'>('SOLID');

    return (
        <div className="w-full h-[500px] bg-slate-950 border border-slate-800 relative flex flex-col font-mono text-xs">
            {/* Toolbar */}
            <div className="absolute top-0 left-0 w-full p-3 bg-slate-900/80 border-b border-slate-800 z-10 flex justify-between items-center backdrop-blur-sm">
                <div className="text-cyan-500 font-bold tracking-widest">3D ENGINEERING VISUALIZER</div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode('SOLID')}
                        className={`px-3 py-1 border transition-colors ${viewMode === 'SOLID' ? 'bg-cyan-900/50 border-cyan-500 text-cyan-300' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}
                    >
                        SOLID
                    </button>
                    <button
                        onClick={() => setViewMode('WIREFRAME')}
                        className={`px-3 py-1 border transition-colors ${viewMode === 'WIREFRAME' ? 'bg-cyan-900/50 border-cyan-500 text-cyan-300' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}
                    >
                        WIREFRAME
                    </button>
                    <button
                        onClick={() => setViewMode('X-RAY')}
                        className={`px-3 py-1 border transition-colors ${viewMode === 'X-RAY' ? 'bg-cyan-900/50 border-cyan-500 text-cyan-300' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}
                    >
                        X-RAY
                    </button>
                </div>
            </div>

            {/* WebGL Canvas */}
            <div className="flex-1 relative cursor-move">
                {/* Custom Native HTML Button tied to the new store */}
                <button
                    onClick={() => store.enterAR()}
                    className="absolute bottom-4 right-4 bg-slate-900 text-cyan-400 font-mono text-xs border border-cyan-700 px-4 py-2 hover:bg-cyan-900 transition-colors z-10 tracking-widest"
                >
                    ENTER AR
                </button>

                <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
                    <XR store={store}>
                        <Suspense fallback={null}>
                            {/* Lighting environment */}
                            <Stage environment="city" intensity={0.5}>
                                {/* Placeholder Rocket Stage */}
                                <mesh>
                                    <cylinderGeometry args={[1, 1, 4, 32]} />
                                    <meshStandardMaterial
                                        color="#06b6d4"
                                        wireframe={viewMode === 'WIREFRAME'}
                                        transparent={viewMode === 'X-RAY'}
                                        opacity={viewMode === 'X-RAY' ? 0.2 : 1}
                                        roughness={0.2}
                                        metalness={0.8}
                                    />
                                </mesh>
                            </Stage>
                        </Suspense>
                        {/* Auto-enables one-finger rotation and pinch-zoom on mobile */}
                        <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} />
                    </XR>
                </Canvas>
            </div>
        </div>
    );
}