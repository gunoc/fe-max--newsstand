import { dispatcher } from "../store/rollingStore";

// 액션 타입 상수화 하기

export interface actionCreator {}

export const fetchActionCreator = {
  async fetchRollingData() {
    const response = await fetch("http://localhost:3000/rolling");
    const data = await response.json();

    dispatcher.dispatch({ type: "LOAD_ROLLING_DATA", payload: data });
  },
};
export const viewActionCreator = {
  startLeftInterval() {
    dispatcher.dispatch({ type: "START_LEFT_INTERVAL" });
  },
  stopLeftInterval() {
    dispatcher.dispatch({ type: "STOP_LEFT_INTERVAL" });
  },
  startRightInterval() {
    dispatcher.dispatch({ type: "START_RIGHT_INTERVAL" });
  },
  stopRightInterval() {
    dispatcher.dispatch({ type: "STOP_RIGHT_INTERVAL" });
  },
  increaseLeftIndex() {
    dispatcher.dispatch({ type: "LEFT_INDEX" });
  },
  increaseRightIndex() {
    dispatcher.dispatch({ type: "RIGHT_INDEX" });
  },
};

console.log(viewActionCreator);
