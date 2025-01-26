import { useCallback, useRef, useState } from "react";
import { IJobsData } from "../lib/types";
import NewKeywordSearch from "../components/search/NewKeywordSearch";
import { addToLocalStorage, updateLocalStorage } from "../lib/utils";

const useKeywordFields = (
  handlers: {
    handleErrors: (msg: string, timeout?: number) => void;
    saveHandler: (i: number, state: boolean) => void;
  },
  searchIndex: number,
  savedSearch?: {
    jobsData: IJobsData;
    keywords: string[];
  },
) => {
  type Situation = "saved" | "edit" | "unsaved";
  const cSituation = savedSearch ? "saved" : "unsaved";
  const [situation, setSituation] = useState<Situation>(cSituation);

  const [extraFields, setExtraFields] = useState<React.ReactNode[]>([]);

  const jobsData = {
    time: "r86400",
    remote: "1%2C2%2C3",
    location: "106057199",
  };
  const value = savedSearch
    ? { keywords: savedSearch.keywords, jobsData: savedSearch.jobsData }
    : { keywords: [""], jobsData };
  const [values, setValues] = useState(value);

  const ref = useRef<HTMLDivElement>(null);

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
        handlers.handleErrors("Selecione o tipo da pesquisa");
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
          values.push(value.replace(/[^a-zA-Z")('-\s#.]/g, ""));
        } else {
          error = true;
          break;
        }
      }

      if (error) {
        handlers.handleErrors("Preencha todas as keywords");
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

      addToLocalStorage(`@SEARCH${searchIndex}`, {
        keywords: values,
        jobsData,
      });
      setExtraFields(() => []);
      handlers.saveHandler(searchIndex, true);
      setValues({ keywords: values, jobsData });
      setSituation(() => "saved");
    }
  }, [situation, handlers, searchIndex]);

  const quotationHandler = useCallback(
    (index: number) => {
      setValues((prev) => {
        const newValues = prev.keywords.map((v, i) => {
          if (i === index) {
            return v.includes('"') ? v.replaceAll('"', "") : `\"${v}\"`;
          }
          return v;
        });
        updateLocalStorage(`@SEARCH${searchIndex}`, {
          ...prev,
          keywords: newValues,
        });
        return { ...prev, keywords: newValues };
      });
    },
    [searchIndex],
  );

  const editHandler = useCallback(() => {
    setSituation(() => "edit");
  }, []);

  const fieldHandlers = {
    addExtraField,
    removeExtraField,
    handleSave,
    quotationHandler,
    editHandler,
  };

  return { situation, extraFields, ref, values, fieldHandlers };
};

export default useKeywordFields;
