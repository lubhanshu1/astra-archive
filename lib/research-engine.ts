import { Artifact } from './types';

// Deterministic Query Parser
export function parseQuery(input: string) {
    const query = { text: '', filters: [] as { key: string, operator: string, value: string | number }[] };
    const filterRegex = /(\w+)\s*(>|<|>=|<=|=|:)\s*([a-zA-Z0-9_.-]+)/g;

    let match;
    let remainingText = input;

    while ((match = filterRegex.exec(input)) !== null) {
        query.filters.push({
            key: match[1].toLowerCase(),
            operator: match[2],
            value: isNaN(Number(match[3])) ? match[3] : Number(match[3])
        });
        remainingText = remainingText.replace(match[0], '');
    }

    query.text = remainingText.trim().toLowerCase();
    return query;
}

// Calculate Related Artifacts Deterministically
export function getRelatedArtifacts(target: Artifact, allArtifacts: Artifact[]): { artifact: Artifact, reason: string }[] {
    const related = [];

    for (const item of allArtifacts) {
        if (item.id === target.id) continue;

        // Replaced 'missionId' with 'mission' to match Artifact type definition
        if (item.mission && item.mission === target.mission) {
            related.push({ artifact: item, reason: "SAME MISSION" });
            continue;
        }
        if (item.organization === target.organization) {
            related.push({ artifact: item, reason: "SAME ORGANIZATION" });
            continue;
        }
        // Ensure 'destination' is added to your Artifact interface in types.ts
        if (item.destination === target.destination && item.category === target.category) {
            related.push({ artifact: item, reason: "SAME DESTINATION & CATEGORY" });
            continue;
        }
    }
    return related.slice(0, 5); // Return top 5 deterministic relations
}

// Data-Derived Insights Calculator
export function calculateInsights(artifacts: Artifact[]) {
    // Replaced 'massKg' with 'mass' to match Artifact type definition
    const validMasses = artifacts.filter(a => a.mass !== null && a.mass !== undefined);
    const validYears = artifacts.filter(a => a.year !== null && a.year !== undefined);

    return {
        heaviest: validMasses.reduce((prev, curr) => (curr.mass! > prev.mass!) ? curr : prev, validMasses[0]),
        oldest: validYears.reduce((prev, curr) => (curr.year! < prev.year!) ? curr : prev, validYears[0]),
        newest: validYears.reduce((prev, curr) => (curr.year! > prev.year!) ? curr : prev, validYears[0]),
        totalCount: artifacts.length
    };
}