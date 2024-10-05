"use client";
import { ReactNode, useState } from "react";
import keywordContext from "../context/keyword.context";

export default function KeywordProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [keywordInputs, setKeywordInputs] = useState<
    { node: ReactNode; value: string | string[] }[]
  >([]);

  return (
    <keywordContext.Provider value={{ keywordInputs, setKeywordInputs }}>
      {children}
    </keywordContext.Provider>
  );
}
