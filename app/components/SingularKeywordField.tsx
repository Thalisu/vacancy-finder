"use client";
import { ReactNode, useContext } from "react";
import { inter } from "../lib/fonts";
import KeywordInput from "./KeywordInput";
import keywordContext from "../context/keyword.context";

export default function SingularKeywordField({
  value,
  handleValueChange,
}: {
  value: string;
  handleValueChange: (
    newValue: string | string[],
    keywordInputs: {
      node: ReactNode;
      value: string | string[];
    }[],
  ) => void;
}) {
  const { keywordInputs: keywordContextInputs } = useContext(keywordContext);

  const handleChange = (newValue: string) => {
    handleValueChange(newValue, keywordContextInputs);
  };
  return (
    <div className={`${inter.className} flex flex-wrap items-center gap-2`}>
      <KeywordInput value={value} handleChange={handleChange} />
    </div>
  );
}
