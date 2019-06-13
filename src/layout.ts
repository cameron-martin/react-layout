import uuid from "uuid/v4";

export interface Layout {
  rootId: string | null;
  nodes: Record<string, LayoutNode>;
}

export interface LayoutNode {
  id: string;
  componentId: string;
  props: Record<string, LayoutNodeProp>;
}

export type LayoutNodeProp =
  | {
      type: "string";
      value: string;
    }
  | { type: "number"; value: number }
  | { type: "nodes"; value: string[] };

export const emptyLayout: Layout = {
  rootId: null,
  nodes: {}
};

export function createNode(componentId: string): LayoutNode {
  return {
    id: uuid(),
    componentId,
    props: {}
  };
}

export function setRootNode(layout: Layout, node: LayoutNode): Layout {
  return {
    nodes: {
      ...layout.nodes,
      [node.id]: node
    },
    rootId: node.id
  };
}

export function appendChildNode(
  layout: Layout,
  parentId: string,
  prop: string,
  node: LayoutNode
): Layout {
  const parentNode = layout.nodes[parentId];

  const parentNodeProp = parentNode.props[prop];

  if (parentNodeProp && parentNodeProp.type !== "nodes") {
    throw new Error("Wrong prop type");
  }

  return {
    ...layout,
    nodes: {
      ...layout.nodes,
      [parentId]: {
        ...parentNode,
        props: {
          ...parentNode.props,
          [prop]: {
            type: "nodes",
            value: parentNodeProp
              ? [...parentNodeProp.value, node.id]
              : [node.id]
          }
        }
      },
      [node.id]: node
    }
  };
}

export function updateNode(layout: Layout, newNode: LayoutNode): Layout {
  return {
    ...layout,
    nodes: {
      ...layout.nodes,
      [newNode.id]: newNode
    }
  };
}
