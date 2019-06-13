import { useState } from "react";
import { jsx } from "@emotion/core";
import { AvailableComponents } from "./available-components";
import { Layout } from "./layout";
import Gallery from "./LayoutBuilder/Gallery";
import Tree from "./LayoutBuilder/Tree";
import LayoutPreview from "./LayoutBuilder/LayoutPreview";

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
