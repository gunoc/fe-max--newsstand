import { displayActionCreator } from "../../../actions/mediaActions";
import { store } from "../../../store/store";
import { createComponent } from "../../../utils/createDOM";

function createMainNavigator() {
  const $mediaViewText = createComponent({
    tagName: "div",
    attributes: { className: "media__view--text" },
  });

  $mediaViewText.innerHTML = `
    <button type="button" class="media__view--text--all active">전체 언론사</button>
    <button type="button" class="media__view--text--subsciption">내가 구독한 언론사</button>
  `;

  const $mediaViewIcon = createComponent({
    tagName: "div",
    attributes: { className: "media__view--icon" },
  });

  $mediaViewIcon.innerHTML = `
    <button type="button" class="media__view--icon--list" title="리스트"></button>
    <button type="button" class="media__view--icon--grid" title="그리드"></button>
  `;

  const $mainNavigator = createComponent({
    tagName: "div",
    content: [$mediaViewText, $mediaViewIcon],
    attributes: { className: "media__view" },
  });

  return $mainNavigator;
}

function createPageButton() {
  const $prevButton = createComponent({
    tagName: "button",
    attributes: { className: "btn__box--prev" },
  });

  const currentPage = store.getState().display.currentPage;

  if (currentPage === 0) {
    $prevButton.style.display = "none";
  }

  const $nextButton = createComponent({
    tagName: "button",
    attributes: { className: "btn__box--next" },
  });

  const $buttonBox = createComponent({
    tagName: "div",
    content: [$prevButton, $nextButton],
    attributes: { className: "btn__box" },
  });

  return $buttonBox;
}

export function initNavigator() {
  const $mainNavigator = createMainNavigator();
  const $pageButton = createPageButton();

  store.subscribe(() => {
    handlePageChange(store.getState());
  });

  $mainNavigator.addEventListener("click", handleViewOption);
  $pageButton.addEventListener("click", pageEventHandler);

  return [$mainNavigator, $pageButton];
}

function handlePageChange(state) {
  const pageState = {
    currentPage: state.display.currentPage,
    subscribedItemCount: state.subscription.currentItem,
    subscribedPageCount: state.subscription.pageCount,
  };
  const displayState = {
    isAllPress: state.display.isAllPress,
    isGrid: state.display.isGrid,
  };

  updateButtonVisibility(
    ".btn__box--next",
    shouldHideNextButton,
    pageState,
    displayState
  );
  updateButtonVisibility(
    ".btn__box--prev",
    shouldHidePrevButton,
    pageState,
    displayState
  );
}

function shouldHideNextButton(pageState, displayState) {
  const { currentPage, subscribedItemCount, subscribedPageCount } = pageState;
  const { isAllPress } = displayState;

  if (isAllPress) {
    return currentPage === 3;
  } else {
    return (
      (currentPage === 0 && subscribedItemCount < 25) ||
      currentPage === subscribedPageCount
    );
  }
}

function shouldHidePrevButton(pageState, displayState) {
  const { currentPage } = pageState;
  const { isAllPress } = displayState;

  return currentPage === 0;
}

function updateButtonVisibility(selector, shouldHide, pageState, displayState) {
  const $button = document.querySelector(selector);
  const shouldHideButton = shouldHide(pageState, displayState);

  $button.style.display = shouldHideButton ? "none" : "";
}
function handleViewOption(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }
  const targetClassList = e.target.classList;
  const viewAll = targetClassList.contains("media__view--text--all");
  const viewSubscription = targetClassList.contains("media__view--text--subsciption");
  const viewGrid = targetClassList.contains("media__view--icon--grid");
  const viewList = targetClassList.contains("media__view--icon--list");

  if (viewAll) {
    displayActionCreator.clickAllPressView();
    setActiveButtonState(e.target, e.target.nextElementSibling);
  }
  if (viewSubscription) {
    displayActionCreator.clickSubscriptionView();
    setActiveButtonState(e.target, e.target.previousElementSibling);
  }
}

function setActiveButtonState(activeButton, inactiveButton) {
  activeButton.classList.add("active");
  inactiveButton.classList.remove("active");
}

function pageEventHandler(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }

  const prev = e.target.classList.contains("btn__box--prev");
  const next = e.target.classList.contains("btn__box--next");

  if (prev) {
    displayActionCreator.clickPrevButton();
  }
  if (next) {
    displayActionCreator.clickNextButton();
  }
}
