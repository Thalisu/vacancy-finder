import { useLayoutEffect, useRef } from "react";
import { inter } from "../lib/fonts";
import SavedJobSearchData from "./SavedJobSearchData";
import { IJobsData } from "../lib/types";

export default function SavedKeywordField({
  jobsData,
  keywords,
  quotationHandler,
  index,
}: {
  jobsData: IJobsData;
  keywords: string[];
  index: number;
  quotationHandler: (index: number) => void;
}) {
  // adjust the size of inputs to match char length
  const inputRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!inputRef.current) return;
    const childs = Array.from(
      inputRef.current.childNodes as NodeListOf<HTMLInputElement>,
    );
    childs.map((c) => {
      const input = c.childNodes[0] as HTMLInputElement;
      const span = c.childNodes[1] as HTMLSpanElement;
      input.style.width = `${span.offsetWidth + 4}px`;
    });
  });

  const isKeyword = keywords.map((v) => {
    const is =
      v === "AND" || v === "NOT" || v === "OR" || v === "(" || v === ")";
    return !is;
  });

  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex flex-wrap rounded-md bg-gray-950/30 px-2 text-white"
        ref={inputRef}
      >
        {keywords.map((v, i) => (
          <div key={i}>
            <input
              type="text"
              value={v}
              readOnly
              tabIndex={-1}
              id="input"
              name={`keyword-${index}`}
              className={`${inter.className} cursor-default bg-transparent py-1 text-center caret-transparent outline-none transition-colors ${isKeyword[i] && "cursor-pointer hover:bg-gray-800"}`}
              onClick={() => {
                if (isKeyword[i]) {
                  quotationHandler(i);
                }
              }}
            />
            <span className="invisible absolute left-0 whitespace-pre">
              {v}
            </span>
          </div>
        ))}
      </div>
      <SavedJobSearchData jobSearchData={jobsData} index={index} />
    </div>
  );
}
