"use client";
import { useState } from "react";

type TValue = "AND" | "OR" | "NOT";

export default function SelectAndOr({ dValue = "AND" }: { dValue?: TValue }) {
  const [value, setValue] = useState<TValue>(dValue);
  return (
    <select
      id="keyword"
      name="andOr"
      className={`h-8 rounded-md bg-field p-1 text-center`}
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
