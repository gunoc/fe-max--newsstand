import { ElementProps, ComponentOptions } from "../types/types";

export function createElement({ tagName, attributes = {} }: ElementProps): any {
  const element = document.createElement(tagName);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "className") {
      element.classList.add(value);
    } else {
      (element as any)[key] = value;
    }
  });

  return element;
}

export function createComponent({
  tagName,
  content = null,
  attributes = {},
}: ComponentOptions): HTMLElement {
  const component = createElement({
    tagName,
    attributes,
  });

  if (content) {
    if (typeof content === "string") {
      component.innerHTML = content;
    } else {
      component.append(...content);
    }
  }

  return component;
}
