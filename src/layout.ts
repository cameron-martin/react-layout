import uuid from 'uuid/v4';

export interface Layout {
    node?: LayoutNode;
}

export interface LayoutNode {
    id: string;
    componentId: string;
    props: Record<string, string | number | LayoutNode[]>;
}

export function createNode(componentId: string): LayoutNode {
    return {
        id: uuid(),
        componentId,
        props: {},
    };
}
