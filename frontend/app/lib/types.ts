import { ReactNode } from "react";

export interface IKeywordInput {
  node: ReactNode;
  value: string | string[];
  saved?: boolean;
}

export type TSearchField = {
  index: number;
  field: React.ReactNode;
  isSaved: boolean;
};

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
  jobs: IFormStateData[];
  errors: unknown[];
  loading: boolean;
}

export interface IJobsData {
  time: string;
  remote: string;
  location: string;
}
