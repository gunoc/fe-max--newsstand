import { createComponent } from "../../utils/createDOM";
import { grid } from "./GridAll/GridAll";
import { navigator } from "./Shared/Navigator";

export async function createMainContainer() {
  const $mainContainer = createComponent({
    tagName: "div",
    attributes: { className: "media" },
  });

  // const $mediaContainer = createMediaContainer();
  const $grid = await grid();
  const $navigator = navigator();

  $mainContainer.append(...$navigator, $grid);

  return $mainContainer;
}
