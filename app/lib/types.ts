import { ReactNode } from "react";

export interface IKeywordInput {
  node: ReactNode;
  value: string | string[];
  saved?: boolean;
}

export type TKeywordField = IKeywordInput[];

export interface IFormStateErrors {
  errors: unknown[];
}

export interface IFormStateData {
  title: string;
  url: string;
  enterprise: string;
  img: string;
}

export interface IFormState {
  length: number;
  jobs: IFormStateData[][];
  errors: unknown[];
  loading: boolean;
}
