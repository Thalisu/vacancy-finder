import { createContext, Dispatch, ReactNode, SetStateAction } from "react";

const keywordContext = createContext<{
  keywordInputs: { node: ReactNode; value: string | string[] }[];
  setKeywordInputs: Dispatch<
    SetStateAction<
      {
        node: ReactNode;
        value: string | string[];
      }[]
    >
  >;
}>({
  keywordInputs: [],
  setKeywordInputs: () => {},
});

export default keywordContext;
