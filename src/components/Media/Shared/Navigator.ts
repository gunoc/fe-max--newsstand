import { displayActionCreator } from "../../../actions/mediaActions";
import { Numbers } from "../../../constants/constants";
import { store } from "../../../store/store";
import { DisplayState, PageState } from "../../../types/types";
import { createComponent, createElement } from "../../../utils/createDOM";

export function initNavigator() {
  const $mainNavigator = MainNavigator();
  const $pageButtons = PageButtons(store.getState());

  store.subscribe(() => {
    handlePageChange(store.getState());
  });

  $mainNavigator.addEventListener("click", handleViewOption);
  $pageButtons.addEventListener("click", (e) => {
    pageEventHandler(e, store.getState());
  });

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
    attributes: { className: "media__view--text--all", textContent: "전체 언론사" },
  });
  $textButtonAll.classList.add("active");

  const $textButtonSub = createElement({
    tagName: "button",
    attributes: {
      className: "media__view--text--subsciption",
      textContent: "내가 구독한 언론사",
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

function PageButtons(props: any) {
  const { $prevButton, $nextButton } = createPrevNextButtons(props);

  const $buttonBox = createComponent({
    tagName: "div",
    content: [$prevButton, $nextButton],
    attributes: { className: "btn__box" },
  });

  return $buttonBox;
}

function createPrevNextButtons(props: any) {
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

function handlePageChange(state: any) {
  const pageState = {
    currentPage: state.display.currentPage,
    subscribedItemCount: state.subscription.currentItem,
    subscribedPageCount: state.subscription.pageCount,
  };
  const displayState = {
    isAllPress: state.display.isAllPress,
    isGrid: state.display.isGrid,
    currentPage: state.display.currentPage,
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

function updateButtonVisibility(
  selector: string,
  shouldHide: (pageState: PageState, displayState: DisplayState) => boolean,
  pageState: PageState,
  displayState: DisplayState
) {
  const $button = document.querySelector(selector) as HTMLElement;
  const shouldHideButton = shouldHide(pageState, displayState);

  $button.style.display = shouldHideButton ? "none" : "";
}

export function shouldHideNextButton(pageState: PageState, displayState: DisplayState) {
  const { currentPage, subscribedItemCount, subscribedPageCount } = pageState;
  const { isAllPress, isGrid } = displayState;

  if (!isGrid) {
    return;
  }

  if (isAllPress) {
    return currentPage === Numbers.MAX_GRID_PAGE;
  } else {
    return (
      (currentPage === 0 && subscribedItemCount < Numbers.ITEMS_PER_PAGE + 1) ||
      currentPage === subscribedPageCount
    );
  }
}

export function shouldHidePrevButton(pageState: PageState, displayState: DisplayState) {
  const { currentPage } = pageState;
  const { isGrid } = displayState;

  if (!isGrid) {
    return;
  }

  return currentPage === 0;
}

function handleViewOption(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target.nodeName !== "BUTTON") {
    return;
  }

  const targetClassList = target.classList;
  const viewAll = targetClassList.contains("media__view--text--all");
  const viewSubscription = targetClassList.contains("media__view--text--subsciption");
  const viewGrid = targetClassList.contains("media__view--icon--grid");
  const viewList = targetClassList.contains("media__view--icon--list");

  if (viewAll) {
    displayActionCreator.clickAllPressView();
    const nextSibling = target.nextElementSibling;
    if (nextSibling?.nodeName === "BUTTON") {
      setActiveButtonClass(target, nextSibling as HTMLElement);
    }
  }

  if (viewSubscription) {
    displayActionCreator.clickSubscriptionView();
    const previousSibling = target.previousElementSibling;
    if (previousSibling?.nodeName === "BUTTON") {
      setActiveButtonClass(target, previousSibling as HTMLElement);
    }
  }

  if (viewGrid) {
    displayActionCreator.clickGridView();
  }

  if (viewList) {
    displayActionCreator.clickListView();
  }
}

function setActiveButtonClass(activeButton: HTMLElement, inactiveButton: HTMLElement) {
  activeButton.classList.add("active");
  inactiveButton.classList.remove("active");
}

function pageEventHandler(e: MouseEvent, state) {
  const target = e.target as HTMLElement;

  if (target.nodeName !== "BUTTON") {
    return;
  }

  const prev = target.classList.contains("btn__box--prev");
  const next = target.classList.contains("btn__box--next");

  if (state.display.isGrid) {
    if (prev) {
      displayActionCreator.clickPrevButton();
    }

    if (next) {
      displayActionCreator.clickNextButton();
    }
  } else {
    if (prev) {
      displayActionCreator.clickListPrevButton(state);
    }

    if (next) {
      displayActionCreator.clickListNextButton(state);
    }
  }
}
