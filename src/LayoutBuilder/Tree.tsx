import { Layout, LayoutNode } from "../layout";
import React from "react";
import { jsx } from "@emotion/core";

interface Props {
  layout: Layout;
  highlightedNode: string | null;
  setHighlightedNode(id: string | null): void;
}

export default function Tree(props: Props) {
  if (props.layout.node) {
    return (
      <ul>
        <TreeNode
          node={props.layout.node}
          highlightedNode={props.highlightedNode}
          setHighlightedNode={props.setHighlightedNode}
        />
      </ul>
    );
  } else {
    return null;
  }
}

interface NodeProps {
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
          if (typeof value === "object") {
            return (
              <li key={name}>
                <div>{name}</div>
                <ul>
                  {value.map(node => (
                    <TreeNode
                      key={node.id}
                      node={node}
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
