import { createHeader } from "./components/Header/header";

(function () {
  const header = createHeader();
  const root = document.querySelector(".root");
  root?.insertAdjacentElement("afterbegin", header);
})();
