"use client";
import { useState } from "react";
import { inter } from "../lib/fonts";

export default function KeywordInput({ dValue = "" }: { dValue?: string }) {
  const [value, setValue] = useState(dValue);
  const resize = (input: EventTarget & HTMLInputElement) => {
    if (input.scrollWidth > input.clientWidth) {
      input.style.width = `${input.scrollWidth}px`;
    }
  };

  return (
    <input
      id="keyword"
      type="text"
      maxLength={15}
      required
      value={value}
      placeholder="keyword"
      onChange={({ currentTarget }) => {
        setValue(currentTarget.value);
        resize(currentTarget);
      }}
      className={`${inter.className} h-full w-28 rounded-md bg-field p-1 text-center`}
    />
  );
}
