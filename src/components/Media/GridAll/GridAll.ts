import { fetchActionCreator, displayActionCreator } from "../../../actions/mediaActions";
import { Numbers } from "../../../constants/constants";
import { store } from "../../../store/store";
import { createComponent, createElement } from "../../../utils/createDOM";
import { createList } from "../List/List";

export async function initGrid($list) {
  const $grid = createGrid();
  store.subscribe(() => renderGridItems($grid, store.getState(), $list));

  await fetchActionCreator.fetchGridData();

  $grid.addEventListener("mouseover", (e: MouseEvent) => {
    handleMouseEvents({ event: e, state: store.getState() });
  });
  $grid.addEventListener("mouseout", (e: MouseEvent) => {
    handleMouseEvents({ event: e, state: store.getState() });
  });
  $grid.addEventListener("click", (e: MouseEvent) => {
    handleSubscription({ event: e, state: store.getState() });
  });

  return $grid;
}

function createGrid() {
  const $gridContainer = createElement({
    tagName: "ul",
    attributes: { className: "media__grid--container" },
  });

  for (let i = 0; i < Numbers.ITEMS_PER_PAGE; i++) {
    const gridItem = createGridItem();
    $gridContainer.append(gridItem);
  }

  const $grid = createComponent({
    tagName: "div",
    content: [$gridContainer],
    attributes: { className: "media__grid" },
  });

  return $grid;
}

function createGridItem() {
  const $pressLogo = createElement({
    tagName: "img",
    attributes: { src: "", alt: "" },
  });

  const $buttonLayer = createSubscriptionButton();

  const $item = createComponent({
    tagName: "li",
    content: [$pressLogo, $buttonLayer],
    attributes: { className: "media__grid--item" },
  });

  return $item;
}

function createSubscriptionButton() {
  const $buttonAdd = createComponent({
    tagName: "div",
    content: createButtonContent(),
    attributes: { className: "button__add" },
  });

  const $buttonLayer = createComponent({
    tagName: "div",
    content: [$buttonAdd],
    attributes: { className: "button__add--container" },
  });

  $buttonLayer.classList.add("hide");

  return $buttonLayer;
}

function createButtonContent() {
  const $img = createElement({
    tagName: "img",
    attributes: { src: "./src/images/add-button.png", alt: "추가" },
  });

  const $span = createElement({
    tagName: "span",
  });

  return [$img, $span];
}

function renderGridItems($grid: HTMLElement, state: any, $list: HTMLElement) {
  const allData = state.mediaData.data;
  const subscribedPressesData = state.subscription.subscribedPresses;

  const pageIndex = state.display.currentPage;
  const startIndex = pageIndex * Numbers.ITEMS_PER_PAGE;
  const endIndex = startIndex + Numbers.ITEMS_PER_PAGE;

  const currentPageData = allData.slice(startIndex, endIndex);
  const currentPageSubscribedData = subscribedPressesData.slice(startIndex, endIndex);

  if (state.display.isAllPress && state.display.isGrid) {
    console.log("그리드고 전체언론사");
    $list.style.display = "none";
    $grid.style.display = "grid";
    updateGridItems($grid, currentPageData);
  } else if (!state.display.isAllPress && state.display.isGrid) {
    console.log("그리드고 구독한거");
    $list.style.display = "none";
    $grid.style.display = "grid";
    updateGridItems($grid, currentPageSubscribedData);
  } else if (!state.display.isAllPress && !state.display.isGrid) {
    console.log("리스트고 구독한거");
    $list.style.display = "";
    $grid.style.display = "none";
  } else if (state.display.isAllPress && !state.display.isGrid) {
    console.log("리스트고 전체언론사");
    $list.style.display = "";
    $grid.style.display = "none";
  }
}

function updateGridItems($grid: HTMLElement, pageData: any) {
  const $gridItems = $grid.querySelectorAll(".media__grid--item");

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
    if (state.display.isAllPress) {
      return;
    } else {
      displayActionCreator.displayAlert(payload);
    }
    // displayActionCreator.clickRemoveSubscribe(payload);
  } else {
    if (!state.display.isAllPress) {
      return;
    } else {
      displayActionCreator.clickAddSubscription(payload);
    }
  }

  console.log(store.getState());
}
