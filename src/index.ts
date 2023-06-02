import { createHeader } from "./components/Header/Header";
import { createMainContainer } from "./components/Media/MainContainer";
import { navigator } from "./components/Media/Shared/Navigator";
import { createRolling } from "./components/Rolling/RollingContainer";

async function app() {
  const $header = createHeader();
  const $rolling = await createRolling();
  const $main = createMainContainer();
  const $navigator = navigator();
  const root = document.querySelector(".root");

  root?.append($header, $rolling, $main, ...$navigator);
}
app();
