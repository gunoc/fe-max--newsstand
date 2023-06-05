const initialDisplayState = {
  isAllPress: true,
  isGrid: true,
  currentPage: 0,
};

const mediaDataState = {
  data: [],
};

const subscriptionState = {
  subscribed: [],
  currentPage: 0,
};

function mediaDisplayReducer(state = initialDisplayState, action) {
  switch (action.type) {
    case "CLICK_ALL_PRESS":
      return {
        ...state,
        isAllPress: true,
      };
    case "CLICK_SUBSCRIPTION":
      return {
        ...state,
        isAllPress: false,
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
        //0일때 3일때는?
        currentPage: state.currentPage - 1,
      };
    case "CLICK_NEXT_BUTTON":
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    default:
      return state;
  }
}

function subscriptionReducer(state = subscriptionState, action) {
  switch (action.type) {
    case "LOAD_SUBSCRIPTION_DATA":
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
}

function mediaDataReducer(state = mediaDataState, action) {
  switch (action.type) {
    case "LOAD_GRID_DATA":
      return {
        ...state,
        data: action.payload,
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
