import { useState } from "react";
import ReactDOM from "react-dom";
import { jsx } from "@emotion/core";
import LayoutBuilder from "./LayoutBuilder";
import { AvailableComponents } from "./available-components";
import { Layout, emptyLayout } from "./layout";
import TwoColumn from "./examples/TwoColumn";
import LorumIpsum from "./examples/LorumIpsum";
import Button from "./examples/Button";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

const components: AvailableComponents = {
  components: {
    "two-column": {
      componentType: TwoColumn,
      id: "two-column",
      props: [
        { type: "elements", name: "left" },
        { type: "elements", name: "right" }
      ]
    },
    "lorum-ipsum": {
      componentType: LorumIpsum,
      id: "lorum-ipsum",
      props: []
    },
    button: {
      componentType: Button,
      id: "button",
      props: [{ type: "string", name: "label" }]
    }
  }
};

const App = () => {
  const [layout, setLayout] = useState<Layout>(emptyLayout);

  return (
    <LayoutBuilder
      components={components}
      layout={layout}
      updateLayout={setLayout}
    />
  );
};

ReactDOM.render(
  <DragDropContextProvider backend={HTML5Backend}>
    <App />
  </DragDropContextProvider>,
  document.getElementById("app")
);
