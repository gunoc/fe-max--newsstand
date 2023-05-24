import { ElementProps } from "../types/types";

export function createElement({ tagName, attributes }: ElementProps): any {
  const element = document.createElement(tagName);

  Object.entries(attributes || {}).forEach(([key, value]) => {
    key === "className" ? element.classList.add(value) : ((element as any)[key] = value);
  });

  return element;
}
