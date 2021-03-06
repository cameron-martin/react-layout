import { jsx } from "@emotion/core";
import { AvailableComponents } from "../available-components";
import {
  Layout,
  createNode,
  LayoutNode,
  setRootNode,
  updateNode,
  appendChildNode
} from "../layout";
import AddNode from "./AddNode";

interface Props {
  layout: Layout;
  components: AvailableComponents;
  highlightedNodeId: string | null;
  updateLayout(layout: Layout): void;
}

export default function LayoutPreview(props: Props) {
  if (props.layout.rootId) {
    return (
      <LayoutPreviewNode
        layout={props.layout}
        updateLayout={props.updateLayout}
        components={props.components}
        node={props.layout.nodes[props.layout.rootId]}
        highlightedNode={props.highlightedNodeId}
      />
    );
  } else {
    return (
      <div>
        <AddNode
          onDrop={componentId =>
            props.updateLayout(
              setRootNode(
                props.layout,
                createNode(props.components.components[componentId])
              )
            )
          }
        />
      </div>
    );
  }
}

interface NodeProps {
  layout: Layout;
  updateLayout(layout: Layout): void;
  node: LayoutNode;
  components: AvailableComponents;
  highlightedNode: string | null;
}

function LayoutPreviewNode(props: NodeProps) {
  const component = props.components.components[props.node.componentId];

  const componentProps: Record<string, any> = {};

  component.props.forEach(propSpec => {
    if (propSpec.type === "elements") {
      const nodeProp = props.node.props[propSpec.name];

      if (nodeProp && nodeProp.type !== "nodes")
        throw new Error("Wrong prop type");

      const childNodes = (nodeProp ? nodeProp.value : []).map(
        nodeId => props.layout.nodes[nodeId]
      );

      const childElements = childNodes.map(childNode => (
        <LayoutPreviewNode
          layout={props.layout}
          updateLayout={props.updateLayout}
          key={childNode.id}
          node={childNode}
          components={props.components}
          highlightedNode={props.highlightedNode}
        />
      ));

      childElements.push(
        <AddNode
          onDrop={componentId =>
            props.updateLayout(
              appendChildNode(
                props.layout,
                props.node.id,
                propSpec.name,
                createNode(props.components.components[componentId])
              )
            )
          }
        />
      );

      componentProps[propSpec.name] = childElements;
    } else {
      componentProps[propSpec.name] =
        props.node.props[propSpec.name] &&
        props.node.props[propSpec.name].value;
    }
  });

  if (props.highlightedNode === props.node.id) {
    componentProps.style = {
      ...componentProps.style,
      border: "1px solid red"
    };
  }

  return jsx(component.componentType, componentProps);
}
