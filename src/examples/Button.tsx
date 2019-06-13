import { jsx } from "@emotion/core";

interface Props {
  style?: React.CSSProperties;
  label?: string;
}

export default function Button(props: Props) {
  return (
    <div style={props.style}>
      <button>{props.label}</button>
    </div>
  );
}
