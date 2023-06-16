import { fetchActionCreator, displayActionCreator } from "../../../actions/mediaActions";
import { Numbers } from "../../../constants/constants";
// import { Numbers } from "../../../constants/constants";
import { store } from "../../../store/store";
import { createComponent, createElement } from "../../../utils/createDOM";

export async function initList() {
  const $list = createList();

  // store.subscribe(() => createList(store.getState()));
  store.subscribe(() => renderListItems($list, store.getState()));

  await fetchActionCreator.fetchListData();

  // $list.addEventListener("mouseover", (e: MouseEvent) => {
  //   handleMouseEvents({ event: e, state: store.getState() });
  // });
  // $list.addEventListener("mouseout", (e: MouseEvent) => {
  //   handleMouseEvents({ event: e, state: store.getState() });
  // });
  // $list.addEventListener("click", (e: MouseEvent) => {
  //   handleSubscription({ event: e, state: store.getState() });
  // });

  return $list;
}

export function createList() {
  const $listField = createComponent({
    tagName: "ul",
    attributes: { className: "list__field" },
  });

  for (let i = 0; i < 7; i++) {
    const fieldCategory = createFieldCategory();
    $listField.append(fieldCategory);
  }

  const $pressLogo = createElement({
    tagName: "img",
    attributes: { src: "", alt: "로고", className: "press-logo" },
  });

  const $pressEditTime = createElement({
    tagName: "div",
    attributes: { className: "press-edit-time" },
  }); //editTime이라 +편집 textContent들어가야함

  const $subscriptionAddButton = createElement({
    tagName: "img",
    attributes: { src: "./src/images/add-button.png", alt: "구독" },
  });

  const $subscriptionAddText = createElement({
    tagName: "span",
    attributes: { className: "list-subscription-button", textContent: "구독하기" },
  });

  const $buttonAddListView = createComponent({
    tagName: "div",
    content: [$subscriptionAddButton, $subscriptionAddText],
    attributes: { className: "button__add-list-view" },
  });

  const $listPressInfo = createComponent({
    tagName: "div",
    content: [$pressLogo, $pressEditTime, $buttonAddListView],
    attributes: { className: "list__press--info" },
  });

  const $mainThumbnail = createElement({
    tagName: "div",
    attributes: { className: "list__press--news--main-thumbnail" },
  }); //background img
  $mainThumbnail.style.background =
    "url(./src/images/Thumbnail-all.png) no-repeat center / cover";
  const $mainTitle = createElement({
    tagName: "span",
    attributes: { className: "list__press--news--main-title" },
  }); //textContent

  const $listNewsMain = createComponent({
    tagName: "div",
    content: [$mainThumbnail, $mainTitle],
    attributes: { className: "list__press--news--main" },
  });

  const $listSub = createComponent({
    tagName: "ul",
    attributes: { className: "list__press--news--sub" },
  });

  for (let i = 0; i < 7; i++) {
    const $subTitle = createElement({
      tagName: "li",
      attributes: { className: "list__press--news--sub-title" },
    });
    $subTitle.style.zIndex = "10";
    $listSub.append($subTitle);
  }

  const $listPressNews = createComponent({
    tagName: "div",
    content: [$listNewsMain, $listSub],
    attributes: { className: "list__press--news" },
  });

  const $listPress = createComponent({
    tagName: "div",
    content: [$listPressInfo, $listPressNews],
    attributes: { className: "list__press" },
  });

  const $listContainer = createComponent({
    tagName: "div",
    content: [$listField, $listPress],
    attributes: { className: "media__list" },
  });

  return $listContainer;
}

function renderListItems($list, state) {
  //랜덤한 언론사

  updateCategoryItems($list, state);
  // updateCategoryIndex($list, state);
  updateListItems($list, state);
}

function updateCategoryItems($list: HTMLElement, state: any) {
  const $categoryItems = $list.querySelectorAll(".list__field--category");

  const fieldNames = state.mediaData.listData;

  $categoryItems.forEach((item, index) => {
    const categoryText = item.querySelector("span");
    categoryText.textContent = fieldNames[index].title;
  });
}

function updateListItems($list: HTMLElement, state: any) {
  const logo = $list.querySelector(".press-logo") as HTMLElement;
  const editTime = $list.querySelector(".press-edit-time") as HTMLElement;
  const thumbnail = $list.querySelector(
    ".list__press--news--main-thumbnail"
  ) as HTMLElement;
  const mainTitle = $list.querySelector(".list__press--news--main-title") as HTMLElement;
  const subTitle = $list.querySelectorAll(".list__press--news--sub-title");

  const currentIndex = state.listPageState.currentIndex;
  const categoryIndex = state.listPageState.categoryIndex;
  const listData = state.mediaData.listData;

  logo.setAttribute("src", listData[categoryIndex].pressList[currentIndex].pressLogoSrc);
  logo.setAttribute("alt", listData[categoryIndex].pressList[currentIndex].pressLogoAlt);

  editTime.textContent = listData[categoryIndex].pressList[currentIndex].lastEditted;

  thumbnail.style.background = `url('${listData[categoryIndex].pressList[currentIndex].mainArticle.thumbnailSrc}') no-repeat center / cover`;

  mainTitle.textContent =
    listData[categoryIndex].pressList[currentIndex].mainArticle.mainArticleTitle;

  subTitle.forEach((title, index) => {
    title.textContent =
      listData[categoryIndex].pressList[currentIndex].subArticles[index];
  });

  subTitle[
    subTitle.length - 1
  ].textContent = `${listData[categoryIndex].pressList[currentIndex].pressLogoAlt}에서 직접 편집한 뉴스입니다`;

  subTitle[subTitle.length - 1].classList.add("caption");
}

function createListItem() {}

function createFieldCategory() {
  const $pressCategory = createElement({
    tagName: "span",
    attributes: { textContent: "", className: "list__field--category--name" },
  });

  const $categoryCount = createElement({
    tagName: "span",
    attributes: { className: "list__field--category--count", textContent: "" },
  });

  $categoryCount.style.display = "none";

  const $category = createComponent({
    tagName: "li",
    content: [$pressCategory, $categoryCount],
    attributes: { className: "list__field--category" },
  });

  return $category;
}
