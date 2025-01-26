"use client";
import { useState } from "react";

export default function KeywordInput({ dValue = "" }: { dValue?: string }) {
  const [value, setValue] = useState(dValue);
  const resize = (input: EventTarget & HTMLInputElement) => {
    if (input.scrollWidth > input.clientWidth) {
      input.style.width = `${input.scrollWidth}px`;
    }
  };

  const allowedCharsRegex = /^[a-zA-Z'"-\s#.]*$/;

  return (
    <input
      id="keyword"
      type="text"
      maxLength={15}
      required
      value={value}
      placeholder="keyword"
      onChange={({ currentTarget }) => {
        if (allowedCharsRegex.test(currentTarget.value)) {
          setValue(currentTarget.value);
          resize(currentTarget);
        }
      }}
      className={`h-full w-28 rounded-md bg-field p-1 text-center`}
    />
  );
}
