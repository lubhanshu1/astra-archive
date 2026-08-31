export const NASA_API_KEY = 'sQ1a7DyJcEp2wYaIeHhNhigXdaccf6bRo0QbNgj7'

export async function fetchISS() {
    const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544')
    if (!res.ok) throw new Error('ISS telemetry offline')
    return res.json()
}

export async function fetchAPOD() {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
    if (!res.ok) throw new Error('NASA APOD offline')
    return res.json()
}

export async function fetchNextLaunch() {
    const res = await fetch('https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=1')
    if (!res.ok) throw new Error('Launch Library offline')
    const data = await res.json()
    return data.results[0]
}

export async function fetchNEOs() {
    const today = new Date().toISOString().split('T')[0]
    const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`)
    if (!res.ok) throw new Error('NASA NeoWs offline')
    const data = await res.json()
    return data.near_earth_objects[today] || []
}