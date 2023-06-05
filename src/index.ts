import { createHeader } from "./components/Header/Header";
import { grid } from "./components/Media/GridAll/GridAll";
import { createMainContainer } from "./components/Media/MainContainer";
import { navigator } from "./components/Media/Shared/Navigator";
import { createRolling } from "./components/Rolling/RollingContainer";
import { store } from "./store/store";

async function app() {
  const $header = createHeader();
  const $rolling = await createRolling();
  const $main = createMainContainer();
  const $navigator = navigator();
  const $grid = await grid();
  const root = document.querySelector(".root");

  console.log(store);

  root?.append($header, $rolling, $main, ...$navigator, $grid);
}
app();
