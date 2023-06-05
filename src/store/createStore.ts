export function createStore(reducer, initialState = {}) {
  let state = initialState;
  let isDispatching = false;
  const listeners = [];

  const dispatch = function (action) {
    if (isDispatching) {
      throw new Error("디스패치중!");
    }
    isDispatching = true;

    try {
      state = reducer(state, action);
      listeners.forEach(function (listener) {
        listener(action);
      });
    } finally {
      isDispatching = false;
    }
  };

  const subscribe = function (listener) {
    listeners.push(listener);
    return function () {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  };

  const getState = function () {
    console.log(state);

    return Object.freeze({ ...state });
  };

  return { subscribe, dispatch, getState };
}
