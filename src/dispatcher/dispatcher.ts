export function createDispatcher() {
  let isDispatching = false;
  const listeners = [];

  const dispatch = function (action) {
    if (isDispatching) {
      throw new Error("디스패치중!");
    }
    isDispatching = true;

    try {
      listeners.forEach(function (listener) {
        listener(action); //상태 변경
      });
    } finally {
      isDispatching = false;
    }
  };

  const register = function (listener) {
    listeners.push(listener);
    return function () {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  };

  return { dispatch, register };
}
