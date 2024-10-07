import { ReactNode } from "react";

export interface IKeywordInput {
  node: ReactNode;
  value: string | string[];
}

export type TKeywordField = IKeywordInput[];

export interface IFormStateErrors {
  errors: unknown[];
}

export interface IFormStateData {
  title: string;
  url: string;
}

export interface IFormState {
  length: number;
  data?: IFormStateData[];
  errors?: unknown[];
}
