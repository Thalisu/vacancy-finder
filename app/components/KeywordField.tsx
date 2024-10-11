"use client";
import { inter } from "../lib/fonts";
import useKeywordInputs from "../hooks/useKeywordInputs";
import { Dispatch, SetStateAction } from "react";
import SavedSearchButtons from "./SavedSearchButtons";
import NotSavedSearchButtons from "./NotSavedSearchButtons";
import JobDataSelects from "./JobDataSelects";

export default function KeywordField({
  index,
  setIsSearchAvailable,
}: {
  index: number;
  setIsSearchAvailable: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    keywordInputs,
    isAllInputsWithValue,
    addKeyword,
    removeKeyword,
    saveSearch,
    isSaved,
    jobSearchData,
    handleSetJobSearchData,
    editSearch,
  } = useKeywordInputs(setIsSearchAvailable, index);

  const isLengthOne = keywordInputs.length === 1;

  return (
    <div className="relative flex min-h-32 flex-col gap-2 bg-gray-950/30 p-4">
      <p className="absolute -left-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs text-black">
        {index}
      </p>
      <div
        className={`${inter.className} mb-auto flex flex-wrap items-center gap-2`}
      >
        {keywordInputs.map((input) => input.node)}
      </div>

      {isSaved ? (
        <SavedSearchButtons
          values={keywordInputs.map((i) => i.value as string[]).flat()}
          editSearch={editSearch}
        />
      ) : (
        <>
          <JobDataSelects
            index={index}
            jobSearchData={jobSearchData}
            handleSetJobSearchData={handleSetJobSearchData}
          />
          <NotSavedSearchButtons
            isAllInputsWithValue={isAllInputsWithValue}
            isLengthOne={isLengthOne}
            addKeyword={addKeyword}
            removeKeyword={removeKeyword}
            saveSearch={saveSearch}
          />
        </>
      )}
    </div>
  );
}
