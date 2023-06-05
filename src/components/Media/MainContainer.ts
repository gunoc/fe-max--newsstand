import { createComponent } from "../../utils/createDOM";
import { navigator } from "./Shared/Navigator";

export function createMainContainer() {
  const $mainContainer = createComponent({
    tagName: "div",
    attributes: { className: "media" },
  });

  // const $navigator = createMainNavigator();
  // const $mediaContainer = createMediaContainer();

  // $mainContainer.append($navigator);

  return $mainContainer;
}
