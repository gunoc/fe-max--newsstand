import { createComponent } from "../../utils/createDOM";
import { grid } from "./GridAll/GridAll";
import { initNavigator } from "./Shared/Navigator";

export async function createMainContainer() {
  const $mainContainer = createComponent({
    tagName: "div",
    attributes: { className: "media" },
  });

  const $grid = await grid();
  const $navigator = initNavigator();

  $mainContainer.append(...$navigator, $grid);

  return $mainContainer;
}
