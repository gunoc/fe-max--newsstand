// 롤링 배너 스토어와 합쳐서 store는 하나만 두기

import { createStore } from "./createStore";
import { rootReducer } from "./reducer/reducer";

export const store = createStore(rootReducer);

// export const { dispatch, subscribe, getState } = store;
