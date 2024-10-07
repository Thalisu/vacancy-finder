"use client";
import { useState } from "react";
import { MinusSVG, PlusSVG } from "./svgs";
import { inter } from "../lib/fonts";
import KeywordInput from "./KeywordInput";
import SelectAndOr from "./SelectAndOr";

export default function GroupKeywordField({
  value,
  handleValueChange,
}: {
  value: string[];
  handleValueChange: (newValue: string | string[]) => void;
}) {
  const [val, setVal] = useState<string[]>([...value]);

  const handleChange = (index: number, newValue: string) => {
    const toUpdate = [...val];
    toUpdate[index] = newValue;
    setVal(() => [...toUpdate]);
    handleValueChange(toUpdate);
  };

  const addKeyword = () => {
    const toUpdate = [...val, "AND", ""];
    setVal(() => toUpdate);
    handleValueChange(toUpdate);
  };

  const removeKeyword = () => {
    const toUpdate = [...val.slice(0, -2)];
    setVal(() => toUpdate);
    handleValueChange(toUpdate);
  };

  return (
    <div className={`${inter.className} flex flex-wrap items-center gap-2`}>
      <p className="text-3xl text-blue-900/70">{"("}</p>
      {val.map((val, i) => {
        return i % 2 === 0 ? (
          <KeywordInput
            key={i}
            value={val}
            handleChange={(newValue) => handleChange(i, newValue)}
          />
        ) : (
          <SelectAndOr
            key={i}
            value={val}
            handleChange={(newValue) => handleChange(i, newValue)}
          />
        );
      })}
      <div className="flex flex-col gap-1">
        <button type="button" onClick={() => addKeyword()}>
          <PlusSVG />
        </button>
        <button type="button" onClick={() => removeKeyword()}>
          <MinusSVG />
        </button>
      </div>
      <p className="text-3xl text-blue-900/70">{")"}</p>
    </div>
  );
}
