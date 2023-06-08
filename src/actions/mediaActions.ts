import { store } from "../store/store";

export const fetchActionCreator = {
  async fetchGridData() {
    const response = await fetch("http://localhost:3000/grid");
    const data = await response.json();
    const shuffledData = shuffleArray(data);
    store.dispatch({ type: "LOAD_GRID_DATA", payload: shuffledData });
  },
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const displayActionCreator = {
  clickAllPressView() {
    store.dispatch({ type: "CLICK_ALL_PRESS_VIEW" });
  },

  clickSubscriptionView() {
    store.dispatch({ type: "CLICK_SUBSCRIPTION_VIEW" });
  },

  clickGridView() {
    store.dispatch({ type: "CLICK_GRID_VIEW" });
  },

  clickListView() {
    store.dispatch({ type: "CLICK_LIST_VIEW" });
  },

  clickPrevButton() {
    store.dispatch({ type: "CLICK_PREV_BUTTON" });
  },

  clickNextButton() {
    store.dispatch({ type: "CLICK_NEXT_BUTTON" });
  },

  clickAddSubscription(payload) {
    store.dispatch({ type: "CLICK_ADD_SUBSCRIPTION", payload });
  },

  clickRemoveSubscribe(payload) {
    store.dispatch({ type: "CLICK_REMOVE_SUBSCRIBE", payload });
  },
};
