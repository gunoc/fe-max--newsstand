import { displayActionCreator } from "../../../actions/mediaActions";
import { store } from "../../../store/store";
import { createComponent } from "../../../utils/createDOM";

function createAlert() {
  const $alertText = createComponent({
    tagName: "div",
    attributes: { className: "alert__text" },
  });

  $alertText.innerHTML = `
    <span class="press-name"></span>
    <span>구독해지하시겠습니까?</span>
  `;
  const $alertButton = createComponent({
    tagName: "div",
    attributes: { className: "alert__button" },
  });

  $alertButton.innerHTML = `
    <button type="button" data-type="yes">예, 해지합니다</button>
    <button type="button" data-type="no">아니오</button>
  `;

  const $alert = createComponent({
    tagName: "div",
    content: [$alertText, $alertButton],
    attributes: { className: "alert" },
  });

  $alert.classList.add("hide");
  return $alert;
}

function handleDisplayAlert(alert, state) {
  if (!state.subscription.displayAlert) {
    alert.classList.add("hide");
  } else {
    alert.classList.remove("hide");
  }
}

function updatePressName(alertBox, state) {
  const $pressName = alertBox.querySelector(".press-name");

  if (state.subscription.displayAlert) {
    $pressName.textContent = state.subscription.removeItem.alt + "을(를)";
  }
}

export function initAlert() {
  let $alert = createAlert();

  store.subscribe(() => handleDisplayAlert($alert, store.getState()));
  store.subscribe(() => updatePressName($alert, store.getState()));

  $alert.addEventListener("click", (e) => {
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
