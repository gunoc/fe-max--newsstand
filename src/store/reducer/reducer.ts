const initialDisplayState = {
  isAllPress: true,
  isGrid: true,
  currentPage: 0,
  currentItem: 0, //24개 이상일때늘어나게?
};

const mediaDataState = {
  data: [],
};

const subscriptionState = {
  subscribedPresses: [],
  pageCount: 0,
  currentItem: 0,
};

function mediaDisplayReducer(state = initialDisplayState, action) {
  switch (action.type) {
    case "CLICK_ALL_PRESS_VIEW":
      return {
        ...state,
        isAllPress: true,
        currentPage: 0,
      };
    case "CLICK_SUBSCRIPTION_VIEW":
      return {
        ...state,
        isAllPress: false,
        currentPage: 0,
      };
    case "CLICK_GRID_VIEW":
      return {
        ...state,
        isGrid: true,
      };
    case "CLICK_LIST_VIEW":
      return {
        ...state,
        isGrid: false,
      };
    case "CLICK_PREV_BUTTON":
      return {
        ...state,
        currentPage: state.currentPage > 0 ? state.currentPage - 1 : state.currentPage,
      };
    case "CLICK_NEXT_BUTTON":
      return {
        ...state,
        currentPage: state.currentPage < 3 ? state.currentPage + 1 : state.currentPage,
      };
    default:
      return state;
  }
}

function limitPageNavigation(actionType, state) {
  if (actionType === "CLICK_PREV_BUTTON") {
    return {
      ...state,
      currentPage: state.currentPage > 0 ? state.currentPage - 1 : state.currentPage,
    };
  } else if (actionType === "CLICK_NEXT_BUTTON") {
    return {
      ...state,
      currentPage: state.currentPage < 3 ? state.currentPage + 1 : state.currentPage,
    };
  }
}

function subscriptionReducer(state = subscriptionState, action) {
  switch (action.type) {
    case "LOAD_SUBSCRIPTION_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "CLICK_ADD_SUBSCRIPTION":
      if (isDuplicate(state.subscribedPresses, action.payload)) {
        return state; // 중복이면 원래 state를 반환
      }

      const newItemCount = state.currentItem + 1;
      const newPageCount = Math.floor(newItemCount / 25);

      return {
        ...state,
        subscribedPresses: [...state.subscribedPresses, action.payload], // 중복이 아니면 추가
        currentItem: newItemCount,
        pageCount: newPageCount,
      };

    case "CLICK_REMOVE_SUBSCRIBE":
      const newSubscribedPresses = state.subscribedPresses.filter(
        (press) => press.alt !== action.payload.alt
      );
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

function isDuplicate(subscribedPresses, payload) {
  return subscribedPresses.some((press) => press.alt === payload.alt);
}

function mediaDataReducer(state = mediaDataState, action) {
  switch (action.type) {
    case "LOAD_GRID_DATA":
      return log(state, action);
      return {
        // ...state,
        // data: action.payload,
      };

    default:
      return state;
  }
}

function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);

  return function combinedReducer(state = {}, action) {
    const nextState = {};

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

function log(state, action) {
  console.log(action.payload);
  return {
    ...state,
    data: action.payload,
  };
}
