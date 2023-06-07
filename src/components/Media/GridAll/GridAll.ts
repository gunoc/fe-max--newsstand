import { fetchActionCreator } from "../../../actions/mediaActions";
import { store } from "../../../store/store";
import { createComponent } from "../../../utils/createDOM";

export function createGridAll() {
  const $gridContainer = createComponent({
    tagName: "ul",
    attributes: { className: "media__grid--container" },
  });

  for (let i = 0; i < 24; i++) {
    const $item = createComponent({
      tagName: "li",
      attributes: { className: "media__grid--item" },
    });
    const $pressLogo = createComponent({
      tagName: "img",
      attributes: { src: "", alt: "" },
    });
    const $buttonLayer = createComponent({
      tagName: "div",
      attributes: { className: "button__add--container" },
    });
    $buttonLayer.innerHTML = `
    <div class="button__add">
      <img src="./src/images/add-button.png" alt="추가" />
      <span>구독하기</span>
    </div>
    `;
    $item.append($pressLogo, $buttonLayer);
    $gridContainer.append($item);
  }

  const $grid = createComponent({
    tagName: "div",
    attributes: { className: "media__grid" },
  });

  $grid.append($gridContainer);
  return $grid;
}

function updateGridItems(grid, currentPageData) {
  const $gridItems = grid.querySelectorAll(".media__grid--item");

  $gridItems.forEach((item, index) => {
    const img = item.querySelector("img");
    img.setAttribute("src", currentPageData[index].src);
    img.setAttribute("alt", currentPageData[index].alt);
  });
}

function renderGridItems($grid) {
  const allData = store.getState().mediaData.data;
  const pageIndex = store.getState().display.currentPage;
  const itemsPerPage = 24;
  const startIndex = pageIndex * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentPageData = allData.slice(startIndex, endIndex);

  updateGridItems($grid, currentPageData);
}

export async function grid() {
  const $grid = createGridAll();
  store.subscribe(renderGridItems.bind(null, $grid));

  await fetchActionCreator.fetchGridData();
  $grid.addEventListener("mouseover", log);
  return $grid;
}

function log(e) {
  console.log(e.target);
}
