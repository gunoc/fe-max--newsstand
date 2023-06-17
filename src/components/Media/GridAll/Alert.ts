import { displayActionCreator } from "../../../actions/mediaActions";
import { store } from "../../../store/store";
import { createComponent, createElement } from "../../../utils/createDOM";

function createAlert() {
  const $alertText = createAlertText();
  const $alertButton = createAlertButton();

  const $alert = createComponent({
    tagName: "div",
    content: [$alertText, $alertButton],
    attributes: { className: "alert" },
  });

  $alert.classList.add("hide");

  return $alert;
}

function createAlertText() {
  const pressNameSpan = createElement({
    tagName: "span",
    attributes: { className: "press-name" },
  });

  const alertMessageSpan = createElement({
    tagName: "span",
    attributes: { textContent: "구독해지 하시겠습니까?" },
  });

  return createComponent({
    tagName: "div",
    content: [pressNameSpan, alertMessageSpan],
    attributes: { className: "alert__text" },
  });
}

function createAlertButton() {
  const $yesButton = createElement({
    tagName: "button",
    attributes: {
      type: "button",
      textContent: "예, 해지합니다",
    },
  });
  $yesButton.setAttribute("data-type", "yes");

  const $noButton = createElement({
    tagName: "button",
    attributes: { type: "button", textContent: "아니오" },
  });
  $noButton.setAttribute("data-type", "no");

  return createComponent({
    tagName: "div",
    content: [$yesButton, $noButton],
    attributes: { className: "alert__button" },
  });
}

function handleDisplayAlert($alert, state) {
  if (!state.subscription.displayAlert) {
    $alert.classList.add("hide");
  } else {
    $alert.classList.remove("hide");
  }
}

function updatePressName($alert, state) {
  const $pressName = $alert.querySelector(".press-name");

  if (state.subscription.displayAlert) {
    $pressName.textContent = state.subscription.removeItem.alt + "을(를)";
  }
}

export function initAlert() {
  let $alert = createAlert();

  store.subscribe(() => handleDisplayAlert($alert, store.getState()));
  store.subscribe(() => updatePressName($alert, store.getState()));

  $alert.addEventListener("click", (e: MouseEvent) => {
    handleAlert({ event: e, state: store.getState() });
  });

  return $alert;
}

function handleAlert({ event, state }) {
  const buttonType = event.target.dataset.type;
  const payload = state.subscription.removeItem;

  if (buttonType === "no") {
    displayActionCreator.hideAlert();
  } else {
    displayActionCreator.clickRemoveSubscribe(payload);
    displayActionCreator.hideAlert();
  }
}
