import { useState } from "react";
import { jsx } from "@emotion/core";
import { AvailableComponents } from "./available-components";
import { Layout, updateNode } from "./layout";
import Gallery from "./LayoutBuilder/Gallery";
import Tree from "./LayoutBuilder/Tree";
import LayoutPreview from "./LayoutBuilder/LayoutPreview";
import EditProps from "./LayoutBuilder/EditProps";

interface Props {
  components: AvailableComponents;
  layout: Layout;
  updateLayout(layout: Layout): void;
}

export default function LayoutBuilder(props: Props) {
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(
    null
  );

  const highlightedNode =
    highlightedNodeId != null ? props.layout.nodes[highlightedNodeId] : null;

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
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            height: "fill-available"
          }}
        >
          <div css={{ flex: "1" }}>
            <Tree
              layout={props.layout}
              highlightedNodeId={highlightedNodeId}
              setHighlightedNodeId={setHighlightedNodeId}
            />
          </div>
          {highlightedNode && (
            <div css={{ flex: "1", borderTop: "1px solid black" }}>
              <EditProps
                component={
                  props.components.components[highlightedNode.componentId]
                }
                node={highlightedNode}
                updateNode={node =>
                  props.updateLayout(updateNode(props.layout, node))
                }
              />
            </div>
          )}
        </div>
      </div>
      <div css={{ flex: "1 1 0" }}>
        <LayoutPreview
          highlightedNodeId={highlightedNodeId}
          layout={props.layout}
          components={props.components}
          updateLayout={props.updateLayout}
        />
      </div>
      <div css={{ flex: "0 0 auto", borderLeft: "1px solid black" }}>
        <Gallery
          components={props.components}
        />
      </div>
    </div>
  );
}
