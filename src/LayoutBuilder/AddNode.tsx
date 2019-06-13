import React from "react";

interface Props {
  onClick(): void;
}

export default function AddNode(props: Props) {
  return (
    <div
      style={{
        border: "1px solid #888",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2em",
        height: "-webkit-fill-available"
      }}
      onClick={props.onClick}
    >
      +
    </div>
  );
}
