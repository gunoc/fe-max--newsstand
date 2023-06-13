import { ActionTypes } from "../../constants/constants";
import {
  ActionPropsType,
  DisplayState,
  ImgSrcAltType,
  MediaDataState,
  SubscriptionState,
} from "../../types/types";

const initialDisplayState: DisplayState = {
  isAllPress: true,
  isGrid: true,
  currentPage: 0,
};

const mediaDataState: MediaDataState = {
  data: [],
  listData: [],
};

const subscriptionState: SubscriptionState = {
  subscribedPresses: [],
  pageCount: 0,
  currentItem: 0,
  displayAlert: false,
  removeItem: null,
};

function mediaDisplayReducer(state = initialDisplayState, action: ActionPropsType) {
  switch (action.type) {
    case ActionTypes.CLICK_ALL_PRESS_VIEW:
      return {
        ...state,
        isAllPress: true,
        isGrid: true,
        currentPage: 0,
      };
    case ActionTypes.CLICK_SUBSCRIPTION_VIEW:
      return {
        ...state,
        isAllPress: false,
        isGrid: false,
        currentPage: 0,
      };
    case ActionTypes.CLICK_GRID_VIEW:
      return {
        ...state,
        isGrid: true,
      };
    case ActionTypes.CLICK_LIST_VIEW:
      return {
        ...state,
        isGrid: false,
      };
    case ActionTypes.CLICK_PREV_BUTTON:
      return {
        ...state,
        ...limitPageNavigation(ActionTypes.CLICK_PREV_BUTTON, state),
      };
    case ActionTypes.CLICK_NEXT_BUTTON:
      return {
        ...state,
        ...limitPageNavigation(ActionTypes.CLICK_NEXT_BUTTON, state),
      };
    default:
      return state;
  }
}

function limitPageNavigation(actionType: string, state: DisplayState) {
  if (actionType === ActionTypes.CLICK_PREV_BUTTON) {
    return {
      ...state,
      currentPage: state.currentPage > 0 ? state.currentPage - 1 : state.currentPage,
    };
  } else if (actionType === ActionTypes.CLICK_NEXT_BUTTON) {
    return {
      ...state,
      currentPage: state.currentPage < 3 ? state.currentPage + 1 : state.currentPage,
    };
  }
}

function subscriptionReducer(state = subscriptionState, action: ActionPropsType) {
  switch (action.type) {
    case "LOAD_SUBSCRIPTION_DATA": //추가 예정
      return {
        ...state,
        data: action.payload,
      };
    case ActionTypes.CLICK_ADD_SUBSCRIPTION:
      // 중복이면 원래 state를 반환
      // 중복이 아니면 추가
      if (isDuplicate(state.subscribedPresses, action.payload)) {
        return state;
      }

      const newItemCount = state.currentItem + 1;
      const newPageCount = Math.floor(newItemCount / 25);

      return {
        ...state,
        subscribedPresses: [...state.subscribedPresses, action.payload],
        currentItem: newItemCount,
        pageCount: newPageCount,
      };

    case ActionTypes.DISPLAY_ALERT:
      return {
        ...state,
        displayAlert: true,
        removeItem: action.payload,
      };

    case ActionTypes.HIDE_ALERT:
      return {
        ...state,
        displayAlert: false,
      };

    case ActionTypes.CLICK_REMOVE_SUBSCRIBE:
      const newSubscribedPresses = state.subscribedPresses.filter((press) => {
        if (!action.payload) {
          return true;
        }

        if (Array.isArray(action.payload)) {
          return !action.payload.some((item) => item.alt === press.alt);
        }

        return press.alt !== action.payload.alt;
      });
      const newRemoveItemCount = state.currentItem - 1;
      const newRemovePageCount = Math.floor(newRemoveItemCount / 25);

      return {
        ...state,
        subscribedPresses: newSubscribedPresses,
        currentItem: newRemoveItemCount < 0 ? 0 : newRemoveItemCount,
        pageCount: newRemovePageCount < 0 ? 0 : newRemovePageCount,
      };

    default:
      return state;
  }
}

function isDuplicate(subscribedPresses: ImgSrcAltType[], payload: ImgSrcAltType) {
  return subscribedPresses.some((press) => press.alt === payload.alt);
}

function mediaDataReducer(state = mediaDataState, action: ActionPropsType) {
  switch (action.type) {
    case ActionTypes.LOAD_GRID_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case ActionTypes.LOAD_LIST_DATA:
      return {
        ...state,
        listData: action.payload,
      };

    default:
      return state;
  }
}

function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);

  return function combinedReducer(state = {}, action: ActionPropsType) {
    const nextState: any = {};

    reducerKeys.forEach((key) => {
      const reducer = reducers[key];
      const prevStateForKey = state[key];
      const nextStateForKey = reducer(prevStateForKey, action);
      nextState[key] = nextStateForKey;
    });

    return nextState;
  };
}

export const rootReducer = combineReducers({
  mediaData: mediaDataReducer,
  subscription: subscriptionReducer,
  display: mediaDisplayReducer,
});
