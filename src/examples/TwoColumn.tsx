import React from "react";
import { jsx } from "@emotion/core";

interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
  style?: React.CSSProperties;
}

export default function TwoColumn(props: Props) {
  return (
    <div css={{ display: "flex" }} style={props.style}>
      <div css={{ flex: "1" }}>{props.left}</div>
      <div css={{ flex: "1" }}>{props.right}</div>
    </div>
  );
}
