import { AvailableComponents } from "../available-components";
import { jsx } from "@emotion/core";

interface Props {
  setSelectedComponent(id: string): void;
  selectedComponent: string | null;
  components: AvailableComponents;
}

export default function Gallery(props: Props) {
  return (
    <ul>
      {Object.values(props.components.components).map(component => (
        <li>
          <input
            type="radio"
            name="gallery"
            id={`gallery-${component.id}`}
            checked={props.selectedComponent === component.id}
            onChange={() => props.setSelectedComponent(component.id)}
          />
          <label htmlFor={`gallery-${component.id}`}>{component.id}</label>
        </li>
      ))}
    </ul>
  );
}
