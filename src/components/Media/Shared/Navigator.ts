import { displayActionCreator } from "../../../actions/mediaActions";
import { store } from "../../../store/store";
import { createComponent } from "../../../utils/createDOM";

// 초기 렌더링시에 0이면 왼쪽 버튼 나오면 안됨
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
  const currentPage = state.display.currentPage;
  const subscribedItemCount = state.subscription.currentItem;
  const subscribedPageCount = state.subscription.pageCount;
  const isAllPress = state.display.isAllPress;
  const isGrid = state.display.isGrid;

  updateNextButtonVisibility(
    currentPage,
    subscribedItemCount,
    isAllPress,
    isGrid,
    subscribedPageCount
  );
  updatePrevButtonVisibility(currentPage, subscribedItemCount, isAllPress, isGrid);
}

function updateNextButtonVisibility(
  currentPage,
  subscribedItemCount,
  isAllPress,
  isGrid,
  subscribedPageCount
) {
  const $nextButton = document.querySelector(".btn__box--next");
  console.log(currentPage, subscribedItemCount);

  if (isAllPress) {
    if (currentPage === 3) {
      $nextButton.style.display = "none";
    } else {
      $nextButton.style.display = "";
    }
  } else {
    if (
      (currentPage === 0 && subscribedItemCount < 25) ||
      currentPage === subscribedPageCount
    ) {
      $nextButton.style.display = "none";
    } else {
      $nextButton.style.display = "";
    }
  }
}

function updatePrevButtonVisibility(
  currentPage,
  subscribedItemCount,
  isAllPress,
  isGrid
) {
  const $prevButton = document.querySelector(".btn__box--prev");

  if (isAllPress) {
    if (currentPage === 0) {
      $prevButton.style.display = "none";
    } else {
      $prevButton.style.display = "";
    }
  } else {
    // 구독모드일때
    if (currentPage === 0) {
      $prevButton.style.display = "none";
    } else {
      $prevButton.style.display = "";
    }
  }
}

function handleViewOption(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }
  const viewAll = e.target.classList.contains("media__view--text--all");
  const viewSubscription = e.target.classList.contains("media__view--text--subsciption");
  const viewGrid = e.target.classList.contains("media__view--icon--grid");
  const viewList = e.target.classList.contains("media__view--icon--list");

  if (viewAll) {
    displayActionCreator.clickAllPressView();
    e.target.classList.add("active");
    e.target.nextElementSibling.classList.remove("active");
  }
  if (viewSubscription) {
    displayActionCreator.clickSubscriptionView();
    e.target.classList.add("active");
    e.target.previousElementSibling.classList.remove("active");
  }
}

function pageEventHandler(e) {
  const prev = e.target.classList.contains("btn__box--prev");
  const next = e.target.classList.contains("btn__box--next");

  if (e.target.nodeName !== "BUTTON") {
    return;
  }
  if (prev) {
    displayActionCreator.clickPrevButton();
  }
  if (next) {
    displayActionCreator.clickNextButton();
  }
}
