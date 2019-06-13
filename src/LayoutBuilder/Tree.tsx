import { Layout, LayoutNode } from "../layout";
import React from "react";
import { jsx } from "@emotion/core";

interface Props {
  layout: Layout;
  highlightedNodeId: string | null;
  setHighlightedNodeId(id: string | null): void;
}

export default function Tree(props: Props) {
  if (props.layout.rootId) {
    return (
      <ul>
        <TreeNode
          layout={props.layout}
          node={props.layout.nodes[props.layout.rootId]}
          highlightedNode={props.highlightedNodeId}
          setHighlightedNode={props.setHighlightedNodeId}
        />
      </ul>
    );
  } else {
    return null;
  }
}

interface NodeProps {
  layout: Layout;
  node: LayoutNode;
  highlightedNode: string | null;
  setHighlightedNode(id: string | null): void;
}

function TreeNode(props: NodeProps) {
  const onClick: React.MouseEventHandler = event => {
    props.setHighlightedNode(props.node.id);
  };

  const isHighlighted = props.node.id === props.highlightedNode;

  return (
    <li>
      <div
        onClick={onClick}
        css={{ background: isHighlighted ? "pink" : "transparent" }}
      >
        {props.node.componentId}
      </div>
      <ul>
        {Object.entries(props.node.props).map(([name, value]) => {
          if (value.type === "nodes") {
            return (
              <li key={name}>
                <div>{name}</div>
                <ul>
                  {value.value.map(nodeId => (
                    <TreeNode
                      key={nodeId}
                      layout={props.layout}
                      node={props.layout.nodes[nodeId]}
                      highlightedNode={props.highlightedNode}
                      setHighlightedNode={props.setHighlightedNode}
                    />
                  ))}
                </ul>
              </li>
            );
          }
        })}
      </ul>
    </li>
  );
}
