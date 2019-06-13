import { jsx } from "@emotion/core";

interface Props {
  style?: React.CSSProperties;
}

export default function Button(props: Props) {
  return (
    <div style={props.style}>
      <button>Button</button>
    </div>
  );
}
