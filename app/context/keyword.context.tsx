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
  saveValues: () => void;
}>({
  keywordInputs: [],
  setKeywordInputs: () => {},
  saveValues: () => {},
});

export default keywordContext;
