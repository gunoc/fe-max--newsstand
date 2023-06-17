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
      const newState = reducer(state, action);
      if (JSON.stringify(state) !== JSON.stringify(newState)) {
        state = newState;
        listeners.forEach(function (listener) {
          listener(action);
        });
      }
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

  const getState = function (): object {
    return Object.freeze({ ...state });
  };

  return { subscribe, dispatch, getState };
}
