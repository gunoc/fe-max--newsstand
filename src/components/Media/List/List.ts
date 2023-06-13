import { fetchActionCreator, displayActionCreator } from "../../../actions/mediaActions";
import { Numbers } from "../../../constants/constants";
// import { Numbers } from "../../../constants/constants";
import { store } from "../../../store/store";
import { createComponent, createElement } from "../../../utils/createDOM";

export async function initList() {
  const $list = createList();

  store.subscribe(() => createList(store.getState()));
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

export function createList(state) {
  const $listField = createComponent({
    tagName: "ul",
    attributes: { className: "list__field" },
  });

  if (state) {
    for (let i = 0; i < state.mediaData.listData.length; i++) {
      const fieldCategory = createFieldCategory();
      $listField.append(fieldCategory);
    }
  }

  const $listPress = createComponent({
    tagName: "div",
    content: [],
    attributes: { className: "list__press--news" },
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
  updateListItems($list, state);
}

function updateListItems($list: HTMLElement, state: any) {
  const $listItems = $list.querySelectorAll(".list__field--category");
  const fieldNames = state.mediaData.listData;

  $listItems.forEach((item, index) => {
    const listItem = item.querySelector("li");
    listItem.setAttribute("textContent", fieldNames[index].title);
    // listItem.textContent = fieldNames[index].title;
  });
}

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
