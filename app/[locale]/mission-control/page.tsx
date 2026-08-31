'use client'
import { useQuery } from '@tanstack/react-query'
import { fetchISS, fetchAPOD, fetchNextLaunch, fetchNEOs } from '@/lib/api'
import { IssGlobe } from '@/components/3d/ClientWrappers'

export default function MissionControlPage() {
    const { data: iss } = useQuery({ queryKey: ['iss'], queryFn: fetchISS, refetchInterval: 5000 })
    const { data: apod } = useQuery({ queryKey: ['apod'], queryFn: fetchAPOD })
    const { data: launch } = useQuery({ queryKey: ['launch'], queryFn: fetchNextLaunch })
    const { data: neos } = useQuery({ queryKey: ['neos'], queryFn: fetchNEOs })

    return (
        <div className="max-w-screen-2xl mx-auto px-6 py-8">
            <header className="mb-8 border-b border-white/10 pb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Mission Control</h1>
                    <p className="font-mono text-slate-400 text-sm">LIVE TELEMETRY // REAL-TIME NETWORK</p>
                </div>
                <div className="font-mono text-xs text-amber-500 bg-amber-950/30 px-3 py-1 border border-amber-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    LIVE DATA ACTIVE
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ISS TRACKER */}
                <div className="lg:col-span-2 border border-white/10 bg-slate-900/30 p-1 flex flex-col">
                    <div className="p-4 border-b border-white/5 font-mono text-xs text-cyan-500 flex justify-between">
                        <span>ISS ORBITAL TRACKER</span>
                        <span>POLLING: 5s</span>
                    </div>
                    <div className="relative h-[400px] bg-slate-950 w-full">
                        {iss ? <IssGlobe lat={iss.latitude} lon={iss.longitude} /> : <div className="absolute inset-0 flex items-center justify-center font-mono text-slate-500 text-xs">ACQUIRING SIGNAL...</div>}

                        {/* Live Telemetry Overlay */}
                        {iss && (
                            <div className="absolute bottom-4 left-4 font-mono text-xs space-y-1 bg-slate-950/80 p-3 border border-slate-800 backdrop-blur-md">
                                <div className="text-slate-400">LAT: <span className="text-white">{iss.latitude.toFixed(4)}°</span></div>
                                <div className="text-slate-400">LON: <span className="text-white">{iss.longitude.toFixed(4)}°</span></div>
                                <div className="text-slate-400">ALT: <span className="text-white">{iss.altitude.toFixed(2)} km</span></div>
                                <div className="text-slate-400">VEL: <span className="text-white">{iss.velocity.toFixed(2)} km/h</span></div>
                                <div className="text-slate-400">STATE: <span className={iss.visibility === 'daylight' ? 'text-cyan-400' : 'text-indigo-400'}>{iss.visibility.toUpperCase()}</span></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* NEXT LAUNCH */}
                <div className="border border-white/10 bg-slate-900/30 p-5 font-mono">
                    <h3 className="text-xs text-slate-500 border-b border-white/10 pb-2 mb-4">NEXT ORBITAL LAUNCH</h3>
                    {launch ? (
                        <div className="space-y-4">
                            <div className="text-2xl text-white font-bold">{new Date(launch.net).toLocaleDateString()}</div>
                            <div>
                                <div className="text-slate-500 text-xs mb-1">MISSION</div>
                                <div className="text-cyan-400 text-sm truncate">{launch.name}</div>
                            </div>
                            <div>
                                <div className="text-slate-500 text-xs mb-1">PROVIDER</div>
                                <div className="text-slate-200 text-sm">{launch.launch_service_provider?.name}</div>
                            </div>
                            <div>
                                <div className="text-slate-500 text-xs mb-1">PAD</div>
                                <div className="text-slate-200 text-sm">{launch.pad?.name}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-xs text-slate-500 animate-pulse">FETCHING MANIFEST...</div>
                    )}
                </div>

                {/* APOD */}
                <div className="border border-white/10 bg-slate-900/30 p-5">
                    <h3 className="font-mono text-xs text-slate-500 border-b border-white/10 pb-2 mb-4">ASTRONOMY PICTURE OF THE DAY</h3>
                    {apod ? (
                        <div>
                            {apod.media_type === 'image' && <img src={apod.url} alt={apod.title} className="w-full h-48 object-cover mb-4 border border-white/5" />}
                            <h4 className="font-bold text-white mb-2">{apod.title}</h4>
                            <p className="text-xs text-slate-400 line-clamp-3">{apod.explanation}</p>
                        </div>
                    ) : (
                        <div className="font-mono text-xs text-slate-500 animate-pulse">DOWNLOADING SENSOR DATA...</div>
                    )}
                </div>

                {/* NEOs */}
                <div className="lg:col-span-2 border border-white/10 bg-slate-900/30 p-5 font-mono">
                    <h3 className="text-xs text-slate-500 border-b border-white/10 pb-2 mb-4 flex justify-between">
                        <span>NEAR-EARTH OBJECTS (TODAY)</span>
                        <span className="text-amber-500">NASA NeoWs</span>
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="text-slate-500 border-b border-white/5">
                                <tr>
                                    <th className="pb-2 font-normal">DESIGNATION</th>
                                    <th className="pb-2 font-normal">EST. DIAMETER (m)</th>
                                    <th className="pb-2 font-normal">MISS DISTANCE (km)</th>
                                    <th className="pb-2 font-normal">VELOCITY (km/s)</th>
                                    <th className="pb-2 font-normal">HAZARD</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-300">
                                {neos ? neos.slice(0, 5).map((neo: any) => (
                                    <tr key={neo.id} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="py-3 text-cyan-400">{neo.name}</td>
                                        <td className="py-3">{Math.round(neo.estimated_diameter.meters.estimated_diameter_max)}</td>
                                        <td className="py-3">{Math.round(neo.close_approach_data[0].miss_distance.kilometers).toLocaleString()}</td>
                                        <td className="py-3">{Number(neo.close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(2)}</td>
                                        <td className="py-3">
                                            {neo.is_potentially_hazardous_asteroid ? <span className="text-red-400 bg-red-950/50 px-2 py-1">YES</span> : 'NO'}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan={5} className="py-4 text-center text-slate-500 animate-pulse">SCANNING SECTOR...</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}