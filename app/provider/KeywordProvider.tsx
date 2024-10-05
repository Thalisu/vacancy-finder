"use client";
import { ReactNode, useState } from "react";
import keywordContext from "../context/keyword.context";
import SavedKeywordField from "../components/SavedKeywordField";

export default function KeywordProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [keywordInputs, setKeywordInputs] = useState<
    { node: ReactNode; value: string | string[] }[]
  >([]);

  const saveValues = () => {
    setKeywordInputs((prev) => {
      const values = prev.map((p) => {
        return Array.isArray(p.value) ? `(${p.value.join(" ")})` : p.value;
      });
      return [
        {
          node: <SavedKeywordField value={values.join(" ")} />,
          value: prev.map((p) => p.value) as string[],
        },
      ];
    });
  };

  return (
    <keywordContext.Provider
      value={{ keywordInputs, setKeywordInputs, saveValues }}
    >
      {children}
    </keywordContext.Provider>
  );
}
