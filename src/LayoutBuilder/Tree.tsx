import { Layout, LayoutNode } from "../layout";
import React from "react";
import { jsx } from "@emotion/core";

interface Props {
  layout: Layout;
}

export default function Tree(props: Props) {
  if (props.layout.node) {
    return <TreeNode node={props.layout.node} />;
  } else {
    return null;
  }
}

interface NodeProps {
  node: LayoutNode;
}

function TreeNode(props: NodeProps) {
  return (
    <React.Fragment>
      <div>{props.node.componentId}</div>
      <ul>
        {Object.entries(props.node.props).map(([name, value]) => {
          if (typeof value === "object") {
            return (
              <li>
                <div>{name}</div>
                <ul>
                  {value.map(node => (
                    <TreeNode node={node} />
                  ))}
                </ul>
              </li>
            );
          }
        })}
      </ul>
    </React.Fragment>
  );
}
