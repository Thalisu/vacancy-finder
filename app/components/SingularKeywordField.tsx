"use client";
import { inter } from "../lib/fonts";
import KeywordInput from "./KeywordInput";

export default function SingularKeywordField() {
  return (
    <div className={`${inter.className} flex flex-wrap items-center gap-2`}>
      <KeywordInput />
    </div>
  );
}
