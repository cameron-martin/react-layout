import { jsx } from "@emotion/core";
import { useDrop } from "react-dnd";

interface Props {
  onDrop(componentId: string): void;
}

export default function AddNode(props: Props) {
  const [collectedProps, drop] = useDrop({
    accept: "gallery-component",
    drop(item: { type: string; id: string }) {
      props.onDrop(item.id);
    },
    collect: monitor => ({ hovering: monitor.isOver() })
  });

  return (
    <div
      css={{
        border: "1px solid #888",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2em",
        backgroundColor: collectedProps.hovering ? "pink" : "transparent"
      }}
      ref={drop}
    >
      +
    </div>
  );
}
