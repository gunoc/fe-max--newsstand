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
    <span class="media__view--text--active">전체 언론사</span>
    <span>내가 구독한 언론사</span>
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

  store.subscribe(handlePageChange);
  $mainNavigator.addEventListener("click", log);
  $pageButton.addEventListener("click", pageEventHandler);

  return [$mainNavigator, $pageButton];
}

function handlePageChange() {
  const currentPage = store.getState().display.currentPage;
  updateNextButtonVisibility(currentPage);
  updatePrevButtonVisibility(currentPage);
}

function updateNextButtonVisibility(currentPage) {
  const $nextButton = document.querySelector(".btn__box--next");

  if (currentPage === 3) {
    $nextButton.style.display = "none";
  } else {
    $nextButton.style.display = "";
  }
}

function updatePrevButtonVisibility(currentPage) {
  const $prevButton = document.querySelector(".btn__box--prev");

  if (currentPage === 0) {
    $prevButton.style.display = "none";
  } else {
    $prevButton.style.display = "";
  }
}

function log(e) {
  console.log(e.target);
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
