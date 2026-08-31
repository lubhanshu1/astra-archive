import { Artifact } from './types';

export const artifacts: Artifact[] = [
    {
        id: 'saturn-v',
        name: 'Saturn V',
        category: 'Launch Vehicle',
        mission: 'Apollo Program',
        organization: 'NASA',
        country: 'USA',
        year: 1967,
        status: 'Retired',
        description: 'The super heavy-lift launch vehicle that supported the Apollo program for human exploration of the Moon.',
        dimensions: { height: 110.6, width: 10.1 },
        mass: 2970000,
        hasModel: true,
        modelUrl: '/models/saturn-v/scene.glb',
        digitalTwin: {
            modelAccuracy: 'SCALE VERIFIED',
            modelSource: 'NASA 3D Resources',
            modelVersion: '1.0.0',
            coordinateSystem: 'Right-handed Y-up',
            materials: ['aluminum', 'titanium', 'thermal insulation'],
            components: [
                {
                    id: 's-ic', name: 'S-IC (First Stage)',
                    children: [
                        { id: 'f1-engines', name: 'F-1 Engines (x5)' },
                        { id: 'rp1-tank', name: 'RP-1 Fuel Tank' }
                    ]
                },
                { id: 's-ii', name: 'S-II (Second Stage)' },
                { id: 's-ivb', name: 'S-IVB (Third Stage)' }
            ]
        }
    },
    {
        id: 'apollo-lm',
        name: 'Apollo Lunar Module',
        category: 'Lander',
        mission: 'Apollo 11',
        organization: 'NASA',
        country: 'USA',
        year: 1969,
        status: 'Derelict / Destroyed',
        description: 'The lander portion of the Apollo spacecraft built to achieve the transit from lunar orbit to the surface and back.',
        dimensions: { height: 7.04, width: 9.4 },
        mass: 15200,
        hasModel: true,
        digitalTwin: {
            modelAccuracy: 'SCALE APPROXIMATE',
            modelSource: 'Historical Archive',
            modelVersion: '1.0.0',
            coordinateSystem: 'Right-handed Y-up',
            materials: ['mylar thermal blankets', 'aluminum', 'titanium'],
            components: [
                { id: 'descent-stage', name: 'Descent Stage' },
                { id: 'ascent-stage', name: 'Ascent Stage' }
            ]
        }
    },
    {
        id: 'voyager-1',
        name: 'Voyager 1',
        category: 'Space Probe',
        mission: 'Voyager Interstellar Mission',
        organization: 'NASA',
        country: 'USA',
        year: 1977,
        status: 'Active',
        description: 'A space probe launched to study the outer Solar System and interstellar space. Currently the farthest human-made object from Earth.',
        mass: 825.5,
        hasModel: true,
        digitalTwin: {
            modelAccuracy: '3D RECONSTRUCTION',
            modelSource: 'Procedural Generation',
            modelVersion: '0.9.0',
            coordinateSystem: 'Right-handed Y-up',
            materials: ['aluminum', 'gold foil'],
            components: [
                { id: 'hga', name: 'High-Gain Antenna' },
                { id: 'rtg', name: 'Radioisotope Thermoelectric Generators' },
                { id: 'mag', name: 'Magnetometer Boom' }
            ]
        }
    },
    {
        id: 'hubble',
        name: 'Hubble Space Telescope',
        category: 'Space Telescope',
        organization: 'NASA/ESA',
        country: 'International',
        year: 1990,
        status: 'Active',
        description: 'One of the largest and most versatile space telescopes, operating in low Earth orbit.',
        dimensions: { length: 13.2, width: 4.2 },
        mass: 11110,
        hasModel: true,
        digitalTwin: {
            modelAccuracy: 'SCALE APPROXIMATE',
            modelSource: 'Public Archive',
            modelVersion: '1.1.0',
            coordinateSystem: 'Right-handed Y-up',
            materials: ['multi-layer insulation', 'solar cells', 'aluminum'],
            components: [
                { id: 'ota', name: 'Optical Telescope Assembly' },
                { id: 'ssm', name: 'Spacecraft Systems Module' },
                { id: 'solar-arrays', name: 'Solar Arrays' }
            ]
        }
    },
    {
        id: 'jwst',
        name: 'James Webb Space Telescope',
        category: 'Space Telescope',
        organization: 'NASA/ESA/CSA',
        country: 'International',
        year: 2021,
        status: 'Active',
        description: 'An infrared observatory orbiting the Sun-Earth L2 point, designed to view the most distant objects in the universe.',
        mass: 6161,
        hasModel: true,
        digitalTwin: {
            modelAccuracy: 'SCALE VERIFIED',
            modelSource: 'NASA 3D Resources',
            modelVersion: '2.0.0',
            coordinateSystem: 'Right-handed Y-up',
            materials: ['kapton', 'beryllium', 'gold coating'],
            components: [
                { id: 'sunshield', name: '5-Layer Sunshield' },
                { id: 'ote', name: 'Optical Telescope Element' },
                { id: 'isim', name: 'Integrated Science Instrument Module' }
            ]
        }
    },
    {
        id: 'perseverance',
        name: 'Perseverance',
        category: 'Rover',
        mission: 'Mars 2020',
        organization: 'NASA',
        country: 'USA',
        year: 2020,
        status: 'Active',
        description: 'A car-sized Mars rover designed to explore the crater Jezero as part of NASA\'s Mars 2020 mission.',
        dimensions: { length: 3.0, width: 2.7, height: 2.2 },
        mass: 1025,
        hasModel: false
    },
    {
        id: 'viking-1',
        name: 'Viking 1',
        category: 'Lander',
        mission: 'Viking Program',
        organization: 'NASA',
        country: 'USA',
        year: 1975,
        status: 'Retired',
        description: 'The first spacecraft to successfully land on Mars and perform its mission.',
        mass: 3527,
        hasModel: false
    },
    {
        id: 'space-shuttle',
        name: 'Space Shuttle',
        category: 'Spacecraft',
        organization: 'NASA',
        country: 'USA',
        year: 1981,
        status: 'Retired',
        description: 'A partially reusable low Earth orbital spacecraft system operated from 1981 to 2011.',
        dimensions: { length: 37.2, height: 17.3 },
        mass: 2030000,
        hasModel: true,
        digitalTwin: {
            modelAccuracy: 'SCALE APPROXIMATE',
            modelSource: 'Archive',
            modelVersion: '1.0.0',
            coordinateSystem: 'Right-handed Y-up',
            materials: ['thermal protection tiles', 'reinforced carbon-carbon', 'aluminum'],
            components: [
                { id: 'orbiter', name: 'Orbiter Vehicle' },
                { id: 'et', name: 'External Tank' },
                { id: 'srb', name: 'Solid Rocket Boosters' }
            ]
        }
    },
    {
        id: 'iss',
        name: 'International Space Station',
        category: 'Space Station',
        organization: 'NASA/Roscosmos/JAXA/ESA/CSA',
        country: 'International',
        year: 1998,
        status: 'Active',
        description: 'A modular space station in low Earth orbit. It is a multinational collaborative project.',
        dimensions: { length: 73.0, width: 109.0 },
        mass: 419725,
        hasModel: true,
        digitalTwin: {
            modelAccuracy: '3D RECONSTRUCTION',
            modelSource: 'Procedural Generation',
            modelVersion: '1.0.0',
            coordinateSystem: 'Right-handed Y-up',
            materials: ['aluminum', 'kevlar', 'solar cells'],
            components: [
                { id: 'usos', name: 'US Orbital Segment' },
                { id: 'ros', name: 'Russian Orbital Segment' },
                { id: 'truss', name: 'Integrated Truss Structure' }
            ]
        }
    },
    {
        id: 'chandrayaan-3',
        name: 'Chandrayaan-3',
        category: 'Lander/Rover',
        mission: 'Lunar Exploration',
        organization: 'ISRO',
        country: 'India',
        year: 2023,
        status: 'Dormant',
        description: 'The third Indian lunar exploration mission, which successfully landed the Vikram lander and Pragyan rover near the lunar south pole.',
        mass: 3900,
        hasModel: true,
        digitalTwin: {
            modelAccuracy: 'SCALE APPROXIMATE',
            modelSource: 'ISRO Public Data',
            modelVersion: '1.0.0',
            coordinateSystem: 'Right-handed Y-up',
            materials: ['multi-layer insulation', 'aluminum alloy'],
            components: [
                { id: 'prop-module', name: 'Propulsion Module' },
                { id: 'vikram', name: 'Vikram Lander' },
                { id: 'pragyan', name: 'Pragyan Rover' }
            ]
        }
    },
    {
        id: 'mangalyaan',
        name: 'Mars Orbiter Mission (Mangalyaan)',
        category: 'Orbiter',
        organization: 'ISRO',
        country: 'India',
        year: 2013,
        status: 'Retired',
        description: 'India\'s first interplanetary mission, making it the fourth space agency to reach Mars orbit.',
        mass: 1337,
        hasModel: false
    },
    {
        id: 'pslv',
        name: 'Polar Satellite Launch Vehicle',
        category: 'Launch Vehicle',
        organization: 'ISRO',
        country: 'India',
        year: 1993,
        status: 'Active',
        description: 'An expendable medium-lift launch vehicle designed and operated by ISRO.',
        dimensions: { height: 44, width: 2.8 },
        mass: 320000,
        hasModel: true,
        digitalTwin: {
            modelAccuracy: '3D RECONSTRUCTION',
            modelSource: 'Procedural Generation',
            modelVersion: '1.0.0',
            coordinateSystem: 'Right-handed Y-up',
            materials: ['composite materials', 'steel', 'aluminum'],
            components: [
                { id: 'ps1', name: 'PS1 (First Stage)' },
                { id: 'ps2', name: 'PS2 (Second Stage)' },
                { id: 'ps3', name: 'PS3 (Third Stage)' },
                { id: 'ps4', name: 'PS4 (Fourth Stage)' }
            ]
        }
    },
    {
        id: 'gslv-mk3',
        name: 'LVM3 (GSLV Mk III)',
        category: 'Launch Vehicle',
        organization: 'ISRO',
        country: 'India',
        year: 2014,
        status: 'Active',
        description: 'A three-stage medium-lift launch vehicle developed by ISRO for launching communication satellites and human spaceflight.',
        dimensions: { height: 43.4, width: 4.0 },
        mass: 640000,
        hasModel: true,
        digitalTwin: {
            modelAccuracy: '3D RECONSTRUCTION',
            modelSource: 'Procedural Generation',
            modelVersion: '1.0.0',
            coordinateSystem: 'Right-handed Y-up',
            materials: ['aluminum alloy', 'carbon composite'],
            components: [
                { id: 's200', name: 'S200 Solid Rocket Boosters' },
                { id: 'l110', name: 'L110 Liquid Core Stage' },
                { id: 'c25', name: 'C25 Cryogenic Upper Stage' }
            ]
        }
    },
    {
        id: 'aditya-l1',
        name: 'Aditya-L1',
        category: 'Solar Observatory',
        organization: 'ISRO',
        country: 'India',
        year: 2023,
        status: 'Active',
        description: 'A coronagraphy spacecraft to study the solar atmosphere, inserted into a halo orbit around the Sun-Earth L1 point.',
        mass: 1475,
        hasModel: false
    },
    {
        id: 'sputnik-1',
        name: 'Sputnik 1',
        category: 'Satellite',
        organization: 'Soviet Space Program',
        country: 'Soviet Union',
        year: 1957,
        status: 'Destroyed',
        description: 'The first artificial Earth satellite. It was a 58 cm diameter polished metal sphere with four external radio antennas.',
        mass: 83.6,
        hasModel: false
    }
];

export function getArtifact(id: string): Artifact | undefined {
    return artifacts.find(a => a.id === id);
}

export function getAllArtifacts(): Artifact[] {
    return artifacts;
}