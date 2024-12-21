import { useLayoutEffect, useRef } from "react";
import { inter } from "../lib/fonts";
import SavedJobSearchData from "./SavedJobSearchData";
import { IJobsData } from "../lib/types";
import SavedSearchButtons from "./SavedSearchButtons";

interface IHandlers {
  quotationHandler: (index: number) => void;
  editHandler: () => void;
}

export default function SavedKeywordField({
  jobsData,
  keywords,
  handlers,
  index,
}: {
  jobsData: IJobsData;
  keywords: string[];
  index: number;
  handlers: IHandlers;
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
    <div className="bg-secondaryForm relative flex flex-col gap-2 rounded-md">
      <p
        className="bg-secondaryForm absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full"
        style={{ fontSize: "0.715rem" }}
      >
        {index + 1}
      </p>
      <div className="flex flex-wrap px-2" ref={inputRef}>
        {keywords.map((v, i) => (
          <div key={i}>
            <input
              type="text"
              value={v}
              readOnly
              tabIndex={-1}
              id="input"
              name={`keyword-${index}`}
              className={`${inter.className} cursor-default bg-transparent py-1 text-center caret-transparent outline-none transition-colors ${isKeyword[i] && "cursor-pointer hover:bg-gray-800/10"}`}
              onClick={() => {
                if (isKeyword[i]) {
                  handlers.quotationHandler(i);
                }
              }}
            />
            <span className="invisible absolute left-0 whitespace-pre">
              {v}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between gap-2">
        <SavedJobSearchData jobSearchData={jobsData} index={index} />
        <SavedSearchButtons
          keywords={keywords}
          editSearch={handlers.editHandler}
        />
      </div>
    </div>
  );
}
