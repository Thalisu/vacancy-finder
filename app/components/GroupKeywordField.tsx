"use client";
import React, { ReactNode, useState } from "react";
import { MinusSVG, PlusSVG } from "./svgs";
import { inter } from "../lib/fonts";
import KeywordInput from "./KeywordInput";
import SelectAndOr from "./SelectAndOr";
import ExtraField from "./SelectAndKeyField";

export default function GroupKeywordField({
  values = [],
}: {
  values?: string[];
}) {
  const extraValues = values.splice(3);
  let dExtraFields: ReactNode[] = [];
  if (extraValues) {
    let from = 0,
      to = from + 2;

    dExtraFields = new Array(extraValues.length / 2).fill(0).map((_, i) => {
      const field = (
        <ExtraField
          key={i}
          label={false}
          dValue={extraValues.slice(from, to)}
        />
      );
      from = to;
      to = from + 2;
      return field;
    });
  }

  const [extraFields, setExtraFields] = useState<ReactNode[]>(dExtraFields);

  const addExtraField = () => {
    setExtraFields((prev) => [
      ...extraFields,
      <ExtraField key={prev.length} label={false} />,
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
      <KeywordInput dValue={values?.[0]} />
      <SelectAndOr dValue={values?.[1] as "AND" | "OR" | "NOT"} />
      <KeywordInput dValue={values?.[2]} />
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
