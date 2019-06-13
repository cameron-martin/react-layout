import React from "react";
import { jsx } from "@emotion/core";

interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
}

export default function TwoColumn(props: Props) {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "1" }}>{props.left}</div>
      <div style={{ flex: "1" }}>{props.right}</div>
    </div>
  );
}
