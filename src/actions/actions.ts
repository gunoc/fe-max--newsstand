// import { createDispatcher } from "../dispatcher/dispatcher";
import { dispatcher } from "../store/rollingStore";

export interface actionCreator {
  // tagName: string;
  // content?: string | Node[] | null;
  // attributes?: Record<string, any>;
}

// const dispatcher = createDispatcher();

export const fetchActionCreator: actionCreator = {};
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
