import { createDispatcher } from "../dispatcher/dispatcher";

const dispatcher = createDispatcher();

const rollingState = {
  leftInterval: true,
  rightInterval: true,
  leftIndex: 0,
  rightIndex: 0,
  rollData: null,
};

const setIntervalListener = dispatcher.register(function (action) {
  switch (action.type) {
    case "LOAD_ROLLING_DATA":
      rollingState.rollData = action.payload;
      break;
    case "START_LEFT_INTERVAL":
      rollingState.leftInterval = true;
      break;
    case "STOP_LEFT_INTERVAL":
      rollingState.leftInterval = false;
      break;
    case "START_RIGHT_INTERVAL":
      rollingState.rightInterval = true;
      break;
    case "STOP_RIGHT_INTERVAL":
      rollingState.rightInterval = false;
      break;
    case "LEFT_INDEX":
      changeLeftIndex();
      break;
    case "RIGHT_INDEX":
      changeRightIndex();
      break;

    default:
      break;
  }
});

export function getLeftIntervalState(): boolean {
  return rollingState.leftInterval;
}
export function getRightIntervalState(): boolean {
  return rollingState.rightInterval;
}
export function getLeftIndexState(): number {
  return rollingState.leftIndex;
}
export function getRightIndexState(): number {
  return rollingState.rightIndex;
}
export function getRollDataState() {
  return rollingState.rollData;
}

function changeLeftIndex() {
  rollingState.leftIndex += 1;
  if (rollingState.leftIndex === 5) {
    rollingState.leftIndex = 0;
  }
}

function changeRightIndex() {
  rollingState.rightIndex += 1;
  if (rollingState.rightIndex === 5) {
    rollingState.rightIndex = 0;
  }
}

export { dispatcher };
