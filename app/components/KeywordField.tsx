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
import EditSavedKeyword from "./EditSavedKeyword";
import { addToLocalStorage } from "../lib/utils";

export default function KeywordField({
  index,
  handleError,
  saveHandler,
}: {
  index: number;
  handleError: (msg: string, timeout?: number) => void;
  saveHandler: (i: number, state: boolean) => void;
}) {
  type Situation = "saved" | "edit" | "unsaved";
  const [situation, setSituation] = useState<Situation>("unsaved");
  const [extraFields, setExtraFields] = useState<ReactNode[]>([]);

  const jobsData = { time: "r86400", remote: "1%2C2%2C3", location: "Brazil" };
  const [values, setValues] = useState({ keywords: [""], jobsData });

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current || situation !== "saved") return;
  }, [situation]);

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
    if (situation !== "saved" && ref.current) {
      if (ref.current.querySelector("#search")) {
        handleError("Selecione o tipo da pesquisa");
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
          values.push(value.replace(/[^a-zA-Z")(']/g, ""));
        } else {
          error = true;
          break;
        }
      }

      if (error) {
        handleError("Preencha todas as keywords");
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

      addToLocalStorage(`@SEARCH${index}`, {
        keywords: values,
        jobsData,
      });
      setExtraFields(() => []);
      saveHandler(index, true);
      setValues({ keywords: values, jobsData });
      setSituation(() => "saved");
    }
  }, [situation, handleError, saveHandler, index]);

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

  const editHandler = () => {
    setSituation(() => "edit");
  };

  const handlers = {
    quotationHandler,
    editHandler,
  };

  if (situation === "saved") {
    return (
      <SavedKeywordField
        jobsData={values.jobsData}
        keywords={values.keywords}
        index={index}
        handlers={handlers}
      />
    );
  }

  return (
    <div className="relative flex min-h-32 flex-col gap-2 rounded-xl bg-secondaryForm p-4">
      <div className={`mb-auto flex flex-col gap-2`} ref={ref}>
        <div className={`${inter.className} flex flex-wrap items-center gap-2`}>
          {situation === "unsaved" ? (
            <NewKeywordSearch label />
          ) : (
            <EditSavedKeyword values={values.keywords} />
          )}
          {extraFields.length > 0 && extraFields.map((ef: ReactNode) => ef)}
        </div>
        <JobDataSelects jobsData={values.jobsData} />
      </div>
      <NotSavedSearchButtons
        addExtraFields={addExtraField}
        removeExtraField={removeExtraField}
        handleSave={handleSave}
      />
    </div>
  );
}
