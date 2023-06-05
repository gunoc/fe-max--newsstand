// import rollData from "../../../server/data/rolling.json";
import { createComponent } from "../../utils/createDOM";
import { viewActionCreator, fetchActionCreator } from "../../actions/actions";
import {
  getLeftIndexState,
  getLeftIntervalState,
  getRightIndexState,
  getRightIntervalState,
  getRollDataState,
} from "../../store/rollingStore";

let leftInterval;
let rightInterval;

export async function createRolling() {
  await fetchActionCreator.fetchRollingData();

  // subscribe

  const rollLeft = createRollElement("left");
  const rollRight = createRollElement("right");

  const rollingContainer = createComponent({
    tagName: "div",
    content: [rollLeft, rollRight],
    attributes: { className: "rolling" },
  });

  initInterval(rollLeft, rollRight);
  initEventHandler(rollLeft, rollRight);

  return rollingContainer;
}

function createRollElement(direction: string) {
  const pressName = createPressName();
  const titleListContainer = createTitleListContainer(direction);

  const rollingSection = createComponent({
    tagName: "div",
    content: [pressName, titleListContainer],
    attributes: { className: `rolling__section--${direction}` },
  });

  rollingSection.classList.add("rolling__section");

  return rollingSection;
}

function createPressName() {
  return createComponent({
    tagName: "a",
    content: "연합뉴스",
    attributes: { className: "rolling__press" },
  });
}

function createTitleListContainer(direction: string) {
  const titleList = createTitleList(direction);
  titleList[0].style.transform = "translateY(0)";
  return createComponent({
    tagName: "ul",
    content: titleList,
  });
}

function createTitleList(direction: string) {
  const rollData = getRollDataState();

  if (direction === "left") {
    const leftData = rollData.leftRollData;
    return createTitleListArr(leftData);
  } else if (direction === "right") {
    const rightData = rollData.rightRollData;
    return createTitleListArr(rightData);
  }
}

function createTitleListArr(directionData) {
  const titleListArr = directionData.map((data, i) => {
    const li = createComponent({
      tagName: "li",
      content: data.title,
      attributes: { className: "rolling__title" },
    });
    li.dataset.roll = i;

    return li;
  });

  return titleListArr;
}

function initInterval(rollLeft, rollRight) {
  leftInterval = setInterval(() => {
    viewActionCreator.increaseLeftIndex();
    rollAnimation(rollLeft, getLeftIndexState());
  }, 5000);

  setTimeout(() => {
    rightInterval = setInterval(() => {
      viewActionCreator.increaseRightIndex();
      rollAnimation(rollRight, getRightIndexState());
    }, 5000);
  }, 1000);
}

function rollAnimation(element, index) {
  let prevElement = element.querySelectorAll("li")[index - 1];
  const currentElement = element.querySelectorAll("li")[index];
  let nextElement = element.querySelectorAll("li")[index + 1];

  if (prevElement === undefined) {
    prevElement = element.querySelectorAll("li")[4];
  }
  if (nextElement === undefined) {
    nextElement = element.querySelectorAll("li")[0];
  }
  currentElement.style.transform = "none";
  currentElement.style.transition = "transform 0.5s ease";

  nextElement.style.transform = "translateY(37px)";
  nextElement.style.transition = "none";

  prevElement.style.transform = "translateY(-37px)";
  prevElement.style.transition = "transform 0.5s ease";
}

function initEventHandler(rollLeft, rollRight) {
  rollLeft.addEventListener("mouseenter", () => {
    console.log("왼쪽호버중");
    viewActionCreator.stopLeftInterval();
    leftIntervalState(rollLeft);
  });
  rollLeft.addEventListener("mouseleave", () => {
    console.log("왼쪽나감");
    viewActionCreator.startLeftInterval();
    leftIntervalState(rollLeft);
  });
  rollRight.addEventListener("mouseenter", () => {
    console.log("오른쪽호버중");
    viewActionCreator.stopRightInterval();
    rightIntervalState(rollRight);
  });
  rollRight.addEventListener("mouseleave", () => {
    console.log("오른쪽나감");
    viewActionCreator.startRightInterval();
    rightIntervalState(rollRight);
  });
}

function leftIntervalState(rollLeft) {
  const intervalState = getLeftIntervalState();
  if (intervalState) {
    leftInterval = setInterval(() => {
      viewActionCreator.increaseLeftIndex();
      rollAnimation(rollLeft, getLeftIndexState());
    }, 5000);
  } else if (!intervalState) {
    clearInterval(leftInterval);
  }
}

function rightIntervalState(rollRight) {
  const intervalState = getRightIntervalState();
  if (intervalState) {
    rightInterval = setInterval(() => {
      viewActionCreator.increaseRightIndex();
      rollAnimation(rollRight, getRightIndexState());
    }, 5000);
  } else if (!intervalState) {
    clearInterval(rightInterval);
  }
}
