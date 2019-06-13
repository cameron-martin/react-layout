import { jsx } from "@emotion/core";

interface Props {
  onClick(): void;
}

export default function AddNode(props: Props) {
  return (
    <div
      css={{
        border: "1px solid #888",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2em",
        height: "fill-available"
      }}
      onClick={props.onClick}
    >
      +
    </div>
  );
}
