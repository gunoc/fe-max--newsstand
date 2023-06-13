import { ActionTypes, FetchUrls } from "../constants/constants";
import { store } from "../store/store";
import { shuffleArray } from "../utils/shuffleArray";

export const fetchActionCreator = {
  async fetchGridData() {
    const response = await fetch(`${FetchUrls.BASE_URL}/${FetchUrls.GRID_FETCH_URL}`);
    const data = await response.json();
    const shuffledData = shuffleArray(data);
    store.dispatch({ type: ActionTypes.LOAD_GRID_DATA, payload: shuffledData });
  },

  async fetchListData() {
    const response = await fetch(`${FetchUrls.BASE_URL}/${FetchUrls.LIST_FETCH_URL}`);
    const data = await response.json();
    store.dispatch({ type: ActionTypes.LOAD_LIST_DATA, payload: data });
  },
};

export const displayActionCreator = {
  clickAllPressView() {
    store.dispatch({ type: ActionTypes.CLICK_ALL_PRESS_VIEW });
  },

  clickSubscriptionView() {
    store.dispatch({ type: ActionTypes.CLICK_SUBSCRIPTION_VIEW });
  },

  clickGridView() {
    store.dispatch({ type: ActionTypes.CLICK_GRID_VIEW });
  },

  clickListView() {
    store.dispatch({ type: ActionTypes.CLICK_LIST_VIEW });
  },

  clickPrevButton() {
    store.dispatch({ type: ActionTypes.CLICK_PREV_BUTTON });
  },

  clickNextButton() {
    store.dispatch({ type: ActionTypes.CLICK_NEXT_BUTTON });
  },

  clickAddSubscription(payload: any) {
    store.dispatch({ type: ActionTypes.CLICK_ADD_SUBSCRIPTION, payload });
  },

  clickRemoveSubscribe(payload: any) {
    store.dispatch({ type: ActionTypes.CLICK_REMOVE_SUBSCRIBE, payload });
  },

  displayAlert(payload: any) {
    store.dispatch({ type: ActionTypes.DISPLAY_ALERT, payload });
  },

  hideAlert() {
    store.dispatch({ type: ActionTypes.HIDE_ALERT });
  },
};
