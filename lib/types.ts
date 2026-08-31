export interface ArtifactDimensions {
    height?: number;
    width?: number;
    length?: number;
}

export interface ComponentNode {
    id: string;
    name: string;
    description?: string;
    children?: ComponentNode[];
}

export interface DigitalTwinMetadata {
    modelAccuracy: 'SCALE VERIFIED' | 'SCALE APPROXIMATE' | '3D RECONSTRUCTION';
    modelSource: string;
    modelVersion: string;
    coordinateSystem: string;
    materials: string[];
    components: ComponentNode[];
}

// Added to resolve: Module '"./types"' has no exported member 'Mission'.
export interface Mission {
    id: string;
    name: string;
    objective?: string;
    launchDate?: string;
    endDate?: string;
    status?: string;
}

export interface Artifact {
    id: string;
    name: string;
    category: string;
    mission?: string;
    organization: string;
    country: string;
    year: number;
    status: string;
    description: string;
    destination?: string; // Added to resolve: Property 'destination' does not exist on type 'Artifact'.
    dimensions?: ArtifactDimensions;
    mass?: number;
    hasModel: boolean;
    modelUrl?: string; // Path to GLB file
    digitalTwin?: DigitalTwinMetadata;
}