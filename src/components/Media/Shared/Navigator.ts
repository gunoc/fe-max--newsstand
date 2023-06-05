import { createComponent } from "../../../utils/createDOM";

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

export function navigator() {
  const $mainNavigator = createMainNavigator();
  const $pageButton = createPageButton();

  //이벤트핸들러
  $mainNavigator.addEventListener("click", log);
  $pageButton.addEventListener("click", log);
  //구독
  return [$mainNavigator, $pageButton];
}

function log(e) {
  console.log(e.target);
}
