"use client";
import { inter } from "../lib/fonts";
import KeywordInput from "./KeywordInput";

export default function SingularKeywordField({
  value,
  handleValueChange,
}: {
  value: string;
  handleValueChange: (
    newValue: string | string[],
  ) => void;
}) {

  const handleChange = (newValue: string) => {
    handleValueChange(newValue);
  };
  return (
    <div className={`${inter.className} flex flex-wrap items-center gap-2`}>
      <KeywordInput value={value} handleChange={handleChange} />
    </div>
  );
}
