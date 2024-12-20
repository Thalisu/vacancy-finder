"use client";
import {
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { inter } from "../lib/fonts";
import NewKeywordSearch from "./NewKeywordSearch";
import NotSavedSearchButtons from "./NotSavedSearchButtons";
import SavedKeywordField from "./SavedKeywordField";
import JobDataSelects from "./JobDataSelects";

export default function KeywordField({ index }: { index: number }) {
  const [isSaved, setIsSaved] = useState(false);
  const [extraFields, setExtraFields] = useState<ReactNode[]>([]);

  const jobsData = { time: "", remote: "", location: "" };
  const [values, setValues] = useState({ keywords: [""], jobsData });

  const noFilledKeywords = { state: false, msg: "" };
  const [errors, setErrors] = useState({ noFilledKeywords });

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current || !isSaved) return;
  }, [isSaved]);

  const addExtraField = useCallback(() => {
    setExtraFields((prev) => [
      ...prev,
      <NewKeywordSearch key={prev.length} label={false} />,
    ]);
  }, []);

  const removeExtraField = useCallback(() => {
    if (extraFields.length < 1) return;
    setExtraFields(() => extraFields.slice(0, extraFields.length - 1));
  }, [extraFields]);

  const handleSave = useCallback(() => {
    if (!isSaved && ref.current) {
      if (ref.current.querySelector("#search")) {
        setErrors((prev) => ({
          ...prev,
          noFilledKeywords: { state: true, msg: "Escolha o tipo da keyword" },
        }));
        return;
      }

      const elementsArray = Array.from(
        ref.current.querySelectorAll("#keyword") || [],
      );

      const values: string[] = [];
      let error = false;

      for (let i = 0; i < elementsArray.length; i++) {
        const value = (elementsArray[i] as HTMLInputElement).value;
        if (value !== "") {
          values.push(value.replace(/[^a-zA-Z"']/g, ""));
        } else {
          error = true;
          break;
        }
      }

      if (error) {
        setErrors((prev) => ({
          ...prev,
          noFilledKeywords: { state: true, msg: "Preencha todas as keywords" },
        }));
        return;
      }

      const time = ref.current.querySelector("#time-0") as HTMLSelectElement;
      const remote = ref.current.querySelector(
        "#remote-0",
      ) as HTMLSelectElement;
      const local = ref.current.querySelector("#local-0") as HTMLSelectElement;

      const jobsData = {
        time: time.value,
        remote: remote.value,
        location: local.value,
      };

      setValues({ keywords: values, jobsData });
    }

    setIsSaved((prev) => !prev);
  }, [isSaved]);

  const quotationHandler = useCallback((index: number) => {
    setValues((prev) => {
      const newValues = prev.keywords.map((v, i) => {
        if (i === index) {
          return v.includes('"') ? v.replaceAll('"', "") : `\"${v}\"`;
        }
        return v;
      });
      return { ...prev, keywords: newValues };
    });
  }, []);

  if (isSaved) {
    return (
      <SavedKeywordField
        quotationHandler={quotationHandler}
        jobsData={values.jobsData}
        keywords={values.keywords}
        index={index}
      />
    );
  }

  return (
    <div className="relative flex min-h-32 flex-col gap-2 bg-gray-950/30 p-4">
      <p className="absolute -left-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs text-black">
        {index}
      </p>
      <div className={`mb-auto flex flex-col gap-2`} ref={ref}>
        <div className={`${inter.className} flex flex-wrap items-center gap-2`}>
          <NewKeywordSearch label />
          {extraFields.length > 0 && extraFields.map((ef: ReactNode) => ef)}
        </div>
        <JobDataSelects />
      </div>
      <NotSavedSearchButtons
        addExtraFields={addExtraField}
        removeExtraField={removeExtraField}
        handleSave={handleSave}
        noFilledKeywords={errors.noFilledKeywords}
      />
    </div>
  );
}
