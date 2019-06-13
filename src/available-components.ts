import React from 'react';

/**
 * This is extracted at build-time
 */
export interface AvailableComponents {
    components: Record<string, AvailableComponent>;
}

export interface AvailableComponent {
    id: string;
    componentType: React.ComponentType<any>;
    props: Prop[];
}

export interface Prop {
    name: string;
    type: 'string' | 'number' | 'elements';
}
