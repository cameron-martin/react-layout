import {
  AvailableComponents,
  AvailableComponent
} from "../available-components";
import { jsx } from "@emotion/core";
import { useDrag } from "react-dnd";

interface Props {
  components: AvailableComponents;
}

export default function Gallery(props: Props) {
  return (
    <ul>
      {Object.values(props.components.components).map(component => (
        <GalleryItem key={component.id} component={component} />
      ))}
    </ul>
  );
}

interface ItemProps {
  component: AvailableComponent;
}

function GalleryItem(props: ItemProps) {
  const [collectedProps, drag] = useDrag({
    item: { type: 'gallery-component', id: props.component.id }
  });

  return <li ref={drag}>{props.component.id}</li>;
}
