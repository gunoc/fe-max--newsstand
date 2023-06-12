export type ElementProps = {
  tagName: string;
  attributes?: Record<string, any>;
};

export interface ComponentOptions {
  tagName: string;
  content?: string | Node[] | null;
  attributes?: Record<string, any>;
}

export type ActionPropsType = {
  type: String;
  payload?: ImgSrcAltType | ImgSrcAltType[];
};

export type ImgSrcAltType = {
  src: string;
  alt: string;
};

export interface DisplayState {
  isAllPress: boolean;
  isGrid: boolean;
  currentPage: number;
}

export interface MediaDataState {
  data: ImgSrcAltType[];
}

export interface SubscriptionState {
  subscribedPresses: ImgSrcAltType[];
  pageCount: number;
  currentItem: number;
  displayAlert: boolean;
  removeItem: null | ImgSrcAltType;
}
