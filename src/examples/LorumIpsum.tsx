import { jsx } from "@emotion/core";

interface Props {
  style?: React.CSSProperties;
}

export default function LorumIpsum(props: Props) {
  return <div style={props.style}>Lorum Ipsum</div>;
}
