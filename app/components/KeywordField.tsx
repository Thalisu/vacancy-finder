"use client";
import { ReactNode, useCallback, useRef, useState } from "react";
import { inter } from "../lib/fonts";
import NewKeywordSearch from "./NewKeywordSearch";
import NotSavedSearchButtons from "./NotSavedSearchButtons";
import SavedKeywordField from "./SavedKeywordField";

export default function KeywordField({ index }: { index: number }) {
  const [isSaved, setIsSaved] = useState(false);
  const [extraFields, setExtraFields] = useState<ReactNode[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const addExtraField = useCallback(() => {
    setExtraFields((prev) => [...prev, <NewKeywordSearch key={prev.length} />]);
  }, []);

  const removeExtraField = useCallback(() => {
    if (extraFields.length < 1) return;
    setExtraFields(() => extraFields.slice(0, extraFields.length - 1));
  }, [extraFields]);

  const handleSave = () => {
    setIsSaved((prev) => !prev);
  };

  if (isSaved && ref.current) {
    const elementsArray = Array.from(
      ref.current.querySelectorAll("#keyword") || [],
    );
    console.log(elementsArray);
    const values = elementsArray.map((i) => (i as HTMLInputElement).value);
    return (
      <SavedKeywordField handler={handleSave} values={values} index={index} />
    );
  }

  return (
    <div className="relative flex min-h-32 flex-col gap-2 bg-gray-950/30 p-4">
      <p className="absolute -left-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs text-black">
        {index}
      </p>
      <div
        className={`${inter.className} mb-auto flex flex-wrap items-center gap-2`}
        ref={ref}
      >
        <NewKeywordSearch label />
        {extraFields.length > 0 && extraFields.map((ef: ReactNode) => ef)}
      </div>
      <NotSavedSearchButtons
        addExtraFields={addExtraField}
        removeExtraField={removeExtraField}
        handleSave={handleSave}
      />
    </div>
  );
}
