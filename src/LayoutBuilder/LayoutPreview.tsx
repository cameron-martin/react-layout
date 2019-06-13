import { jsx } from "@emotion/core";
import { AvailableComponents } from "../available-components";
import { Layout, createNode, LayoutNode } from "../layout";
import AddNode from "./AddNode";

interface Props {
  layout: Layout;
  components: AvailableComponents;
  selectedComponent: string | null;
  highlightedNode: string | null;
  updateLayout(layout: Layout): void;
}

export default function LayoutPreview(props: Props) {
  if (props.layout.node) {
    return (
      <LayoutPreviewNode
        components={props.components}
        node={props.layout.node}
        selectedComponent={props.selectedComponent}
        highlightedNode={props.highlightedNode}
        updateNode={node => props.updateLayout({ node })}
      />
    );
  } else {
    return (
      <div>
        <AddNode
          onClick={() =>
            props.selectedComponent &&
            props.updateLayout({ node: createNode(props.selectedComponent) })
          }
        />
      </div>
    );
  }
}

interface NodeProps {
  node: LayoutNode;
  components: AvailableComponents;
  selectedComponent: string | null;
  highlightedNode: string | null;
  updateNode(layout: LayoutNode): void;
}

function LayoutPreviewNode(props: NodeProps) {
  const component = props.components.components[props.node.componentId];

  const componentProps: Record<string, any> = {};

  component.props.forEach(prop => {
    if (prop.type === "elements") {
      // TODO: Remove typecast
      const childNodes = (props.node.props[prop.name] as LayoutNode[]) || [];

      const childElements = childNodes.map((childNode, index) => (
        <LayoutPreviewNode
          key={childNode.id}
          node={childNode}
          components={props.components}
          selectedComponent={props.selectedComponent}
          highlightedNode={props.highlightedNode}
          updateNode={newChild => {
            const newChildren = [...childNodes];
            newChildren[index] = newChild;
            props.updateNode({
              ...props.node,
              props: { ...props.node.props, [prop.name]: newChildren }
            });
          }}
        />
      ));

      childElements.push(
        <AddNode
          onClick={() =>
            props.selectedComponent &&
            props.updateNode({
              ...props.node,
              props: {
                ...props.node.props,
                [prop.name]: [
                  ...((props.node.props[prop.name] as LayoutNode[]) || []),
                  createNode(props.selectedComponent)
                ]
              }
            })
          }
        />
      );

      componentProps[prop.name] = childElements;
    } else {
      componentProps[prop.name] = props.node.props[prop.name];
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
