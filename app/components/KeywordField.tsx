"use client";
import { ReactNode, useState } from "react";
import { inter } from "../lib/fonts";
import NewKeywordSearch from "./NewKeywordSearch";
import SelectAndOr from "./SelectAndOr";

export default function KeywordField({ index }: { index: number }) {
  const [showButton, setShowButton] = useState(false);
  const [keywordInputs, setKeywordInputs] = useState<ReactNode[]>([
    <NewKeywordSearch key={0} setShowButton={setShowButton} label={true} />,
  ]);
  return (
    <div className="relative flex min-h-32 flex-col bg-gray-950/30 p-4">
      <p className="absolute -left-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs text-black">
        {index}.
      </p>
      <div
        className={`${inter.className} mb-auto flex flex-wrap items-center gap-2`}
      >
        {keywordInputs.map((input) => input)}
      </div>
      <button
        type="button"
        className={`max-w-fit rounded-xl ${showButton ? "bg-gray-950" : "bg-gray-950/50"} p-2`}
        disabled={!showButton}
        onClick={() => {
          setShowButton(false);
          setKeywordInputs((prev) => [
            ...prev,
            <SelectAndOr key={prev.length} />,
            <NewKeywordSearch
              key={prev.length + 1}
              setShowButton={setShowButton}
            />,
          ]);
        }}
      >
        Mais keywords
      </button>
    </div>
  );
}
