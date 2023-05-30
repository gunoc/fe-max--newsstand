import { createHeader } from "./components/Header/header";
import { createRolling } from "./components/Rolling/RollingContainer";

import mock from "../src/data/rolling.json";

(function () {
  console.log(mock);

  const header = createHeader();
  const rolling = createRolling();
  const root = document.querySelector(".root");

  root?.append(header, rolling);
})();
