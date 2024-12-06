"use client";
import React, { ReactNode, useState } from "react";
import { MinusSVG, PlusSVG } from "./svgs";
import { inter } from "../lib/fonts";
import KeywordInput from "./KeywordInput";
import SelectAndOr from "./SelectAndOr";
import ExtraField from "./SelectAndKeyField";

export default function GroupKeywordField() {
  const [extraFields, setExtraFields] = useState<ReactNode[]>([]);

  const addExtraField = () => {
    setExtraFields((prev) => [
      ...extraFields,
      <ExtraField key={prev.length} />,
    ]);
  };

  const removeExtraField = () => {
    if (extraFields.length < 1) return;
    setExtraFields((prev) => extraFields.slice(0, prev.length - 1));
  };

  return (
    <div className={`${inter.className} flex flex-wrap items-center gap-2`}>
      <input
        id="keyword"
        className="pointer-events-none w-2 cursor-default bg-transparent text-3xl text-blue-900/70"
        value={"("}
        readOnly
      />
      <KeywordInput />
      <SelectAndOr />
      <KeywordInput />
      {extraFields.length > 0 && extraFields.map((ef: ReactNode) => ef)}
      <div className="flex flex-col gap-1">
        <button type="button" onClick={() => addExtraField()}>
          <PlusSVG />
        </button>
        <button type="button" onClick={() => removeExtraField()}>
          <MinusSVG
            className={`${extraFields.length < 1 ? "opacity-50" : ""}`}
          />
        </button>
      </div>
      <input
        id="keyword"
        className="pointer-events-none w-2 cursor-default bg-transparent text-3xl text-blue-900/70"
        value={")"}
        readOnly
      />
    </div>
  );
}
