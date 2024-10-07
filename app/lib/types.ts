import { ReactNode } from "react";

export interface IKeywordInput {
  node: ReactNode;
  value: string | string[];
}

export type TKeywordField = IKeywordInput[];
