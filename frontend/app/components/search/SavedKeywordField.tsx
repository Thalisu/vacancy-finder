import { useEffect, useRef } from "react";
import { inter } from "../../lib/fonts";
import { IJobsData } from "../../lib/types";
import SavedJobSearchData from "./SavedJobSearchData";
import SavedSearchButtons from "./buttons/SavedSearchButtons";

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

  useEffect(() => {
    if (!inputRef.current) return;
    const childs = Array.from(
      inputRef.current.childNodes as NodeListOf<HTMLInputElement>,
    );
    childs.map((c) => {
      const input = c.childNodes[0] as HTMLInputElement;
      const span = c.childNodes[1] as HTMLSpanElement;
      input.style.width = `${span.offsetWidth + 2 + input.value.length}px`;
    });
  }, [keywords]);

  const isKeyword = keywords.map((v) => {
    const is =
      v === "AND" || v === "NOT" || v === "OR" || v === "(" || v === ")";
    return !is;
  });

  return (
    <div className="relative flex flex-col gap-2 rounded-md bg-secondaryForm">
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
              className={`${inter.className} clip cursor-default border-none bg-transparent p-0 py-1 text-center caret-transparent outline-none transition-colors ${isKeyword[i] && "cursor-pointer hover:bg-gray-800/10"} text-base`}
              onClick={() => {
                if (isKeyword[i]) {
                  handlers.quotationHandler(i);
                }
              }}
            />
            <span className="invisible absolute left-0 top-0 text-base">
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
