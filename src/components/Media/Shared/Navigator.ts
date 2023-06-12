import { displayActionCreator } from "../../../actions/mediaActions";
import { store } from "../../../store/store";
import { createComponent, createElement } from "../../../utils/createDOM";

export function initNavigator() {
  const $mainNavigator = MainNavigator();
  const $pageButtons = PageButtons(store.getState());

  store.subscribe(() => {
    handlePageChange(store.getState());
  });

  $mainNavigator.addEventListener("click", handleViewOption);
  $pageButtons.addEventListener("click", pageEventHandler);

  return [$mainNavigator, $pageButtons];
}

function MainNavigator() {
  const $mediaViewTexts = createMediaViewTexts();
  const $mediaViewIcons = createMediaViewIcons();

  const $mainNavigator = createComponent({
    tagName: "div",
    content: [$mediaViewTexts, $mediaViewIcons],
    attributes: { className: "media__view" },
  });

  return $mainNavigator;
}

function createMediaViewTexts() {
  const $textButtonAll = createElement({
    tagName: "button",
    attributes: { className: "media__view--text--all", innerHTML: "전체 언론사" },
  });
  $textButtonAll.classList.add("active");

  const $textButtonSub = createElement({
    tagName: "button",
    attributes: {
      className: "media__view--text--subsciption",
      innerHTML: "내가 구독한 언론사",
    },
  });

  const $mediaViewTexts = createComponent({
    tagName: "div",
    content: [$textButtonAll, $textButtonSub],
    attributes: { className: "media__view--text" },
  });

  return $mediaViewTexts;
}

function createMediaViewIcons() {
  const $iconButtonList = createElement({
    tagName: "button",
    attributes: { className: "media__view--icon--list", title: "리스트" },
  });
  const $iconButtonGrid = createElement({
    tagName: "button",
    attributes: { className: "media__view--icon--grid", title: "그리드" },
  });

  const $mediaViewIcons = createComponent({
    tagName: "div",
    content: [$iconButtonList, $iconButtonGrid],
    attributes: { className: "media__view--icon" },
  });

  return $mediaViewIcons;
}

function PageButtons(props) {
  const { $prevButton, $nextButton } = createPrevNextButtons(props);

  const $buttonBox = createComponent({
    tagName: "div",
    content: [$prevButton, $nextButton],
    attributes: { className: "btn__box" },
  });

  return $buttonBox;
}

function createPrevNextButtons(props) {
  const $prevButton = createElement({
    tagName: "button",
    attributes: {
      className: "btn__box--prev",
    },
  });

  const $nextButton = createElement({
    tagName: "button",
    attributes: {
      className: "btn__box--next",
    },
  });

  const currentPage = props.display.currentPage;

  if (currentPage === 0) {
    $prevButton.style.display = "none";
  }

  return { $prevButton, $nextButton };
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

function updateButtonVisibility(selector, shouldHide, pageState, displayState) {
  const $button = document.querySelector(selector);
  const shouldHideButton = shouldHide(pageState, displayState);

  $button.style.display = shouldHideButton ? "none" : "";
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
  console.log(currentPage);

  return currentPage === 0;
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
    setActiveButtonClass(e.target, e.target.nextElementSibling);
  }
  if (viewSubscription) {
    displayActionCreator.clickSubscriptionView();
    setActiveButtonClass(e.target, e.target.previousElementSibling);
  }
}

function setActiveButtonClass(activeButton, inactiveButton) {
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
