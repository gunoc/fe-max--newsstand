// import { subscribe } from "../../../store/store";
import { fetchActionCreator } from "../../../actions/mediaActions";
import { store } from "../../../store/store";
import { createComponent } from "../../../utils/createDOM";

export function createGridAll() {
  const $gridContainer = createComponent({
    tagName: "ul",
    attributes: { className: "media__grid--container" },
  });

  const $grid = createComponent({
    tagName: "div",
    attributes: { className: "media__grid" },
  });

  $grid.append($gridContainer);
  return $grid;
}

function updateGridItems(grid, allData) {
  const $gridContainer = grid.querySelector(".media__grid--container");

  const itemArray = [];

  for (let index = 0; index < 24; index++) {
    const pressLogo = allData[index].src;
    const pressName = allData[index].alt;

    const $item = createComponent({
      tagName: "li",
      attributes: { className: "media__grid--item" },
    });
    const $pressLogo = createComponent({
      tagName: "img",
      attributes: { src: pressLogo, alt: pressName },
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
    itemArray.push($item);
  }

  $gridContainer.append(...itemArray);

  // return $gridContainer;
}
// 초기 렌더링
// 버튼을 누르면 이곳이 업데이트 돼야함
function renderGridItems(grid) {
  // const $grid = createGridAll();
  const allData = store.getState().mediaData.data;
  console.log(store.getState());

  updateGridItems(grid, allData);
  // updateGridItems($grid, allData);
}

export async function grid() {
  const $grid = createGridAll();
  store.subscribe(renderGridItems.bind(null, $grid));
  console.log(renderGridItems.bind(null, $grid));

  await fetchActionCreator.fetchGridData();

  console.log($grid);

  return $grid;
}
