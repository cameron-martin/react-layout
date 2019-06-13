import { AvailableComponent } from "../available-components";
import { LayoutNode } from "../layout";
import { jsx } from "@emotion/core";

interface Props {
  component: AvailableComponent;
  node: LayoutNode;
  updateNode(node: LayoutNode): void;
}

export default function EditProps(props: Props) {
  return (
    <div>
      {props.component.props.map(prop => {
        // TODO: Fix typing of this
        const setProp = (type: "string" | "number", value: string | number) =>
          props.updateNode({
            ...props.node,
            props: {
              ...props.node.props,
              [prop.name]: {
                type,
                value
              } as any
            }
          });

        const nodeProp = props.node.props[prop.name];

        if (prop.type === "string") {
          if (nodeProp && nodeProp.type !== "string") {
            throw new Error("Incorrect prop type");
          }

          return (
            <div key={prop.name}>
              <label htmlFor={`properties-${prop.name}`}>{prop.name}</label>
              <input
                type="string"
                id={`properties-${prop.name}`}
                onChange={event => setProp("string", event.target.value)}
                value={nodeProp ? nodeProp.value : ""}
              />
            </div>
          );
        } else if (prop.type === "number") {
          if (nodeProp && nodeProp.type !== "number") {
            throw new Error("Incorrect prop type");
          }

          return (
            <div key={prop.name}>
              <label htmlFor={`properties-${prop.name}`}>{prop.name}</label>
              <input
                type="number"
                id={`properties-${prop.name}`}
                onChange={event =>
                  setProp("number", parseFloat(event.target.value))
                }
                value={nodeProp ? nodeProp.value : ""}
              />
            </div>
          );
        }
      })}
    </div>
  );
}
