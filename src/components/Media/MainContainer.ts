import { createComponent } from "../../utils/createDOM";
import { initAlert } from "./GridAll/Alert";
import { grid } from "./GridAll/GridAll";
import { initNavigator } from "./Shared/Navigator";

export async function createMainContainer() {
  const $mainContainer = createComponent({
    tagName: "main",
    attributes: { className: "media" },
  });

  const $grid = await grid();
  const $navigator = initNavigator();
  const $alert = initAlert();

  $mainContainer.append(...$navigator, $grid, $alert);

  return $mainContainer;
}
