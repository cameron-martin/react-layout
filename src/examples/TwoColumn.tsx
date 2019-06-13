import React from "react";
import { jsx } from "@emotion/core";

interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
}

export default function TwoColumn(props: Props) {
  return (
    <div css={{ display: "flex" }}>
      <div css={{ flex: "1" }}>{props.left}</div>
      <div css={{ flex: "1" }}>{props.right}</div>
    </div>
  );
}
