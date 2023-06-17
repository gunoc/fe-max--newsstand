export enum ActionTypes {
  LOAD_GRID_DATA = "LOAD_GRID_DATA",
  LOAD_LIST_DATA = "LOAD_LIST_DATA",
  CLICK_ALL_PRESS_VIEW = "CLICK_ALL_PRESS_VIEW",
  CLICK_GRID_VIEW = "CLICK_GRID_VIEW",
  CLICK_SUBSCRIPTION_VIEW = "CLICK_SUBSCRIPTION_VIEW",
  CLICK_LIST_VIEW = "CLICK_LIST_VIEW",
  CLICK_PREV_BUTTON = "CLICK_PREV_BUTTON",
  CLICK_NEXT_BUTTON = "CLICK_NEXT_BUTTON",
  CLICK_ADD_SUBSCRIPTION = "CLICK_ADD_SUBSCRIPTION",
  CLICK_REMOVE_SUBSCRIBE = "CLICK_REMOVE_SUBSCRIBE",
  DISPLAY_ALERT = "DISPLAY_ALERT",
  HIDE_ALERT = "HIDE_ALERT",
  CLICK_LIST_PREV_BUTTON = "CLICK_LIST_PREV_BUTTON",
  CLICK_LIST_NEXT_BUTTON = "CLICK_LIST_NEXT_BUTTON",
}

export enum Numbers {
  ITEMS_PER_PAGE = 24,
  MAX_GRID_PAGE = 3,
}

export enum FetchUrls {
  BASE_URL = "http://localhost:3000",
  GRID_FETCH_URL = "grid",
  LIST_FETCH_URL = "list",
}
