export type ElementProps = {
  tagName: string;
  attributes?: Record<string, any>;
};

export interface ComponentOptions {
  tagName: string;
  content?: string | Node[] | null;
  attributes?: Record<string, any>;
}
