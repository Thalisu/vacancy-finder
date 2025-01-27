import { ReactNode } from "react";

export interface IKeywordInput {
  node: ReactNode;
  value: string | string[];
  saved?: boolean;
}

export interface IJobsData {
  time: string;
  remote: string;
  location: string;
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

export type IResponseError = {
  status_code: number;
  message: string;
} | null;

export interface IJob {
  title: string;
  url: string;
  enterprise: string;
  img: string;
  state: string;
  location: string;
}

export interface IJobResponse {
  keywords: string;
  error: IResponseError;
  jobs: IJob[];
}

export interface ITask {
  response: IJobResponse[] | null;
  error: IResponseError;
}

export interface IGetJobResponse {
  task_result: ITask;
  task_status: string;
}

export interface IJobConfig {
  keywords: string;
  timeframe: string;
  remote: string;
  location: string;
}

export interface ILinkedinTaskData {
  task_id: string;
  search: IJobConfig[];
}

export interface IFormState {
  data: ILinkedinTaskData | null;
  id_ready: boolean;
}
