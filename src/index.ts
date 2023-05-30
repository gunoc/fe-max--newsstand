import { createHeader } from "./components/Header/Header";
import { createRolling } from "./components/Rolling/RollingContainer";

async function app() {
  const header = createHeader();
  const rolling = await createRolling();
  const root = document.querySelector(".root");

  root?.append(header, rolling);
}
app();
