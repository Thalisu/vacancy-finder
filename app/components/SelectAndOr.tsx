"use client";
import { useState } from "react";
import { inter } from "../lib/fonts";

type TValue = "AND" | "OR" | "NOT";

export default function SelectAndOr() {
  const [value, setValue] = useState<TValue>("AND");
  return (
    <select
      id="keyword"
      name="andOr"
      className={`${inter.className} h-8 rounded-md bg-gray-800 p-1 text-center`}
      value={value}
      onChange={({ currentTarget }) => setValue(currentTarget.value as TValue)}
    >
      <option value="AND" defaultChecked>
        AND
      </option>
      <option value="OR">OR</option>
      <option value="NOT">NOT</option>
    </select>
  );
}
