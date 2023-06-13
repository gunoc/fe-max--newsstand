import { shouldHideNextButton } from "../src/components/Media/Shared/tr";
import { Numbers } from "../src/constants/constants";

interface MockPageState {
  currentPage: number;
  subscribedItemCount: number;
  subscribedPageCount: number;
}
interface MockDisplayState {
  isAllPress: boolean;
  isGrid: boolean;
  currentPage: number;
}

describe("shouldHideNextButton 함수", () => {
  const pageStateMock: MockPageState = {
    currentPage: 1,
    subscribedItemCount: 10,
    subscribedPageCount: 5,
  };

  const displayStateMock: MockDisplayState = {
    currentPage: 1,
    isAllPress: false,
    isGrid: false,
  };

  describe("isGrid이 false인 경우", () => {
    test("undefined를 반환해야 함", () => {
      const result = shouldHideNextButton(pageStateMock, displayStateMock);
      expect(result).toBeUndefined();
    });
  });

  describe("isGrid이 true인 경우", () => {
    describe("isAllPress가 true이며 currentPage가 최대인 경우", () => {
      test("true를 반환해야 함", () => {
        const pageState = { ...pageStateMock, currentPage: Numbers.MAX_GRID_PAGE };
        const displayState = { ...displayStateMock, isAllPress: true, isGrid: true };
        const result = shouldHideNextButton(pageState, displayState);
        expect(result).toBe(true);
      });
    });

    describe("isAllPress가 true이며 currentPage가 최대가 아닌 경우", () => {
      test("false를 반환해야 함", () => {
        const pageState = { ...pageStateMock, currentPage: Numbers.MAX_GRID_PAGE - 1 };
        const displayState = { ...displayStateMock, isAllPress: true, isGrid: true };
        const result = shouldHideNextButton(pageState, displayState);
        expect(result).toBe(false);
      });
    });

    describe("isAllPress가 false인 경우", () => {
      describe("currentPage가 0이고 subscribedItemCount가 ITEMS_PER_PAGE + 1보다 작은 경우", () => {
        test("true를 반환해야 함", () => {
          const pageState = {
            ...pageStateMock,
            currentPage: 0,
            subscribedItemCount: Numbers.ITEMS_PER_PAGE,
          };
          const displayState = { ...displayStateMock, isAllPress: false, isGrid: true };
          const result = shouldHideNextButton(pageState, displayState);
          expect(result).toBe(true);
        });
      });

      describe("currentPage가 최대가 아니고 subscribedItemCount가 ITEMS_PER_PAGE + 1보다 큰 경우", () => {
        test("false를 반환해야 함", () => {
          const pageState = {
            ...pageStateMock,
            currentPage: Numbers.MAX_GRID_PAGE - 1,
            subscribedItemCount: Numbers.ITEMS_PER_PAGE + 2,
          };
          const displayState = { ...displayStateMock, isAllPress: false, isGrid: true };
          const result = shouldHideNextButton(pageState, displayState);
          expect(result).toBe(false);
        });
      });
    });
  });
});
