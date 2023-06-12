import { createHeader } from "./components/Header/Header";
import { createMainContainer } from "./components/Media/MainContainer";
import { createRolling } from "./components/Rolling/RollingContainer";

async function app(): Promise<void> {
  const $header = createHeader();
  const $rolling = await createRolling();
  const $main = await createMainContainer();
  const root = document.querySelector(".root");

  root?.append($header, $rolling, $main);
}

app();
