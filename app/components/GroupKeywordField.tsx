"use client";
import { ReactNode, useState } from "react";
import { MinusSVG, PlusSVG } from "./svgs";
import { inter } from "../lib/fonts";
import KeywordInput from "./KeywordInput";
import SelectAndOr from "./SelectAndOr";

export default function GroupKeywordField() {
  const [keywordInputs, setKeywordInputs] = useState<ReactNode[]>([]);
  return (
    <div className={`${inter.className} flex flex-wrap items-center gap-2`}>
      <p className="text-3xl text-blue-900/70">{"("}</p>
      <KeywordInput />
      <SelectAndOr />
      <KeywordInput />
      {keywordInputs.map((input) => input)}
      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={() =>
            setKeywordInputs((prev) => [
              ...prev,
              <SelectAndOr key={prev.length} />,
              <KeywordInput key={prev.length + 1} />,
            ])
          }
        >
          <PlusSVG />
        </button>
        <button
          type="button"
          onClick={() => setKeywordInputs((prev) => [...prev.slice(0, -2)])}
        >
          <MinusSVG />
        </button>
      </div>
      <p className="text-3xl text-blue-900/70">{")"}</p>
    </div>
  );
}
