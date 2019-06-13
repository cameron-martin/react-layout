import { useState } from "react";
import { AvailableComponents } from "./available-components";
import { Layout, LayoutNode, createNode } from "./layout";
import AddNode from "./LayoutBuilder/AddNode";
import Gallery from "./LayoutBuilder/Gallery";
import Tree from "./LayoutBuilder/Tree";
import { jsx } from "@emotion/core";

interface Props {
  components: AvailableComponents;
  layout: Layout;
  updateLayout(layout: Layout): void;
}

export default function LayoutBuilder(props: Props) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );

  const [highlightedNode, setHighlightedNode] = useState<string | null>(null);

  return (
    <div css={{ display: "flex" }}>
      <div
        css={{
          flex: "0 0 auto",
          width: 300,
          overflow: "auto",
          borderRight: "1px solid black"
        }}
      >
        <Tree
          layout={props.layout}
          highlightedNode={highlightedNode}
          setHighlightedNode={setHighlightedNode}
        />
      </div>
      <div css={{ flex: "1 1 0" }}>
        <LayoutPreview
          highlightedNode={highlightedNode}
          selectedComponent={selectedComponent}
          layout={props.layout}
          components={props.components}
          updateLayout={props.updateLayout}
        />
      </div>
      <div css={{ flex: "0 0 auto", borderLeft: "1px solid black" }}>
        <Gallery
          setSelectedComponent={setSelectedComponent}
          components={props.components}
          selectedComponent={selectedComponent}
        />
      </div>
    </div>
  );
}

interface PreviewProps {
  layout: Layout;
  components: AvailableComponents;
  selectedComponent: string | null;
  highlightedNode: string | null;
  updateLayout(layout: Layout): void;
}

function LayoutPreview(props: PreviewProps) {
  if (props.layout.node) {
    return (
      <LayoutNodeView
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

function LayoutNodeView(props: NodeProps) {
  const component = props.components.components[props.node.componentId];

  const componentProps: Record<string, any> = {};

  component.props.forEach(prop => {
    if (prop.type === "elements") {
      // TODO: Remove typecast
      const childNodes = (props.node.props[prop.name] as LayoutNode[]) || [];

      const childElements =
        childNodes.length === 0 ? (
          <AddNode
            onClick={() =>
              props.selectedComponent &&
              props.updateNode({
                ...props.node,
                props: {
                  ...props.node.props,
                  [prop.name]: [createNode(props.selectedComponent)]
                }
              })
            }
          />
        ) : (
          childNodes.map((childNode, index) => (
            <LayoutNodeView
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
          ))
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
