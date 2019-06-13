import { useState } from "react";
import ReactDOM from "react-dom";
import { jsx } from "@emotion/core";
import LayoutBuilder from "./LayoutBuilder";
import { AvailableComponents } from "./available-components";
import { Layout } from "./layout";
import TwoColumn from "./examples/TwoColumn";
import LorumIpsum from "./examples/LorumIpsum";
import Button from "./examples/Button";

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
