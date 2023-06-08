import { fetchActionCreator, displayActionCreator } from "../../../actions/mediaActions";
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

    $buttonLayer.classList.add("hide");

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

function updateGridItems(grid, pageData) {
  const $gridItems = grid.querySelectorAll(".media__grid--item");

  $gridItems.forEach((item, index) => {
    const img = item.querySelector("img");
    if (index < pageData.length) {
      img.setAttribute("src", pageData[index].src);
      img.setAttribute("alt", pageData[index].alt);
    } else {
      img.setAttribute("src", "");
      img.setAttribute("alt", "");
    }
  });
}

function renderGridItems($grid, state) {
  const allData = state.mediaData.data;
  const subscribedPressesData = state.subscription.subscribedPresses;

  const pageIndex = state.display.currentPage;
  const itemsPerPage = 24;
  const startIndex = pageIndex * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentPageData = allData.slice(startIndex, endIndex);
  const currentPageSubscribedData = subscribedPressesData.slice(startIndex, endIndex);

  if (state.display.isAllPress) {
    updateGridItems($grid, currentPageData);
  } else {
    updateGridItems($grid, currentPageSubscribedData);
  }
}

export async function grid() {
  const $grid = createGridAll();
  store.subscribe(() => renderGridItems($grid, store.getState()));

  await fetchActionCreator.fetchGridData();

  $grid.addEventListener("mouseover", (e) => {
    handleMouseEvents({ event: e, state: store.getState() });
  });
  $grid.addEventListener("mouseout", (e) => {
    handleMouseEvents({ event: e, state: store.getState() });
  });
  $grid.addEventListener("click", (e) => {
    handleSubscription({ event: e, state: store.getState() });
  });

  return $grid;
}

function handleMouseEvents({ event, state }) {
  const $logoImg = event.target.closest("li").querySelector("img");
  const $item = event.target.closest("li");
  const isDuplicated = state.subscription.subscribedPresses.some(
    (press) => press.alt === $logoImg.alt
  );

  if (!$logoImg.alt) {
    $item.querySelector(".button__add--container").classList.add("hide");
    return;
  }

  if (event.type === "mouseover") {
    $item.querySelector(".button__add--container").classList.remove("hide");
  } else if (event.type === "mouseout") {
    $item.querySelector(".button__add--container").classList.add("hide");
  }

  if (isDuplicated) {
    $item.querySelector("span").textContent = "해지하기";
  } else {
    $item.querySelector("span").textContent = "구독하기";
  }
}

function handleSubscription({ event, state }) {
  const src = event.target.closest("li").querySelector("img").src;
  const alt = event.target.closest("li").querySelector("img").alt;

  const payload = { src, alt };

  const isDuplicated = state.subscription.subscribedPresses.some(
    (press) => press.alt === alt
  );

  if (isDuplicated) {
    displayActionCreator.clickRemoveSubscribe(payload);
  } else {
    displayActionCreator.clickAddSubscription(payload);
  }

  console.log(store.getState());
}
