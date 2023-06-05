import { store } from "../store/store";

export const fetchActionCreator = {
  async fetchGridData() {
    const response = await fetch("http://localhost:3000/grid");
    const data = await response.json();
    console.log(data);

    store.dispatch({ type: "LOAD_GRID_DATA", payload: data });
  },
};

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

  clickAddSubscription() {
    store.dispatch({ type: "CLICK_ADD_SUBSCRIPTION" });
  },
  clickUnsubscribe() {
    store.dispatch({ type: "CLICK_UNSUBSCRIBE" });
  },
};
