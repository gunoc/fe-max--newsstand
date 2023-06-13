// import { fetchActionCreator } from "./actions/mediaActions";
import { createHeader } from "./components/Header/Header";
import { createMainContainer } from "./components/Media/MainContainer";
import { createRolling } from "./components/Rolling/RollingContainer";
// import { store } from "./store/store";

async function app(): Promise<void> {
  const $header = createHeader();
  const $rolling = await createRolling();
  const $main = await createMainContainer();
  const root = document.querySelector(".root");
  root?.append($header, $rolling, $main);
}

app();
