import { createComponent } from "../../utils/createDOM";
import { initAlert } from "./GridAll/Alert";
import { initGrid } from "./GridAll/GridAll";
import { initNavigator } from "./Shared/Navigator";
import { initList } from "./List/List";

export async function createMainContainer() {
  const $mainContainer = createComponent({
    tagName: "main",
    attributes: { className: "media" },
  });

  const $list = await initList();
  const $grid = await initGrid($list);
  const $navigator = initNavigator();
  const $alert = initAlert();

  $mainContainer.append(...$navigator, $list, $grid, $alert);

  return $mainContainer;
}
