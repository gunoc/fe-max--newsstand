import { displayActionCreator } from "../../../actions/mediaActions";
import { store } from "../../../store/store";
import { createComponent } from "../../../utils/createDOM";

function createButton({ className, innerHTML, title }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.innerHTML = innerHTML || "";
  button.title = title || "";
  return button;
}

function MainNavigator() {
  const textButtonAll = createButton({
    className: "media__view--text--all active",
    innerHTML: "전체 언론사",
  });
  const textButtonSub = createButton({
    className: "media__view--text--subsciption",
    innerHTML: "내가 구독한 언론사",
  });

  const mediaViewText = document.createElement("div");
  mediaViewText.className = "media__view--text";
  mediaViewText.appendChild(textButtonAll);
  mediaViewText.appendChild(textButtonSub);

  const iconButtonList = createButton({
    className: "media__view--icon--list",
    title: "리스트",
  });
  const iconButtonGrid = createButton({
    className: "media__view--icon--grid",
    title: "그리드",
  });

  const mediaViewIcon = document.createElement("div");
  mediaViewIcon.className = "media__view--icon";
  mediaViewIcon.appendChild(iconButtonList);
  mediaViewIcon.appendChild(iconButtonGrid);

  const mainNavigator = document.createElement("div");
  mainNavigator.className = "media__view";
  mainNavigator.appendChild(mediaViewText);
  mainNavigator.appendChild(mediaViewIcon);

  return mainNavigator;
}

function PageButton(props) {
  const $prevButton = createButton({
    className: "btn__box--prev",
  });
  const $nextButton = createButton({
    className: "btn__box--next",
  });

  const currentPage = props.display.currentPage;

  if (currentPage === 0) {
    $prevButton.style.display = "none";
  }

  const $buttonBox = document.createElement("div");
  $buttonBox.className = "btn__box";
  $buttonBox.appendChild($prevButton);
  $buttonBox.appendChild($nextButton);

  return $buttonBox;
}

export function initNavigator() {
  const $mainNavigator = MainNavigator();
  const $pageButton = PageButton(store.getState());

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
  console.log(currentPage);

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
