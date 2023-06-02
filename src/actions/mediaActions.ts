import { dispatch } from "../store/store";

export const fetchActionCreator = {
  async fetchGridData() {
    const response = await fetch("http://localhost:3000/grid");
    const data = await response.json();

    dispatch({ type: "LOAD_GRID_DATA", payload: data });
  },
};

export const displayActionCreator = {
  clickAllPressView() {
    dispatch({ type: "CLICK_ALL_PRESS_VIEW" });
  },
  clickSubscriptionView() {
    dispatch({ type: "CLICK_SUBSCRIPTION_VIEW" });
  },
  clickGridView() {
    dispatch({ type: "CLICK_GRID_VIEW" });
  },
  clickListView() {
    dispatch({ type: "CLICK_LIST_VIEW" });
  },
  clickPrevButton() {
    dispatch({ type: "CLICK_PREV_BUTTON" });
  },
  clickNextButton() {
    dispatch({ type: "CLICK_NEXT_BUTTON" });
  },

  clickAddSubscription() {
    dispatch({ type: "CLICK_ADD_SUBSCRIPTION" });
  },
  clickUnsubscribe() {
    dispatch({ type: "CLICK_UNSUBSCRIBE" });
  },
};
