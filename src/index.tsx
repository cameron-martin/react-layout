import React, { useState } from "react";
import ReactDOM from "react-dom";
import LayoutBuilder from "./LayoutBuilder";
import { AvailableComponents } from "./available-components";
import TwoColumn from "./examples/TwoColumn";
import { Layout } from "./layout";
import LorumIpsum from "./examples/LorumIpsum";

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
    }
  }
};

const App = () => {
  const [layout, setLayout] = useState<Layout>({});

  return (
    <LayoutBuilder
      components={components}
      layout={layout}
      updateLayout={setLayout}
    />
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
